import { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import {
  ArrowLeft,
  Plus,
  Calendar,
  Users,
  TrendingUp,
  MoreVertical,
  Edit2,
  Trash2,
  X,
  CheckCircle2,
  Clock,
  AlertCircle,
  Flag,
  User,
  GripVertical,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { STATUS_LABELS, PRIORITY_LABELS, PRIORITY_COLORS } from "../constants";
import { formatDate, getRelativeTime, isOverdue, isDueToday } from "../utils/date.js";

const COLUMNS = [
  { id: "todo", label: "To Do", color: "bg-slate-500", icon: Clock },
  { id: "in_progress", label: "In Progress", color: "bg-blue-500", icon: TrendingUp },
  { id: "in_review", label: "In Review", color: "bg-amber-500", icon: AlertCircle },
  { id: "done", label: "Done", color: "bg-emerald-500", icon: CheckCircle2 },
];

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const {
    projects,
    tasks,
    users,
    updateTask,
    addTask,
    deleteTask,
    deleteProject,
    updateProject,
  } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const project = projects.find((p) => p.id === parseInt(projectId));

  const projectTasks = useMemo(() => {
    return tasks.filter((t) => t.projectId === parseInt(projectId));
  }, [tasks, projectId]);

  const projectMembers = useMemo(() => {
    return users.filter((u) => project?.members?.includes(u.id));
  }, [users, project]);

  const stats = useMemo(() => {
    const total = projectTasks.length;
    const done = projectTasks.filter((t) => t.status === "done").length;
    const progress = total ? Math.round((done / total) * 100) : 0;
    const overdue = projectTasks.filter(isOverdue).length;
    const dueToday = projectTasks.filter(isDueToday).length;
    return { total, done, progress, overdue, dueToday };
  }, [projectTasks]);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <AlertCircle className="w-16 h-16 text-slate-300 mb-4" />
        <h2 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">
          Project not found
        </h2>
        <Link
          to="/projects"
          className="text-blue-500 hover:text-blue-600 font-medium"
        >
          ← Back to projects
        </Link>
      </div>
    );
  }

  const handleDragStart = (e, taskId) => {
    setDraggedTask(taskId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverColumn(columnId);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e, columnId) => {
    e.preventDefault();
    if (draggedTask) {
      updateTask(draggedTask, { status: columnId });
    }
    setDraggedTask(null);
    setDragOverColumn(null);
  };

  const handleDeleteTask = (taskId) => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTask(taskId);
    }
  };

  const handleDeleteProject = () => {
    if (confirm("Are you sure you want to delete this project and all its tasks?")) {
      deleteProject(project.id);
      navigate("/projects");
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
    <div className="space-y-6">
      {/* Back Navigation */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>
      </motion.div>

      {/* Project Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${project.color} p-8 text-white shadow-2xl`}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className={`px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-medium`}
                >
                  {project.status.charAt(0).toUpperCase() +
                    project.status.slice(1).replace("_", " ")}
                </span>
                <span className="text-white/70 text-sm">
                  Created {formatDate(project.createdAt)}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                {project.title}
              </h1>
              <p className="text-white/80 text-lg max-w-3xl">
                {project.description}
              </p>
            </div>

            {/* Action Menu */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
              <AnimatePresence>
                {showMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-20"
                  >
                    <button className="w-full px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <Edit2 className="w-4 h-4" />
                      Edit Project
                    </button>
                    <button
                      onClick={handleDeleteProject}
                      className="w-full px-4 py-3 text-left hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Project
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <HeaderStat
              icon={<CheckCircle2 className="w-5 h-5" />}
              label="Progress"
              value={`${stats.progress}%`}
            />
            <HeaderStat
              icon={<TrendingUp className="w-5 h-5" />}
              label="Tasks Done"
              value={`${stats.done}/${stats.total}`}
            />
            <HeaderStat
              icon={<AlertCircle className="w-5 h-5" />}
              label="Overdue"
              value={stats.overdue}
              alert={stats.overdue > 0}
            />
            <HeaderStat
              icon={<Clock className="w-5 h-5" />}
              label="Due Today"
              value={stats.dueToday}
              alert={stats.dueToday > 0}
            />
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2 text-sm">
              <span className="text-white/80">Overall Progress</span>
              <span className="font-bold">{stats.progress}%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stats.progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-white rounded-full"
              />
            </div>
          </div>

          {/* Team Members */}
          <div className="mt-6 flex items-center gap-4 flex-wrap">
            <span className="text-sm text-white/80 font-medium">Team:</span>
            <div className="flex -space-x-2">
              {projectMembers.slice(0, 5).map((member) => (
                <div
                  key={member.id}
                  className="w-9 h-9 rounded-full bg-white text-slate-900 border-2 border-white/30 flex items-center justify-center text-xs font-bold shadow-lg"
                  title={member.name}
                >
                  {member.avatar || member.name.charAt(0)}
                </div>
              ))}
              {projectMembers.length > 5 && (
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center text-white text-xs font-semibold">
                  +{projectMembers.length - 5}
                </div>
              )}
            </div>
            <span className="text-sm text-white/80">
              {projectMembers.length} member{projectMembers.length !== 1 && "s"}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Kanban Board Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Tasks Board
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Drag and drop tasks between columns to update their status
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Task
        </motion.button>
      </motion.div>

      {/* Kanban Board */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4"
      >
        {COLUMNS.map((column) => {
          const columnTasks = projectTasks.filter(
            (t) => t.status === column.id
          );
          const Icon = column.icon;
          const isOver = dragOverColumn === column.id;

          return (
            <div
              key={column.id}
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column.id)}
              className={`bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 min-h-[500px] transition-all ${
                isOver
                  ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : ""
              }`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-lg ${column.color} bg-opacity-20 flex items-center justify-center`}
                  >
                    <Icon
                      className={`w-4 h-4 ${column.color.replace(
                        "bg-",
                        "text-"
                      )}`}
                    />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    {column.label}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {columnTasks.length}
                  </span>
                </div>
              </div>

              {/* Tasks List */}
              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {columnTasks.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl"
                    >
                      <p className="text-sm text-slate-400 dark:text-slate-500">
                        No tasks
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                        Drop tasks here
                      </p>
                    </motion.div>
                  ) : (
                    columnTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        users={users}
                        onEdit={() => setEditingTask(task)}
                        onDelete={() => handleDeleteTask(task.id)}
                        onDragStart={(e) => handleDragStart(e, task.id)}
                        isDragging={draggedTask === task.id}
                      />
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Add Task Modal */}
      <AnimatePresence>
        {showAddModal && (
          <TaskModal
            project={project}
            users={users}
            onClose={() => setShowAddModal(false)}
            onSave={(taskData) => {
              addTask({ ...taskData, projectId: parseInt(projectId) });
              setShowAddModal(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* Edit Task Modal */}
      <AnimatePresence>
        {editingTask && (
          <TaskModal
            task={editingTask}
            project={project}
            users={users}
            onClose={() => setEditingTask(null)}
            onSave={(taskData) => {
              updateTask(editingTask.id, taskData);
              setEditingTask(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Task Card Component
function TaskCard({ task, users, onEdit, onDelete, onDragStart, isDragging }) {
  const assignee = users.find((u) => u.id === task.assigneeId);
  const overdue = isOverdue(task);
  const dueToday = isDueToday(task);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isDragging ? 0.5 : 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      draggable
      onDragStart={onDragStart}
      whileHover={{ y: -2 }}
      className={`bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 cursor-grab active:cursor-grabbing hover:shadow-md transition-all ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {/* Priority & Menu */}
      <div className="flex items-start justify-between mb-3">
        <span
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${PRIORITY_COLORS[task.priority]}`}
        >
          <Flag className="w-3 h-3" />
          {PRIORITY_LABELS[task.priority]}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={onEdit}
            className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-blue-500 transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Title */}
      <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-2 line-clamp-2">
        {task.title}
      </h4>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
          {task.description}
        </p>
      )}

      {/* Due Date */}
      {task.dueDate && (
        <div
          className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md mb-3 ${
            overdue
              ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              : dueToday
              ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
              : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400"
          }`}
        >
          <Calendar className="w-3 h-3" />
          {overdue ? "Overdue" : dueToday ? "Due Today" : formatDate(task.dueDate)}
        </div>
      )}

      {/* Assignee */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
        {assignee ? (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold">
              {assignee.avatar || assignee.name.charAt(0)}
            </div>
            <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              {assignee.name.split(" ")[0]}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <User className="w-3 h-3" />
            Unassigned
          </div>
        )}
        <div className="text-slate-300 dark:text-slate-600">
          <GripVertical className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
}

// Header Stat Component
function HeaderStat({ icon, label, value, alert }) {
  return (
    <div
      className={`p-3 rounded-xl backdrop-blur-sm ${
        alert ? "bg-white/25" : "bg-white/10"
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-xs text-white/80">{label}</span>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

// Task Modal Component
function TaskModal({ task, project, users, onClose, onSave }) {
  const [formData, setFormData] = useState(
    task || {
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
      assigneeId: null,
      dueDate: "",
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
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
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {task ? "Edit Task" : "Create New Task"}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {project.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter task title"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe the task..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                {COLUMNS.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Assignee
              </label>
              <select
                value={formData.assigneeId || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    assigneeId: e.target.value ? parseInt(e.target.value) : null,
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <option value="">Unassigned</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate || ""}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
            >
              {task ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}