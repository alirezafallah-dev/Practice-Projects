<div align="center">

# 🚀 TaskFlow

### **Modern Team Task Manager**

Organize projects, manage tasks, and keep your team moving forward — with a clean, responsive, and delightful experience.

<br />

<p align="center">
  <a href="https://taskflow-arf16.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/🚀%20Live%20Demo-Open%20TaskFlow-6366F1?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
  &nbsp;
  <a href="https://github.com/alirezafallah-dev/Practice-Projects/tree/main/team-task-manager" target="_blank">
    <img src="https://img.shields.io/badge/📂%20GitHub-View%20Project-111827?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repository" />
  </a>
  &nbsp;
  <a href="https://github.com/alirezafallah-dev/Practice-Projects/issues/new?labels=bug&title=%5BBug%5D%3A%20" target="_blank">
    <img src="https://img.shields.io/badge/🐞%20Report%20Bug-Create%20Issue-EF4444?style=for-the-badge&logo=github&logoColor=white" alt="Report Bug" />
  </a>
  &nbsp;
  <a href="https://github.com/alirezafallah-dev/Practice-Projects/issues/new?labels=enhancement&title=%5BFeature%5D%3A%20" target="_blank">
    <img src="https://img.shields.io/badge/💡%20Request%20Feature-Suggest%20Idea-10B981?style=for-the-badge&logo=github&logoColor=white" alt="Request Feature" />
  </a>
</p>

<br />

![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=20232A)
![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?style=flat-square&logo=framer&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-16A34A?style=flat-square)

</div>

---

## ✨ Overview

TaskFlow is a responsive team task management application built to help teams organize projects, track work, and monitor progress in one place.

It brings together a Kanban board, project and team management, dashboard analytics, notifications, and a polished interface with dark and light themes.

> [!TIP]
> Explore the live demo to see TaskFlow in action before cloning the repository.

---

## 🎬 Live Demo

<p align="center">
  <a href="https://taskflow-arf16.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/EXPLORE%20TASKFLOW-Launch%20Live%20Demo-6366F1?style=for-the-badge&logo=vercel&logoColor=white" alt="Launch TaskFlow live demo" />
  </a>
</p>

### Demo Accounts

These credentials are provided for demonstration and testing only.

| Role        | Email               | Password |
| ----------- | ------------------- | -------- |
| Admin       | `admin@example.com` | `123456` |
| Developer   | `john@example.com`  | `123456` |
| Designer    | `sarah@example.com` | `123456` |
| Developer   | `mike@example.com`  | `123456` |
| QA Engineer | `emma@example.com`  | `123456` |

> [!IMPORTANT]
> This application currently uses a client-side/demo authentication flow and is not intended for production use with real user data.

---

## 🚀 Features

| Area              | Highlights                                                                 |
| ----------------- | -------------------------------------------------------------------------- |
| Dashboard         | Task statistics, interactive charts, team performance, and urgent tasks    |
| Projects          | Create and organize projects, track progress, search, and filter by status |
| Kanban Board      | Drag and drop tasks across To Do, In Progress, In Review, and Done        |
| Task Management   | Create and edit tasks with priorities, assignees, and due dates            |
| Team              | Member profiles, role badges, performance metrics, and role filtering      |
| Notifications     | Overdue, due-today, and upcoming task alerts with quick actions            |
| Authentication    | Login, registration, protected routes, and role-based access               |
| User Experience   | Responsive layout, dark/light mode, animations, and toast notifications    |

---

## 🧰 Tech Stack

| Category         | Technologies                                      |
| ---------------- | ------------------------------------------------- |
| Core             | React 19.2, Vite 8.3                              |
| Routing & State  | React Router DOM 7, React Context API             |
| Styling & Motion | Tailwind CSS 3.4, PostCSS, Autoprefixer, Framer Motion 11 |
| UI & Data        | Lucide React, Recharts, date-fns                  |
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
cd practice-projects/team-task-manager

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

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
| Authentication   | `screenshots/authentication.png` |
| Dashboard        | `screenshots/dashboard.png`      |
| Projects         | `screenshots/projects.png`       |
| Kanban Board     | `screenshots/kanban-board.png`   |
| Team Members     | `screenshots/team-members.png`   |
| Notifications    | `screenshots/notifications.png`  |

<!--
When screenshots are added, replace the table above with:

![Dashboard](screenshots/dashboard.png)
-->

---

## 📁 Project Structure

```text
team-task-manager/
 ├── public/                     # Static assets
 ├── src/
 │   ├── components/
 │   │   ├── Layout.jsx          # Main application layout
 │   │   └── ProtectedRoute.jsx  # Protected route wrapper
 │   ├── constants/
 │   │   └── index.js            # Application constants
 │   ├── context/
 │   │   ├── AppContext.jsx      # Global application state
 │   │   └── ToastContext.jsx    # Toast notification state
 │   ├── pages/
 │   │   ├── LoginPage.jsx
 │   │   ├── RegisterPage.jsx
 │   │   ├── DashboardPage.jsx
 │   │   ├── ProjectsPage.jsx
 │   │   ├── ProjectDetailPage.jsx
 │   │   └── UsersPage.jsx
 │   ├── utils/
 │   │   └── date.js             # Date utility functions
 │   ├── App.jsx                 # Root application component
 │   ├── main.jsx                # Application entry point
 │   └── index.css               # Global styles
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

TaskFlow currently uses a client-side/demo authentication flow. It is intended for learning and portfolio demonstration, not for handling real user data.

Before using an application like this in production, implement:

- Backend authentication
- Secure password handling
- Server-side authorization
- Secure session management
- Input validation and sanitization
- Protection against common web vulnerabilities

> [!WARNING]
> Do not store sensitive or production user data in this demo application.

---

## 🗺️ Possible Improvements

- [ ] Backend API integration
- [ ] Real-time collaboration
- [ ] Task attachments, comments, and activity feeds
- [ ] Calendar view and time tracking
- [ ] Data export and advanced reports
- [ ] Multi-language support
- [ ] Team invitations and expanded permissions

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

If you find TaskFlow useful, consider giving the repository a ⭐

<br />

[![GitHub](https://img.shields.io/badge/GitHub-111827?style=for-the-badge&logo=github&logoColor=white)](https://github.com/alirezafallah-dev)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-6366F1?style=for-the-badge&logo=vercel&logoColor=white)](https://taskflow-arf16.vercel.app/)
[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:alirezafallah.dev@gmail.com)

</div>
