export type ShoppingCart = {
  cart_id: number;
  user_id: string;
};

export type CartItemDB = {
  cart_id: number;
  product_id: number;
  quantity: number;
};
