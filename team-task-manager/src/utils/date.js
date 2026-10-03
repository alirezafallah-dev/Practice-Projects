import { format, differenceInDays, isBefore, startOfDay } from "date-fns";

export function formatDate(dateString) {
  if (!dateString) return "N/A";
  return format(new Date(dateString), "MMM dd, yyyy");
}

export function formatDateShort(dateString) {
  if (!dateString) return "N/A";
  return format(new Date(dateString), "MMM dd");
}

export function isOverdue(task) {
  if (!task.dueDate || task.status === "done") return false;
  return isBefore(startOfDay(new Date(task.dueDate)), startOfDay(new Date()));
}

export function isDueToday(task) {
  if (!task.dueDate || task.status === "done") return false;
  const today = startOfDay(new Date());
  const dueDate = startOfDay(new Date(task.dueDate));
  return dueDate.getTime() === today.getTime();
}

export function isDueSoon(task, days = 3) {
  if (!task.dueDate || task.status === "done") return false;
  const daysUntilDue = differenceInDays(
    startOfDay(new Date(task.dueDate)),
    startOfDay(new Date())
  );
  return daysUntilDue > 0 && daysUntilDue <= days;
}

export function getDaysUntilDue(task) {
  if (!task.dueDate) return null;
  return differenceInDays(
    startOfDay(new Date(task.dueDate)),
    startOfDay(new Date())
  );
}

export function getRelativeTime(dateString) {
  if (!dateString) return "";
  const days = differenceInDays(new Date(dateString), new Date());
  
  if (days < 0) return `${Math.abs(days)} days overdue`;
  if (days === 0) return "Due today";
  if (days === 1) return "Due tomorrow";
  return `Due in ${days} days`;
}

export function getReminderTasks(tasks) {
  const overdue = tasks.filter(isOverdue);
  const today = tasks.filter(isDueToday);
  const soon = tasks.filter((task) => isDueSoon(task, 3));
  
  return {
    total: overdue.length + today.length + soon.length,
    overdue,
    today,
    soon,
  };
}