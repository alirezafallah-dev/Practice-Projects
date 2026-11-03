# 🚀 Practice Projects

### A Collection of Modern Frontend Applications, Experiments & Learning Projects

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3%20%2F%204-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat)](LICENSE)

---

## 📖 About

Welcome to **Practice Projects** — a growing collection of web applications, frontend experiments, and practical development projects.

This repository serves as my personal development playground, where I explore modern frontend technologies, build functional applications, experiment with different architectures, and continuously improve my development skills.

Rather than focusing only on isolated coding exercises, I use practical projects to turn concepts into working applications.

Each project is maintained in its own directory and may have its own architecture, dependencies, documentation, and development workflow.

### 🎯 Repository Goals

- Build practical applications using modern frontend technologies.
- Improve React and Next.js development skills.
- Explore state management and component architecture.
- Develop responsive and accessible user interfaces.
- Practice working with APIs and external data.
- Experiment with modern UI/UX patterns and animations.
- Improve code organization, maintainability, and development workflows.

---

## 📂 Projects

The repository currently contains four independent projects.

### 01. 💰 Expense Tracker Panel

**A modern expense tracking and financial dashboard application.**

A frontend application focused on managing financial records and presenting structured financial data through an interactive dashboard.

**Technologies:**
- React 19
- TypeScript
- Redux Toolkit
- React Redux
- Material UI (MUI)
- Recharts
- React Router
- PapaParse
- Vite
- Tailwind CSS

**Key Technical Areas:**
- Centralized state management with Redux Toolkit.
- Data visualization with Recharts.
- Component-based application architecture.
- Financial data handling.
- CSV data processing.
- Client-side navigation.

📁 [View Source Code](./expense-tracker-panel)

📖 [Project Documentation](./expense-tracker-panel/README.md)

---

### 02. ✍️ Modern Blog

**A modern, responsive blogging application built with Next.js.**

A clean and minimal blog experience featuring dynamic blog content, individual post pages, responsive layouts, and smooth interface interactions.

**Technologies:**
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Lucide React
- JSONPlaceholder API
- Picsum Photos

**Key Features:**
- Modern and minimal interface.
- Fully responsive layouts.
- Dynamic blog post content.
- Individual post detail pages.
- External REST API integration.
- Smooth animations and transitions.
- SEO-friendly metadata.
- Type-safe development with TypeScript.

**Architecture:**

Built using the Next.js App Router with reusable components and dynamic routing.

📁 [View Source Code](./modern-blog)

📖 [Project Documentation](./modern-blog/README.md)

---

### 03. 🍳 Recipe Finder

**A recipe discovery application.**

A dedicated project focused on exploring recipe discovery experiences and building a practical food-related web application.

This project is part of my hands-on frontend development practice.

📁 [View Source Code](./recipe-finder)

📖 [Project Documentation](./recipe-finder/README.md)

---

### 04. 🚀 TaskFlow — Team Task Manager

**A modern team task management and project organization application.**

TaskFlow is a feature-rich project management application designed to help teams organize projects, manage tasks, monitor progress, and improve collaboration.

**Live Demo:** [Open TaskFlow](https://taskflow-81ik6obrm-arf16.vercel.app)

**Technologies:**
- React 19
- Vite
- React Router DOM
- Tailwind CSS 3
- Framer Motion
- Recharts
- Lucide React
- date-fns
- Context API

**Key Features:**

**📊 Dashboard & Analytics**
- Interactive charts and statistics.
- Task distribution overview.
- Team performance metrics.
- Project progress tracking.
- Urgent task monitoring.

**📋 Task Management**
- Interactive Kanban board.
- Native HTML5 drag-and-drop.
- Four task workflow stages:
  - To Do
  - In Progress
  - In Review
  - Done
- Task priorities and due dates.
- Task creation and editing.

**📁 Project Management**
- Project creation and organization.
- Project status filtering.
- Search functionality.
- Progress indicators.
- Team member assignments.

**👥 Team Management**
- Team member profiles.
- Role-based identification.
- Performance statistics.
- Member filtering.

**🎨 User Experience**
- Modern glassmorphism interface.
- Dark and light themes.
- Responsive layouts.
- Smooth animations.
- Interactive notifications.
- Toast messages.

**🔐 Authentication**
- Login and registration interfaces.
- Protected routes.
- Role-based UI access.
- Persistent demo sessions.

> Note: TaskFlow currently uses a client-side demo authentication approach and is intended for learning and portfolio demonstration rather than production authentication.

📁 [View Source Code](./team-task-manager)

📖 [Project Documentation](./team-task-manager/README.md)

🌐 [Live Application](https://taskflow-81ik6obrm-arf16.vercel.app)

---

## 🛠️ Technology Stack

The projects in this repository use different technologies depending on their requirements and implementation.

### Frontend Development

| Technology | Purpose |
|---|---|
| React | Component-based UI development |
| Next.js | React framework and application routing |
| TypeScript | Static typing and maintainability |
| JavaScript | Application logic |
| Vite | Development and build tooling |
| Tailwind CSS | Utility-first styling |
| Material UI | UI components and design systems |

### State Management & Routing

| Technology | Purpose |
|---|---|
| Redux Toolkit | Centralized application state |
| React Context API | Shared application state |
| React Redux | React and Redux integration |
| React Router | Client-side navigation |

### UI & Visualization

| Technology | Purpose |
|---|---|
| Framer Motion | Animations and transitions |
| Recharts | Charts and data visualization |
| Lucide React | Icon system |
| date-fns | Date manipulation |

### Data & Utilities

| Technology | Purpose |
|---|---|
| REST APIs | External data integration |
| JSONPlaceholder | Mock API data |
| PapaParse | CSV parsing and processing |
| UUID | Unique identifier generation |

### Development Tools

- Git & GitHub
- npm
- ESLint
- Vercel
- Visual Studio Code

---

## 🚀 Getting Started

Each project is an independent application with its own dependencies and configuration.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm
- Git

Check your installed versions:

```bash
node --version
npm --version
git --version
```

### 1. Clone the Repository

```bash
git clone https://github.com/alirezafallah-dev/Practice-Projects.git
```

### 2. Navigate to the Repository

```bash
cd Practice-Projects
```

### 3. Choose a Project

For example, to run TaskFlow:

```bash
cd team-task-manager
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Start the Development Server

```bash
npm run dev
```

Follow the terminal output to open the application in your browser.

---

## 📦 Running Individual Projects

Use the following commands depending on which project you want to run.

| Project | Directory | Development Command |
|---|---|---|
| Expense Tracker | `expense-tracker-panel` | `npm run dev` |
| Modern Blog | `modern-blog` | `npm run dev` |
| Recipe Finder | `recipe-finder` | Check its project README |
| TaskFlow | `team-task-manager` | `npm run dev` |

### Production Build

Projects that provide a build script can generate optimized production files.

```bash
npm run build
```

For Vite applications, you can preview the production build using:

```bash
npm run preview
```

For Next.js applications, use:

```bash
npm run start
```

Refer to each project's README for its specific configuration and requirements.

---

## 📁 Repository Structure

```text
Practice-Projects/
│
├── expense-tracker-panel/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
│
├── modern-blog/
│   ├── app/
│   ├── public/
│   ├── package.json
│   └── README.md
│
├── recipe-finder/
│   └── README.md
│
├── team-task-manager/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
│
├── .gitignore
└── README.md
```

Each project may contain additional folders, configuration files, components, and resources not shown in this simplified overview.

---

## 📚 Learning & Development

This repository represents an ongoing learning process focused on practical software development.

### Areas of Focus

- Modern React development.
- Advanced React Hooks and patterns.
- Component architecture and reusability.
- State management strategies.
- TypeScript and type-safe development.
- Next.js application development.
- Responsive UI/UX implementation.
- API integration and asynchronous data handling.
- Performance optimization.
- Code quality and maintainability.

### Development Philosophy

**Build → Experiment → Improve → Document**

My approach is based on learning through implementation:

1. **Build** — Turn ideas and concepts into functional applications.
2. **Experiment** — Explore different technologies and implementation approaches.
3. **Improve** — Refactor code, improve UX, and optimize performance.
4. **Document** — Keep project documentation clear and organized.
5. **Repeat** — Apply lessons learned to future projects.

---

## 🗺️ Future Improvements

This repository will continue to evolve as I explore new technologies and build more applications.

Potential areas for future development include:

- [ ] Add more React and Next.js applications.
- [ ] Expand TypeScript usage across projects.
- [ ] Introduce automated testing with Vitest.
- [ ] Improve accessibility and responsive design.
- [ ] Explore advanced state management patterns.
- [ ] Add more API-driven applications.
- [ ] Experiment with backend integration.
- [ ] Improve performance and code quality.
- [ ] Add screenshots and visual documentation for every project.
- [ ] Expand project-specific documentation.

---

## 🤝 Feedback & Collaboration

I'm always interested in learning, improving, and exploring new ideas.

If you have suggestions, feedback, or interesting project ideas, feel free to:

- Open an issue.
- Suggest improvements.
- Report bugs.
- Share useful resources.
- Discuss potential collaborations.

Contributions and constructive feedback are welcome.

---

## 📫 Connect

**Alireza Fallah**

GitHub: [@alirezafallah-dev](https://github.com/alirezafallah-dev)

Email: alirezafallah.dev@gmail.com

---

## 📄 License

This repository is intended for educational and personal development purposes.

The repository declares an MIT license. Please refer to the [LICENSE](./LICENSE) file for the applicable terms.

---

<div align="center">

### 🌱 Keep Learning. Keep Building. Keep Improving.

**Every project is another step forward.**

Made with ❤️ by **Alireza Fallah**

⭐ If you find this repository interesting, consider giving it a star!

</div>
