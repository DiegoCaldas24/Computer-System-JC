import { supabase } from "../../../services/supabase/client";

export async function getDashboardStats() {
  const { count: totalProducts } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true });

  const { count: lowStock } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .lte("stock", 5);

  const { data: inventoryData } = await supabase.from("products").select("price, stock");
  const inventoryValue = (inventoryData ?? []).reduce(
    (sum, p) => sum + Number(p.price) * Number(p.stock ?? 0),
    0,
  );

  const { count: totalOrders } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true });

  const { count: totalUsers } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true });

  return {
    totalProducts: totalProducts ?? 0,
    lowStock: lowStock ?? 0,
    inventoryValue,
    totalOrders: totalOrders ?? 0,
    totalUsers: totalUsers ?? 0,
  };
}