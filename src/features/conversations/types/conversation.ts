export type Conversation = {
  conversation_id: string;
  user_id: string;
  subject: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type Message = {
  message_id: string;
  conversation_id: string;
  sender_id: string;
  message: string;
  created_at: string;
};
