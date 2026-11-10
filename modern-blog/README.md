<div align="center">

# 📝 ModernBlog

### **Clean, Fast & Responsive Blog Platform**

Read articles, explore categories, search content, and enjoy a smooth reading experience with a modern interface.

<br />

<p align="center">
  <a href="https://practice-projects-arf16.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/🚀%20Live%20Demo-Open%20ModernBlog-6366F1?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
  &nbsp;
  <a href="https://github.com/alirezafallah-dev/Practice-Projects/tree/main/modern-blog" target="_blank">
    <img src="https://img.shields.io/badge/📂%20GitHub-View%20Project-111827?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repository" />
  </a>
  &nbsp;
  <a href="https://github.com/alirezafallah-dev/Practice-Projects/issues/new?labels=bug&title=%5BBug%5D%3A%20ModernBlog%3A%20" target="_blank">
    <img src="https://img.shields.io/badge/🐞%20Report%20Bug-Create%20Issue-EF4444?style=for-the-badge&logo=github&logoColor=white" alt="Report Bug" />
  </a>
  &nbsp;
  <a href="https://github.com/alirezafallah-dev/Practice-Projects/issues/new?labels=enhancement&title=%5BFeature%5D%3A%20ModernBlog%3A%20" target="_blank">
    <img src="https://img.shields.io/badge/💡%20Request%20Feature-Suggest%20Idea-10B981?style=for-the-badge&logo=github&logoColor=white" alt="Request Feature" />
  </a>
</p>

<br />

![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=20232A)
![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-16A34A?style=flat-square)

</div>

---

## ✨ Overview

ModernBlog is a responsive blog platform built to provide a clean and enjoyable reading experience.

It helps users browse articles, explore categories, search for content, and read detailed blog posts through a modern interface with smooth interactions and mobile-friendly design.

The project focuses on simplicity, performance, readability, and a scalable frontend architecture.

> [!TIP]
> Explore the live demo to see ModernBlog in action before cloning the repository.

---

## 🎬 Live Demo

<p align="center">
  <a href="https://practice-projects-arf16.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/EXPLORE%20MODERNBLOG-Launch%20Live%20Demo-6366F1?style=for-the-badge&logo=vercel&logoColor=white" alt="Launch ModernBlog live demo" />
  </a>
</p>

> [!NOTE]
> This application is designed for easy exploration and does not require authentication by default.

---

## 🚀 Features

| Area              | Highlights                                                                 |
| ----------------- | -------------------------------------------------------------------------- |
| Article Feed      | Browse latest blog posts with title, excerpt, cover image, and metadata    |
| Article Details   | Read full articles with structured content, author info, and publish date  |
| Categories        | Explore posts by topic or category for better content organization         |
| Search            | Find articles quickly using keywords or title-based search                 |
| Responsive Design | Fully adapted layout for desktop, tablet, and mobile devices               |
| Modern UI         | Clean typography, card-based layout, and visually pleasing interface       |
| Smooth UX         | Easy navigation, readable content blocks, and intuitive browsing flow      |
| Scalable Structure| Organized components, pages, and utilities for future growth               |

---

## 🧰 Tech Stack

| Category         | Technologies                                      |
| ---------------- | ------------------------------------------------- |
| Core             | React 19.2, Vite 8.3                              |
| Routing & State  | React Router DOM 7, React Context API             |
| Styling & Motion | Tailwind CSS 3.4, PostCSS, Autoprefixer, Framer Motion 11 |
| UI & Data        | Lucide React, date-fns, static/local content      |
| Code Quality     | ESLint                                            |

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js `18+`
- npm `9+`
- Git

Check your installed versions:

```bash
node --version
npm --version
git --version
```

### Installation

```bash
# Clone the repository
git clone https://github.com/alirezafallah-dev/practice-projects.git

# Move into the project directory
cd practice-projects/modern-blog

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Environment Variables (Optional)

If your project fetches blog data from an external API or CMS, create a `.env` file:

```bash
cp .env.example .env
```

Then add your required variables:

```env
VITE_BLOG_API_URL=your_api_url_here
VITE_BLOG_API_KEY=your_api_key_if_needed
```

> [!IMPORTANT]
> Never commit real API keys or secrets directly into the repository.

---

## 📜 Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the development server         |
| `npm run build`   | Create a production build            |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint                           |

---

## 🖼️ Screenshots

Add application screenshots to a `screenshots/` directory and update the image paths below when they are available.

| Screen            | Image                             |
| ----------------- | --------------------------------- |
| Home Page         | `screenshots/home.png`            |
| Article List      | `screenshots/articles.png`        |
| Article Details   | `screenshots/article-detail.png`  |
| Category Page     | `screenshots/category.png`        |
| Search Results    | `screenshots/search.png`          |
| Mobile View       | `screenshots/mobile.png`          |

<!--
When screenshots are added, replace the table above with:

![Home Page](screenshots/home.png)
-->

---

## 📁 Project Structure

```text
modern-blog/
 ├── public/                     # Static assets
 ├── src/
 │   ├── assets/                 # Images, icons, and local media
 │   ├── components/
 │   │   ├── Navbar.jsx          # Top navigation bar
 │   │   ├── Footer.jsx          # Site footer
 │   │   ├── ArticleCard.jsx     # Article preview card
 │   │   ├── SearchBar.jsx       # Search input component
 │   │   ├── CategoryList.jsx    # Category navigation
 │   │   └── EmptyState.jsx      # Empty results state
 │   ├── context/
 │   │   ├── BlogContext.jsx     # Global blog state
 │   │   └── ThemeContext.jsx    # Theme management state
 │   ├── hooks/
 │   │   ├── useArticles.js      # Article fetching logic
 │   │   └── useCategories.js    # Category filtering logic
 │   ├── pages/
 │   │   ├── HomePage.jsx        # Landing page
 │   │   ├── ArticlesPage.jsx    # All articles page
 │   │   ├── ArticleDetailPage.jsx
 │   │   ├── CategoryPage.jsx    # Posts by category
 │   │   └── AboutPage.jsx       # About page
 │   ├── services/
 │   │   └── blogApi.js          # API integration layer
 │   ├── utils/
 │   │   └── helpers.js          # Utility functions
 │   ├── App.jsx                 # Root application component
 │   ├── main.jsx                # Application entry point
 │   └── index.css               # Global styles
 ├── .env.example                # Example environment variables
 ├── .gitignore
 ├── index.html
 ├── package.json
 ├── postcss.config.js
 ├── tailwind.config.js
 ├── vite.config.js
 └── README.md
```

---

## 🔐 Security

ModernBlog is primarily a frontend blog application. If it integrates with a CMS, external API, or admin functionality, sensitive credentials should never be exposed in client-side production code.

For a more production-ready setup, consider:

- Using environment variables for local development only
- Proxying private API requests through a backend service
- Validating and sanitizing user-generated content
- Avoiding storage of sensitive data in `localStorage`
- Adding secure headers and rate limiting in production deployments
- Implementing authentication and authorization if an admin panel is added

> [!WARNING]
> Do not commit API keys, tokens, or secrets to the repository.

---

## 🗺️ Possible Improvements

- [ ] CMS or headless API integration
- [ ] User authentication and admin dashboard
- [ ] Comments and reactions
- [ ] Bookmark or saved articles feature
- [ ] RSS feed support
- [ ] Advanced SEO optimization
- [ ] Pagination and infinite scroll
- [ ] Dark/light theme toggle
- [ ] Author profiles and multi-author support
- [ ] Markdown or rich text editor for publishing articles
- [ ] Multi-language support

---

## 🤝 Contributing

Contributions and suggestions are welcome.

1. Fork the repository.

2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature
   ```

3. Make your changes and commit them:

   ```bash
   git commit -m "Add your feature"
   ```

4. Push your branch:

   ```bash
   git push origin feature/your-feature
   ```

5. Open a Pull Request.

---

## 📄 License

This project is available under the [MIT License](LICENSE).

---

## 👤 Author

**Alireza Fallah**

- GitHub: [@alirezafallah-dev](https://github.com/alirezafallah-dev)
- Email: [alirezafallah.dev@gmail.com](mailto:alirezafallah.dev@gmail.com)

---

<div align="center">

Built with ❤️ by **Alireza Fallah**

If you find ModernBlog useful, consider giving the repository a ⭐

<br />

[![GitHub](https://img.shields.io/badge/GitHub-111827?style=for-the-badge&logo=github&logoColor=white)](https://github.com/alirezafallah-dev)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-6366F1?style=for-the-badge&logo=vercel&logoColor=white)](https://practice-projects-arf16.vercel.app/)
[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:alirezafallah.dev@gmail.com)

</div>
