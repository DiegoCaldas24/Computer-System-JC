CREATE TABLE IF NOT EXISTS carousel_slides (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL,
  image_url TEXT NOT NULL,
  title TEXT,
  description TEXT,
  link TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE carousel_slides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Carousel slides public read"
ON carousel_slides FOR SELECT
USING (true);

CREATE POLICY "Carousel slides admin all"
ON carousel_slides FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.rol_id = 1
  )
);
