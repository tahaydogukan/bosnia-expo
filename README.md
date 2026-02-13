# Bosnia Healthcare & Services Expo

Modern fuar websitesi ve admin paneli - Next.js 14+ (App Router) + TypeScript + Tailwind CSS + Supabase

## Özellikler

### Public Website
- Modern landing page (Hero, Why Us, About, Blog Teaser, Footer)
- Ziyaretçi ve Katılımcı kayıt formu (modal popup)
- Otomatik bilet üretimi (QR kod + unique ticket number)
- Blog sayfaları (liste + detay + yorumlar)
- Geçmiş katılımcılar (infinite marquee)
- Mobil uyumlu, SEO optimized

### Admin Panel
- Dashboard (istatistikler + son kayıtlar)
- Invitations yönetimi (filtreleme + CSV export)
- Blog yazı yönetimi (CRUD + draft/publish)
- Yorum moderasyonu (approve/reject + admin reply)
- Supabase Auth ile korumalı

## Tech Stack

- **Frontend:** Next.js 14+ (App Router), TypeScript, Tailwind CSS
- **UI:** shadcn/ui, Framer Motion, Lucide Icons
- **Backend:** Supabase (PostgreSQL + Auth + Storage + RLS)
- **Forms:** React Hook Form + Zod
- **QR:** qrcode.react

## Kurulum

### 1. Dependencies

```bash
npm install
```

### 2. Environment Variables

`.env.local.example` dosyasını `.env.local` olarak kopyala ve doldur:

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Supabase Setup

1. [Supabase](https://supabase.com) hesabı oluştur
2. Yeni proje oluştur
3. `supabase/migrations/001_initial.sql` dosyasındaki SQL'i **SQL Editor**'de çalıştır
4. **Authentication > Users** bölümünden admin kullanıcı oluştur
5. Project URL ve API keys'i `.env.local`'a ekle

### 4. Development Server

```bash
npm run dev
```

http://localhost:3000 adresinde görüntüle.

## Proje Yapısı

```
bosnia-expo/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── blog/
│   │   ├── page.tsx          # Blog list
│   │   └── [slug]/           # Blog detail
│   ├── ticket/
│   │   └── [ticketNo]/       # Ticket view
│   ├── admin/
│   │   ├── login/            # Admin login
│   │   ├── dashboard/        # Dashboard
│   │   ├── invitations/      # Registrations
│   │   ├── blog/             # Blog management
│   │   └── comments/         # Comment moderation
│   └── api/
│       ├── invitations/      # Registration API
│       ├── blog/             # Blog API
│       └── comments/         # Comments API
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── landing/              # Landing page sections
│   ├── forms/                # Registration forms
│   ├── ticket/               # Ticket card
│   └── admin/                # Admin components
├── lib/
│   ├── supabase/             # Supabase clients
│   ├── validations.ts        # Zod schemas
│   ├── constants.ts          # App constants
│   ├── ticket.ts             # Ticket generation
│   └── utils.ts              # Utilities
├── types/
│   └── index.ts              # TypeScript types
├── public/
│   └── images/               # Static images
└── supabase/
    └── migrations/           # SQL migrations
```

## Database Schema

### invitations
- Ziyaretçi ve katılımcı kayıtları
- Unique ticket number (BHE-YYYY-XXXXXX)
- QR payload

### blog_posts
- Title, slug, excerpt, content
- Cover image URL
- Published status

### comments
- Blog yorumları
- Moderation status (pending/approved/rejected)
- Admin reply

## RLS Policies

- **invitations:** Public insert, authenticated read/update/delete
- **blog_posts:** Public read (published), authenticated CRUD
- **comments:** Public insert/read (approved), authenticated CRUD

## Deployment (Vercel)

1. GitHub'a push et
2. Vercel'de import et
3. Environment variables ekle
4. Deploy!

```bash
npm run build
```

## Özelleştirme

### Etkinlik Bilgileri
`lib/constants.ts` dosyasında `EVENT_INFO` objesini düzenle.

### Renkler
`app/globals.css` dosyasında CSS variables'ı düzenle.

### Logo/Görseller
`public/images/` klasörüne kendi görsellerini ekle.

## Lisans

MIT
