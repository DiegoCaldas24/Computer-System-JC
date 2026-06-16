import { supabase } from "../../../services/supabase/client";

export async function getAllBrands() {
  const { data, error } = await supabase.from("brands").select("*");
  if (error) throw error;
  return data;
}

export async function createBrand(name: string) {
  const { data, error } = await supabase.from("brands").insert({ name }).select("*").single();
  if (error) throw error;
  return data;
}

