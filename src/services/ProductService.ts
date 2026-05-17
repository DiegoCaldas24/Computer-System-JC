import { supabase } from "../utils/supabase";

export async function getAllProducts() {
  //Obtiene todos los productos de la tabla 'products' en Supabase
  const { data, error } = await supabase.from("products").select("*");
  //Si hay un error al obtener los productos, se lanza una excepción con el mensaje de error
  if (error) {
    throw error;
  }
  //Si no hay errores, se devuelve la lista de productos obtenida de la base de datos
  return data;
}
