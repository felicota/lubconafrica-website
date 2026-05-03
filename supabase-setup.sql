-- ============================================================
-- LUBCON Africa Blog — Supabase Setup
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- 1. Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug         TEXT UNIQUE NOT NULL,
  title        TEXT NOT NULL,
  excerpt      TEXT DEFAULT '',
  content      TEXT DEFAULT '',
  cover_image  TEXT,
  category     TEXT DEFAULT 'General',
  tags         TEXT[] DEFAULT '{}',
  author       TEXT DEFAULT 'LUBCON Africa Team',
  author_image TEXT,
  published    BOOLEAN DEFAULT FALSE,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 3. Public can read published posts only
CREATE POLICY "Public read published posts"
  ON posts FOR SELECT
  USING (published = true);

-- 4. Authenticated admin can do everything
CREATE POLICY "Admin full access"
  ON posts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 5. Auto-update updated_at on every edit
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- STORAGE: Create the lubcon-blog-images bucket
-- Do this in Supabase Dashboard → Storage → New Bucket:
--   Name: lubcon-blog-images
--   Public bucket: YES
-- Then add these policies in Storage → lubcon-blog-images → Policies:
-- ============================================================

-- Allow public to read images
CREATE POLICY "Public read blog images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'lubcon-blog-images');

-- Allow authenticated admin to upload images
CREATE POLICY "Admin upload blog images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'lubcon-blog-images');

-- Allow authenticated admin to delete images
CREATE POLICY "Admin delete blog images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'lubcon-blog-images');

-- ============================================================
-- ADMIN USER: Create in Supabase Dashboard → Authentication → Users
--   Email:    (your admin email)
--   Password: (your admin password)
-- ============================================================
