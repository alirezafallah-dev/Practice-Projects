import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Command, FolderKanban, CheckCircle2, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../context/AppContext";
import { useCommandPalette } from "../context/CommandPaletteContext";

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { projects, tasks, users } = useApp();
  const { setIsOpen: setCommandOpen } = useCommandPalette();

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "/") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const results = query.trim()
    ? {
        projects: projects.filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        ),
        tasks: tasks.filter((t) =>
          t.title.toLowerCase().includes(query.toLowerCase())
        ),
        users: users.filter((u) =>
          u.name.toLowerCase().includes(query.toLowerCase())
        ),
      }
    : { projects: [], tasks: [], users: [] };

  const totalResults =
    results.projects.length + results.tasks.length + results.users.length;

  return (
    <>
      {/* Search Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm text-slate-500 dark:text-slate-400"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="kbd ml-2">⌘/</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setOpen(false); setQuery(""); }}
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
            >
              <div className="flex items-center gap-3 px-5 border-b border-slate-200 dark:border-slate-800">
                <Search className="w-5 h-5 text-slate-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search projects, tasks, team..."
                  className="flex-1 py-4 bg-transparent outline-none text-slate-900 dark:text-white placeholder-slate-400"
                />
                <button
                  onClick={() => { setOpen(false); setQuery(""); }}
                  className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
                >
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              <div className="max-h-[400px] overflow-y-auto">
                {query.trim() && totalResults === 0 && (
                  <div className="py-12 text-center">
                    <p className="text-slate-500">No results for "{query}"</p>
                  </div>
                )}

                {results.projects.length > 0 && (
                  <div className="p-2">
                    <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Projects ({results.projects.length})
                    </div>
                    {results.projects.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => { navigate(`/projects/${p.id}`); setOpen(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-left"
                      >
                        <div className="w-8 h-8 rounded-lg bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                          <FolderKanban className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-slate-900 dark:text-white">
                            {p.title}
                          </div>
                          <div className="text-xs text-slate-500">{p.status}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {results.tasks.length > 0 && (
                  <div className="p-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Tasks ({results.tasks.length})
                    </div>
                    {results.tasks.slice(0, 6).map((t) => (
                      <button
                        key={t.id}
                        onClick={() => { navigate(`/projects/${t.projectId}`); setOpen(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-left"
                      >
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-slate-900 dark:text-white truncate">
                            {t.title}
                          </div>
                          <div className="text-xs text-slate-500 capitalize">{t.status}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {results.users.length > 0 && (
                  <div className="p-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Team ({results.users.length})
                    </div>
                    {results.users.slice(0, 5).map((u) => (
                      <div
                        key={u.id}
                        className="flex items-center gap-3 px-3 py-2"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center text-white text-xs font-semibold">
                          {u.avatar || u.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-900 dark:text-white">
                            {u.name}
                          </div>
                          <div className="text-xs text-slate-500 capitalize">{u.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {!query.trim() && (
                  <div className="p-6 text-center text-slate-500 text-sm">
                    <Command className="w-5 h-5 mx-auto mb-2 opacity-50" />
                    <p>Try <kbd className="kbd">⌘K</kbd> for command palette</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}