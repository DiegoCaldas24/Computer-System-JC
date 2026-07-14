import { supabase } from "../../../services/supabase/client";
import type { Message } from "../types/conversation";

export async function sendMessage(
  conversationId: string,
  senderId: string,
  message: string,
) {
  const { error } = await supabase
    .from("messages")
    .insert({
      conversation_id: conversationId,
      sender_id: senderId,
      message,
    });
  if (error) throw error;
}

export async function getMessages(
  conversationId: string,
): Promise<Message[]> {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data ?? [];
}
