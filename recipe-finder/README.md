# 🍽️ Recipe Finder — Neo-Culinary Hearth

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**A modern recipe discovery platform with a warm, editorial kitchen aesthetic — built with Next.js 16 App Router, TypeScript, and a fully custom Neo-Culinary design system.**

🔗 **[Live Demo](https://practice-projects-recipe-finder.vercel.app/)** • 📂 **[Source Code](https://github.com/alirezafallah-dev/Practice-Projects/tree/main/recipe-finder)**

</div>

---

## ✨ Overview

Recipe Finder is a full-stack web application that helps home cooks discover new meals based on the ingredients they already have. Built as a practice project to explore modern React patterns, it features **Server Components for API security**, a **centralized Favorites system**, and a **custom design system** inspired by warm kitchen aesthetics.

The application integrates with the **Spoonacular API** to provide real-time recipe data, featuring a polished editorial UI with Bricolage Grotesque typography, terracotta/rosemary color palette, and tactile pill-shaped interactions.

---

## 🚀 Key Features

### 🔍 Discovery & Search
- **Smart Ingredient Search** — Find recipes based on what's in your pantry
- **Multi-filter Querying** — Filter by diet (vegetarian, vegan, gluten-free), meal type, and sort order
- **URL-Driven State** — Shareable search URLs with encoded filters
- **Popular & Trending** — Curated quick searches and weekly trending recipes

### ❤️ Personalization
- **Favorites System** — Save recipes to LocalStorage with cross-tab sync via `storage` events
- **Centralized `FavoriteButton`** — One polymorphic component (`icon` / `floating` / `labeled`) used across 4 views
- **Dark Mode** — System-aware theme toggle via `next-themes`

### 📖 Recipe Details
- **Rich Metadata** — Cook time, servings, health score, spoonacular score, calories
- **Interactive Step Timeline** — Numbered preparation steps with optional per-step **countdown timers**
- **Pantry Checklist** — Ingredient list with metric/US unit toggling
- **Sommelier Pairings** — Smart wine pairing suggestions based on recipe keywords
- **Dietary Badges** — Vegetarian, vegan, gluten-free, dairy-free tags

### 🎨 Design System — Neo-Culinary Hearth
- **Warm Palette**: Terracotta (`#E05A1B`), Rosemary (`#2D5A3F`), Apricot (`#F4A261`), Espresso (`#2B2623`)
- **Typography**: Bricolage Grotesque (display) + DM Sans (body) — locally hosted for build reliability
- **Tactile Shapes**: Pill buttons, 2rem rounded cards, warm glow shadows (`rgba(224, 90, 27, 0.12)`)
- **Unified Iconography**: All 40+ icons sourced from **Lucide React** for visual consistency

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript 5 |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS 3 |
| **Icons** | Lucide React |
| **Theme** | next-themes |
| **API** | Spoonacular (server-only, no client exposure) |
| **Fonts** | Local woff2 (Bricolage Grotesque, DM Sans) |
| **Deployment** | Vercel |

---

## 🏗️ Architecture Highlights

```
recipe-finder/
├── app/                    # App Router pages (Server Components)
│   ├── layout.tsx         # Root layout + Providers
│   ├── page.tsx           # Home (Hero + 5 sections)
│   ├── search/page.tsx    # Async search with URL params
│   ├── favorites/page.tsx # Client-only favorites
│   └── recipe/[id]/       # Dynamic detail page + SEO
├── components/
│   ├── home/              # Hero + sections
│   ├── recipes/           # Cards, grid, pagination, FavoriteButton
│   ├── recipe/            # Detail actions, pantry checklist
│   └── ui/                # Icons, states (EmptyState, ErrorState)
├── context/
│   └── favorites-context.tsx   # Global favorites state + LocalStorage
├── lib/
│   ├── spoonacular.ts     # Server-only API layer (ISR cached)
│   ├── search-utils.ts    # Query normalization
│   └── utils.ts           # cn(), truncate(), formatMinutes()
└── types/index.ts         # Shared TypeScript contracts
```

### 🔐 Security Pattern
The Spoonacular API key lives **only on the server**. `lib/spoonacular.ts` is never imported by client components, ensuring the key is never exposed in the browser bundle.

### 🧩 Centralized Favorite Button
A single `FavoriteButton` component with three variants (`icon`, `floating`, `labeled`) is consumed across Trending cards, Recipe cards, Detail page, and Favorites list — making future changes a single-file edit.

---

## 📸 Screenshots

| Homepage | Search Results | Recipe Detail |
|----------|----------------|---------------|
| ![Home](./screenshots/home.png) | ![Search](./screenshots/search.png) | ![Detail](./screenshots/detail.png) |

| Favorites | Dark Mode | Mobile |
|-----------|-----------|--------|
| ![Favorites](./screenshots/favorites.png) | ![Dark](./screenshots/dark.png) | ![Mobile](./screenshots/mobile.png) |

> 💡 *Screenshots coming soon — visit the [Live Demo](https://practice-projects-recipe-finder.vercel.app/) for the full experience.*

---

## ⚙️ Getting Started

### Prerequisites
- **Node.js** 18+ (recommended: 20+)
- **npm** or **yarn**
- **Git**
- **Spoonacular API Key** — [Get one free](https://spoonacular.com/food-api) (150 requests/day)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/alirezafallah-dev/Practice-Projects.git

# 2. Navigate to the project
cd Practice-Projects/recipe-finder

# 3. Install dependencies
npm install

# 4. Set up environment variables
cp .env.local.example .env.local
```

Open `.env.local` and add your Spoonacular API key:

```env
SPOONACULAR_API_KEY=your_api_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

```bash
# 5. Start the development server
npm run dev
```

Visit **http://localhost:3000** 🎉

---

## 🌐 Deployment

Deployed on **Vercel** with automatic GitHub integration.

### Environment Variables on Vercel
1. Go to **Project Settings → Environment Variables**
2. Add `SPOONACULAR_API_KEY` with your key
3. Set **Root Directory** to `recipe-finder`
4. Deploy

### Local Production Build

```bash
npm run build
npm start
```

---

## 🎯 Project Goals

This project was built as a frontend practice exercise to master:

- ✅ **Next.js App Router** — Server vs Client components, `generateMetadata`, dynamic routes
- ✅ **TypeScript contracts** — Shared types, defensive API mapping
- ✅ **Modern CSS** — Tailwind design tokens, custom color palettes, warm shadows
- ✅ **State management** — Context API + LocalStorage + cross-tab sync
- ✅ **SEO** — Dynamic metadata, OpenGraph, semantic HTML
- ✅ **API integration** — Server-only fetch, ISR caching, graceful error handling
- ✅ **UX patterns** — Skeleton loaders, empty states, error boundaries, hydration-safe theming

---

## 🔧 Key Technical Decisions

| Decision | Reason |
|----------|--------|
| **Local fonts** over `next/font/google` | Avoids Turbopack build failures when Google Fonts is unreachable |
| **`unoptimized: true` for images** | Bypasses SSRF protection issues with private DNS resolution |
| **Server-only API layer** | Keeps API key secure; never shipped to the client |
| **`suppressHydrationWarning` on body** | Handles browser extension attributes (e.g., `cz-shortcut-listen`) |
| **`data-scroll-behavior="smooth"` on html** | Official Next.js 16 requirement for smooth scroll control |
| **Centralized FavoriteButton** | Single source of truth for the most-used interaction |

---

## 👨‍💻 Author

**Alireza Fallah** — Frontend Developer

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/alirezafallah-dev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/alirezafallah-dev/)
[![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://practice-projects-recipe-finder.vercel.app/)

---

<div align="center">

**⭐ If this project helped you, consider giving the repository a star!**

*Built with ❤️ and 🍅 — A love letter to home cooking.*

</div>