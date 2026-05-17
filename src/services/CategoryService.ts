import { supabase } from "../utils/supabase";

export async function getAllCategories() {
  //Obtiene todas las categorías de la tabla 'categories' en Supabase
  const { data, error } = await supabase.from("category").select("*");
  //Si hay un error al obtener las categorías, se lanza una excepción con el mensaje de error
  if (error) {
    throw error;
  }
  //Si no hay errores, se devuelve la lista de categorías obtenida de la base de datos
  return data;
}
