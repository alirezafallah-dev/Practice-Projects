import { memo, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FolderKanban, Users, LogOut, Bell, Menu, X, Moon, Sun,
  AlertTriangle, Clock, Calendar, Flame, CheckCircle2, ArrowRight, Command,
  Search, ChevronRight, Settings,
} from "lucide-react";
import { useApp } from "../context/AppContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { useCommandPalette } from "../context/CommandPaletteContext.jsx";
import { getReminderTasks, formatDate } from "../utils/date.js";
import { ROLE_LABELS } from "../constants";
import GlobalSearch from "./GlobalSearch.jsx";
import SettingsModal from "./SettingsModal.jsx";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, shortcut: "G D", preload: () => import("../pages/DashboardPage.jsx") },
  { to: "/projects", label: "Projects", icon: FolderKanban, shortcut: "G P", preload: () => import("../pages/ProjectsPage.jsx") },
  { to: "/users", label: "Team Members", icon: Users, shortcut: "G T", preload: () => import("../pages/UsersPage.jsx") },
];

function getPageTitle(pathname) {
  if (pathname.startsWith("/projects/")) return "Project Details";
  const item = NAV_ITEMS.find((i) => pathname.startsWith(i.to));
  return item?.label || "Dashboard";
}

function PageSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-40 rounded-2xl bg-slate-200/70 dark:bg-slate-800/70" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-28 rounded-2xl bg-slate-200/70 dark:bg-slate-800/70" />
        ))}
      </div>
      <div className="h-72 rounded-2xl bg-slate-200/70 dark:bg-slate-800/70" />
    </div>
  );
}

const SidebarContent = memo(function SidebarContent({
  idPrefix, pathname, currentUser, onLogout, onOpenPalette, onNavigate, onOpenSettings,
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 lg:px-6 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="flex items-center gap-3 min-w-0">
          <motion.div
            whileHover={{ rotate: 5, scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center shadow-glow flex-shrink-0"
          >
            <FolderKanban className="w-4 h-4 text-white" />
          </motion.div>
          <div className="min-w-0">
            <h1 className="font-bold text-sm bg-gradient-to-r from-brand-600 to-violet-600 bg-clip-text text-transparent font-display tracking-tight leading-tight">
              TaskFlow
            </h1>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight">
              Team Manager
            </p>
          </div>
        </div>
        <button
          onClick={onNavigate}
          className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 flex-shrink-0"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3 px-3">
          Menu
        </p>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.to);
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              onMouseEnter={() => item.preload()}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group ${
                isActive
                  ? "bg-gradient-to-r from-brand-600 to-violet-600 text-white shadow-md shadow-brand-500/20"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId={`${idPrefix}-activeIndicator`}
                  className="absolute left-0 w-1 h-6 bg-white rounded-r-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className={`w-5 h-5 flex-shrink-0 ${
                isActive ? "" : "text-slate-400 dark:text-slate-500 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors"
              }`} />
              <span className="flex-1">{item.label}</span>
              {item.shortcut && (
                <kbd className="hidden lg:inline-flex kbd text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.shortcut}
                </kbd>
              )}
            </NavLink>
          );
        })}

        <div className="pt-4 mt-4 border-t border-slate-200/60 dark:border-slate-800/60">
          <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3 px-3">
            Quick Actions
          </p>
          <button
            onClick={onOpenPalette}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
          >
            <Command className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors" />
            <span className="flex-1 text-left">Command Palette</span>
            <kbd className="hidden lg:inline-flex kbd text-[10px]">⌘K</kbd>
          </button>
          <button
            onClick={onOpenPalette}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
          >
            <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors" />
            <span className="flex-1 text-left">Search</span>
            <kbd className="hidden lg:inline-flex kbd text-[10px]">⌘/</kbd>
          </button>
        </div>
      </nav>

      {/* User Card */}
      <div className="p-4 border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="p-3 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-800/50 dark:to-slate-900/50 border border-slate-200/60 dark:border-slate-800/60">
          <div className="flex items-center gap-3 mb-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                {currentUser?.avatar || currentUser?.name?.charAt(0)?.toUpperCase()}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                {currentUser?.name}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate capitalize">
                {ROLE_LABELS[currentUser?.role]}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onLogout}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-900 transition-colors text-xs font-medium"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              title="Settings"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default function Layout() {
  const { currentUser, logout, tasks, projects } = useApp();
  const { darkMode, toggle } = useTheme();
  const { setIsOpen: setCommandOpen } = useCommandPalette();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const notifRef = useRef(null);

  const reminders = useMemo(() => getReminderTasks(tasks), [tasks]);
  const allReminders = useMemo(() => {
    const list = [];
    reminders.overdue.forEach((t) => list.push({ ...t, type: "overdue" }));
    reminders.today.forEach((t) => list.push({ ...t, type: "today" }));
    reminders.soon.forEach((t) => list.push({ ...t, type: "soon" }));
    return list;
  }, [reminders]);
  const projectTitles = useMemo(
    () => new Map(projects.map((p) => [p.id, p.title])),
    [projects]
  );

  useEffect(() => {
    if (!notifOpen) return;
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [notifOpen]);

  const handleLogout = useCallback(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const closeNotif = useCallback(() => setNotifOpen(false), []);
  const openPalette = useCallback(() => {
    setCommandOpen(true);
    setSidebarOpen(false);
  }, [setCommandOpen]);
  const openSettings = useCallback(() => {
    setSettingsOpen(true);
    setSidebarOpen(false);
  }, []);
  const closeSettings = useCallback(() => setSettingsOpen(false), []);

  const sidebarProps = {
    pathname: location.pathname,
    currentUser,
    onLogout: handleLogout,
    onOpenPalette: openPalette,
    onNavigate: closeSidebar,
    onOpenSettings: openSettings,
  };

  return (
    <div className="min-h-screen flex">
      {/* Desktop sidebar — static, no mount animation */}
      <aside className="hidden lg:block w-64 flex-shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200/60 dark:border-slate-800/60">
        <div className="sticky top-0 h-screen">
          <SidebarContent idPrefix="desktop" {...sidebarProps} />
        </div>
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 z-50 w-64 lg:hidden bg-white dark:bg-slate-900 border-r border-slate-200/60 dark:border-slate-800/60"
          >
            <SidebarContent idPrefix="mobile" {...sidebarProps} />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95">
          <div className="h-16 border-b border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between px-4 lg:px-8">
            <div className="flex items-center gap-4 min-w-0">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 flex-shrink-0"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 min-w-0">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display tracking-tight truncate">
                  {getPageTitle(location.pathname)}
                </h2>
                <div className="hidden md:flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500 flex-shrink-0">
                  <ChevronRight className="w-3 h-3" />
                  <span>{formatDate(new Date().toISOString())}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <GlobalSearch />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCommandOpen(true)}
                className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
                title="Open Command Palette"
              >
                <Command className="w-4 h-4" />
                <kbd className="kbd text-xs">K</kbd>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggle}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Toggle theme"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-amber-500" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                )}
              </motion.button>

              {/* Notifications */}
              <div className="relative" ref={notifRef}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setNotifOpen(!notifOpen)}
                  className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Notifications"
                >
                  <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  {reminders.total > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 25 }}
                      className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md ring-2 ring-white dark:ring-slate-900"
                    >
                      {reminders.total > 9 ? "9+" : reminders.total}
                    </motion.span>
                  )}
                </motion.button>

                <AnimatePresence>
                  {notifOpen && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 md:hidden"
                        onClick={closeNotif}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50"
                      >
                        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-brand-50/50 to-violet-50/50 dark:from-brand-950/20 dark:to-violet-950/20">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-gradient-to-br from-brand-500 to-violet-600 text-white shadow-md">
                                <Bell className="w-4 h-4" />
                              </div>
                              <div>
                                <h3 className="font-bold text-slate-900 dark:text-white text-sm font-display">
                                  Notifications
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                  {reminders.total === 0
                                    ? "All caught up! 🎉"
                                    : `${reminders.total} task${reminders.total > 1 ? "s" : ""} need attention`}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={closeNotif}
                              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {reminders.total > 0 && (
                          <div className="grid grid-cols-3 gap-2 p-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
                            <div className="text-center p-2 rounded-lg">
                              <div className="flex items-center justify-center gap-1 text-red-600 dark:text-red-400 mb-1">
                                <Flame className="w-3.5 h-3.5" />
                              </div>
                              <p className="text-lg font-bold text-slate-900 dark:text-white tabular-nums">
                                {reminders.overdue.length}
                              </p>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">Overdue</p>
                            </div>
                            <div className="text-center p-2 rounded-lg border-x border-slate-200 dark:border-slate-800">
                              <div className="flex items-center justify-center gap-1 text-amber-600 dark:text-amber-400 mb-1">
                                <Clock className="w-3.5 h-3.5" />
                              </div>
                              <p className="text-lg font-bold text-slate-900 dark:text-white tabular-nums">
                                {reminders.today.length}
                              </p>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">Today</p>
                            </div>
                            <div className="text-center p-2 rounded-lg">
                              <div className="flex items-center justify-center gap-1 text-brand-600 dark:text-brand-400 mb-1">
                                <Calendar className="w-3.5 h-3.5" />
                              </div>
                              <p className="text-lg font-bold text-slate-900 dark:text-white tabular-nums">
                                {reminders.soon.length}
                              </p>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">Upcoming</p>
                            </div>
                          </div>
                        )}

                        <div className="max-h-96 overflow-y-auto">
                          {allReminders.length === 0 ? (
                            <div className="p-8 text-center">
                              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/40 mb-3">
                                <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                              </div>
                              <h4 className="font-semibold text-slate-900 dark:text-white mb-1">All caught up! 🎉</h4>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                You have no urgent tasks right now
                              </p>
                            </div>
                          ) : (
                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                              {allReminders.slice(0, 10).map((task) => (
                                <NotificationItem
                                  key={task.id}
                                  task={task}
                                  projectTitle={projectTitles.get(task.projectId) || "Unknown Project"}
                                  onClose={closeNotif}
                                />
                              ))}
                            </div>
                          )}
                        </div>

                        {allReminders.length > 0 && (
                          <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
                            <Link
                              to="/dashboard"
                              onClick={closeNotif}
                              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-violet-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-brand-500/30 transition-all"
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
        <main className="flex-1 p-4 lg:p-8">
          <Suspense fallback={<PageSkeleton />}>
            <Outlet />
          </Suspense>
        </main>
      </div>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
            className="lg:hidden fixed inset-0 bg-slate-900/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {settingsOpen && <SettingsModal onClose={closeSettings} />}
      </AnimatePresence>
    </div>
  );
}

const TYPE_CONFIG = {
  overdue: {
    icon: <Flame className="w-4 h-4" />,
    bg: "bg-red-50 dark:bg-red-950/40",
    text: "text-red-600 dark:text-red-400",
    border: "border-red-200 dark:border-red-900",
    label: "Overdue",
  },
  today: {
    icon: <Clock className="w-4 h-4" />,
    bg: "bg-amber-50 dark:bg-amber-950/40",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-900",
    label: "Due Today",
  },
  soon: {
    icon: <Calendar className="w-4 h-4" />,
    bg: "bg-brand-50 dark:bg-brand-950/40",
    text: "text-brand-600 dark:text-brand-400",
    border: "border-brand-200 dark:border-brand-900",
    label: "Upcoming",
  },
};

const NotificationItem = memo(function NotificationItem({ task, projectTitle, onClose }) {
  const config = TYPE_CONFIG[task.type] || {
    icon: <AlertTriangle className="w-4 h-4" />,
    bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-200", label: "Info",
  };

  return (
    <Link
      to={`/projects/${task.projectId}`}
      onClick={onClose}
      className="block p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
    >
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 p-2 rounded-lg ${config.bg} ${config.text} border ${config.border}`}>
          {config.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="font-semibold text-sm text-slate-900 dark:text-white line-clamp-1 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
              {task.title}
            </h4>
            <span className={`flex-shrink-0 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${config.bg} ${config.text} border ${config.border}`}>
              {config.label}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mb-1.5">{projectTitle}</p>
          <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(task.dueDate)}
            </span>
            <span className="capitalize flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              {task.priority}
            </span>
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-brand-500 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
      </div>
    </Link>
  );
});