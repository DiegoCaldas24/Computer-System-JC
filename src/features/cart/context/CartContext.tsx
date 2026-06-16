import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react";
import type { Product } from "../../products/types/product";

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

const STORAGE_KEY = "jc-cart";

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

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) dispatch({ type: "HYDRATE", items: JSON.parse(stored) });
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, quantity = 1) =>
    dispatch({ type: "ADD_ITEM", product, quantity });
  const removeItem = (product_id: number) =>
    dispatch({ type: "REMOVE_ITEM", product_id });
  const updateQuantity = (product_id: number, quantity: number) =>
    dispatch({ type: "UPDATE_QUANTITY", product_id, quantity });
  const clearCart = () => dispatch({ type: "CLEAR" });

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
