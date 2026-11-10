::: {align="center"}
# TaskFlow

**A modern workspace for managing projects, tasks, and team progress.**

[![Live
Demo](https://img.shields.io/badge/▶%20Live%20Demo-6366F1?style=for-the-badge)](https://taskflow-81ik6obrm-arf16.vercel.app)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=20232A)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind
CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-16A34A?style=flat-square)](LICENSE)
:::

------------------------------------------------------------------------

## Overview

TaskFlow is a responsive team task management application that helps
teams organize projects, track tasks, and monitor progress from one
workspace.

It combines a Kanban workflow, project management tools, team insights,
and a clean interface with light and dark themes.

## Features

-   **Dashboard:** View task statistics, project progress, team
    performance, and urgent tasks.
-   **Project management:** Create and organize projects, track
    progress, search, and filter by status.
-   **Kanban board:** Move tasks between workflow stages using drag and
    drop.
-   **Task management:** Create and edit tasks with priorities,
    assignees, and due dates.
-   **Team management:** Browse team members, roles, and performance
    information.
-   **Notifications:** Keep track of overdue, due-today, and upcoming
    tasks.
-   **Authentication:** Login, registration, protected routes, and
    role-based access.
-   **Personalization:** Responsive layout, light/dark themes, and
    smooth UI transitions.

## Live Demo

```{=html}
<p align="center">
```
`<a href="https://taskflow-81ik6obrm-arf16.vercel.app">`{=html}
`<img src="https://img.shields.io/badge/OPEN%20TASKFLOW-Live%20Preview-6366F1?style=for-the-badge&logo=vercel&logoColor=white" alt="Open TaskFlow live demo" />`{=html}
`</a>`{=html}
```{=html}
</p>
```
### Demo accounts

Use any of the following accounts to explore the application:

  Role          Email                 Password
  ------------- --------------------- ----------
  Admin         `admin@example.com`   `123456`
  Developer     `john@example.com`    `123456`
  Designer      `sarah@example.com`   `123456`
  Developer     `mike@example.com`    `123456`
  QA Engineer   `emma@example.com`    `123456`

`<sub>`{=html}These are demo credentials for testing only. Do not use
them for real accounts.`</sub>`{=html}

## Tech Stack

  Category          Technologies
  ----------------- -----------------------------------
  Frontend          React 19, Vite 8
  Routing & State   React Router 7, React Context API
  Styling           Tailwind CSS 3.4
  UI & Animation    Lucide React, Framer Motion
  Charts & Dates    Recharts, date-fns
  Tooling           ESLint, PostCSS, Autoprefixer

## Getting Started

### Prerequisites

-   Node.js 20.19+ or 22.12+
-   npm
-   Git

### Installation

``` bash
# Clone the repository
git clone https://github.com/alirezafallah-dev/Practice-Projects.git

# Open the project directory
cd Practice-Projects/team-task-manager

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Available Scripts

  Command             Description
  ------------------- ------------------------------
  `npm run dev`       Start the development server
  `npm run build`     Create a production build
  `npm run preview`   Preview the production build
  `npm run lint`      Run ESLint

## Project Structure

``` text
team-task-manager/
├── public/                 # Static assets
├── src/
│   ├── components/         # Shared UI and layout components
│   ├── constants/          # Application constants
│   ├── context/            # Global state and toast contexts
│   ├── pages/              # Application pages
│   ├── utils/              # Utility functions
│   ├── App.jsx             # Root component
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Security Note

TaskFlow currently uses a client-side/demo authentication flow. It is
intended for learning and portfolio demonstration, not production use
with real user data.

A production deployment should use a secure backend for authentication,
password hashing, session handling, and server-side authorization.

## Contributing

Suggestions and improvements are welcome. Feel free to open an issue or
submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

------------------------------------------------------------------------

::: {align="center"}
**Built with care by [Alireza
Fallah](https://github.com/alirezafallah-dev)**

If you find TaskFlow useful, consider giving the repository a ⭐
:::
