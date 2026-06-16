import { supabase } from "./client";

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

export async function createProfile(profile: {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  rol_id: number;
  status: boolean;
}) {
  const { error } = await supabase.from("profiles").insert(profile);
  if (error) {
    console.error(
      "Supabase insert profile error:",
      JSON.stringify(error, null, 2),
    );
    throw new Error(error.message || "Error desconocido al insertar perfil");
  }
}

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("first_name, last_name, rol_id")
    .eq("user_id", userId)
    .single();
  if (error) throw error;
  return data;
}
