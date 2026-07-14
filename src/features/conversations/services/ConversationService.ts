import { supabase } from "../../../services/supabase/client";
import type { Conversation } from "../types/conversation";

export async function createConversation(
  userId: string,
  subject: string,
): Promise<string> {
  const { data, error } = await supabase
    .from("conversations")
    .insert({ user_id: userId, subject, status: "Abierta" })
    .select("conversation_id")
    .single();
  if (error) throw error;
  return data.conversation_id;
}

export async function getUserConversations(
  userId: string,
): Promise<Conversation[]> {
  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .eq("user_id", userId);
  if (error) throw error;
  return data ?? [];
}

export async function getAllConversations(): Promise<Conversation[]> {
  const { data, error } = await supabase
    .from("conversations")
    .select("*");
  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }
  return data ?? [];
}

export async function updateConversationStatus(
  conversationId: string,
  status: string,
) {
  const { error } = await supabase
    .from("conversations")
    .update({ status })
    .eq("conversation_id", conversationId);
  if (error) throw error;
}

export async function getConversationById(
  conversationId: string,
): Promise<Conversation | null> {
  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .eq("conversation_id", conversationId)
    .single();
  if (error) return null;
  return data;
}
