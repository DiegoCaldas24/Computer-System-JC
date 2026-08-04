-- Carrito por usuario: un solo carrito por cada usuario
CREATE TABLE IF NOT EXISTS "shoppingCart" (
  cart_id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_id UUID NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_shoppingCart_user_id ON "shoppingCart" (user_id);

-- Items del carrito: productos asociados al carrito
CREATE TABLE IF NOT EXISTS "cartItems" (
  id BIGSERIAL PRIMARY KEY,
  cart_id BIGINT NOT NULL REFERENCES "shoppingCart" (cart_id) ON DELETE CASCADE,
  product_id BIGINT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Necesario para el upsert por (cart_id, product_id)
CREATE UNIQUE INDEX IF NOT EXISTS uq_cartItems_cart_product ON "cartItems" (cart_id, product_id);
CREATE INDEX IF NOT EXISTS idx_cartItems_product_id ON "cartItems" (product_id);

-- Permisos (sin RLS)
GRANT SELECT, INSERT, UPDATE, DELETE ON "shoppingCart", "cartItems" TO anon, authenticated;
GRANT USAGE, SELECT ON SEQUENCE "shoppingCart_cart_id_seq", "cartItems_id_seq" TO anon, authenticated;
