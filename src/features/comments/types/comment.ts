export type WebsiteComment = {
  comment_id: number;
  user_id: string;
  subject: string;
  comment: string;
  admin_reply: string | null;
  replied_by: string | null;
  replied_at: string | null;
  status?: string;
  type: string;
  created_at: string;
};
