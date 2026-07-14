-- conversations table
CREATE POLICY "Users can view own conversations"
ON conversations FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all conversations"
ON conversations FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.rol_id = 1
  )
);

CREATE POLICY "Users can create conversations"
ON conversations FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update conversations"
ON conversations FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.rol_id = 1
  )
);

-- messages table
CREATE POLICY "Users can view messages in their conversations"
ON messages FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM conversations
    WHERE conversations.conversation_id = messages.conversation_id
    AND conversations.user_id = auth.uid()
  )
);

CREATE POLICY "Admins can view all messages"
ON messages FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.rol_id = 1
  )
);

CREATE POLICY "Users can send messages to their conversations"
ON messages FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM conversations
    WHERE conversations.conversation_id = messages.conversation_id
    AND conversations.user_id = auth.uid()
  )
);

CREATE POLICY "Admins can send messages to any conversation"
ON messages FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.rol_id = 1
  )
);
