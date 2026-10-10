# 🚀 Modern Blog

A modern, responsive blog built with **Next.js 16**, **TypeScript**, and **Tailwind CSS v4**.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

## ✨ Features

- 🎨 **Modern Design** — Clean, minimal UI with beautiful gradients.
- 📱 **Fully Responsive** — Optimized for mobile, tablet, and desktop.
- ⚡ **Fast Performance** — Built with the Next.js App Router.
- 🖼️ **Dynamic Images** — Unique images for each blog post.
- ✨ **Smooth Animations** — Fade-in effects and interactive hover transitions.
- 🔒 **Type Safety** — Written in TypeScript for better reliability.
- 🎯 **SEO Friendly** — Semantic HTML and metadata configuration.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) | React framework |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS v4](https://tailwindcss.com/) | Styling |
| [Lucide React](https://lucide.dev/) | Icons |
| Inter | Typography |
| [JSONPlaceholder](https://jsonplaceholder.typicode.com/) | Mock REST API |
| [Picsum Photos](https://picsum.photos/) | Placeholder images |

## 📸 Screenshots

Add screenshots of your project here to showcase its design and features.

<!--
![Home Page](./screenshots/home.png)
![Post Details](./screenshots/post-details.png)
-->

## 📦 Getting Started

Follow these steps to run the project locally.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (a version compatible with Next.js 16)
- npm

### Installation

**1. Clone the repository**

Replace `YOUR_USERNAME` with your GitHub username.

```bash
git clone https://github.com/YOUR_USERNAME/modern-blog.git
```

**2. Navigate to the project directory**

```bash
cd modern-blog
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

**5. Open the application**

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```text
modern-blog/
├── app/
│   ├── components/
│   │   ├── Header.tsx       # Navigation header
│   │   ├── Footer.tsx       # Footer with newsletter
│   │   └── PostCard.tsx     # Blog post card component
│   ├── posts/
│   │   └── [id]/
│   │       └── page.tsx     # Individual post page
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   ├── page.tsx              # Home page
│   └── types.ts              # TypeScript types
├── next.config.ts            # Next.js configuration
├── postcss.config.mjs        # PostCSS configuration
├── tsconfig.json             # TypeScript configuration
├── .gitignore                # Git ignore rules
└── README.md                 # Project documentation
```

## 🔌 API

This project uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/) as a mock REST API.

### Available Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/posts` | Fetch blog posts (the first 5 are displayed) |
| `GET` | `/posts/:id` | Fetch details for an individual post |

**Base URL:**

```text
https://jsonplaceholder.typicode.com
```

These endpoints return sample data and do not require authentication.

## 🎨 Customization

### Change the Theme Colors

Edit `app/globals.css` to customize the primary colors used throughout the application.

For example, with Tailwind CSS v4:

```css
@theme {
  --color-primary-500: #6366f1;
  --color-primary-600: #4f46e5;
}
```

### Add More Pages

Create new files and folders inside the `app/` directory, following the Next.js App Router conventions.

For example:

```text
app/
└── about/
    └── page.tsx
```

This creates an `/about` route.

## 🚀 Deployment

You can deploy the project on [Vercel](https://vercel.com/), the platform built by the creators of Next.js.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/modern-blog)

Replace `YOUR_USERNAME` with your GitHub username and make sure the repository URL is correct before using the deployment link.

## 📄 License

This project is licensed under the MIT License. You are free to use, modify, and distribute it in accordance with the license terms.

## 🤝 Contributing

Contributions, suggestions, and bug reports are welcome!

Feel free to open an issue or submit a pull request.

## 👨‍💻 Author

Built with ❤️ as a learning project to explore Next.js, TypeScript, and Tailwind CSS.

---

⭐ If you find this project useful, consider giving it a star!

**Happy Coding! 🚀**