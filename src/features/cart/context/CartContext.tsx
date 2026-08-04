import { createContext, useContext, useReducer, useEffect, useRef, useState, type ReactNode } from "react";
import type { Product } from "../../products/types/product";
import { getSession } from "../../../services/supabase/auth";
import { supabase } from "../../../services/supabase/client";
import {
  getOrCreateCart,
  getCartItemsFromServer,
  upsertCartItem,
  removeCartItemFromServer,
  clearCartItemsOnServer,
} from "../services/CartService";

type CartItem = {
  product: Product;
  quantity: number;
};

type CartAction =
  | { type: "ADD_ITEM"; product: Product; quantity?: number }
  | { type: "REMOVE_ITEM"; product_id: number }
  | { type: "UPDATE_QUANTITY"; product_id: number; quantity: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; items: CartItem[] };

const PRODUCT_SELECT =
  "*, brand:brands!brand_id(name), category:category!category_id(name)";

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.find((i) => i.product.product_id === action.product.product_id);
      if (existing) {
        return state.map((i) =>
          i.product.product_id === action.product.product_id
            ? { ...i, quantity: i.quantity + (action.quantity ?? 1) }
            : i,
        );
      }
      return [...state, { product: action.product, quantity: action.quantity ?? 1 }];
    }
    case "REMOVE_ITEM":
      return state.filter((i) => i.product.product_id !== action.product_id);
    case "UPDATE_QUANTITY":
      return state.map((i) =>
        i.product.product_id === action.product_id
          ? { ...i, quantity: action.quantity }
          : i,
      );
    case "CLEAR":
      return [];
    case "HYDRATE":
      return action.items;
    default:
      return state;
  }
}

type CartContextType = {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (product_id: number) => void;
  updateQuantity: (product_id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const [cartId, setCartId] = useState<number | null>(null);
  const isHydrating = useRef(true);
  const loadingRef = useRef(false);
  const syncTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    let active = true;

    const loadCartFromServer = async (userId: string) => {
      if (loadingRef.current) return;
      loadingRef.current = true;
      try {
        const cid = await getOrCreateCart(userId);
        console.log("[Cart] cartId obtenido:", cid);
        if (!active) return;
        setCartId(cid);

        const serverItems = await getCartItemsFromServer(cid);
        console.log("[Cart] items en BD:", serverItems.length);
        if (serverItems.length > 0) {
          const productIds = serverItems.map((i) => i.product_id);
          const { data: products, error: productsError } = await supabase
            .from("products")
            .select(PRODUCT_SELECT)
            .in("product_id", productIds);
          if (productsError) throw productsError;

          if (active && products) {
            const merged: CartItem[] = products.map((p) => {
              const server = serverItems.find((i) => i.product_id === p.product_id);
              return { product: p as Product, quantity: server?.quantity ?? 1 };
            });
            dispatch({ type: "HYDRATE", items: merged });
          }
        }
      } catch (err) {
        console.error("[CartProvider] Error al cargar el carrito desde la BD:", err);
      } finally {
        loadingRef.current = false;
      }
    };

    const init = async () => {
      const session = await getSession();
      console.log("[Cart] init, hay sesión?:", !!session?.user, session?.user?.id ?? "-");
      if (active && session?.user) {
        isHydrating.current = true;
        await loadCartFromServer(session.user.id);
        if (active) isHydrating.current = false;
      }
    };

    init();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("[Cart] evento de auth:", event, "user:", session?.user?.id ?? "-");
      if (session?.user) {
        isHydrating.current = true;
        loadCartFromServer(session.user.id).finally(() => {
          if (active) isHydrating.current = false;
        });
      } else {
        isHydrating.current = false;
        setCartId(null);
        dispatch({ type: "CLEAR" });
      }
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isHydrating.current || !cartId) return;

    clearTimeout(syncTimer.current);
    syncTimer.current = setTimeout(async () => {
      try {
        const serverItems = await getCartItemsFromServer(cartId);
        console.log("[Cart] sync: items locales", items.length, "- en BD", serverItems.length);
        for (const item of items) {
          const existing = serverItems.find((s) => s.product_id === item.product.product_id);
          if (!existing || existing.quantity !== item.quantity) {
            await upsertCartItem(cartId, item.product.product_id, item.quantity);
            console.log("[Cart] upsert product_id:", item.product.product_id, "qty:", item.quantity);
          }
        }
        for (const server of serverItems) {
          if (!items.find((i) => i.product.product_id === server.product_id)) {
            await removeCartItemFromServer(cartId, server.product_id);
            console.log("[Cart] remove product_id:", server.product_id);
          }
        }
      } catch (err) {
        console.error("[CartProvider] Error al sincronizar el carrito con la BD:", err);
      }
    }, 1000);
  }, [items, cartId]);

  const addItem = (product: Product, quantity = 1) =>
    dispatch({ type: "ADD_ITEM", product, quantity });
  const removeItem = (product_id: number) =>
    dispatch({ type: "REMOVE_ITEM", product_id });
  const updateQuantity = (product_id: number, quantity: number) =>
    dispatch({ type: "UPDATE_QUANTITY", product_id, quantity });
  const clearCart = async () => {
    dispatch({ type: "CLEAR" });
    if (cartId) {
      try { await clearCartItemsOnServer(cartId); } catch (err) {
        console.error("[CartProvider] Error al vaciar el carrito en la BD:", err);
      }
    }
  };

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
