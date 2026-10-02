import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { STORAGE_KEYS, ROLES } from "../constants";
import { load, save, generateId } from "../utils/storage";
import { useToast } from "./ToastContext.jsx";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const toast = useToast();

  const [users, setUsers] = useState(() => load(STORAGE_KEYS.users, []));
  const [projects, setProjects] = useState(() => load(STORAGE_KEYS.projects, []));
  const [tasks, setTasks] = useState(() => load(STORAGE_KEYS.tasks, []));
  const [currentUserId, setCurrentUserId] = useState(() =>
    load(STORAGE_KEYS.session, null)
  );

  useEffect(() => {
    save(STORAGE_KEYS.users, users);
  }, [users]);

  useEffect(() => {
    save(STORAGE_KEYS.projects, projects);
  }, [projects]);

  useEffect(() => {
    save(STORAGE_KEYS.tasks, tasks);
  }, [tasks]);

  useEffect(() => {
    save(STORAGE_KEYS.session, currentUserId);
  }, [currentUserId]);

  const currentUser = useMemo(() => {
    return users.find((user) => user.id === currentUserId) || null;
  }, [users, currentUserId]);

  const isAdmin = currentUser?.role === ROLES.ADMIN;

  const canManageUsers = isAdmin;
  const canManageProjects = isAdmin;
  const canCreateTask = isAdmin;

  const canEditTask = () => isAdmin;
  const canDeleteTask = () => isAdmin;

  const canChangeTaskStatus = (task) => {
    return isAdmin || task.assigneeId === currentUser?.id;
  };

  const registerUser = ({ name, email, password, role }) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!name.trim()) {
      return { ok: false, error: "نام الزامی است." };
    }

    if (!normalizedEmail) {
      return { ok: false, error: "ایمیل الزامی است." };
    }

    if (!password) {
      return { ok: false, error: "رمز عبور الزامی است." };
    }

    const emailExists = users.some(
      (user) => user.email.toLowerCase() === normalizedEmail
    );

    if (emailExists) {
      return { ok: false, error: "این ایمیل قبلاً ثبت شده است." };
    }

    const newUser = {
      id: generateId(),
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: role || (users.length === 0 ? ROLES.ADMIN : ROLES.MEMBER),
      createdAt: new Date().toISOString(),
    };

    setUsers((prevUsers) => [...prevUsers, newUser]);
    setCurrentUserId(newUser.id);

    toast.success("ثبت‌نام با موفقیت انجام شد.");

    return { ok: true, user: newUser };
  };

  const login = ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();

    const user = users.find(
      (u) => u.email.toLowerCase() === normalizedEmail
    );

    if (!user || user.password !== password) {
      return { ok: false, error: "ایمیل یا رمز عبور اشتباه است." };
    }

    setCurrentUserId(user.id);

    toast.success(`خوش آمدی، ${user.name}`);

    return { ok: true, user };
  };

  const logout = () => {
    setCurrentUserId(null);
    toast.info("از حساب کاربری خارج شدید.");
  };

  const addUser = ({ name, email, password, role }) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!name.trim()) {
      return { ok: false, error: "نام الزامی است." };
    }

    if (!normalizedEmail) {
      return { ok: false, error: "ایمیل الزامی است." };
    }

    if (!password) {
      return { ok: false, error: "رمز عبور الزامی است." };
    }

    const emailExists = users.some(
      (user) => user.email.toLowerCase() === normalizedEmail
    );

    if (emailExists) {
      return { ok: false, error: "این ایمیل قبلاً ثبت شده است." };
    }

    const newUser = {
      id: generateId(),
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: role || ROLES.MEMBER,
      createdAt: new Date().toISOString(),
    };

    setUsers((prevUsers) => [...prevUsers, newUser]);

    toast.success("کاربر با موفقیت اضافه شد.");

    return { ok: true, user: newUser };
  };

  const updateUser = (id, updates) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, ...updates } : user
      )
    );

    toast.success("اطلاعات کاربر به‌روزرسانی شد.");
  };

  const deleteUser = (id) => {
    if (id === currentUserId) {
      setCurrentUserId(null);
    }

    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.assigneeId === id
          ? { ...task, assigneeId: null, updatedAt: new Date().toISOString() }
          : task
      )
    );

    toast.success("کاربر حذف شد.");
  };

  const addProject = ({ title, description }) => {
    const project = {
      id: generateId(),
      title: title.trim(),
      description: description.trim(),
      createdAt: new Date().toISOString(),
      createdBy: currentUserId,
    };

    setProjects((prevProjects) => [...prevProjects, project]);

    toast.success("پروژه با موفقیت ایجاد شد.");

    return project;
  };

  const updateProject = (id, updates) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id ? { ...project, ...updates } : project
      )
    );

    toast.success("پروژه با موفقیت ویرایش شد.");
  };

  const deleteProject = (id) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== id)
    );

    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.projectId !== id)
    );

    toast.success("پروژه حذف شد.");
  };

  const addTask = (data) => {
    const now = new Date().toISOString();

    const task = {
      id: generateId(),
      projectId: data.projectId,
      title: data.title?.trim() || "",
      description: data.description?.trim() || "",
      priority: data.priority || "low",
      status: data.status || "todo",
      dueDate: data.dueDate || "",
      assigneeId: data.assigneeId || null,
      createdAt: now,
      updatedAt: now,
    };

    setTasks((prevTasks) => [...prevTasks, task]);

    toast.success("تسک با موفقیت اضافه شد.");

    return task;
  };

  const updateTask = (id, updates, options = { silent: false }) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      )
    );

    if (!options.silent) {
      toast.success("تسک به‌روزرسانی شد.");
    }
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

    toast.success("تسک حذف شد.");
  };

  const changeTaskStatus = (id, status) => {
    const task = tasks.find((t) => t.id === id);

    if (!task) {
      return;
    }

    const allowed = isAdmin || task.assigneeId === currentUser?.id;

    if (!allowed) {
      toast.error("فقط مدیر یا مسئول تسک می‌تواند وضعیت این تسک را تغییر دهد.");
      return;
    }

    updateTask(id, { status }, { silent: true });

    toast.success("وضعیت تسک تغییر کرد.");
  };

  const value = {
    users,
    projects,
    tasks,
    currentUser,
    isAdmin,
    canManageUsers,
    canManageProjects,
    canCreateTask,
    canEditTask,
    canDeleteTask,
    canChangeTaskStatus,
    registerUser,
    login,
    logout,
    addUser,
    updateUser,
    deleteUser,
    addProject,
    updateProject,
    deleteProject,
    addTask,
    updateTask,
    deleteTask,
    changeTaskStatus,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp باید داخل AppProvider استفاده شود.");
  }

  return context;
}