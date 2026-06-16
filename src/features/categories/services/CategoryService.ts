import { supabase } from "../../../services/supabase/client";

export async function getAllCategories() {
  const { data, error } = await supabase.from("category").select("*");
  if (error) throw error;
  return data;
}

export async function createCategory(name: string) {
  const { data, error } = await supabase.from("category").insert({ name }).select("*").single();
  if (error) throw error;
  return data;
}