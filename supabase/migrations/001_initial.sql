-- ============================================
-- BOSNIA HEALTHCARE EXPO - DATABASE SCHEMA
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- INVITATIONS TABLE
-- ============================================
CREATE TABLE invitations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type VARCHAR(20) NOT NULL CHECK (type IN ('visitor', 'exhibitor')),

    -- Visitor fields
    full_name TEXT,

    -- Exhibitor fields
    company_name TEXT,
    contact_name TEXT,
    website TEXT,
    service_area TEXT,
    participation_intent TEXT,

    -- Common fields
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    country TEXT NOT NULL,
    city TEXT NOT NULL,
    interest_area TEXT,

    -- Ticket info
    ticket_no TEXT NOT NULL UNIQUE,
    qr_payload TEXT NOT NULL,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_invitations_type ON invitations(type);
CREATE INDEX idx_invitations_email ON invitations(email);
CREATE INDEX idx_invitations_ticket_no ON invitations(ticket_no);
CREATE INDEX idx_invitations_created_at ON invitations(created_at DESC);

-- ============================================
-- BLOG POSTS TABLE
-- ============================================
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image_url TEXT,
    published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_created_at ON blog_posts(created_at DESC);

-- ============================================
-- COMMENTS TABLE
-- ============================================
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    content TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    admin_reply TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_status ON comments(status);
CREATE INDEX idx_comments_created_at ON comments(created_at DESC);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- ============================================
-- INVITATIONS POLICIES
-- ============================================

-- Allow anyone to INSERT (for registration forms)
CREATE POLICY "Allow public insert for invitations" ON invitations
    FOR INSERT
    WITH CHECK (true);

-- Only authenticated users can SELECT (admin viewing)
CREATE POLICY "Allow authenticated read for invitations" ON invitations
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- Only authenticated users can UPDATE
CREATE POLICY "Allow authenticated update for invitations" ON invitations
    FOR UPDATE
    USING (auth.role() = 'authenticated');

-- Only authenticated users can DELETE
CREATE POLICY "Allow authenticated delete for invitations" ON invitations
    FOR DELETE
    USING (auth.role() = 'authenticated');

-- ============================================
-- BLOG POSTS POLICIES
-- ============================================

-- Anyone can read published posts
CREATE POLICY "Allow public read for published blog posts" ON blog_posts
    FOR SELECT
    USING (published = true OR auth.role() = 'authenticated');

-- Only authenticated users can INSERT
CREATE POLICY "Allow authenticated insert for blog posts" ON blog_posts
    FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

-- Only authenticated users can UPDATE
CREATE POLICY "Allow authenticated update for blog posts" ON blog_posts
    FOR UPDATE
    USING (auth.role() = 'authenticated');

-- Only authenticated users can DELETE
CREATE POLICY "Allow authenticated delete for blog posts" ON blog_posts
    FOR DELETE
    USING (auth.role() = 'authenticated');

-- ============================================
-- COMMENTS POLICIES
-- ============================================

-- Anyone can INSERT (for comment forms)
CREATE POLICY "Allow public insert for comments" ON comments
    FOR INSERT
    WITH CHECK (true);

-- Anyone can read approved comments, authenticated users can read all
CREATE POLICY "Allow public read for approved comments" ON comments
    FOR SELECT
    USING (status = 'approved' OR auth.role() = 'authenticated');

-- Only authenticated users can UPDATE
CREATE POLICY "Allow authenticated update for comments" ON comments
    FOR UPDATE
    USING (auth.role() = 'authenticated');

-- Only authenticated users can DELETE
CREATE POLICY "Allow authenticated delete for comments" ON comments
    FOR DELETE
    USING (auth.role() = 'authenticated');

-- ============================================
-- STORAGE BUCKET (run in Supabase Dashboard)
-- ============================================
-- Note: Run this in Supabase SQL Editor or Dashboard:
--
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('expo-assets', 'expo-assets', true);
--
-- CREATE POLICY "Allow public read access" ON storage.objects
--     FOR SELECT USING (bucket_id = 'expo-assets');
--
-- CREATE POLICY "Allow authenticated upload" ON storage.objects
--     FOR INSERT WITH CHECK (
--         bucket_id = 'expo-assets'
--         AND auth.role() = 'authenticated'
--     );

-- ============================================
-- SEED DATA (Optional - Demo Blog Post)
-- ============================================
INSERT INTO blog_posts (title, slug, excerpt, content, published) VALUES
(
    'Welcome to Bosnia Healthcare Expo 2025',
    'welcome-bosnia-healthcare-expo-2025',
    'We are thrilled to announce the 4th edition of Bosnia Healthcare & Services Expo, the premier healthcare and medical tourism exhibition in the Balkans.',
    '# Welcome to Bosnia Healthcare Expo 2025

We are thrilled to announce the **4th edition** of Bosnia Healthcare & Services Expo, the premier healthcare and medical tourism exhibition in the Balkans.

## What to Expect

This year''s expo promises to be bigger and better than ever, featuring:

- **100+ Exhibitors** from leading healthcare institutions
- **Expert Panels** with industry thought leaders
- **B2B Matchmaking** sessions for meaningful connections
- **Live Demonstrations** of cutting-edge medical technologies

## Why Bosnia?

Bosnia and Herzegovina has emerged as a premier destination for medical tourism, offering:

- EU-standard healthcare at competitive prices
- World-class dental and aesthetic surgery clinics
- Natural thermal springs and wellness resorts
- Strategic location in the heart of Europe

## Join Us

Whether you''re a healthcare provider looking to expand your reach, or a visitor exploring medical tourism options, Bosnia Healthcare Expo 2025 is the place to be.

**Register today** and be part of the future of healthcare in the Balkans!',
    true
),
(
    'Top 5 Medical Tourism Trends in 2025',
    'top-5-medical-tourism-trends-2025',
    'Discover the latest trends shaping the medical tourism industry in 2025, from AI-powered diagnostics to wellness retreats.',
    '# Top 5 Medical Tourism Trends in 2025

The medical tourism industry continues to evolve rapidly. Here are the top trends we''re seeing this year:

## 1. AI-Powered Diagnostics

Artificial intelligence is revolutionizing how patients are diagnosed and treated. Many facilities now offer AI-assisted imaging and predictive analytics.

## 2. Wellness Integration

Medical tourism is no longer just about treatments. Patients increasingly seek holistic experiences that combine medical procedures with wellness retreats.

## 3. Telemedicine Pre-Consultations

Virtual consultations before travel have become standard, allowing patients to connect with their doctors and plan their treatments in advance.

## 4. Dental Tourism Growth

Dental procedures remain one of the fastest-growing segments, with countries like Bosnia offering significant cost savings without compromising quality.

## 5. Transparency & Reviews

Patients now have access to more information than ever, with verified reviews and transparent pricing becoming essential for healthcare providers.

## Conclusion

The future of medical tourism is bright, and Bosnia is well-positioned to capitalize on these trends. Join us at the expo to learn more!',
    true
),
(
    'Exhibitor Spotlight: Success Stories from 2024',
    'exhibitor-spotlight-success-stories-2024',
    'Read about the remarkable success stories from our 2024 exhibitors and how the expo helped them grow their businesses.',
    '# Exhibitor Spotlight: Success Stories from 2024

Last year''s Bosnia Healthcare Expo was a tremendous success. Here are some of the remarkable stories from our exhibitors:

## Dental Excellence Clinic

*"We connected with over 50 potential partners at the expo. Within six months, we had established referral agreements with agencies in 5 countries."*

— Dr. Mehmed Kovacevic, Dental Excellence

## Thermal Spa Resort Ilidza

*"The B2B matchmaking sessions were invaluable. We now have a steady stream of international guests coming for wellness packages."*

— Amina Hadzic, Marketing Director

## MedTech Solutions

*"As a technology provider, the expo gave us direct access to decision-makers in hospitals and clinics. We closed three major deals."*

— Ivan Petrovic, CEO

## Your Story Could Be Next

Join us in 2025 and write your own success story. [Register as an exhibitor](#) today!',
    true
);

-- ============================================
-- CREATE ADMIN USER (Run manually)
-- ============================================
-- Note: Create an admin user via Supabase Dashboard > Authentication > Users
-- Or use the Auth API to create a user with email/password
