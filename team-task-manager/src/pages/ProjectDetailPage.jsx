import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import {
  PRIORITY_LABELS,
  STATUS_LABELS,
  TASK_PRIORITIES,
  TASK_STATUS,
} from "../constants";
import { formatDate } from "../utils/date.js";
import { useConfirm } from "../context/ConfirmDialogContext.jsx";

const emptyTaskForm = {
  title: "",
  description: "",
  priority: TASK_PRIORITIES.LOW,
  status: TASK_STATUS.TODO,
  dueDate: "",
  assigneeId: "",
};

export default function ProjectDetailPage() {
  const { projectId } = useParams();

  const {
    projects,
    tasks,
    users,
    addTask,
    updateTask,
    deleteTask,
    changeTaskStatus,
    canCreateTask,
    canEditTask,
    canDeleteTask,
    canChangeTaskStatus,
  } = useApp();

  const confirm = useConfirm();
  const [showForm, setShowForm] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const [form, setForm] = useState(emptyTaskForm);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    priority: "",
    assigneeId: "",
    dueFrom: "",
    dueTo: "",
  });

  const project = projects.find((p) => p.id === projectId);

  const projectTasks = useMemo(() => {
    return tasks.filter((task) => task.projectId === projectId);
  }, [tasks, projectId]);

  const filteredTasks = useMemo(() => {
    return projectTasks.filter((task) => {
      const search = filters.search.trim().toLowerCase();

      if (search && !task.title.toLowerCase().includes(search)) {
        return false;
      }

      if (filters.status && task.status !== filters.status) {
        return false;
      }

      if (filters.priority && task.priority !== filters.priority) {
        return false;
      }

      if (filters.assigneeId) {
        if (filters.assigneeId === "none") {
          if (task.assigneeId) {
            return false;
          }
        } else if (task.assigneeId !== filters.assigneeId) {
          return false;
        }
      }

      if (filters.dueFrom && (!task.dueDate || task.dueDate < filters.dueFrom)) {
        return false;
      }

      if (filters.dueTo && (!task.dueDate || task.dueDate > filters.dueTo)) {
        return false;
      }

      return true;
    });
  }, [projectTasks, filters]);

  if (!project) {
    return (
      <div className="card">
        <p>پروژه پیدا نشد.</p>
        <Link to="/projects">بازگشت به پروژه‌ها</Link>
      </div>
    );
  }

  const resetForm = () => {
    setForm(emptyTaskForm);
    setEditingTaskId(null);
    setShowForm(false);
  };

  const openNewTask = () => {
    setForm(emptyTaskForm);
    setEditingTaskId(null);
    setShowForm(true);
  };

  const openEditTask = (task) => {
    setForm({
      title: task.title,
      description: task.description || "",
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate || "",
      assigneeId: task.assigneeId || "",
    });

    setEditingTaskId(task.id);
    setShowForm(true);
  };

  const handleDeleteTask = async (task) => {
    const confirmed = await confirm(
      `تسک «${task.title}» حذف شود؟`
    );

    if (confirmed) {
      deleteTask(task.id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      return;
    }

    const payload = {
      ...form,
      projectId,
      assigneeId: form.assigneeId || null,
    };

    if (editingTaskId) {
      updateTask(editingTaskId, payload);
    } else {
      addTask(payload);
    }

    resetForm();
  };

  const getUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user?.name || "بدون مسئول";
  };

  return (
    <div>
      <Link to="/projects">بازگشت به پروژه‌ها</Link>

      <div className="card">
        <h1>{project.title}</h1>
        <p>{project.description}</p>
        <p>تاریخ ایجاد: {formatDate(project.createdAt)}</p>
      </div>

      <div className="card filters">
        <div>
          <label>جستجو</label>
          <input
            type="text"
            placeholder="جستجو بر اساس عنوان تسک"
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
          />
        </div>

        <div>
          <label>وضعیت</label>
          <select
            value={filters.status}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, status: e.target.value }))
            }
          >
            <option value="">همه وضعیت‌ها</option>

            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>اولویت</label>
          <select
            value={filters.priority}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, priority: e.target.value }))
            }
          >
            <option value="">همه اولویت‌ها</option>

            {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>عضو مسئول</label>
          <select
            value={filters.assigneeId}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, assigneeId: e.target.value }))
            }
          >
            <option value="">همه اعضا</option>
            <option value="none">بدون مسئول</option>

            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>از تاریخ</label>
          <input
            type="date"
            value={filters.dueFrom}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, dueFrom: e.target.value }))
            }
          />
        </div>

        <div>
          <label>تا تاریخ</label>
          <input
            type="date"
            value={filters.dueTo}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, dueTo: e.target.value }))
            }
          />
        </div>

        <button
          type="button"
          onClick={() =>
            setFilters({
              search: "",
              status: "",
              priority: "",
              assigneeId: "",
              dueFrom: "",
              dueTo: "",
            })
          }
        >
          پاک کردن فیلترها
        </button>
      </div>

      <div className="page-header">
        <h2>تسک‌های پروژه</h2>

        {canCreateTask && (
          <button onClick={openNewTask}>افزودن تسک</button>
        )}
      </div>

      {canCreateTask && showForm && (
        <form className="card form" onSubmit={handleSubmit}>
          <h3>{editingTaskId ? "ویرایش تسک" : "افزودن تسک جدید"}</h3>

          <label>عنوان تسک</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, title: e.target.value }))
            }
          />

          <label>توضیح تسک</label>
          <textarea
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, description: e.target.value }))
            }
          />

          <label>اولویت</label>
          <select
            value={form.priority}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, priority: e.target.value }))
            }
          >
            {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          <label>وضعیت</label>
          <select
            value={form.status}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, status: e.target.value }))
            }
          >
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          <label>مهلت انجام</label>
          <input
            type="date"
            value={form.dueDate}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, dueDate: e.target.value }))
            }
          />

          <label>شخص مسئول</label>
          <select
            value={form.assigneeId}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, assigneeId: e.target.value }))
            }
          >
            <option value="">بدون مسئول</option>

            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          <div>
            <button type="submit">
              {editingTaskId ? "ذخیره تغییرات" : "افزودن تسک"}
            </button>

            <button type="button" onClick={resetForm}>
              انصراف
            </button>
          </div>
        </form>
      )}

      {filteredTasks.length === 0 ? (
        <div className="empty">تسکی پیدا نشد.</div>
      ) : (
        <div>
          {filteredTasks.map((task) => (
            <div key={task.id} className="card task-card">
              <div>
                <h3>{task.title}</h3>

                {task.description && <p>{task.description}</p>}

                <div className="task-meta">
                  <span className={`badge badge-${task.priority}`}>
                    اولویت: {PRIORITY_LABELS[task.priority]}
                  </span>

                  <span className={`badge badge-${task.status}`}>
                    وضعیت: {STATUS_LABELS[task.status]}
                  </span>

                  <span className="badge">
                    مهلت: {formatDate(task.dueDate) || "-"}
                  </span>

                  <span className="badge">
                    مسئول: {getUserName(task.assigneeId)}
                  </span>
                </div>
              </div>

              <div className="task-actions">
                <select
                  value={task.status}
                  disabled={!canChangeTaskStatus(task)}
                  onChange={(e) => changeTaskStatus(task.id, e.target.value)}
                  className={`status-select status-select-${task.status}`}
                >
                  {Object.entries(STATUS_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>

                {canEditTask(task) && (
                  <button onClick={() => openEditTask(task)}>ویرایش</button>
                )}

                {canDeleteTask(task) && (
                  <button onClick={() => handleDeleteTask(task)}>حذف</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}