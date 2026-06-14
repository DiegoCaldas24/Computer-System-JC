import { supabase } from "../../../services/supabase/client";

const PRODUCT_SELECT = "*, brand:brand_id(name), category:category_id(name)";

export async function getAllProducts() {
  const { data, error } = await supabase.from("products").select(PRODUCT_SELECT);
  if (error) {
    throw error;
  }
  return data;
}

export async function getProductById(product_id: number) {
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("product_id", product_id)
    .single();
  if (error) {
    throw error;
  }
  return data;
}

export async function getProductByCategory(category: number) {
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("category_id", category);
  if (error) {
    throw error;
  }
  return data;
}

export async function searchProducts(
  searchQuery: string,
  categoryIds?: number[],
) {
  if (!searchQuery.trim()) {
    return [];
  }

  let query = supabase.from("products").select("*");

  const searchTerm = `%${searchQuery.trim()}%`;

  query = query.or(
    `name.ilike.${searchTerm},description.ilike.${searchTerm},category.ilike.${searchTerm}`,
  );

  if (categoryIds && categoryIds.length > 0) {
    query = query.in("category_id", categoryIds);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data;
}