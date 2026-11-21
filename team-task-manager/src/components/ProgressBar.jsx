import { motion } from "framer-motion";

export default function ProgressBar({
  value,
  barClassName = "bg-gradient-to-r from-brand-500 to-violet-500",
  trackClassName = "h-2 bg-slate-100 dark:bg-slate-700",
  delay = 0,
  duration = 0.6,
}) {
  const clamped = Math.max(0, Math.min(100, value)) / 100;
  return (
    <div className={`${trackClassName} rounded-full overflow-hidden`}>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: clamped }}
        transition={{ duration, delay, ease: "easeOut" }}
        style={{ originX: 0 }}
        className={`h-full w-full rounded-full ${barClassName}`}
      />
    </div>
  );
}