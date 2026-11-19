import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  LayoutDashboard,
  FolderKanban,
  Users,
  Plus,
  Moon,
  Sun,
  LogOut,
  Check,
  Zap,
  ArrowRight,
  Command,
  Hash,
  User,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { useCommandPalette } from "../context/CommandPaletteContext";

export default function CommandPalette() {
  const { isOpen, setIsOpen } = useCommandPalette();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { projects, tasks, users, logout } = useApp();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Build commands list
  const commands = useMemo(() => {
    const base = [
      {
        id: "nav-dashboard",
        category: "Navigation",
        icon: LayoutDashboard,
        label: "Go to Dashboard",
        shortcut: ["G", "D"],
        action: () => { navigate("/dashboard"); setIsOpen(false); },
      },
      {
        id: "nav-projects",
        category: "Navigation",
        icon: FolderKanban,
        label: "Go to Projects",
        shortcut: ["G", "P"],
        action: () => { navigate("/projects"); setIsOpen(false); },
      },
      {
        id: "nav-team",
        category: "Navigation",
        icon: Users,
        label: "Go to Team",
        shortcut: ["G", "T"],
        action: () => { navigate("/users"); setIsOpen(false); },
      },
      {
        id: "action-new-task",
        category: "Actions",
        icon: Plus,
        label: "Create new task",
        shortcut: ["N"],
        action: () => { navigate("/projects/1"); setIsOpen(false); },
      },
      {
        id: "action-toggle-theme",
        category: "Actions",
        icon: darkMode ? Sun : Moon,
        label: `Switch to ${darkMode ? "light" : "dark"} mode`,
        shortcut: ["T"],
        action: () => {
          const newMode = !darkMode;
          setDarkMode(newMode);
          if (newMode) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
          localStorage.setItem("darkMode", JSON.stringify(newMode));
          setIsOpen(false);
        },
      },
      {
        id: "action-logout",
        category: "Actions",
        icon: LogOut,
        label: "Sign out",
        action: () => { logout(); navigate("/login"); setIsOpen(false); },
      },
    ];

    // Add projects
    const projectCmds = projects.map((p) => ({
      id: `project-${p.id}`,
      category: "Projects",
      icon: FolderKanban,
      label: p.title,
      subtitle: p.status,
      action: () => { navigate(`/projects/${p.id}`); setIsOpen(false); },
    }));

    // Add tasks
    const taskCmds = tasks.slice(0, 8).map((t) => ({
      id: `task-${t.id}`,
      category: "Tasks",
      icon: Check,
      label: t.title,
      subtitle: `Status: ${t.status}`,
      action: () => { navigate(`/projects/${t.projectId}`); setIsOpen(false); },
    }));

    return [...base, ...projectCmds, ...taskCmds];
  }, [projects, tasks, users, navigate, logout, darkMode, setIsOpen]);

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(q) ||
        cmd.category?.toLowerCase().includes(q) ||
        cmd.subtitle?.toLowerCase().includes(q)
    );
  }, [query, commands]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => (i + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => (i - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].action?.();
    }
  };

  if (!isOpen) return null;

  const grouped = filtered.reduce((acc, cmd) => {
    const cat = cmd.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(cmd);
    return acc;
  }, {});

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.15 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800"
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 px-5 border-b border-slate-200 dark:border-slate-800">
            <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a command or search..."
              className="flex-1 py-4 bg-transparent outline-none text-slate-900 dark:text-white placeholder-slate-400 text-base"
            />
            <kbd className="kbd">ESC</kbd>
          </div>

          {/* Results */}
          <div className="max-h-[400px] overflow-y-auto py-2">
            {filtered.length === 0 ? (
              <div className="py-12 text-center">
                <Search className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                <p className="text-slate-500 dark:text-slate-400">No results found</p>
              </div>
            ) : (
              Object.entries(grouped).map(([category, cmds]) => (
                <div key={category} className="px-2">
                  <div className="px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {category}
                  </div>
                  {cmds.map((cmd) => {
                    const Icon = cmd.icon;
                    const globalIdx = filtered.findIndex((c) => c.id === cmd.id);
                    const isSelected = globalIdx === selectedIndex;
                    return (
                      <button
                        key={cmd.id}
                        onClick={cmd.action}
                        onMouseEnter={() => setSelectedIndex(globalIdx)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                          isSelected
                            ? "bg-brand-50 dark:bg-brand-950/40"
                            : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isSelected
                            ? "bg-brand-500 text-white"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`text-sm font-medium truncate ${
                            isSelected ? "text-brand-600 dark:text-brand-400" : "text-slate-900 dark:text-white"
                          }`}>
                            {cmd.label}
                          </div>
                          {cmd.subtitle && (
                            <div className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                              {cmd.subtitle}
                            </div>
                          )}
                        </div>
                        {cmd.shortcut && (
                          <div className="flex items-center gap-1 flex-shrink-0">
                            {cmd.shortcut.map((key, i) => (
                              <kbd key={i} className="kbd">{key}</kbd>
                            ))}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <kbd className="kbd">↑↓</kbd>
                <span>Navigate</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="kbd">↵</kbd>
                <span>Select</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Command className="w-3 h-3" />
              <span>Built with TaskFlow</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}