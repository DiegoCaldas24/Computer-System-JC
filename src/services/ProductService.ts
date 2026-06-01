import { supabase } from "../utils/supabase";

export async function getAllProducts() {
  //Obtiene todos los productos de la tabla 'products' en Supabase
  const { data, error } = await supabase
    .from("products")
    .select("*", { count: "exact" });
  //Si hay un error al obtener los productos, se lanza una excepción con el mensaje de error
  if (error) {
    throw error;
  }
  //Si no hay errores, se devuelve la lista de productos obtenida de la base de datos
  return data;
}

export async function getProductById(product_id: number) {
  //Obtiene todos los productos de la tabla 'products' en Supabase
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("product_id", product_id)
    .single();
  //Si hay un error al obtener los productos, se lanza una excepción con el mensaje de error
  if (error) {
    throw error;
  }
  //Si no hay errores, se devuelve la lista de productos obtenida de la base de datos
  return data;
}

export async function getProductByCategory(category: number) {
  //Obtiene todos los productos de la tabla 'products' en Supabase
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", category);
  //Si hay un error al obtener los productos, se lanza una excepción con el mensaje de error
  if (error) {
    throw error;
  }
  //Si no hay errores, se devuelve la lista de productos obtenida de la base de datos
  return data;
}

export async function searchProducts(
  searchQuery: string,
  categoryIds?: number[],
) {
  // Si la búsqueda está vacía, retornar array vacío (será manejado en el componente)
  if (!searchQuery.trim()) {
    return [];
  }

  // Construir la búsqueda usando múltiples filtros ilike
  let query = supabase.from("products").select("*");

  const searchTerm = `%${searchQuery.trim()}%`;

  // Buscar en nombre, descripción o categoría usando OR
  query = query.or(
    `name.ilike.${searchTerm},description.ilike.${searchTerm},category.ilike.${searchTerm}`,
  );

  // Filtrar por categorías si se proporciona
  if (categoryIds && categoryIds.length > 0) {
    query = query.in("category_id", categoryIds);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data;
}
