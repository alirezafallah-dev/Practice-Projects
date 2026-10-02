export const STORAGE_KEYS = {
  users: "team_task_users",
  projects: "team_task_projects",
  tasks: "team_task_tasks",
  session: "team_task_session",
};

export const ROLES = {
  ADMIN: "admin",
  MEMBER: "member",
};

export const ROLE_LABELS = {
  [ROLES.ADMIN]: "مدیر",
  [ROLES.MEMBER]: "عضو عادی",
};

export const TASK_PRIORITIES = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

export const PRIORITY_LABELS = {
  [TASK_PRIORITIES.LOW]: "کم",
  [TASK_PRIORITIES.MEDIUM]: "متوسط",
  [TASK_PRIORITIES.HIGH]: "زیاد",
};

export const TASK_STATUS = {
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  DONE: "done",
};

export const STATUS_LABELS = {
  [TASK_STATUS.TODO]: "To-do",
  [TASK_STATUS.IN_PROGRESS]: "در حال انجام",
  [TASK_STATUS.DONE]: "انجام شده",
};