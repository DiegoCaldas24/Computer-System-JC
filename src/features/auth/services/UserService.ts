import { supabase } from "../../../services/supabase/client";

const ROLE_LABELS: Record<number, string> = {
  1: "Admin",
  2: "Trabajador",
  3: "Cliente",
};

export async function getAllUsers() {
  const { data, error } = await supabase
    .from("profiles")
    .select("user_id, first_name, last_name, email, rol_id, status")
    .eq("rol_id", 2);
  if (error) throw error;
  return (data ?? []).map((p) => ({
    user_id: p.user_id,
    name: `${p.first_name} ${p.last_name}`,
    email: p.email,
    role: ROLE_LABELS[p.rol_id] ?? "Desconocido",
    status: p.status,
  }));
}
