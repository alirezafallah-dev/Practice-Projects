import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import {
  Plus,
  Search,
  Users,
  Mail,
  Shield,
  Code2,
  Palette,
  Bug,
  Crown,
  MoreVertical,
  Edit2,
  Trash2,
  X,
  Award,
  Target,
  Zap,
  Eye,
  MessageSquare,
  UserPlus,
  Send,
  FolderKanban,
  Save,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ROLE_LABELS } from "../constants";
import { useToast } from "../context/ToastContext.jsx";
import { useConfirm } from "../context/ConfirmDialogContext.jsx";

// Helper functions
const getRoleIcon = (role) => {
  switch (role) {
    case "admin": return Crown;
    case "manager": return Shield;
    case "developer": return Code2;
    case "designer": return Palette;
    case "qa": return Bug;
    default: return Users;
  }
};

const getRoleColor = (role) => {
  switch (role) {
    case "admin": return "from-amber-500 to-orange-500";
    case "manager": return "from-purple-500 to-pink-500";
    case "developer": return "from-blue-500 to-cyan-500";
    case "designer": return "from-pink-500 to-rose-500";
    case "qa": return "from-emerald-500 to-teal-500";
    default: return "from-slate-500 to-slate-600";
  }
};

export default function UsersPage() {
  const { users, tasks, currentUser, deleteUser } = useApp();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [actionModal, setActionModal] = useState(null); // { type, user }
  const menuRef = useRef(null);
  const confirm = useConfirm();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    if (openMenuId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [openMenuId]);

  // Filter users
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, searchQuery, roleFilter]);

  // Stats
  const stats = useMemo(() => {
    return {
      total: users.length,
      admins: users.filter((u) => u.role === "admin").length,
      developers: users.filter((u) => u.role === "developer").length,
      designers: users.filter((u) => u.role === "designer").length,
    };
  }, [users]);

  // Handle menu actions - REAL FUNCTIONALITY
  const handleAction = (action, user) => {
    setOpenMenuId(null);

    if (action === "remove") {
      if (user.id === currentUser?.id) {
        toast.error("You cannot remove yourself!");
        return;
      }
      if (confirm(`Remove ${user.name} from the team? All their tasks will be unassigned.`)) {
        deleteUser(user.id);
        toast.success(`${user.name} removed from team`);
      }
    } else {
      setActionModal({ type: action, user });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Team Members
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage your team and their performance
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold shadow-md shadow-blue-500/20 hover:shadow-blue-500/40 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Member
        </motion.button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3"
      >
        <StatCard
          label="Total Members"
          value={stats.total}
          icon={<Users className="w-4 h-4" />}
          gradient="from-blue-500 to-cyan-500"
        />
        <StatCard
          label="Admins"
          value={stats.admins}
          icon={<Crown className="w-4 h-4" />}
          gradient="from-amber-500 to-orange-500"
        />
        <StatCard
          label="Developers"
          value={stats.developers}
          icon={<Code2 className="w-4 h-4" />}
          gradient="from-indigo-500 to-blue-500"
        />
        <StatCard
          label="Designers"
          value={stats.designers}
          icon={<Palette className="w-4 h-4" />}
          gradient="from-pink-500 to-rose-500"
        />
      </motion.div>

      {/* Search and Filters */}
      <motion.div variants={itemVariants} className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search team members..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {["all", "admin", "manager", "developer", "designer", "qa"].map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                roleFilter === role
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-sm"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
              }`}
            >
              {role === "all" ? "All Members" : ROLE_LABELS[role]}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Users Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredUsers.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full flex flex-col items-center justify-center py-12 text-center"
            >
              <Users className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-3" />
              <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-1">
                No members found
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                {searchQuery || roleFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Add your first team member"}
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold"
              >
                <Plus className="w-4 h-4" />
                Add Member
              </button>
            </motion.div>
          ) : (
            filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                tasks={tasks}
                isCurrentUser={currentUser?.id === user.id}
                isMenuOpen={openMenuId === user.id}
                onMenuToggle={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
                onAction={handleAction}
                menuRef={menuRef}
              />
            ))
          )}
        </AnimatePresence>
      </motion.div>

      {/* Add Member Modal */}
      <AnimatePresence>
        {showAddModal && (
          <AddMemberModal onClose={() => setShowAddModal(false)} />
        )}
      </AnimatePresence>

      {/* Action Modals (View Profile, Edit, Message, Assign) */}
      <AnimatePresence>
        {actionModal && (
          <ActionModal
            type={actionModal.type}
            user={actionModal.user}
            onClose={() => setActionModal(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// User Card Component
function UserCard({ user, tasks, isCurrentUser, isMenuOpen, onMenuToggle, onAction, menuRef }) {
  const userTasks = tasks.filter((t) => t.assigneeId === user.id);
  const doneTasks = userTasks.filter((t) => t.status === "done").length;
  const inProgressTasks = userTasks.filter((t) => t.status === "in_progress").length;
  const completionRate = userTasks.length
    ? Math.round((doneTasks / userTasks.length) * 100)
    : 0;

  const RoleIcon = getRoleIcon(user.role);
  const roleGradient = getRoleColor(user.role);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"
    >
      {/* Compact Header */}
      <div className={`relative h-16 bg-gradient-to-r ${roleGradient}`}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        {isCurrentUser && (
          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-white/25 backdrop-blur-sm text-white text-[10px] font-medium">
            You
          </span>
        )}
      </div>

      {/* Avatar */}
      <div className="relative px-4 -mt-8">
        <div
          className={`w-16 h-16 rounded-xl bg-gradient-to-br ${roleGradient} border-4 border-white dark:border-slate-800 shadow-lg flex items-center justify-center text-white text-xl font-bold`}
        >
          {user.avatar || user.name.charAt(0)}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">
              {user.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5 truncate">
              <Mail className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{user.email}</span>
            </p>
          </div>

          {/* 3-Dot Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={onMenuToggle}
              className={`p-1.5 rounded-lg transition-colors ${
                isMenuOpen
                  ? "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                  : "text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -5, scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                  className="absolute right-0 top-full mt-1 w-44 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-30"
                >
                  <MenuItem
                    icon={<Eye className="w-4 h-4" />}
                    label="View Profile"
                    onClick={() => onAction("view", user)}
                  />
                  <MenuItem
                    icon={<Edit2 className="w-4 h-4" />}
                    label="Edit Profile"
                    onClick={() => onAction("edit", user)}
                  />
                  <MenuItem
                    icon={<MessageSquare className="w-4 h-4" />}
                    label="Send Message"
                    onClick={() => onAction("message", user)}
                  />
                  <MenuItem
                    icon={<UserPlus className="w-4 h-4" />}
                    label="Assign Task"
                    onClick={() => onAction("assign", user)}
                  />
                  <div className="border-t border-slate-100 dark:border-slate-700" />
                  <MenuItem
                    icon={<Trash2 className="w-4 h-4" />}
                    label="Remove"
                    onClick={() => onAction("remove", user)}
                    danger
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Role Badge */}
        <div className="mb-3">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gradient-to-r ${roleGradient} text-white text-[11px] font-semibold shadow-sm`}
          >
            <RoleIcon className="w-3 h-3" />
            {ROLE_LABELS[user.role]}
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="text-center p-2 rounded-lg bg-slate-50 dark:bg-slate-700/50">
            <p className="text-base font-bold text-slate-900 dark:text-white tabular-nums">
              {userTasks.length}
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Total
            </p>
          </div>
          <div className="text-center p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
            <p className="text-base font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
              {doneTasks}
            </p>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Done
            </p>
          </div>
          <div className="text-center p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
            <p className="text-base font-bold text-blue-600 dark:text-blue-400 tabular-nums">
              {inProgressTasks}
            </p>
            <p className="text-[10px] text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Active
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              Completion
            </span>
            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 tabular-nums">
              {completionRate}%
            </span>
          </div>
          <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionRate}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`h-full bg-gradient-to-r ${roleGradient} rounded-full`}
            />
          </div>
        </div>

        {/* Performance Badge */}
        {completionRate >= 80 && (
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
            <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
              Top Performer
            </span>
          </div>
        )}
        {completionRate >= 50 && completionRate < 80 && (
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <Target className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="text-[11px] font-medium text-blue-700 dark:text-blue-400">
              On Track
            </span>
          </div>
        )}
        {completionRate < 50 && userTasks.length > 0 && (
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <Zap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span className="text-[11px] font-medium text-amber-700 dark:text-amber-400">
              Needs Attention
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Menu Item Component
function MenuItem({ icon, label, onClick, danger = false }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium transition-colors ${
        danger
          ? "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
          : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

// Action Modal - Handles View, Edit, Message, Assign
function ActionModal({ type, user, onClose }) {
  const { toast } = useToast();
  const { updateUser, projects, tasks } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
  });
  const [message, setMessage] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  const userTasks = tasks.filter((t) => t.assigneeId === user.id);
  const doneTasks = userTasks.filter((t) => t.status === "done").length;
  const completionRate = userTasks.length
    ? Math.round((doneTasks / userTasks.length) * 100)
    : 0;

  const RoleIcon = getRoleIcon(user.role);
  const roleGradient = getRoleColor(user.role);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === "edit") {
      updateUser(user.id, formData);
      toast.success(`${formData.name}'s profile updated!`);
      onClose();
    } else if (type === "message") {
      if (!message.trim()) {
        toast.error("Message cannot be empty");
        return;
      }
      toast.success(`Message sent to ${user.name}!`);
      onClose();
    } else if (type === "assign") {
      if (!selectedProject) {
        toast.error("Please select a project");
        return;
      }
      toast.success(`Opening project to assign task to ${user.name}`);
      onClose();
      navigate(`/projects/${selectedProject}`);
    }
  };

  const titles = {
    view: "User Profile",
    edit: "Edit Profile",
    message: "Send Message",
    assign: "Assign Task",
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
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {titles[type]}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {/* Content based on type */}
        <div className="p-4">
          {/* VIEW PROFILE */}
          {type === "view" && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${roleGradient} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}
                >
                  {user.avatar || user.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {user.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" />
                    {user.email}
                  </p>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gradient-to-r ${roleGradient} text-white text-[11px] font-semibold mt-1`}
                  >
                    <RoleIcon className="w-3 h-3" />
                    {ROLE_LABELS[user.role]}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{userTasks.length}</p>
                  <p className="text-xs text-slate-500">Total Tasks</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
                  <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{doneTasks}</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">Completed</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{completionRate}%</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">Rate</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                  Recent Tasks
                </p>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {userTasks.slice(0, 5).map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-700/50"
                    >
                      <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${
                        task.status === "done" ? "text-emerald-500" : "text-slate-400"
                      }`} />
                      <span className="text-sm text-slate-700 dark:text-slate-300 truncate">
                        {task.title}
                      </span>
                    </div>
                  ))}
                  {userTasks.length === 0 && (
                    <p className="text-sm text-slate-400 text-center py-4">No tasks assigned</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* EDIT PROFILE */}
          {type === "edit" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  {Object.entries(ROLE_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold shadow-sm hover:shadow-md"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {/* SEND MESSAGE */}
          {type === "message" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${roleGradient} flex items-center justify-center text-white font-bold text-sm`}
                >
                  {user.avatar || user.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{user.name}</p>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="Type your message..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold shadow-sm hover:shadow-md"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </div>
            </form>
          )}

          {/* ASSIGN TASK */}
          {type === "assign" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${roleGradient} flex items-center justify-center text-white font-bold text-sm`}
                >
                  {user.avatar || user.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{user.name}</p>
                  <p className="text-xs text-slate-500">{ROLE_LABELS[user.role]}</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Select Project
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {projects.map((project) => (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => setSelectedProject(project.id.toString())}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                        selectedProject === project.id.toString()
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 border-transparent text-white"
                          : "bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600"
                      }`}
                    >
                      <FolderKanban className="w-4 h-4 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{project.title}</p>
                        <p className={`text-xs truncate ${
                          selectedProject === project.id.toString()
                            ? "text-white/80"
                            : "text-slate-500"
                        }`}>
                          {project.status}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold shadow-sm hover:shadow-md"
                >
                  <UserPlus className="w-4 h-4" />
                  Go to Project
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Stat Card Component
function StatCard({ label, value, icon, gradient }) {
  return (
    <motion.div
      whileHover={{ y: -1 }}
      className="bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm border border-slate-200 dark:border-slate-700"
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg bg-gradient-to-br ${gradient} text-white shadow-sm`}>
          {icon}
        </div>
        <div>
          <p className="text-xl font-bold text-slate-900 dark:text-white tabular-nums">
            {value}
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}

// Add Member Modal
function AddMemberModal({ onClose }) {
  const { register } = useApp();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "123456",
    role: "developer",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = register(formData);
    if (result.ok) {
      toast.success(`${formData.name} added to the team!`);
      onClose();
    } else {
      toast.error(result.error || "Failed to add member");
      setError(result.error || "Failed to add member");
    }
  };

  const roles = [
    { value: "admin", label: "Admin", icon: Crown },
    { value: "manager", label: "Manager", icon: Shield },
    { value: "developer", label: "Developer", icon: Code2 },
    { value: "designer", label: "Designer", icon: Palette },
    { value: "qa", label: "QA Engineer", icon: Bug },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Add Team Member
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Add a new member to your team
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          {error && (
            <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
              className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
              className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Role
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {roles.map((role) => {
                const RoleIcon = role.icon;
                return (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, role: role.value })}
                    className={`flex items-center gap-1.5 p-2 rounded-lg border text-xs font-medium transition-all ${
                      formData.role === role.value
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 border-transparent text-white shadow-sm"
                        : "bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600"
                    }`}
                  >
                    <RoleIcon className="w-3.5 h-3.5" />
                    {role.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold shadow-sm hover:shadow-md transition-all"
            >
              Add Member
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}