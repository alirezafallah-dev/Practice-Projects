import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import {
  Plus,
  Search,
  Filter,
  FolderKanban,
  Users,
  Calendar,
  TrendingUp,
  MoreVertical,
  Edit2,
  Trash2,
  X,
  CheckCircle2,
  Clock,
  AlertCircle,
  PauseCircle,
  PlayCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECT_STATUS_LABELS } from "../constants";
import { formatDate } from "../utils/date.js";
import { useToast } from "../context/ToastContext.jsx";

export default function ProjectsPage() {
  const { projects, tasks, users, addProject, deleteProject } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();

  // Filter and search projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || project.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [projects, searchQuery, statusFilter]);

  // Project stats
  const stats = useMemo(() => {
    return {
      total: projects.length,
      active: projects.filter((p) => p.status === "active").length,
      planning: projects.filter((p) => p.status === "planning").length,
      completed: projects.filter((p) => p.status === "completed").length,
    };
  }, [projects]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <PlayCircle className="w-4 h-4" />;
      case "planning":
        return <Clock className="w-4 h-4" />;
      case "on_hold":
        return <PauseCircle className="w-4 h-4" />;
      case "completed":
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "planning":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "on_hold":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case "completed":
        return "bg-slate-100 text-slate-700 dark:bg-slate-700/30 dark:text-slate-300";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Projects
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage and track all your team projects
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
        >
          <Plus className="w-5 h-5" />
          New Project
        </motion.button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatMini
          label="Total Projects"
          value={stats.total}
          icon={<FolderKanban className="w-5 h-5" />}
          color="bg-blue-500"
        />
        <StatMini
          label="Active"
          value={stats.active}
          icon={<PlayCircle className="w-5 h-5" />}
          color="bg-emerald-500"
        />
        <StatMini
          label="Planning"
          value={stats.planning}
          icon={<Clock className="w-5 h-5" />}
          color="bg-purple-500"
        />
        <StatMini
          label="Completed"
          value={stats.completed}
          icon={<CheckCircle2 className="w-5 h-5" />}
          color="bg-slate-500"
        />
      </motion.div>

      {/* Search and Filters */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl border font-medium transition-all ${
              showFilters
                ? "bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400"
                : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
            }`}
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                {["all", "active", "planning", "on_hold", "completed"].map(
                  (status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        statusFilter === status
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                          : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                      }`}
                    >
                      {status === "all" ? "All" : PROJECT_STATUS_LABELS[status]}
                    </button>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full flex flex-col items-center justify-center py-16 text-center"
            >
              <FolderKanban className="w-16 h-16 text-slate-300 dark:text-slate-600 mb-4" />
              <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
                No projects found
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6">
                {searchQuery || statusFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Get started by creating your first project"}
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
              >
                <Plus className="w-5 h-5" />
                Create Project
              </button>
            </motion.div>
          ) : (
            filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                tasks={tasks}
                users={users}
                onDelete={(id) => {
                  if (confirm("Are you sure you want to delete this project?")) {
                    deleteProject(id);
                    toast.success("Project deleted successfully"); // ✨
                  }
                }}
              />
            ))
          )}
        </AnimatePresence>
      </motion.div>

      {/* Add Project Modal */}
      <AnimatePresence>
        {showAddModal && (
          <AddProjectModal
            onClose={() => setShowAddModal(false)}
            onAdd={addProject}
            users={users}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Project Card Component
function ProjectCard({ project, tasks, users, onDelete }) {
  const projectTasks = tasks.filter((t) => t.projectId === project.id);
  const doneTasks = projectTasks.filter((t) => t.status === "done").length;
  const progress = projectTasks.length
    ? Math.round((doneTasks / projectTasks.length) * 100)
    : project.progress || 0;
  const projectMembers = users.filter((u) => project.members?.includes(u.id));

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <PlayCircle className="w-4 h-4" />;
      case "planning":
        return <Clock className="w-4 h-4" />;
      case "on_hold":
        return <PauseCircle className="w-4 h-4" />;
      case "completed":
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "planning":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "on_hold":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case "completed":
        return "bg-slate-100 text-slate-700 dark:bg-slate-700/30 dark:text-slate-300";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        to={`/projects/${project.id}`}
        className="block h-full bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-all duration-300 group"
      >
        {/* Card Header with Gradient */}
        <div
          className={`relative h-32 bg-gradient-to-br ${
            project.color || "from-blue-500 to-purple-600"
          } p-6 overflow-hidden`}
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />
          <div className="relative flex items-start justify-between">
            <div className="flex-1">
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium mb-2`}
              >
                {getStatusIcon(project.status)}
                {PROJECT_STATUS_LABELS[project.status]}
              </div>
              <h3 className="text-xl font-bold text-white line-clamp-2 group-hover:translate-x-1 transition-transform">
                {project.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 min-h-[40px]">
            {project.description}
          </p>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Progress
              </span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {progress}%
              </span>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`h-full bg-gradient-to-r ${
                  project.color || "from-blue-500 to-purple-600"
                } rounded-full`}
              />
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                <FolderKanban className="w-4 h-4" />
                <span>
                  {doneTasks}/{projectTasks.length} tasks
                </span>
              </div>
            </div>

            {/* Team Avatars */}
            <div className="flex -space-x-2">
              {projectMembers.slice(0, 3).map((member) => (
                <div
                  key={member.id}
                  className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-white dark:border-slate-800 flex items-center justify-center text-white text-xs font-semibold"
                  title={member.name}
                >
                  {member.avatar || member.name.charAt(0)}
                </div>
              ))}
              {projectMembers.length > 3 && (
                <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-600 border-2 border-white dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 text-xs font-semibold">
                  +{projectMembers.length - 3}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// Stat Mini Component
function StatMini({ label, value, icon, color }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-4"
    >
      <div
        className={`p-2.5 rounded-lg ${color} text-white shadow-md`}
      >
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-900 dark:text-white">
          {value}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
      </div>
    </motion.div>
  );
}

// Add Project Modal
function AddProjectModal({ onClose, onAdd, users }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "planning",
    startDate: "",
    endDate: "",
    members: [],
    color: "from-blue-500 to-purple-600",
  });

  const colorOptions = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-amber-500 to-orange-500",
    "from-emerald-500 to-teal-500",
    "from-rose-500 to-red-500",
    "from-indigo-500 to-blue-500",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    toast.success(`Project "${formData.title}" created successfully!`); // ✨
    onClose();
  };

  const toggleMember = (userId) => {
    setFormData((prev) => ({
      ...prev,
      members: prev.members.includes(userId)
        ? prev.members.filter((id) => id !== userId)
        : [...prev.members, userId],
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Create New Project
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Fill in the details to create a new project
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto max-h-[60vh]">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Project Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter project title"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe your project..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
            />
          </div>

          {/* Status and Dates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <option value="planning">Planning</option>
                <option value="active">Active</option>
                <option value="on_hold">On Hold</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Project Color
            </label>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData({ ...formData, color })}
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} transition-all ${
                    formData.color === color
                      ? "ring-2 ring-offset-2 ring-blue-500 scale-110"
                      : "opacity-70 hover:opacity-100"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Team Members */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Team Members
            </label>
            <div className="grid grid-cols-2 gap-2">
              {users.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => toggleMember(user.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    formData.members.includes(user.id)
                      ? "bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700"
                      : "bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold">
                    {user.avatar || user.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
                    {user.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
          >
            Create Project
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}