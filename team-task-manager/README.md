<div align="center">

# 🚀 TaskFlow - Modern Team Task Manager

### A sleek, feature-rich project management application built with React + Vite

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[Features](#-features) • [Demo](#-demo) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Screenshots](#-screenshots)

</div>

---

## ✨ Overview

**TaskFlow** is a modern, responsive team task management application that helps teams collaborate effectively. Built with cutting-edge web technologies, it features a beautiful glassmorphism UI, smooth animations, and a complete Kanban board with drag-and-drop functionality.

This project demonstrates advanced React patterns, state management with Context API, real-time notifications, and production-ready UI/UX design practices.

---

## 🎯 Features

### 🎨 Modern UI/UX
- **Glassmorphism Design** - Beautiful frosted glass effects throughout the interface
- **Dark/Light Mode** - Seamless theme switching with persistent preference
- **Smooth Animations** - Powered by Framer Motion for delightful interactions
- **Fully Responsive** - Perfect on desktop, tablet, and mobile devices
- **Gradient Accents** - Eye-catching color gradients for visual hierarchy

### 📊 Dashboard & Analytics
- **Interactive Charts** - Real-time statistics with Recharts (Pie & Bar charts)
- **Task Distribution** - Visual breakdown of tasks by status
- **Team Performance** - Individual member productivity tracking
- **Quick Stats** - Overview cards with key metrics
- **Urgent Tasks** - Highlighted overdue and due-today tasks

### 📁 Project Management
- **Project Cards** - Beautiful gradient cards with progress tracking
- **Status Filtering** - Filter by Planning, Active, On Hold, or Completed
- **Search Functionality** - Quick search across all projects
- **Custom Colors** - Each project has its own color theme
- **Team Members** - Visual display of assigned team members

### 📋 Kanban Board
- **Drag & Drop** - Intuitive task movement between columns
- **4 Status Columns** - To Do, In Progress, In Review, Done
- **Task Cards** - Rich cards with priority, assignee, and due date
- **Real-time Updates** - Instant status changes with visual feedback
- **Task Modals** - Create and edit tasks with full details

### 👥 Team Management
- **User Profiles** - Individual cards with role-specific gradients
- **Performance Metrics** - Completion rates and task statistics
- **Role-based Badges** - Visual distinction between Admin, Developer, Designer, QA
- **Performance Tiers** - "Top Performer", "On Track", "Needs Attention" badges
- **Member Filtering** - Filter team by role

### 🔔 Smart Notifications
- **Real-time Alerts** - Badge counter for urgent tasks
- **Categorized Tasks** - Overdue, Due Today, and Upcoming sections
- **Quick Actions** - Direct links to task details
- **Toast System** - Beautiful notifications for all actions
- **Empty States** - Friendly "All caught up!" messages

### 🔐 Authentication
- **Login/Register** - Complete authentication flow
- **Protected Routes** - Secure access control
- **Role-based Access** - Different permissions for each role
- **Session Persistence** - Stay logged in across refreshes
- **Demo Credentials** - Easy testing with pre-configured users

---

## 🎬 Demo

### 🔑 Demo Credentials

Email: admin@example.com
Password: 123456


**Other test accounts:**
- `john@example.com` / `123456` (Developer)
- `sarah@example.com` / `123456` (Designer)
- `mike@example.com` / `123456` (Developer)
- `emma@example.com` / `123456` (QA Engineer)

---

## 🛠️ Tech Stack

### Frontend
- **React 19.2** - Latest React with modern features
- **Vite 8.3** - Lightning-fast build tool and dev server
- **React Router DOM 7** - Client-side routing
- **Framer Motion 11** - Production-ready animations
- **Recharts** - Composable charting library
- **Lucide React** - Beautiful & consistent icons
- **date-fns** - Modern date utility library

### Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **PostCSS** - CSS transformation tool
- **Autoprefixer** - Automatic vendor prefixing

### Development
- **ESLint** - Code linting and formatting
- **Hot Module Replacement** - Instant updates during development

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/alirezafallah-dev/practice-projects.git
cd practice-projects/team-task-manager

Install dependencies
npm install

Start development server
npm run dev

Open your browser
http://localhost:5173

Available Scripts
Command
	
Description
npm run dev
	
Start development server with HMR
npm run build
	
Build for production
npm run preview
	
Preview production build locally
npm run lint
	
Run ESLint for code quality
📸 Screenshots
🔐 Authentication

📸 Screenshots
🔐 Authentication

Beautiful glassmorphism login with animated background

Dashboard

Comprehensive dashboard with charts and statistics
📁 Projects

Project cards with gradient themes and progress bars
📋 Kanban Board

Drag-and-drop task management with 4 columns
👥 Team Members

Team member profiles with performance metrics
🔔 Notifications

Smart notification dropdown with categorized tasks


Project Structure
team-task-manager/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable components
│   │   ├── Layout.jsx     # Main layout with sidebar
│   │   └── ProtectedRoute.jsx
│   ├── constants/         # App constants
│   │   └── index.js
│   ├── context/           # React Context providers
│   │   ├── AppContext.jsx
│   │   └── ToastContext.jsx
│   ├── pages/             # Page components
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── ProjectsPage.jsx
│   │   ├── ProjectDetailPage.jsx
│   │   └── UsersPage.jsx
│   ├── utils/             # Utility functions
│   │   └── date.js
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md

 Design Highlights
Color Palette

    Primary Gradient: Blue (#3B82F6) → Purple (#8B5CF6)
    Success: Emerald (#10B981)
    Warning: Amber (#F59E0B)
    Danger: Red (#EF4444)
    Info: Cyan (#06B6D4)

Design Principles

    Glassmorphism - Frosted glass effects for depth
    Micro-interactions - Subtle animations on every action
    Consistent Spacing - 8px grid system throughout
    Accessibility - ARIA labels and keyboard navigation
    Mobile-first - Responsive design for all devices

🎯 Key Features Deep Dive
🔄 Drag & Drop Kanban
The Kanban board uses native HTML5 drag and drop API for smooth task movement between columns. Tasks can be easily moved from "To Do" → "In Progress" → "In Review" → "Done" with visual feedback.
📊 Real-time Analytics
The dashboard features interactive pie and bar charts that update automatically when tasks are created, updated, or completed. This provides instant insights into team productivity.
🔔 Smart Notifications
The notification system analyzes all tasks and categorizes them into:

    Overdue (Red) - Past due date
    Due Today (Orange) - Due today
    Upcoming (Blue) - Due in next 3 days

🌗 Persistent Dark Mode
Theme preference is saved in localStorage and automatically applied on subsequent visits, providing a seamless user experience.
🤝 Contributing
Contributions are welcome! Feel free to:

    Fork the repository
    Create a feature branch (git checkout -b feature/AmazingFeature)
    Commit your changes (git commit -m 'Add AmazingFeature')
    Push to the branch (git push origin feature/AmazingFeature)
    Open a Pull Request

📝 Future Enhancements

    Real backend API integration
    WebSocket for real-time collaboration
    File attachments for tasks
    Comments and activity feed
    Email notifications
    Advanced reporting and exports
    Calendar view for tasks
    Time tracking integration
    Multi-language support

📄 License
This project is open source and available under the MIT License
.
👨‍💻 Author
Alireza Fallah

    GitHub: @alirezafallah-dev
    Email: alirezafallah.dev@gmail.com

🙏 Acknowledgments

    React
     - The library for web and native user interfaces
    Vite
     - Next generation frontend tooling
    Tailwind CSS
     - A utility-first CSS framework
    Framer Motion
     - A production-ready motion library
    Lucide
     - Beautiful & consistent icons
    Recharts
     - Composable charting library

<div align="center">

If you found this project helpful, please give it a ⭐
Made with ❤️ by Alireza Fallah
</div>
