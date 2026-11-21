import { memo } from "react";
import { motion } from "framer-motion";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
} from "recharts";
import { Target, ListTodo } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter.jsx";

const TOOLTIP_STYLE = {
  backgroundColor: "rgba(9, 9, 11, 0.95)",
  border: "none",
  borderRadius: "12px",
  color: "white",
  fontSize: "12px",
  padding: "8px 12px",
};

function DashboardCharts({ statusData, trendData, totalTasks }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Task Distribution */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-base text-slate-900 dark:text-white font-display">
              Task Distribution
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">By status</p>
          </div>
          <div className="p-2 rounded-lg bg-brand-50 dark:bg-brand-950/40">
            <Target className="w-4 h-4 text-brand-600 dark:text-brand-400" />
          </div>
        </div>

        {totalTasks > 0 ? (
          <div className="relative">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%" cy="50%"
                  innerRadius={65} outerRadius={95}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                  isAnimationActive={false}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={TOOLTIP_STYLE} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-900 dark:text-white font-display">
                  <AnimatedCounter value={totalTasks} />
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
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-slate-600 dark:text-slate-400 flex-1">{item.name}</span>
              <span className="font-semibold text-slate-900 dark:text-white tabular-nums">{item.value}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Weekly Activity */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.05 }}
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
            <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Area type="monotone" dataKey="created" stroke="#CBD5E1" strokeWidth={2} fillOpacity={0.1} fill="#CBD5E1" isAnimationActive={false} />
            <Area type="monotone" dataKey="completed" stroke="#6366F1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorCompleted)" isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}

export default memo(DashboardCharts);