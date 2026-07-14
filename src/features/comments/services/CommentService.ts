import { supabase } from "../../../services/supabase/client";
import type { WebsiteComment } from "../types/comment";

export async function createComment(comment: {
  user_id: string;
  subject: string;
  comment: string;
  type: string;
}) {
  const { error } = await supabase.from("website_comments").insert({
    ...comment,
  });
  if (error) throw error;
}

export async function getUnrepliedComments(): Promise<WebsiteComment[]> {
  const { data, error } = await supabase
    .from("website_comments")
    .select("*")
    .is("admin_reply", null)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getAllComments(): Promise<WebsiteComment[]> {
  const { data, error } = await supabase
    .from("website_comments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getCommentsByUser(
  userId: string,
): Promise<WebsiteComment[]> {
  const { data, error } = await supabase
    .from("website_comments")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getPublicComments(
  limit?: number,
): Promise<WebsiteComment[]> {
  let query = supabase
    .from("website_comments")
    .select("*")
    .not("admin_reply", "is", null)
    .order("created_at", { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function getPublicCommentsWithReplies(): Promise<
  WebsiteComment[]
> {
  const { data, error } = await supabase
    .from("website_comments")
    .select("*")
    .not("admin_reply", "is", null)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function replyToComment(
  commentId: number,
  adminReply: string,
  repliedBy: string,
) {
  const { error } = await supabase
    .from("website_comments")
    .update({
      admin_reply: adminReply,
      replied_by: repliedBy,
      replied_at: new Date().toISOString(),
    })
    .eq("comment_id", commentId);

  if (error) throw error;
}
