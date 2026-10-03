import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import {
  isOverdue,
  isDueToday,
  isDueSoon,
  formatDate,
  getRelativeTime,
} from "../utils/date.js";
import { PRIORITY_LABELS, STATUS_LABELS, STATUS_COLORS } from "../constants";
import {
  FolderKanban,
  ListTodo,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Calendar,
  TrendingUp,
  Users,
  ArrowRight,
  Flame,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function DashboardPage() {
  const { projects, tasks, users, currentUser } = useApp();

  // Stats Calculation
  const stats = useMemo(() => {
    const totalProjects = projects.length;
    const totalTasks = tasks.length;
    const done = tasks.filter((t) => t.status === "done").length;
    const inProgress = tasks.filter((t) => t.status === "in_progress").length;
    const todo = tasks.filter((t) => t.status === "todo").length;
    const inReview = tasks.filter((t) => t.status === "in_review").length;
    const overdue = tasks.filter(isOverdue).length;
    const dueToday = tasks.filter(isDueToday).length;
    const dueSoon = tasks.filter((t) => isDueSoon(t, 3)).length;
    const myTasks = tasks.filter((t) => t.assigneeId === currentUser?.id).length;
    const myTasksDone = tasks.filter(
      (t) => t.assigneeId === currentUser?.id && t.status === "done"
    ).length;
    const completionRate = totalTasks ? Math.round((done / totalTasks) * 100) : 0;

    return {
      totalProjects,
      totalTasks,
      done,
      inProgress,
      todo,
      inReview,
      overdue,
      dueToday,
      dueSoon,
      myTasks,
      myTasksDone,
      completionRate,
    };
  }, [projects, tasks, currentUser]);

  // Pie Chart Data
  const statusData = useMemo(() => {
    return [
      { name: "To Do", value: stats.todo, color: "#64748b" },
      { name: "In Progress", value: stats.inProgress, color: "#3b82f6" },
      { name: "In Review", value: stats.inReview, color: "#f59e0b" },
      { name: "Done", value: stats.done, color: "#10b981" },
    ];
  }, [stats]);

  // Urgent Tasks
  const urgentTasks = useMemo(() => {
    return tasks
      .filter((t) => isOverdue(t) || isDueToday(t))
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 5);
  }, [tasks]);

  // Upcoming Tasks
  const upcomingTasks = useMemo(() => {
    return tasks
      .filter((t) => isDueSoon(t, 7) && !isDueToday(t) && !isOverdue(t))
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 5);
  }, [tasks]);

  // User Performance
  const userPerformance = useMemo(() => {
    return users.slice(0, 5).map((user) => {
      const userTasks = tasks.filter((t) => t.assigneeId === user.id);
      const userDone = userTasks.filter((t) => t.status === "done").length;
      return {
        name: user.name.split(" ")[0],
        completed: userDone,
        pending: userTasks.length - userDone,
      };
    });
  }, [users, tasks]);

  const getProjectTitle = (projectId) => {
    return projects.find((p) => p.id === projectId)?.title || "Unknown";
  };

  // Animation Variants
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
      {/* Hero Section */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-8 text-white shadow-2xl"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm mb-3"
            >
              <Flame className="w-4 h-4" />
              Welcome back!
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Hi, {currentUser?.name?.split(" ")[0]} 👋
            </h1>
            <p className="text-white/80 text-lg">
              Here's what's happening with your projects today.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-4xl font-bold">{stats.myTasks}</p>
              <p className="text-white/70 text-sm">My Tasks</p>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <p className="text-4xl font-bold">{stats.myTasksDone}</p>
              <p className="text-white/70 text-sm">Completed</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<FolderKanban className="w-6 h-6" />}
          label="Total Projects"
          value={stats.totalProjects}
          gradient="from-blue-500 to-cyan-500"
          change="+12%"
          delay={0.1}
        />
        <StatCard
          icon={<ListTodo className="w-6 h-6" />}
          label="Total Tasks"
          value={stats.totalTasks}
          gradient="from-purple-500 to-pink-500"
          change="+8%"
          delay={0.2}
        />
        <StatCard
          icon={<CheckCircle2 className="w-6 h-6" />}
          label="Completed"
          value={stats.done}
          gradient="from-emerald-500 to-teal-500"
          change={`${stats.completionRate}%`}
          delay={0.3}
        />
        <StatCard
          icon={<AlertTriangle className="w-6 h-6" />}
          label="Overdue"
          value={stats.overdue}
          gradient="from-red-500 to-orange-500"
          change="Urgent"
          delay={0.4}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task Distribution Chart */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-1 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Task Distribution
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                By status
              </p>
            </div>
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10">
              <TrendingUp className="w-5 h-5 text-purple-500" />
            </div>
          </div>

          {stats.totalTasks > 0 ? (
            <div className="relative">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.95)",
                      border: "none",
                      borderRadius: "12px",
                      color: "white",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {stats.totalTasks}
                  </p>
                  <p className="text-xs text-slate-500">Total</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[220px] text-slate-400">
              <p>No tasks yet</p>
            </div>
          )}

          <div className="mt-4 grid grid-cols-2 gap-2">
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-sm">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-600 dark:text-slate-300 flex-1">
                  {item.name}
                </span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Team Performance Chart */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Team Performance
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Tasks completed by member
              </p>
            </div>
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
              <Users className="w-5 h-5 text-blue-500" />
            </div>
          </div>

          {userPerformance.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={userPerformance}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e2e8f0"
                  opacity={0.3}
                />
                <XAxis
                  dataKey="name"
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.95)",
                    border: "none",
                    borderRadius: "12px",
                    color: "white",
                  }}
                  cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
                />
                <Bar
                  dataKey="completed"
                  fill="#3b82f6"
                  radius={[8, 8, 0, 0]}
                  name="Completed"
                />
                <Bar
                  dataKey="pending"
                  fill="#e2e8f0"
                  radius={[8, 8, 0, 0]}
                  name="Pending"
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[280px] text-slate-400">
              <p>No team data yet</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Tasks Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Urgent Tasks */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/10">
                <Flame className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  Urgent Tasks
                </h3>
                <p className="text-sm text-slate-500">
                  {urgentTasks.length} tasks need attention
                </p>
              </div>
            </div>
            <Link
              to="/projects"
              className="text-sm text-blue-500 hover:text-blue-600 font-medium flex items-center gap-1"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {urgentTasks.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>All caught up! 🎉</p>
              </div>
            ) : (
              urgentTasks.map((task) => (
                <Link
                  key={task.id}
                  to={`/projects/${task.projectId}`}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
                >
                  <div
                    className={`px-2 py-1 rounded-md text-xs font-medium ${
                      isOverdue(task)
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {isOverdue(task) ? "Overdue" : "Today"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-slate-900 dark:text-white truncate group-hover:text-blue-500 transition-colors">
                      {task.title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {getProjectTitle(task.projectId)} • {formatDate(task.dueDate)}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </motion.div>

        {/* Upcoming Tasks */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Calendar className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  Upcoming
                </h3>
                <p className="text-sm text-slate-500">
                  Due in next 7 days
                </p>
              </div>
            </div>
            <Link
              to="/projects"
              className="text-sm text-blue-500 hover:text-blue-600 font-medium flex items-center gap-1"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {upcomingTasks.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No upcoming tasks</p>
              </div>
            ) : (
              upcomingTasks.map((task) => (
                <Link
                  key={task.id}
                  to={`/projects/${task.projectId}`}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
                >
                  <div className="p-1.5 rounded-md bg-blue-100 text-blue-700">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-slate-900 dark:text-white truncate group-hover:text-blue-500 transition-colors">
                      {task.title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {getProjectTitle(task.projectId)} •{" "}
                      {getRelativeTime(task.dueDate)}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-medium ${
                      STATUS_COLORS[task.status]
                    }`}
                  >
                    {STATUS_LABELS[task.status]}
                  </span>
                </Link>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Stat Card Component
function StatCard({ icon, label, value, gradient, change, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -4 }}
      className="relative overflow-hidden bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 group"
    >
      <div
        className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`}
      />
      <div className="relative">
        <div
          className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} text-white mb-4 shadow-lg`}
        >
          {icon}
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
          {label}
        </p>
        <p className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          {value}
        </p>
        <div className="flex items-center gap-1 text-xs">
          <TrendingUp className="w-3 h-3 text-emerald-500" />
          <span className="text-emerald-500 font-medium">{change}</span>
          <span className="text-slate-400">this week</span>
        </div>
      </div>
    </motion.div>
  );
}