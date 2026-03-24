# Code Mage

Personal brand site for **Muhammad Hammad Faisal** — Test Automation Engineer at Arbisoft.

Live site: [code-mage.dev](https://code-mage.dev)

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://code-mage.dev)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

---

## Tech Stack

| Layer      | Tech                               |
| ---------- | ---------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack) |
| Language   | TypeScript 5.9                     |
| Styling    | Tailwind CSS v4                    |
| Animations | Framer Motion 12                   |
| Database   | Supabase (PostgreSQL)              |
| Content    | MDX via next-mdx-remote            |
| Icons      | Lucide React                       |
| Deployment | Vercel                             |

---

## Getting Started

### 1. Clone & install

```bash
git clone https://github.com/M-Hammad-Faisal/code-mage.git
cd code-mage
npm install
```

### 2. Environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxxxxxx
SUPABASE_SECRET_KEY=sb_secret_xxxxxxxxxxxx
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Run dev server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
code-mage/
├── app/
│   ├── layout.tsx              # Root layout with Navbar + Footer
│   ├── page.tsx                # Homepage
│   ├── about/page.tsx          # About page
│   ├── blog/
│   │   ├── page.tsx            # Blog listing (SSG)
│   │   ├── BlogClient.tsx      # Search + filter (client)
│   │   └── [slug]/page.tsx     # Post detail + view tracking
│   ├── tutorial/
│   │   └── [framework]/        # Framework tutorial pages
│   ├── learn/                  # Lessons (hidden from nav)
│   ├── contact/
│   │   ├── page.tsx
│   │   └── ContactClient.tsx   # Contact form → Supabase
│   ├── api/
│   │   ├── contact/route.ts
│   │   ├── newsletter/route.ts
│   │   └── views/[slug]/route.ts
│   ├── sitemap.ts              # Auto-generated sitemap
│   └── robots.ts               # robots.txt
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── BackToTop.tsx
│   ├── NewsletterForm.tsx
│   ├── ReactionBar.tsx
│   └── ViewCounter.tsx
├── content/
│   ├── blog/                   # .mdx blog posts
│   ├── lessons/                # .md lesson files (6 lessons)
│   └── tutorials/              # .mdx tutorial chapters
│       ├── prerequisites/      # 4 chapters
│       ├── playwright/         # 8 chapters
│       ├── webdriverio/        # 8 chapters
│       └── cypress/            # 8 chapters
├── lib/
│   ├── site.config.ts          # Site-wide config, nav links, author info
│   ├── mdx.ts                  # Blog content loader
│   ├── tutorials.ts            # Tutorial content loader
│   └── supabase/               # Supabase clients + types
└── public/
    ├── brand/                  # Logos, favicons, profile photo
    └── downloads/              # Downloadable spec files for tutorials
```

---

## Supabase Tables

| Table                    | Purpose                               |
| ------------------------ | ------------------------------------- |
| `newsletter_subscribers` | Email + source + confirmed status     |
| `contact_messages`       | Contact form submissions              |
| `blog_views`             | Per-slug view counter                 |
| `blog_reactions`         | Per-slug emoji reactions (🔥💡👏🤯❤️) |

---

## Adding Blog Content

Add `.mdx` files to `content/blog/`:

```mdx
---
title: 'Your Post Title'
date: '2026-01-15'
category: 'Test Automation'
tags: ['playwright', 'tutorial']
excerpt: 'Short description shown in cards'
featured: true
---

# Your content here...
```

Valid categories: `Python Deep Dive`, `Test Automation`, `Project Breakdown`, `AI in QA`, `Career`

---

## Scripts

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm run lint         # ESLint
npm run lint:fix     # ESLint with auto-fix
npm run format       # Prettier
npm run type-check   # TypeScript type check
```

---

## License

MIT © 2026 [Muhammad Hammad Faisal](https://github.com/M-Hammad-Faisal)
