export const USER_ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  DEVELOPER: "developer",
  DESIGNER: "designer",
  QA: "qa",
};

export const ROLE_LABELS = {
  admin: "Admin",
  manager: "Manager",
  developer: "Developer",
  designer: "Designer",
  qa: "QA Engineer",
};

export const TASK_STATUS = {
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  IN_REVIEW: "in_review",
  DONE: "done",
};

export const STATUS_LABELS = {
  todo: "To Do",
  in_progress: "In Progress",
  in_review: "In Review",
  done: "Done",
};

export const STATUS_COLORS = {
  todo: "bg-slate-100 text-slate-700",
  in_progress: "bg-blue-100 text-blue-700",
  in_review: "bg-amber-100 text-amber-700",
  done: "bg-emerald-100 text-emerald-700",
};

export const PRIORITY_LEVELS = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  URGENT: "urgent",
};

export const PRIORITY_LABELS = {
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
};

export const PRIORITY_COLORS = {
  low: "text-slate-500 bg-slate-100",
  medium: "text-blue-600 bg-blue-100",
  high: "text-amber-600 bg-amber-100",
  urgent: "text-red-600 bg-red-100",
};

export const PROJECT_STATUS = {
  PLANNING: "planning",
  ACTIVE: "active",
  ON_HOLD: "on_hold",
  COMPLETED: "completed",
};

export const PROJECT_STATUS_LABELS = {
  planning: "Planning",
  active: "Active",
  on_hold: "On Hold",
  completed: "Completed",
};

// Aliases for backward compatibility
export const TASK_PRIORITIES = PRIORITY_LEVELS;
export const ROLES = USER_ROLES;