import { useMemo, useState, useEffect } from "react";
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
  TrendingDown,
  Users,
  ArrowRight,
  Flame,
  Sparkles,
  Zap,
  Target,
  Award,
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
  AreaChart,
  Area,
} from "recharts";

// Animated Counter Component
function AnimatedCounter({ value, duration = 1200, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

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
    const productivityScore = Math.min(100, completionRate + (done * 2));

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
      productivityScore,
    };
  }, [projects, tasks, currentUser]);

  // Pie Chart Data - Modern colors
  const statusData = useMemo(() => {
    return [
      { name: "To Do", value: stats.todo, color: "#64748B" },
      { name: "In Progress", value: stats.inProgress, color: "#6366F1" },
      { name: "In Review", value: stats.inReview, color: "#F59E0B" },
      { name: "Done", value: stats.done, color: "#10B981" },
    ];
  }, [stats]);

  // Trending data (fake for chart)
  const trendData = useMemo(() => {
    return [
      { day: "Mon", completed: 8, created: 12 },
      { day: "Tue", completed: 12, created: 10 },
      { day: "Wed", completed: 15, created: 14 },
      { day: "Thu", completed: 10, created: 18 },
      { day: "Fri", completed: 20, created: 15 },
      { day: "Sat", completed: 6, created: 8 },
      { day: "Sun", completed: 4, created: 6 },
    ];
  }, []);

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
        avatar: user.avatar || user.name.charAt(0),
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
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const firstName = currentUser?.name?.split(" ")[0] || "there";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Hero Section - European Modern Design */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 via-brand-500 to-violet-500 p-8 text-white shadow-glow-lg"
      >
        {/* Decorative patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-400 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-xs font-medium mb-4"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {greeting}
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-3 tracking-tight">
              Hi {firstName}
            </h1>
            <p className="text-white/90 text-base md:text-lg max-w-2xl">
              You have <span className="font-semibold">{stats.myTasks} tasks</span> to work on today.
              {stats.overdue > 0 && (
                <span className="block mt-1 text-white/80">
                  ⚠️ {stats.overdue} task{stats.overdue > 1 ? "s" : ""} {stats.overdue > 1 ? "are" : "is"} overdue
                </span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-4xl font-bold font-display tracking-tight">
                <AnimatedCounter value={stats.myTasks} />
              </p>
              <p className="text-white/70 text-sm mt-1">My Tasks</p>
            </div>
            <div className="w-px h-14 bg-white/20" />
            <div className="text-center">
              <p className="text-4xl font-bold font-display tracking-tight">
                <AnimatedCounter value={stats.myTasksDone} />
              </p>
              <p className="text-white/70 text-sm mt-1">Completed</p>
            </div>
            <div className="w-px h-14 bg-white/20" />
            <div className="text-center">
              <p className="text-4xl font-bold font-display tracking-tight">
                <AnimatedCounter value={stats.completionRate} suffix="%" />
              </p>
              <p className="text-white/70 text-sm mt-1">Progress</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stat Cards Grid - Modern European Style */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<FolderKanban className="w-5 h-5" />}
          label="Total Projects"
          value={stats.totalProjects}
          iconBg="bg-brand-50 text-brand-600 dark:bg-brand-950/40 dark:text-brand-400"
          change="+12%"
          trend="up"
          delay={0.1}
        />
        <StatCard
          icon={<ListTodo className="w-5 h-5" />}
          label="Total Tasks"
          value={stats.totalTasks}
          iconBg="bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400"
          change="+8%"
          trend="up"
          delay={0.2}
        />
        <StatCard
          icon={<CheckCircle2 className="w-5 h-5" />}
          label="Completed"
          value={stats.done}
          iconBg="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
          change={`${stats.completionRate}%`}
          trend="up"
          delay={0.3}
        />
        <StatCard
          icon={<AlertTriangle className="w-5 h-5" />}
          label="Overdue"
          value={stats.overdue}
          iconBg="bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400"
          change="Urgent"
          trend={stats.overdue > 0 ? "down" : "neutral"}
          delay={0.4}
        />
      </div>

      {/* Charts Section - Sophisticated */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task Distribution Chart */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-base text-slate-900 dark:text-white font-display">
                Task Distribution
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                By status
              </p>
            </div>
            <div className="p-2 rounded-lg bg-brand-50 dark:bg-brand-950/40">
              <Target className="w-4 h-4 text-brand-600 dark:text-brand-400" />
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
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(9, 9, 11, 0.95)",
                      border: "none",
                      borderRadius: "12px",
                      color: "white",
                      fontSize: "12px",
                      padding: "8px 12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <p className="text-3xl font-bold text-slate-900 dark:text-white font-display">
                    <AnimatedCounter value={stats.totalTasks} />
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">Total</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[220px] text-slate-400 dark:text-slate-600">
              <ListTodo className="w-12 h-12 mb-2 opacity-40" />
              <p className="text-sm">No tasks yet</p>
            </div>
          )}

          <div className="mt-4 space-y-2">
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center gap-3 text-sm">
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-600 dark:text-slate-400 flex-1">
                  {item.name}
                </span>
                <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Activity Trend Chart */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-base text-slate-900 dark:text-white font-display">
                Weekly Activity
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Task creation vs completion
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-500" />
                <span className="text-slate-600 dark:text-slate-400">Completed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                <span className="text-slate-600 dark:text-slate-400">Created</span>
              </div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
              <XAxis
                dataKey="day"
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
                  backgroundColor: "rgba(9, 9, 11, 0.95)",
                  border: "none",
                  borderRadius: "12px",
                  color: "white",
                  fontSize: "12px",
                  padding: "8px 12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="created"
                stroke="#CBD5E1"
                strokeWidth={2}
                fillOpacity={0.1}
                fill="#CBD5E1"
              />
              <Area
                type="monotone"
                dataKey="completed"
                stroke="#6366F1"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorCompleted)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Team Performance & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Performance */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-base text-slate-900 dark:text-white font-display">
                Team Performance
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Top contributors
              </p>
            </div>
            <Users className="w-4 h-4 text-slate-400" />
          </div>

          <div className="space-y-4">
            {userPerformance.map((user, idx) => {
              const total = user.completed + user.pending;
              const percentage = total ? Math.round((user.completed / total) * 100) : 0;
              return (
                <div key={user.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center text-white text-xs font-semibold">
                          {user.avatar}
                        </div>
                        {idx === 0 && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 flex items-center justify-center">
                            <Award className="w-2.5 h-2.5 text-amber-900" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {user.name}
                        </p>
                        <p className="text-xs text-slate-500">{user.completed}/{total} tasks</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white tabular-nums">
                      {percentage}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-brand-500 to-violet-500 rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Urgent Tasks */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/40">
                <Flame className="w-4 h-4 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="font-semibold text-base text-slate-900 dark:text-white font-display">
                  Urgent
                </h3>
                <p className="text-xs text-slate-500">
                  {urgentTasks.length} need attention
                </p>
              </div>
            </div>
            <Link
              to="/projects"
              className="text-xs text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 font-medium flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-2">
            {urgentTasks.length === 0 ? (
              <div className="text-center py-10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/40 mb-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="text-sm text-slate-500">All caught up! 🎉</p>
              </div>
            ) : (
              urgentTasks.map((task) => (
                <Link
                  key={task.id}
                  to={`/projects/${task.projectId}`}
                  className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                >
                  <div
                    className={`flex-shrink-0 w-1 h-8 rounded-full ${
                      isOverdue(task) ? "bg-red-500" : "bg-amber-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-slate-900 dark:text-white truncate group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {task.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">
                      {getProjectTitle(task.projectId)} •{" "}
                      {isOverdue(task) ? (
                        <span className="text-red-600 dark:text-red-400">Overdue</span>
                      ) : (
                        <span className="text-amber-600 dark:text-amber-400">Due today</span>
                      )}
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
          className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-brand-50 dark:bg-brand-950/40">
                <Calendar className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              </div>
              <div>
                <h3 className="font-semibold text-base text-slate-900 dark:text-white font-display">
                  Upcoming
                </h3>
                <p className="text-xs text-slate-500">Next 7 days</p>
              </div>
            </div>
            <Link
              to="/projects"
              className="text-xs text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 font-medium flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-2">
            {upcomingTasks.length === 0 ? (
              <div className="text-center py-10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 mb-3">
                  <Calendar className="w-6 h-6 text-slate-400" />
                </div>
                <p className="text-sm text-slate-500">No upcoming tasks</p>
              </div>
            ) : (
              upcomingTasks.map((task) => (
                <Link
                  key={task.id}
                  to={`/projects/${task.projectId}`}
                  className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                >
                  <div className="flex-shrink-0 w-1 h-8 rounded-full bg-brand-500" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-slate-900 dark:text-white truncate group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {task.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {getProjectTitle(task.projectId)} •{" "}
                      {getRelativeTime(task.dueDate)}
                    </p>
                  </div>
                  <span
                    className={`flex-shrink-0 px-2 py-0.5 rounded-md text-[10px] font-medium ${STATUS_COLORS[task.status]}`}
                  >
                    {STATUS_LABELS[task.status]}
                  </span>
                </Link>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* Productivity Score - Fancy new section */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-8 text-white"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="8"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="white"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 42}
                  initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                  animate={{
                    strokeDashoffset:
                      2 * Math.PI * 42 - (2 * Math.PI * 42 * stats.productivityScore) / 100,
                  }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-3xl font-bold font-display">
                    <AnimatedCounter value={stats.productivityScore} suffix="%" />
                  </p>
                  <p className="text-[10px] uppercase tracking-wider opacity-80">Score</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-medium mb-2">
              <Zap className="w-3 h-3" />
              Productivity Score
            </div>
            <h3 className="text-2xl font-bold font-display mb-1">
              {stats.productivityScore >= 80
                ? "Outstanding!"
                : stats.productivityScore >= 60
                ? "Great progress!"
                : stats.productivityScore >= 40
                ? "Keep going!"
                : "Let's get started!"}
            </h3>
            <p className="text-white/90 text-sm">
              You've completed {stats.done} of {stats.totalTasks} tasks with a{" "}
              {stats.completionRate}% completion rate.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Modern Stat Card Component
function StatCard({ icon, label, value, iconBg, change, trend, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="relative bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-xl ${iconBg}`}>
          {icon}
        </div>
        <div className={`flex items-center gap-0.5 text-xs font-medium ${
          trend === "up"
            ? "text-emerald-600 dark:text-emerald-400"
            : trend === "down"
            ? "text-red-600 dark:text-red-400"
            : "text-slate-500"
        }`}>
          {trend === "up" && <TrendingUp className="w-3 h-3" />}
          {trend === "down" && <TrendingDown className="w-3 h-3" />}
          {change}
        </div>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
        {label}
      </p>
      <p className="text-3xl font-bold text-slate-900 dark:text-white font-display tabular-nums tracking-tight">
        <AnimatedCounter value={value} />
      </p>
    </motion.div>
  );
}