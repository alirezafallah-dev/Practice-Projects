import { useState, useMemo } from "react";
import { useApp } from "../context/AppContext.jsx";
import {
  Plus,
  Search,
  Users,
  CheckCircle2,
  Clock,
  TrendingUp,
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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ROLE_LABELS } from "../constants";
import { useToast } from "../context/ToastContext.jsx";

// Helper functions - moved outside components for global access
const getRoleIcon = (role) => {
  switch (role) {
    case "admin":
      return Crown;
    case "manager":
      return Shield;
    case "developer":
      return Code2;
    case "designer":
      return Palette;
    case "qa":
      return Bug;
    default:
      return Users;
  }
};

const getRoleColor = (role) => {
  switch (role) {
    case "admin":
      return "from-amber-500 to-orange-500";
    case "manager":
      return "from-purple-500 to-pink-500";
    case "developer":
      return "from-blue-500 to-cyan-500";
    case "designer":
      return "from-pink-500 to-rose-500";
    case "qa":
      return "from-emerald-500 to-teal-500";
    default:
      return "from-slate-500 to-slate-600";
  }
};

export default function UsersPage() {
  const { users, tasks, currentUser } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
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
      className="space-y-6"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Team Members
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage your team and their performance
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Member
        </motion.button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard
          label="Total Members"
          value={stats.total}
          icon={<Users className="w-5 h-5" />}
          gradient="from-blue-500 to-cyan-500"
        />
        <StatCard
          label="Admins"
          value={stats.admins}
          icon={<Crown className="w-5 h-5" />}
          gradient="from-amber-500 to-orange-500"
        />
        <StatCard
          label="Developers"
          value={stats.developers}
          icon={<Code2 className="w-5 h-5" />}
          gradient="from-indigo-500 to-blue-500"
        />
        <StatCard
          label="Designers"
          value={stats.designers}
          icon={<Palette className="w-5 h-5" />}
          gradient="from-pink-500 to-rose-500"
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
              placeholder="Search team members..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
          </div>
        </div>

        {/* Role Filter */}
        <div className="flex flex-wrap gap-2">
          {["all", "admin", "manager", "developer", "designer", "qa"].map(
            (role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  roleFilter === role
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                }`}
              >
                {role === "all" ? "All Members" : ROLE_LABELS[role]}
              </button>
            )
          )}
        </div>
      </motion.div>

      {/* Users Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredUsers.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full flex flex-col items-center justify-center py-16 text-center"
            >
              <Users className="w-16 h-16 text-slate-300 dark:text-slate-600 mb-4" />
              <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
                No members found
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6">
                {searchQuery || roleFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Add your first team member"}
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
              >
                <Plus className="w-5 h-5" />
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
    </motion.div>
  );
}

// User Card Component
function UserCard({ user, tasks, isCurrentUser }) {
  const userTasks = tasks.filter((t) => t.assigneeId === user.id);
  const doneTasks = userTasks.filter((t) => t.status === "done").length;
  const inProgressTasks = userTasks.filter(
    (t) => t.status === "in_progress"
  ).length;
  const completionRate = userTasks.length
    ? Math.round((doneTasks / userTasks.length) * 100)
    : 0;

  const RoleIcon = getRoleIcon(user.role);
  const roleGradient = getRoleColor(user.role);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
    >
      {/* Card Header with Gradient */}
      <div
        className={`relative h-24 bg-gradient-to-r ${roleGradient} overflow-hidden`}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />
        {isCurrentUser && (
          <span className="absolute top-3 right-3 px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
            You
          </span>
        )}
      </div>

      {/* Avatar */}
      <div className="relative px-6 -mt-12">
        <div
          className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${roleGradient} border-4 border-white dark:border-slate-800 shadow-xl flex items-center justify-center text-white text-3xl font-bold`}
        >
          {user.avatar || user.name.charAt(0)}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {user.name}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1">
              <Mail className="w-3.5 h-3.5" />
              {user.email}
            </p>
          </div>
          <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* Role Badge */}
        <div className="flex items-center gap-2 mb-4">
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r ${roleGradient} text-white text-xs font-semibold shadow-md`}
          >
            <RoleIcon className="w-3.5 h-3.5" />
            {ROLE_LABELS[user.role]}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
            <p className="text-xl font-bold text-slate-900 dark:text-white">
              {userTasks.length}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Total
            </p>
          </div>
          <div className="text-center p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
            <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
              {doneTasks}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Done
            </p>
          </div>
          <div className="text-center p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {inProgressTasks}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Active
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Completion Rate
            </span>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {completionRate}%
            </span>
          </div>
          <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
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
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
            <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
              Top Performer
            </span>
          </div>
        )}
        {completionRate >= 50 && completionRate < 80 && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-medium text-blue-700 dark:text-blue-400">
              On Track
            </span>
          </div>
        )}
        {completionRate < 50 && userTasks.length > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span className="text-xs font-medium text-amber-700 dark:text-amber-400">
              Needs Attention
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Stat Card Component
function StatCard({ label, value, icon, gradient }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700"
    >
      <div className="flex items-center gap-4">
        <div
          className={`p-3 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg`}
        >
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {value}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
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
      toast.success(`${formData.name} added to the team successfully!`); 
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
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Add Team Member
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Add a new member to your team
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
          {error && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="John Doe"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="john@example.com"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Role
            </label>
            <div className="grid grid-cols-2 gap-2">
              {roles.map((role) => {
                const RoleIcon = role.icon;
                return (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, role: role.value })
                    }
                    className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all ${
                      formData.role === role.value
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 border-transparent text-white shadow-lg"
                        : "bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600"
                    }`}
                  >
                    <RoleIcon className="w-4 h-4" />
                    {role.label}
                  </button>
                );
              })}
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
              Add Member
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}