function getDateOnly(value) {
  const d = new Date(value);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function diffDaysFromToday(dateStr) {
  if (!dateStr) return null;

  const due = getDateOnly(dateStr);
  const today = getDateOnly(new Date());

  return Math.round((due - today) / 86400000);
}

export function isTaskDone(task) {
  return task.status === "done";
}

export function isOverdue(task) {
  const diff = diffDaysFromToday(task.dueDate);
  return !isTaskDone(task) && diff !== null && diff < 0;
}

export function isDueToday(task) {
  const diff = diffDaysFromToday(task.dueDate);
  return !isTaskDone(task) && diff === 0;
}

export function isDueSoon(task, days = 2) {
  const diff = diffDaysFromToday(task.dueDate);
  return !isTaskDone(task) && diff !== null && diff >= 0 && diff <= days;
}

export function getReminderTasks(tasks) {
  const overdue = [];
  const today = [];
  const soon = [];

  tasks.forEach((task) => {
    if (isOverdue(task)) {
      overdue.push(task);
    } else if (isDueToday(task)) {
      today.push(task);
    } else if (isDueSoon(task)) {
      soon.push(task);
    }
  });

  return {
    overdue,
    today,
    soon,
    total: overdue.length + today.length + soon.length,
  };
}

export function formatDate(dateStr) {
  if (!dateStr) return "";

  try {
    return new Date(dateStr).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}