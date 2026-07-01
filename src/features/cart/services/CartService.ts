import { supabase } from "../../../services/supabase/client";
import type { CartItemDB } from "../types/cart";

export async function getOrCreateCart(userId: string): Promise<number> {
  const { data: existing } = await supabase
    .from("shoppingCart")
    .select("cart_id")
    .eq("user_id", userId)
    .maybeSingle();

  if (existing) return existing.cart_id;

  const { data: created, error } = await supabase
    .from("shoppingCart")
    .insert({ user_id: userId })
    .select("cart_id")
    .single();

  if (error) throw error;
  return created.cart_id;
}

export async function getCartItemsFromServer(cartId: number): Promise<CartItemDB[]> {
  const { data, error } = await supabase
    .from("cartItems")
    .select("*")
    .eq("cart_id", cartId);

  if (error) throw error;
  return data ?? [];
}

export async function upsertCartItem(
  cartId: number,
  productId: number,
  quantity: number,
) {
  const { error } = await supabase.from("cartItems").upsert(
    { cart_id: cartId, product_id: productId, quantity },
    { onConflict: "cart_id, product_id" },
  );
  if (error) throw error;
}

export async function removeCartItemFromServer(cartId: number, productId: number) {
  const { error } = await supabase
    .from("cartItems")
    .delete()
    .eq("cart_id", cartId)
    .eq("product_id", productId);

  if (error) throw error;
}

export async function clearCartItemsOnServer(cartId: number) {
  const { error } = await supabase
    .from("cartItems")
    .delete()
    .eq("cart_id", cartId);

  if (error) throw error;
}
