import { supabase } from "../../../services/supabase/client";

const PRODUCT_SELECT =
  "*, brand:brands!brand_id(name), category:category!category_id(name)";

export async function getAllProducts() {
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT);
  if (error) throw error;
  return data;
}

export async function getProductById(product_id: number) {
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("product_id", product_id)
    .single();
  if (error) throw error;
  return data;
}

export async function getProductByCategory(category: number) {
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("category_id", category);
  if (error) throw error;
  return data;
}

export async function getProductByCode(code: string) {
  const { data, error } = await supabase
    .from("products")
    .select("product_id, code, name, price, stock")
    .eq("code", code.trim().toUpperCase())
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function searchProducts(
  searchQuery: string,
  categoryIds?: number[],
) {
  if (!searchQuery.trim()) return [];

  let query = supabase.from("products").select(PRODUCT_SELECT);
  const searchTerm = `%${searchQuery.trim()}%`;
  query = query.or(`name.ilike.${searchTerm},description.ilike.${searchTerm}`);

  if (categoryIds?.length) {
    query = query.in("category_id", categoryIds);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getLastProductCode(): Promise<string | null> {
  const { data, error } = await supabase
    .from("products")
    .select("code")
    .order("product_id", { ascending: false })
    .limit(1)
    .single();
  if (error && error.code !== "PGRST116") throw error;
  return data?.code ?? null;
}

export function generateNextCode(lastCode: string | null): string {
  const num = lastCode ? parseInt(lastCode.replace("P00", "")) + 1 : 1;
  return `P00${num}`;
}

export async function createProduct(product: {
  code: string;
  name: string;
  price: number;
  description?: string;
  category_id?: number;
  brand_id?: number;
  stock?: number;
  image?: string;
  isActive?: boolean;
}) {
  const { data, error } = await supabase
    .from("products")
    .insert(product)
    .select(PRODUCT_SELECT)
    .single();
  if (error) {
    console.error("Supabase insert error:", error);
    throw error;
  }
  return data;
}

export async function updateProduct(
  product_id: number,
  updates: Partial<{
    name: string;
    price: number;
    description: string;
    category_id: number;
    brand_id: number;
    stock: number;
    image: string;
    isActive: boolean;
  }>,
) {
  const { data, error } = await supabase
    .from("products")
    .update(updates)
    .eq("product_id", product_id)
    .select(PRODUCT_SELECT)
    .single();
  if (error) throw error;
  return data;
}

export async function deactivateProduct(product_id: number) {
  const { data, error } = await supabase
    .from("products")
    .update({ isActive: false })
    .eq("product_id", product_id)
    .select(PRODUCT_SELECT)
    .single();
  if (error) throw error;
  return data;
}

export async function increaseStock(product_id: number, amount: number) {
  const { data: current, error: fetchError } = await supabase
    .from("products")
    .select("stock")
    .eq("product_id", product_id)
    .single();
  if (fetchError) throw fetchError;

  const newStock = (current?.stock ?? 0) + amount;
  const { data, error } = await supabase
    .from("products")
    .update({ stock: newStock })
    .eq("product_id", product_id)
    .select(PRODUCT_SELECT)
    .single();
  if (error) throw error;
  return data;
}
