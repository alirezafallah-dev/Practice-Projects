import { useMemo, useState, useRef, useEffect } from "react";
import { NavLink, Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import { getReminderTasks } from "../utils/date.js";
import { ROLE_LABELS } from "../constants";
import { formatDate, isOverdue, isDueToday } from "../utils/date.js";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  LogOut,
  Bell,
  Menu,
  X,
  Moon,
  Sun,
  AlertTriangle,
  Clock,
  Calendar,
  Flame,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Layout() {
  const { currentUser, logout, tasks, projects } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);

  const reminders = useMemo(() => getReminderTasks(tasks), [tasks]);

  // Initialize dark mode on mount
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", JSON.stringify(newMode));
  };

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/projects", label: "Projects", icon: FolderKanban },
    { to: "/users", label: "Team Members", icon: Users },
  ];

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.startsWith("/projects/")) return "Project Details";
    const item = navItems.find((i) => path.startsWith(i.to));
    return item?.label || "Dashboard";
  };

  const getProjectTitle = (projectId) => {
    return projects.find((p) => p.id === projectId)?.title || "Unknown Project";
  };

  // Combine all reminder tasks with types
  const allReminders = useMemo(() => {
    const list = [];
    reminders.overdue.forEach((t) => list.push({ ...t, type: "overdue" }));
    reminders.today.forEach((t) => list.push({ ...t, type: "today" }));
    reminders.soon.forEach((t) => list.push({ ...t, type: "soon" }));
    return list;
  }, [reminders]);

  return (
    <div className={`min-h-screen flex ${darkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 1024) && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 shadow-2xl lg:shadow-none"
          >
            <div className="flex flex-col h-full">
              {/* Logo */}
              <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <FolderKanban className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      TaskFlow
                    </h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Team Manager
                    </p>
                  </div>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="lg:hidden ml-auto text-slate-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-4 space-y-1">
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3 px-3">
                  Menu
                </p>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname.startsWith(item.to);
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? "" : "group-hover:scale-110 transition-transform"}`} />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </nav>

              {/* User Card */}
              <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                <div className="p-3 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                      {currentUser?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">
                        {currentUser?.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {ROLE_LABELS[currentUser?.role]}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors text-sm font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between px-4 lg:px-8 h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {getPageTitle()}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Toggle theme"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-amber-500" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-700" />
                )}
              </button>

              {/* Notifications Dropdown */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setNotifOpen(!notifOpen)}
                  className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Notifications"
                >
                  <Bell className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                  {reminders.total > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg ring-2 ring-white dark:ring-slate-900"
                    >
                      {reminders.total > 9 ? "9+" : reminders.total}
                    </motion.span>
                  )}
                </button>

                {/* Notification Dropdown */}
                <AnimatePresence>
                  {notifOpen && (
                    <>
                      {/* Backdrop for mobile */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 md:hidden"
                        onClick={() => setNotifOpen(false)}
                      />

                      {/* Dropdown Panel */}
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50"
                      >
                        {/* Header */}
                        <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-blue-500/5 to-purple-500/5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                                <Bell className="w-4 h-4" />
                              </div>
                              <div>
                                <h3 className="font-bold text-slate-900 dark:text-white">
                                  Notifications
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                  {reminders.total === 0
                                    ? "All caught up!"
                                    : `You have ${reminders.total} task${
                                        reminders.total > 1 ? "s" : ""
                                      } requiring attention`}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => setNotifOpen(false)}
                              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Stats Summary */}
                        {reminders.total > 0 && (
                          <div className="grid grid-cols-3 gap-2 p-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                            <div className="text-center p-2 rounded-lg">
                              <div className="flex items-center justify-center gap-1 text-red-600 dark:text-red-400 mb-1">
                                <Flame className="w-3.5 h-3.5" />
                              </div>
                              <p className="text-lg font-bold text-slate-900 dark:text-white">
                                {reminders.overdue.length}
                              </p>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                Overdue
                              </p>
                            </div>
                            <div className="text-center p-2 rounded-lg border-x border-slate-200 dark:border-slate-700">
                              <div className="flex items-center justify-center gap-1 text-amber-600 dark:text-amber-400 mb-1">
                                <Clock className="w-3.5 h-3.5" />
                              </div>
                              <p className="text-lg font-bold text-slate-900 dark:text-white">
                                {reminders.today.length}
                              </p>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                Today
                              </p>
                            </div>
                            <div className="text-center p-2 rounded-lg">
                              <div className="flex items-center justify-center gap-1 text-blue-600 dark:text-blue-400 mb-1">
                                <Calendar className="w-3.5 h-3.5" />
                              </div>
                              <p className="text-lg font-bold text-slate-900 dark:text-white">
                                {reminders.soon.length}
                              </p>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                Upcoming
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Notifications List */}
                        <div className="max-h-96 overflow-y-auto">
                          {allReminders.length === 0 ? (
                            <div className="p-8 text-center">
                              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-900/20 mb-3">
                                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                              </div>
                              <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                                All caught up! 🎉
                              </h4>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                You have no urgent tasks right now
                              </p>
                            </div>
                          ) : (
                            <div className="divide-y divide-slate-100 dark:divide-slate-700">
                              {allReminders.slice(0, 10).map((task) => (
                                <NotificationItem
                                  key={task.id}
                                  task={task}
                                  projectTitle={getProjectTitle(task.projectId)}
                                  onClose={() => setNotifOpen(false)}
                                />
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Footer */}
                        {allReminders.length > 0 && (
                          <div className="p-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                            <Link
                              to="/dashboard"
                              onClick={() => setNotifOpen(false)}
                              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                            >
                              View All Tasks
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                        )}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>

      {/* Backdrop for mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Notification Item Component
function NotificationItem({ task, projectTitle, onClose }) {
  const getTypeConfig = (type) => {
    switch (type) {
      case "overdue":
        return {
          icon: <Flame className="w-4 h-4" />,
          bg: "bg-red-50 dark:bg-red-900/20",
          text: "text-red-600 dark:text-red-400",
          border: "border-red-200 dark:border-red-800",
          label: "Overdue",
        };
      case "today":
        return {
          icon: <Clock className="w-4 h-4" />,
          bg: "bg-amber-50 dark:bg-amber-900/20",
          text: "text-amber-600 dark:text-amber-400",
          border: "border-amber-200 dark:border-amber-800",
          label: "Due Today",
        };
      case "soon":
        return {
          icon: <Calendar className="w-4 h-4" />,
          bg: "bg-blue-50 dark:bg-blue-900/20",
          text: "text-blue-600 dark:text-blue-400",
          border: "border-blue-200 dark:border-blue-800",
          label: "Upcoming",
        };
      default:
        return {
          icon: <AlertTriangle className="w-4 h-4" />,
          bg: "bg-slate-50",
          text: "text-slate-600",
          border: "border-slate-200",
          label: "Info",
        };
    }
  };

  const config = getTypeConfig(task.type);

  return (
    <Link
      to={`/projects/${task.projectId}`}
      onClick={onClose}
      className="block p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
    >
      <div className="flex items-start gap-3">
        {/* Type Icon */}
        <div
          className={`flex-shrink-0 p-2 rounded-lg ${config.bg} ${config.text} border ${config.border}`}
        >
          {config.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="font-semibold text-sm text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-500 transition-colors">
              {task.title}
            </h4>
            <span
              className={`flex-shrink-0 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${config.bg} ${config.text} border ${config.border}`}
            >
              {config.label}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mb-1.5">
            {projectTitle}
          </p>
          <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(task.dueDate)}
            </span>
            <span className="capitalize">{task.priority}</span>
          </div>
        </div>

        {/* Arrow */}
        <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
      </div>
    </Link>
  );
}