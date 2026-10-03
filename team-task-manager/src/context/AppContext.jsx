import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext(null);

// Mock Data
const mockUsers = [
  { id: 1, name: "Alireza Fallah", email: "admin@example.com", role: "admin", password: "123456", avatar: "AF" },
  { id: 2, name: "John Doe", email: "john@example.com", role: "developer", password: "123456", avatar: "JD" },
  { id: 3, name: "Sarah Smith", email: "sarah@example.com", role: "designer", password: "123456", avatar: "SS" },
  { id: 4, name: "Mike Johnson", email: "mike@example.com", role: "developer", password: "123456", avatar: "MJ" },
  { id: 5, name: "Emma Wilson", email: "emma@example.com", role: "qa", password: "123456", avatar: "EW" },
];

const mockProjects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Building a modern e-commerce platform with React and Node.js",
    status: "active",
    progress: 65,
    startDate: "2026-08-01",
    endDate: "2026-12-31",
    members: [1, 2, 3],
    color: "from-blue-500 to-cyan-500",
    createdAt: "2026-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "Mobile App Redesign",
    description: "Redesigning the mobile app UI/UX for better user experience",
    status: "active",
    progress: 40,
    startDate: "2026-09-01",
    endDate: "2026-11-30",
    members: [3, 4],
    color: "from-purple-500 to-pink-500",
    createdAt: "2026-09-01T10:00:00Z",
  },
  {
    id: 3,
    title: "API Integration",
    description: "Integrating third-party APIs for payment and analytics",
    status: "planning",
    progress: 15,
    startDate: "2026-10-01",
    endDate: "2027-01-31",
    members: [1, 2, 5],
    color: "from-amber-500 to-orange-500",
    createdAt: "2026-10-01T10:00:00Z",
  },
  {
    id: 4,
    title: "Documentation System",
    description: "Creating comprehensive documentation for all products",
    status: "on_hold",
    progress: 30,
    startDate: "2026-07-01",
    endDate: "2026-10-31",
    members: [5],
    color: "from-emerald-500 to-teal-500",
    createdAt: "2026-07-01T10:00:00Z",
  },
  {
    id: 5,
    title: "Marketing Website",
    description: "Building a new marketing website with modern animations",
    status: "completed",
    progress: 100,
    startDate: "2026-06-01",
    endDate: "2026-08-31",
    members: [3, 4],
    color: "from-rose-500 to-red-500",
    createdAt: "2026-06-01T10:00:00Z",
  },
  {
    id: 6,
    title: "DevOps Pipeline",
    description: "Setting up CI/CD pipeline and automated testing",
    status: "active",
    progress: 75,
    startDate: "2026-08-15",
    endDate: "2026-10-15",
    members: [1, 2],
    color: "from-indigo-500 to-blue-500",
    createdAt: "2026-08-15T10:00:00Z",
  },
];

const mockTasks = [
  {
    id: 1,
    projectId: 1,
    title: "Setup project structure",
    description: "Initialize React project with Vite and configure build tools",
    status: "done",
    priority: "high",
    assigneeId: 2,
    dueDate: "2026-09-15",
    createdAt: "2026-08-01T10:00:00Z",
  },
  {
    id: 2,
    projectId: 1,
    title: "Design database schema",
    description: "Create MongoDB schemas for products, users, and orders",
    status: "done",
    priority: "high",
    assigneeId: 1,
    dueDate: "2026-09-20",
    createdAt: "2026-08-05T10:00:00Z",
  },
  {
    id: 3,
    projectId: 1,
    title: "Implement authentication",
    description: "Add JWT-based authentication with refresh tokens",
    status: "in_progress",
    priority: "high",
    assigneeId: 2,
    dueDate: "2026-10-10",
    createdAt: "2026-08-10T10:00:00Z",
  },
  {
    id: 4,
    projectId: 1,
    title: "Create product catalog UI",
    description: "Build responsive product listing with filters and search",
    status: "in_progress",
    priority: "medium",
    assigneeId: 3,
    dueDate: "2026-10-15",
    createdAt: "2026-08-15T10:00:00Z",
  },
  {
    id: 5,
    projectId: 1,
    title: "Shopping cart implementation",
    description: "Add cart functionality with local storage persistence",
    status: "todo",
    priority: "medium",
    assigneeId: 2,
    dueDate: "2026-10-25",
    createdAt: "2026-08-20T10:00:00Z",
  },
  {
    id: 6,
    projectId: 1,
    title: "Payment gateway integration",
    description: "Integrate Stripe for payment processing",
    status: "todo",
    priority: "high",
    assigneeId: 1,
    dueDate: "2026-11-05",
    createdAt: "2026-08-25T10:00:00Z",
  },
  {
    id: 7,
    projectId: 2,
    title: "User research",
    description: "Conduct user interviews and analyze feedback",
    status: "done",
    priority: "high",
    assigneeId: 3,
    dueDate: "2026-09-20",
    createdAt: "2026-09-01T10:00:00Z",
  },
  {
    id: 8,
    projectId: 2,
    title: "Wireframe designs",
    description: "Create wireframes for all main screens",
    status: "in_progress",
    priority: "high",
    assigneeId: 3,
    dueDate: "2026-10-05",
    createdAt: "2026-09-05T10:00:00Z",
  },
  {
    id: 9,
    projectId: 2,
    title: "Design system creation",
    description: "Build reusable component library in Figma",
    status: "in_progress",
    priority: "medium",
    assigneeId: 3,
    dueDate: "2026-10-15",
    createdAt: "2026-09-10T10:00:00Z",
  },
  {
    id: 10,
    projectId: 2,
    title: "Prototype development",
    description: "Build interactive prototype for user testing",
    status: "todo",
    priority: "medium",
    assigneeId: 4,
    dueDate: "2026-10-30",
    createdAt: "2026-09-15T10:00:00Z",
  },
  {
    id: 11,
    projectId: 3,
    title: "Research payment APIs",
    description: "Compare Stripe, PayPal, and Square APIs",
    status: "in_progress",
    priority: "high",
    assigneeId: 1,
    dueDate: "2026-10-10",
    createdAt: "2026-10-01T10:00:00Z",
  },
  {
    id: 12,
    projectId: 3,
    title: "Analytics setup",
    description: "Integrate Google Analytics and Mixpanel",
    status: "todo",
    priority: "medium",
    assigneeId: 2,
    dueDate: "2026-11-01",
    createdAt: "2026-10-05T10:00:00Z",
  },
  {
    id: 13,
    projectId: 4,
    title: "API documentation",
    description: "Write OpenAPI specs for all endpoints",
    status: "in_progress",
    priority: "medium",
    assigneeId: 5,
    dueDate: "2026-09-30",
    createdAt: "2026-07-01T10:00:00Z",
  },
  {
    id: 14,
    projectId: 6,
    title: "Docker setup",
    description: "Containerize all microservices",
    status: "done",
    priority: "high",
    assigneeId: 1,
    dueDate: "2026-09-01",
    createdAt: "2026-08-15T10:00:00Z",
  },
  {
    id: 15,
    projectId: 6,
    title: "GitHub Actions workflow",
    description: "Setup automated testing and deployment",
    status: "done",
    priority: "high",
    assigneeId: 2,
    dueDate: "2026-09-10",
    createdAt: "2026-08-20T10:00:00Z",
  },
  {
    id: 16,
    projectId: 6,
    title: "Monitoring setup",
    description: "Configure Prometheus and Grafana",
    status: "in_progress",
    priority: "medium",
    assigneeId: 1,
    dueDate: "2026-10-01",
    createdAt: "2026-08-25T10:00:00Z",
  },
  {
    id: 17,
    projectId: 1,
    title: "Order management system",
    description: "Build admin panel for order tracking",
    status: "todo",
    priority: "medium",
    assigneeId: 4,
    dueDate: "2026-11-20",
    createdAt: "2026-09-01T10:00:00Z",
  },
  {
    id: 18,
    projectId: 2,
    title: "Usability testing",
    description: "Conduct usability tests with real users",
    status: "todo",
    priority: "high",
    assigneeId: 5,
    dueDate: "2026-11-15",
    createdAt: "2026-09-20T10:00:00Z",
  },
];

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });
  const [users, setUsers] = useState(mockUsers);
  const [projects, setProjects] = useState(mockProjects);
  const [tasks, setTasks] = useState(mockTasks);
  const [loading, setLoading] = useState(false);

  const login = ({ email, password }) => {
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return { ok: false, error: "Invalid email or password" };
    }

    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;
    setCurrentUser(userWithoutPassword);
    localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
    return { ok: true, user: userWithoutPassword };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  const register = ({ name, email, password, role }) => {
    if (mockUsers.some((u) => u.email === email)) {
      return { ok: false, error: "Email already exists" };
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      role: role || "developer",
      avatar: name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2),
    };
    setUsers((prev) => [...prev, newUser]);
    mockUsers.push({ ...newUser, password });
    return { ok: true, user: newUser };
  };

  const addProject = (project) => {
    const newProject = {
      id: Date.now(),
      ...project,
      progress: 0,
      createdAt: new Date().toISOString(),
    };
    setProjects((prev) => [...prev, newProject]);
    return newProject;
  };

  const updateProject = (projectId, updates) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, ...updates } : p))
    );
  };

  const deleteProject = (projectId) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    setTasks((prev) => prev.filter((t) => t.projectId !== projectId));
  };

  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      ...task,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, newTask]);
    return newTask;
  };

  const updateTask = (taskId, updates) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, ...updates } : t))
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const getProjectTasks = (projectId) => {
    return tasks.filter((t) => t.projectId === projectId);
  };

  const getProjectProgress = (projectId) => {
    const projectTasks = getProjectTasks(projectId);
    if (projectTasks.length === 0) return 0;
    const done = projectTasks.filter((t) => t.status === "done").length;
    return Math.round((done / projectTasks.length) * 100);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        projects,
        tasks,
        loading,
        login,
        logout,
        register,
        addProject,
        updateProject,
        deleteProject,
        addTask,
        updateTask,
        deleteTask,
        getProjectTasks,
        getProjectProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}