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
    .select("first_name, last_name, email, phone, rol_id")
    .eq("user_id", userId)
    .single();
  if (error) throw error;
  return data as {
    first_name: string;
    last_name: string;
    email: string;
    phone: string | null;
    rol_id: number;
  };
}

export async function getProfileAddress(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("address, city, department")
    .eq("user_id", userId)
    .single();
  if (error) return { address: null, city: null, department: null };
  return data as { address: string | null; city: string | null; department: string | null };
}

export async function updateProfile(
  userId: string,
  updates: Partial<{
    first_name: string;
    last_name: string;
    phone: string;
    address: string;
    city: string;
    department: string;
  }>,
) {
  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("user_id", userId);
  if (error) throw error;
}
