<div align="center">

# 🍳 RecipeFinder

### **Modern Recipe Discovery App**

Search, explore, and save delicious recipes with a clean, fast, and responsive experience.

<br />

<p align="center">
  <!-- Replace the live demo URL below with your real deployed link -->
  <a href="https://YOUR-RECIPE-FINDER-DEMO-URL.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/🚀%20Live%20Demo-Open%20RecipeFinder-6366F1?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
  &nbsp;
  <a href="https://github.com/alirezafallah-dev/Practice-Projects/tree/main/recipe-finder" target="_blank">
    <img src="https://img.shields.io/badge/📂%20GitHub-View%20Project-111827?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repository" />
  </a>
  &nbsp;
  <a href="https://github.com/alirezafallah-dev/Practice-Projects/issues/new?labels=bug&title=%5BBug%5D%3A%20RecipeFinder%3A%20" target="_blank">
    <img src="https://img.shields.io/badge/🐞%20Report%20Bug-Create%20Issue-EF4444?style=for-the-badge&logo=github&logoColor=white" alt="Report Bug" />
  </a>
  &nbsp;
  <a href="https://github.com/alirezafallah-dev/Practice-Projects/issues/new?labels=enhancement&title=%5BFeature%5D%3A%20RecipeFinder%3A%20" target="_blank">
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

RecipeFinder is a responsive recipe discovery application built to help users search for recipes, explore dishes by category, view detailed cooking instructions, and save their favorite meals in one place.

It combines a modern UI, smooth interactions, recipe filtering, detailed recipe pages, and a delightful browsing experience for food lovers and home cooks.

> [!TIP]
> Explore the live demo to see RecipeFinder in action before cloning the repository.

---

## 🎬 Live Demo

<p align="center">
  <!-- Replace the live demo URL below with your real deployed link -->
  <a href="https://YOUR-RECIPE-FINDER-DEMO-URL.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/EXPLORE%20RECIPEFINDER-Launch%20Live%20Demo-6366F1?style=for-the-badge&logo=vercel&logoColor=white" alt="Launch RecipeFinder live demo" />
  </a>
</p>

> [!NOTE]
> This application is designed for easy exploration and does not require authentication by default.

---

## 🚀 Features

| Area              | Highlights                                                                 |
| ----------------- | -------------------------------------------------------------------------- |
| Recipe Search     | Search recipes by name, ingredient, or keyword                             |
| Smart Filters     | Filter recipes by category, cuisine, difficulty, or cooking time           |
| Recipe Cards      | Beautiful cards with images, summaries, ratings, and quick actions         |
| Recipe Details    | View full ingredients, step-by-step instructions, and metadata             |
| Favorites         | Save and access your favorite recipes locally                              |
| User Experience   | Responsive layout, modern UI, smooth transitions, and intuitive navigation |
| Performance       | Fast client-side rendering and optimized asset loading                     |
| Scalable Structure| Clean folder architecture for easy maintenance and future expansion        |

---

## 🧰 Tech Stack

| Category         | Technologies                                      |
| ---------------- | ------------------------------------------------- |
| Core             | React 19.2, Vite 8.3                              |
| Routing & State  | React Router DOM 7, React Context API, localStorage |
| Styling & Motion | Tailwind CSS 3.4, PostCSS, Autoprefixer, Framer Motion 11 |
| UI & Data        | Lucide React, REST API integration                |
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
cd practice-projects/recipe-finder

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Environment Variables (Optional)

If your project uses a recipe API that requires a key, create a `.env` file:

```bash
cp .env.example .env
```

Then add your API key:

```env
VITE_RECIPE_API_KEY=your_api_key_here
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

| Screen           | Image                            |
| ---------------- | -------------------------------- |
| Home Page        | `screenshots/home.png`           |
| Recipe Search    | `screenshots/search.png`         |
| Recipe Details   | `screenshots/recipe-details.png` |
| Favorites        | `screenshots/favorites.png`      |
| Mobile View      | `screenshots/mobile.png`         |

<!--
When screenshots are added, replace the table above with:

![Home Page](screenshots/home.png)
-->

---

## 📁 Project Structure

```text
recipe-finder/
 ├── public/                     # Static assets
 ├── src/
 │   ├── assets/                 # Images, icons, and local media
 │   ├── components/
 │   │   ├── Navbar.jsx          # Top navigation bar
 │   │   ├── RecipeCard.jsx      # Recipe card component
 │   │   ├── SearchBar.jsx       # Search input component
 │   │   ├── FilterPanel.jsx     # Recipe filters component
 │   │   └── EmptyState.jsx      # Empty results state
 │   ├── context/
 │   │   └── RecipeContext.jsx   # Global recipe state
 │   ├── hooks/
 │   │   ├── useRecipes.js       # Recipe fetching logic
 │   │   └── useFavorites.js     # Favorites management logic
 │   ├── pages/
 │   │   ├── HomePage.jsx        # Main recipe browsing page
 │   │   ├── RecipeDetailPage.jsx# Single recipe detail view
 │   │   └── FavoritesPage.jsx   # Saved recipes page
 │   ├── services/
 │   │   └── recipeApi.js        # API integration layer
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

RecipeFinder is primarily a frontend application. If it integrates with third-party recipe APIs, sensitive keys should never be exposed in client-side production code.

For a more production-ready setup, consider:

- Using environment variables for local development only
- Proxying API requests through a backend service
- Validating and sanitizing user input
- Avoiding storage of sensitive data in `localStorage`
- Adding rate limiting and secure headers in production deployments

> [!WARNING]
> Do not commit API keys, tokens, or secrets to the repository.

---

## 🗺️ Possible Improvements

- [ ] Backend API integration for persistent favorites
- [ ] User authentication and personalized accounts
- [ ] Shopping list generator from selected recipes
- [ ] Meal planning calendar
- [ ] Recipe ratings and reviews
- [ ] Advanced filtering by nutrition, dietary restrictions, and prep time
- [ ] Offline support and PWA features
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

If you find RecipeFinder useful, consider giving the repository a ⭐

<br />

[![GitHub](https://img.shields.io/badge/GitHub-111827?style=for-the-badge&logo=github&logoColor=white)](https://github.com/alirezafallah-dev)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-6366F1?style=for-the-badge&logo=vercel&logoColor=white)](https://YOUR-RECIPE-FINDER-DEMO-URL.vercel.app/)
[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:alirezafallah.dev@gmail.com)

</div>
