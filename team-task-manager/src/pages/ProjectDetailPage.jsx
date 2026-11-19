import { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import { useCommandPalette } from "../context/CommandPaletteContext.jsx";
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
  Sparkles,
  Target,
  Command,
  Download,
  Share2,
  MessageSquare,
  FolderKanban,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { STATUS_LABELS, PRIORITY_LABELS, PRIORITY_COLORS } from "../constants";
import { formatDate, getRelativeTime, isOverdue, isDueToday } from "../utils/date.js";
import { useToast } from "../context/ToastContext.jsx";

const COLUMNS = [
  {
    id: "todo",
    label: "To Do",
    color: "bg-slate-500",
    bgColor: "bg-slate-50 dark:bg-slate-900",
    icon: Clock,
    dotColor: "bg-slate-400",
  },
  {
    id: "in_progress",
    label: "In Progress",
    color: "bg-brand-500",
    bgColor: "bg-brand-50 dark:bg-brand-950/30",
    icon: TrendingUp,
    dotColor: "bg-brand-500",
  },
  {
    id: "in_review",
    label: "In Review",
    color: "bg-amber-500",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    icon: AlertCircle,
    dotColor: "bg-amber-500",
  },
  {
    id: "done",
    label: "Done",
    color: "bg-emerald-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    icon: CheckCircle2,
    dotColor: "bg-emerald-500",
  },
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
  const { toast } = useToast();
  const { triggerConfetti } = useCommandPalette();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [filter, setFilter] = useState("all");

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
    const inProgress = projectTasks.filter((t) => t.status === "in_progress").length;
    const progress = total ? Math.round((done / total) * 100) : 0;
    const overdue = projectTasks.filter(isOverdue).length;
    const dueToday = projectTasks.filter(isDueToday).length;
    return { total, done, inProgress, progress, overdue, dueToday };
  }, [projectTasks]);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
          <AlertCircle className="w-10 h-10 text-slate-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2 font-display">
          Project not found
        </h2>
        <p className="text-slate-500 mb-6 text-center max-w-md">
          The project you're looking for doesn't exist or has been deleted.
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 text-white font-medium hover:bg-brand-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to projects
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
      const task = tasks.find((t) => t.id === draggedTask);
      updateTask(draggedTask, { status: columnId });

      if (columnId === "done" && task?.status !== "done") {
        triggerConfetti();
        toast.success("Task completed! 🎉");
      }
    }
    setDraggedTask(null);
    setDragOverColumn(null);
  };

  const handleDeleteTask = (taskId) => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTask(taskId);
      toast.success("Task deleted successfully");
    }
  };

  const handleDeleteProject = () => {
    if (confirm("Are you sure you want to delete this project and all its tasks?")) {
      deleteProject(project.id);
      toast.success("Project and all tasks deleted");
      navigate("/projects");
    }
  };

  const handleCompleteTask = (task) => {
    if (task.status !== "done") {
      updateTask(task.id, { status: "done" });
      triggerConfetti();
      toast.success(`Task "${task.title}" completed! 🎉`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Navigation */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 font-medium transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>
      </motion.div>

      {/* Project Header - Modern European Design */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${project.color} p-8 text-white`}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-medium border border-white/20">
                  {project.status.charAt(0).toUpperCase() +
                    project.status.slice(1).replace("_", " ")}
                </span>
                <span className="text-white/70 text-sm flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Created {formatDate(project.createdAt)}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-3 font-display tracking-tight">
                {project.title}
              </h1>
              <p className="text-white/90 text-base max-w-3xl leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Action Menu */}
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors" title="Share">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors" title="Export">
                <Download className="w-4 h-4" />
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {showMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.1 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-20"
                    >
                      <button className="w-full px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2 text-slate-700 dark:text-slate-300 text-sm">
                        <Edit2 className="w-4 h-4" />
                        Edit Project
                      </button>
                      <button
                        onClick={handleDeleteProject}
                        className="w-full px-4 py-3 text-left hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 text-red-600 text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete Project
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <HeaderStat icon={<Target className="w-4 h-4" />} label="Progress" value={`${stats.progress}%`} />
            <HeaderStat icon={<TrendingUp className="w-4 h-4" />} label="Done" value={`${stats.done}/${stats.total}`} />
            <HeaderStat
              icon={<AlertCircle className="w-4 h-4" />}
              label="Overdue"
              value={stats.overdue}
              alert={stats.overdue > 0}
            />
            <HeaderStat
              icon={<Clock className="w-4 h-4" />}
              label="Due Today"
              value={stats.dueToday}
              alert={stats.dueToday > 0}
            />
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex items-center justify-between mb-2 text-sm">
              <span className="text-white/80">Overall Progress</span>
              <span className="font-semibold font-display">{stats.progress}%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stats.progress}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
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
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white font-display tracking-tight">
            Tasks Board
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Drag and drop tasks between columns to update their status
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-medium">
            <Command className="w-3 h-3" />
            <span>K</span>
            <span className="text-slate-400 dark:text-slate-600">Quick actions</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm shadow-sm hover:shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Task
          </motion.button>
        </div>
      </motion.div>

      {/* Kanban Board */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4"
      >
        {COLUMNS.map((column) => {
          const columnTasks = projectTasks.filter((t) => t.status === column.id);
          const Icon = column.icon;
          const isOver = dragOverColumn === column.id;

          return (
            <motion.div
              key={column.id}
              layout
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column.id)}
              className={`bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-4 min-h-[500px] transition-all ${
                isOver ? "ring-2 ring-brand-500 bg-brand-50 dark:bg-brand-950/30" : ""
              }`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className={`w-2 h-2 rounded-full ${column.dotColor}`} />
                  <h3 className="font-semibold text-sm text-slate-900 dark:text-white">
                    {column.label}
                  </h3>
                  <span className="px-2 py-0.5 rounded-md bg-slate-200/70 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 tabular-nums">
                    {columnTasks.length}
                  </span>
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                  title="Add task"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Tasks List */}
              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {columnTasks.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl"
                    >
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 mb-2">
                        <Icon className="w-5 h-5 text-slate-400" />
                      </div>
                      <p className="text-sm text-slate-400 dark:text-slate-500">No tasks</p>
                      <p className="text-xs text-slate-400 dark:text-slate-600 mt-1">
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
                        onComplete={() => handleCompleteTask(task)}
                        onDragStart={(e) => handleDragStart(e, task.id)}
                        isDragging={draggedTask === task.id}
                      />
                    ))
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
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
              toast.success("Task created successfully! 🎉");
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
              const wasNotDone = editingTask.status !== "done";
              updateTask(editingTask.id, taskData);
              setEditingTask(null);

              if (wasNotDone && taskData.status === "done") {
                triggerConfetti();
                toast.success("Task completed! 🎉");
              } else {
                toast.success("Task updated successfully!");
              }
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Modern Task Card Component
function TaskCard({ task, users, onEdit, onDelete, onComplete, onDragStart, isDragging }) {
  const assignee = users.find((u) => u.id === task.assigneeId);
  const overdue = isOverdue(task);
  const dueToday = isDueToday(task);
  const isDone = task.status === "done";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: isDragging ? 0.4 : 1,
        scale: 1,
        rotate: isDragging ? 2 : 0,
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      draggable
      onDragStart={onDragStart}
      className={`bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 cursor-grab active:cursor-grabbing hover:shadow-md transition-all group ${
        isDragging ? "opacity-50 shadow-xl" : ""
      } ${isDone ? "opacity-75" : ""}`}
    >
      {/* Priority & Actions */}
      <div className="flex items-start justify-between mb-3">
        <span
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider ${PRIORITY_COLORS[task.priority]}`}
        >
          <Flag className="w-2.5 h-2.5" />
          {PRIORITY_LABELS[task.priority]}
        </span>

        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onComplete}
            disabled={isDone}
            className={`p-1.5 rounded-lg transition-all ${
              isDone
                ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-500"
                : "text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-500"
            }`}
            title={isDone ? "Completed" : "Mark as complete"}
          >
            <CheckCircle2 className="w-4 h-4" />
          </button>
          <button
            onClick={onEdit}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            title="Edit"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-red-500 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Title */}
      <h4
        className={`font-semibold text-slate-900 dark:text-white text-sm mb-2 line-clamp-2 ${
          isDone ? "line-through text-slate-400 dark:text-slate-500" : ""
        }`}
      >
        {task.title}
      </h4>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Due Date */}
      {task.dueDate && (
        <div
          className={`inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-md mb-3 ${
            overdue && !isDone
              ? "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400"
              : dueToday && !isDone
              ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
              : isDone
              ? "bg-slate-50 text-slate-400 dark:bg-slate-700/30 dark:text-slate-500"
              : "bg-slate-50 text-slate-600 dark:bg-slate-700 dark:text-slate-400"
          }`}
        >
          <Calendar className="w-3 h-3" />
          {overdue && !isDone ? "Overdue" : dueToday && !isDone ? "Due today" : formatDate(task.dueDate)}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700/50">
        {assignee ? (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center text-white text-[10px] font-semibold">
              {assignee.avatar || assignee.name.charAt(0)}
            </div>
            <span className="text-xs text-slate-600 dark:text-slate-400 font-medium truncate max-w-[100px]">
              {assignee.name.split(" ")[0]}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <User className="w-3 h-3" />
            <span>Unassigned</span>
          </div>
        )}

        <GripVertical className="w-4 h-4 text-slate-300 dark:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  );
}

// Modern Header Stat Component
function HeaderStat({ icon, label, value, alert }) {
  return (
    <div
      className={`p-3 rounded-xl backdrop-blur-sm transition-all ${
        alert ? "bg-white/25 ring-2 ring-white/30" : "bg-white/10"
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-xs text-white/80">{label}</span>
      </div>
      <p className="text-xl md:text-2xl font-bold font-display tabular-nums">{value}</p>
    </div>
  );
}

// Modern Task Modal Component
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

  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Task title is required");
      return;
    }
    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden border border-slate-200 dark:border-slate-800"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
              {task ? "Edit Task" : "Create New Task"}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
              <FolderKanban className="w-3.5 h-3.5" />
              {project.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              autoFocus
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Design homepage hero section"
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-transparent transition-all"
            />
          </div>

          {/* Description */}
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
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Status & Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-transparent transition-all"
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
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-transparent transition-all"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          {/* Assignee & Due Date */}
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
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-transparent transition-all"
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
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold shadow-sm hover:shadow-md transition-all"
            >
              {task ? "Save Changes" : "Create Task"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}