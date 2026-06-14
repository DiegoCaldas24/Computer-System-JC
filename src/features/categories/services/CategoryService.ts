import { supabase } from "../../../services/supabase/client";

export async function getAllCategories() {
  const { data, error } = await supabase.from("category").select("*");
  if (error) {
    throw error;
  }
  return data;
}