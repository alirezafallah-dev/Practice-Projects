<div align="center">

# 🚀 TaskFlow - Modern Team Task Manager

### 🔗 **[View Live Demo]([https://taskflow.vercel.app](https://taskflow-arf16.vercel.app))**

### A sleek, feature-rich project management application built with React + Vite

</div>
<div align="center">

# 🚀 TaskFlow — Modern Team Task Manager

### A sleek, feature-rich project management application built with React + Vite

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge\&logo=tailwind-css\&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?style=for-the-badge\&logo=framer\&logoColor=white)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<p>
  <a href="#-overview">Overview</a> •
  <a href="#-features">Features</a> •
  <a href="#-demo">Demo</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-screenshots">Screenshots</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-contributing">Contributing</a>
</p>

</div>

---

## ✨ Overview

**TaskFlow** is a modern, responsive team task management application designed to help teams organize projects, manage tasks, and collaborate more effectively.

Built with **React + Vite**, TaskFlow combines a polished **glassmorphism UI**, smooth animations, interactive analytics, and a complete **Kanban workflow** with drag-and-drop functionality.

The project demonstrates modern React development practices, including:

* Component-based architecture
* React Context API for state management
* Protected routes and authentication
* Responsive UI design
* Interactive data visualization
* Drag-and-drop task management
* Persistent theme preferences
* Toast notifications
* Role-based user management

---

## 🎯 Features

### 🎨 Modern UI/UX

* **Glassmorphism Design** — Frosted glass effects throughout the interface
* **Dark / Light Mode** — Seamless theme switching with persistent preferences
* **Smooth Animations** — Powered by Framer Motion
* **Fully Responsive** — Optimized for desktop, tablet, and mobile
* **Gradient Accents** — Modern gradients for visual hierarchy
* **Micro-interactions** — Smooth transitions and feedback across the application
* **Accessible UI** — Keyboard navigation and ARIA-friendly components

---

### 📊 Dashboard & Analytics

* **Interactive Charts** — Pie and bar charts powered by Recharts
* **Task Distribution** — Visual breakdown of tasks by status
* **Team Performance** — Individual productivity statistics
* **Quick Stats** — Key project and task metrics at a glance
* **Urgent Tasks** — Highlights overdue and due-today tasks
* **Real-time Updates** — Analytics update automatically when task data changes

---

### 📁 Project Management

* **Project Cards** — Gradient cards with progress tracking
* **Status Filtering** — Filter projects by:

  * Planning
  * Active
  * On Hold
  * Completed
* **Search** — Quickly search across projects
* **Custom Colors** — Individual visual themes for projects
* **Team Members** — Display assigned members directly on project cards
* **Progress Tracking** — Visual project completion indicators

---

### 📋 Kanban Board

* **Drag & Drop** — Move tasks between columns intuitively
* **Four Status Columns**:

  * To Do
  * In Progress
  * In Review
  * Done
* **Rich Task Cards** — Priority, assignee, due date, and status
* **Instant Updates** — Status changes are reflected immediately
* **Task Modals** — Create and edit tasks with detailed information
* **Visual Feedback** — Clear interaction states during drag-and-drop

---

### 👥 Team Management

* **User Profiles** — Individual team member cards
* **Performance Metrics** — Completion rates and task statistics
* **Role-based Badges** — Visual role identification
* **Supported Roles**:

  * Admin
  * Developer
  * Designer
  * QA Engineer
* **Performance Tiers**:

  * Top Performer
  * On Track
  * Needs Attention
* **Member Filtering** — Filter team members by role

---

### 🔔 Smart Notifications

* **Real-time Alerts** — Notification badge for important tasks
* **Task Categories**:

  * Overdue
  * Due Today
  * Upcoming
* **Quick Actions** — Navigate directly to task details
* **Toast Notifications** — Instant feedback for user actions
* **Empty States** — Friendly feedback when there are no notifications

---

### 🔐 Authentication

* **Login / Registration** — Complete authentication flow
* **Protected Routes** — Restrict access to authenticated users
* **Role-based Access** — Different permissions for different roles
* **Session Persistence** — Stay logged in after page refresh
* **Demo Accounts** — Pre-configured accounts for testing

---

## 🎬 Demo

### 🔑 Demo Credentials

#### Admin

```text
Email:    admin@example.com
Password: 123456
```

#### Other Test Accounts

| Email               | Password | Role        |
| ------------------- | -------- | ----------- |
| `john@example.com`  | `123456` | Developer   |
| `sarah@example.com` | `123456` | Designer    |
| `mike@example.com`  | `123456` | Developer   |
| `emma@example.com`  | `123456` | QA Engineer |

> **Note:** These credentials are intended for local/demo purposes only.

---

## 🛠️ Tech Stack

### Frontend

| Technology             | Purpose                           |
| ---------------------- | --------------------------------- |
| **React 19.2**         | UI library                        |
| **Vite 8.3**           | Build tool and development server |
| **React Router DOM 7** | Client-side routing               |
| **Framer Motion 11**   | Animations and transitions        |
| **Recharts**           | Data visualization                |
| **Lucide React**       | Icon library                      |
| **date-fns**           | Date utilities                    |

### Styling

| Technology           | Purpose                     |
| -------------------- | --------------------------- |
| **Tailwind CSS 3.4** | Utility-first CSS framework |
| **PostCSS**          | CSS transformation          |
| **Autoprefixer**     | Automatic vendor prefixes   |

### Development

* **ESLint** — Code quality and linting
* **Hot Module Replacement** — Instant development updates
* **React Context API** — Global application state

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* **Node.js 18+**
* **npm 9+**
* **Git**

You can verify your versions with:

```bash
node --version
npm --version
git --version
```

---

### 📥 Installation

#### 1. Clone the repository

```bash
git clone https://github.com/alirezafallah-dev/practice-projects.git
```

#### 2. Navigate to the project

```bash
cd practice-projects/team-task-manager
```

#### 3. Install dependencies

```bash
npm install
```

#### 4. Start the development server

```bash
npm run dev
```

#### 5. Open the application

Once the development server starts, open:

```text
http://localhost:5173
```

---

## 📜 Available Scripts

| Command           | Description                           |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Start the development server with HMR |
| `npm run build`   | Create a production build             |
| `npm run preview` | Preview the production build locally  |
| `npm run lint`    | Run ESLint and check code quality     |

### Production Build

To create a production-ready build:

```bash
npm run build
```

To preview the generated build locally:

```bash
npm run preview
```

---

## 📸 Screenshots

> Add your screenshots to the repository and update the paths below.

### 🔐 Authentication

Beautiful glassmorphism login and registration screens with animated backgrounds and modern form elements.

```text
screenshots/
└── authentication.png
```

---

### 📊 Dashboard

Comprehensive dashboard featuring:

* Task statistics
* Team performance
* Interactive charts
* Recent activities
* Urgent tasks

```text
screenshots/
└── dashboard.png
```

---

### 📁 Projects

Project cards with:

* Gradient themes
* Progress indicators
* Status badges
* Team member avatars
* Search and filtering

```text
screenshots/
└── projects.png
```

---

### 📋 Kanban Board

Drag-and-drop task management with four workflow columns:

```text
To Do → In Progress → In Review → Done
```

```text
screenshots/
└── kanban-board.png
```

---

### 👥 Team Members

Team member profiles with:

* Role information
* Performance statistics
* Completion rates
* Performance tiers

```text
screenshots/
└── team-members.png
```

---

### 🔔 Notifications

Smart notification dropdown with categorized task alerts:

```text
screenshots/
└── notifications.png
```

---

## 📂 Project Structure

```text
team-task-manager/
│
├── public/
│   └── ...                    # Static assets
│
├── src/
│   │
│   ├── components/
│   │   ├── Layout.jsx         # Main application layout
│   │   └── ProtectedRoute.jsx # Protected route wrapper
│   │
│   ├── constants/
│   │   └── index.js           # Application constants
│   │
│   ├── context/
│   │   ├── AppContext.jsx     # Global application state
│   │   └── ToastContext.jsx   # Toast notification state
│   │
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── ProjectsPage.jsx
│   │   ├── ProjectDetailPage.jsx
│   │   └── UsersPage.jsx
│   │
│   ├── utils/
│   │   └── date.js            # Date utility functions
│   │
│   ├── App.jsx                # Root application component
│   ├── main.jsx               # Application entry point
│   └── index.css              # Global styles
│
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🎨 Design Highlights

### Color Palette

| Purpose              | Color                             |
| -------------------- | --------------------------------- |
| **Primary Gradient** | Blue `#3B82F6` → Purple `#8B5CF6` |
| **Success**          | Emerald `#10B981`                 |
| **Warning**          | Amber `#F59E0B`                   |
| **Danger**           | Red `#EF4444`                     |
| **Info**             | Cyan `#06B6D4`                    |

---

### Design Principles

#### 🪟 Glassmorphism

Frosted glass surfaces, transparency, blur effects, and subtle borders create a modern visual experience.

#### ✨ Micro-interactions

Subtle animations and transitions provide immediate feedback for user interactions.

#### 📐 Consistent Spacing

The interface follows an 8px spacing system to maintain visual consistency.

#### ♿ Accessibility

The UI is designed with accessibility in mind, including:

* ARIA labels
* Keyboard navigation
* Clear visual states
* Responsive layouts

#### 📱 Mobile-first

Components are designed to work across:

* Mobile phones
* Tablets
* Laptops
* Desktop displays

---

## 🎯 Key Features Deep Dive

### 🔄 Drag & Drop Kanban

The Kanban board uses the **native HTML5 Drag and Drop API** to provide intuitive task movement between workflow stages.

Tasks can be moved through the following workflow:

```text
┌─────────┐
│  To Do  │
└────┬────┘
     ↓
┌─────────────┐
│ In Progress │
└──────┬──────┘
       ↓
┌────────────┐
│ In Review  │
└──────┬─────┘
       ↓
┌────────┐
│  Done  │
└────────┘
```

This provides teams with a clear visual representation of task progress.

---

### 📊 Real-time Analytics

The dashboard provides interactive **Pie** and **Bar** charts using Recharts.

Analytics automatically reflect task changes, allowing users to monitor:

* Task distribution
* Completion rates
* Team productivity
* Project progress
* Workload distribution

---

### 🔔 Smart Notifications

The notification system analyzes task due dates and categorizes them into three groups:

| Category         | Description                      |
| ---------------- | -------------------------------- |
| 🔴 **Overdue**   | Tasks past their due date        |
| 🟠 **Due Today** | Tasks due today                  |
| 🔵 **Upcoming**  | Tasks due within the next 3 days |

This makes it easier for users to identify priorities and take action quickly.

---

### 🌗 Persistent Dark Mode

The selected theme is stored in `localStorage`.

This means the user's preferred theme remains active when they:

* Refresh the page
* Close and reopen the browser
* Return to the application later

---

## 🧩 Architecture

TaskFlow follows a component-based architecture designed to keep the application modular and maintainable.

### Application Layers

```text
┌───────────────────────────────┐
│             Pages             │
│ Dashboard / Projects / Users  │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│          Components           │
│ Layout / Cards / Modals / UI  │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│            Context            │
│ AppContext / ToastContext     │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│            Utils              │
│ Dates / Helpers / Constants   │
└───────────────────────────────┘
```

---

## 🔐 Security Notes

This project currently uses a client-side/demo authentication approach.

It is intended for:

* Learning
* Portfolio demonstration
* UI/UX experimentation
* Frontend development practice

For production use, authentication should be replaced with a secure backend implementation including:

* Password hashing
* Secure session management
* JWT or secure cookies
* Server-side authorization
* Input validation
* Rate limiting
* CSRF protection
* Secure API endpoints

> **Important:** Never use the demo credentials in a production environment.

---

## 🤝 Contributing

Contributions are welcome!

If you would like to improve TaskFlow, follow these steps:

### 1. Fork the repository

```bash
git fork
```

Or use the **Fork** button on GitHub.

### 2. Create a feature branch

```bash
git checkout -b feature/AmazingFeature
```

### 3. Make your changes

Implement your feature or fix.

### 4. Commit your changes

```bash
git add .
git commit -m "Add AmazingFeature"
```

### 5. Push your branch

```bash
git push origin feature/AmazingFeature
```

### 6. Open a Pull Request

Create a Pull Request and describe the changes you made.

---

## 📝 Future Enhancements

The following features are planned or could be added in future versions:

* [ ] Real backend API integration
* [ ] WebSocket-based real-time collaboration
* [ ] File attachments for tasks
* [ ] Comments and activity feeds
* [ ] Email notifications
* [ ] Advanced reporting and analytics
* [ ] Data export functionality
* [ ] Calendar view
* [ ] Time tracking
* [ ] Multi-language support
* [ ] Advanced role and permission management
* [ ] User activity history
* [ ] Task labels and tags
* [ ] Custom Kanban columns
* [ ] Project templates
* [ ] Team invitations

---

## 📄 License

This project is open source and available under the **MIT License**.

See the [`LICENSE`](LICENSE) file for more information.

---

## 👨‍💻 Author

### Alireza Fallah

Frontend developer and creator of **TaskFlow**.

* **GitHub:** [@alirezafallah-dev](https://github.com/alirezafallah-dev)
* **Email:** [alirezafallah.dev@gmail.com](mailto:alirezafallah.dev@gmail.com)

---

## 🙏 Acknowledgments

This project was built using several excellent open-source technologies:

* **[React](https://react.dev/)** — The library for web and native user interfaces
* **[Vite](https://vitejs.dev/)** — Next-generation frontend tooling
* **[Tailwind CSS](https://tailwindcss.com/)** — A utility-first CSS framework
* **[Framer Motion](https://www.framer.com/motion/)** — Production-ready motion library
* **[Lucide](https://lucide.dev/)** — Beautiful and consistent icons
* **[Recharts](https://recharts.org/)** — Composable charting library
* **[date-fns](https://date-fns.org/)** — Modern JavaScript date utility library

---

<div align="center">

### ⭐ If you found this project helpful, please consider giving it a star!

**Made with ❤️ by Alireza Fallah**

</div>
