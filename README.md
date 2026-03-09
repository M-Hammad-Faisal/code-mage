# Code Mage v2 — Next.js + Supabase 🪄

> Personal brand site for **Muhammad Hammad Faisal** — rebuilt from React+Vite to **Next.js 15 + Supabase** with realtime features.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://code-mage.vercel.app)
[![Next.js 15](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Supabase](https://img.shields.io/badge/Supabase-3.x-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

---

## 👤 Author

**Muhammad Hammad Faisal**

- 💼 Software Engineer @ [Arbisoft](https://arbisoft.com)
- 📍 Lahore, Punjab, Pakistan
- 🌐 [m-hammad-faisal.github.io](https://m-hammad-faisal.github.io)
- 💌 [hammadfaisal178@gmail.com](mailto:hammadfaisal178@gmail.com)
- 🐙 [@M-Hammad-Faisal](https://github.com/M-Hammad-Faisal)
- 💼 [linkedin.com/in/m-hammad-faisal](https://linkedin.com/in/m-hammad-faisal)
- 🎥 [@code_your_magic](https://www.youtube.com/@code_your_magic)
- ❤️ [Patreon](https://www.patreon.com/cw/code_your_magic)

---

## ✨ What's New in v2

| Feature      | v1 (React+Vite)  | v2 (Next.js+Supabase) |
| ------------ | ---------------- | --------------------- |
| Rendering    | CSR only         | SSG + ISR + SSR       |
| Blog SEO     | Basic            | Full OG + metadata    |
| Newsletter   | UI only          | Supabase persistence  |
| Contact form | mailto fallback  | Supabase persistence  |
| View counts  | None             | Realtime (Supabase)   |
| Reactions    | None             | Realtime (Supabase)   |
| API security | None             | Server-side routes    |
| Routing      | React Router DOM | Next.js App Router    |

---

## 🛠️ Tech Stack

| Layer      | Tech                           |
| ---------- | ------------------------------ |
| Framework  | Next.js 15 (App Router)        |
| Language   | TypeScript 5.8                 |
| Styling    | Tailwind CSS v4                |
| Animations | Framer Motion 11               |
| Database   | Supabase (PostgreSQL)          |
| Auth       | Supabase (future)              |
| Content    | MDX via next-mdx-remote        |
| Icons      | Lucide React                   |
| Fonts      | Syne + Outfit + JetBrains Mono |
| Deployment | Vercel                         |

---

## 🚀 Getting Started

### 1. Clone & install

```bash
git clone https://github.com/M-Hammad-Faisal/code-mage.git
cd code-mage
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run `lib/supabase/migrations.sql`
3. Copy your project URL and anon key

### 3. Environment variables

```bash
cp .env.example .env.local
```

Fill in your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxxxxxx
SUPABASE_SECRET_KEY=sb_secret_xxxxxxxxxxxx
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Run dev server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
code-mage/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home
│   ├── blog/
│   │   ├── page.tsx            # Blog listing (SSG)
│   │   ├── BlogClient.tsx      # Search/filter (client)
│   │   └── [slug]/page.tsx     # Post detail + view tracking
│   ├── learn/
│   │   ├── page.tsx            # Lessons listing
│   │   └── [id]/page.tsx       # Lesson detail
│   ├── about/page.tsx          # About (static)
│   ├── contact/
│   │   ├── page.tsx            # Contact (server)
│   │   └── ContactClient.tsx   # Form (client → Supabase)
│   └── api/
│       ├── newsletter/route.ts # POST → Supabase
│       ├── contact/route.ts    # POST → Supabase
│       └── views/[slug]/route.ts # GET/POST views+reactions
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ThemeProvider.tsx
│   ├── NewsletterForm.tsx      # Client component
│   ├── ViewCounter.tsx         # Client component
│   ├── ReactionBar.tsx         # Client component
│   ├── PostCard.tsx
│   └── HeroAnimation.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Browser Supabase client
│   │   ├── server.ts           # Server + service role client
│   │   ├── types.ts            # TypeScript DB types
│   │   └── migrations.sql      # Run in Supabase SQL Editor
│   ├── mdx.ts                  # Content loader (gray-matter)
│   └── site.config.ts          # Site-wide config & author info
├── content/
│   ├── blog/                   # .mdx files
│   └── lessons/                # .md files
└── public/
    └── brand/                  # Logos, banners, profile photo
```

---

## 🗃️ Supabase Tables

| Table                    | Purpose                               |
| ------------------------ | ------------------------------------- |
| `newsletter_subscribers` | Email + source + confirmed status     |
| `contact_messages`       | Contact form submissions              |
| `blog_views`             | Per-slug view counter                 |
| `blog_reactions`         | Per-slug emoji reactions (🔥💡👏🤯❤️) |

---

## 📝 Writing Content

Add `.mdx` files to `content/blog/`:

```mdx
---
title: 'Your Post Title'
date: '2025-01-15'
category: 'Python Deep Dive'
tags: ['python', 'tutorial']
excerpt: 'Short description shown in cards'
featured: true
---

# Your content here...
```

Valid categories: `Python Deep Dive`, `Test Automation`, `Project Breakdown`, `Self Improvement`, `Finance`, `Communication`, `Career`

---

## 🔮 Roadmap

- [ ] Supabase Auth for admin dashboard (view subscribers, messages)
- [ ] RSS feed (`/feed.xml`)
- [ ] Sitemap auto-generation
- [ ] Comment system (Supabase)
- [ ] Search across all content

---

## 📄 License

MIT © 2025 [Muhammad Hammad Faisal](https://github.com/M-Hammad-Faisal)
