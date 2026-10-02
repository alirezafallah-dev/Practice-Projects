import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import { formatDate } from "../utils/date.js";
import { useConfirm } from "../context/ConfirmDialogContext.jsx";

export default function ProjectsPage() {
  const {
    projects,
    tasks,
    addProject,
    updateProject,
    deleteProject,
    canManageProjects,
  } = useApp();

  const confirm = useConfirm();

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
    });

    setEditingId(null);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      setError("عنوان پروژه الزامی است.");
      return;
    }

    if (editingId) {
      updateProject(editingId, form);
    } else {
      addProject(form);
    }

    resetForm();
  };

  const startEdit = (project) => {
    setEditingId(project.id);

    setForm({
      title: project.title,
      description: project.description,
    });

    setError("");
  };

  const handleDelete = async (project) => {
    const confirmed = await confirm(
      `پروژه «${project.title}» و همه تسک‌های آن حذف شود؟`
    );

    if (confirmed) {
      deleteProject(project.id);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>پروژه‌ها</h1>
      </div>

      {canManageProjects && (
        <form className="card form" onSubmit={handleSubmit}>
          <h2>{editingId ? "ویرایش پروژه" : "افزودن پروژه جدید"}</h2>

          {error && <p className="error">{error}</p>}

          <label>عنوان پروژه</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, title: e.target.value }))
            }
          />

          <label>توضیح پروژه</label>
          <textarea
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, description: e.target.value }))
            }
          />

          <div>
            <button type="submit">
              {editingId ? "ذخیره تغییرات" : "افزودن پروژه"}
            </button>

            {editingId && (
              <button type="button" onClick={resetForm}>
                انصراف
              </button>
            )}
          </div>
        </form>
      )}

      {projects.length === 0 ? (
        <div className="empty">هنوز پروژه‌ای ساخته نشده است.</div>
      ) : (
        <div className="grid">
          {projects.map((project) => {
            const projectTasks = tasks.filter(
              (task) => task.projectId === project.id
            );

            const doneTasks = projectTasks.filter(
              (task) => task.status === "done"
            );

            return (
              <div key={project.id} className="card project-card">
                <h3>{project.title}</h3>

                <p>{project.description}</p>

                <p>تاریخ ایجاد: {formatDate(project.createdAt)}</p>

                <p>
                  تسک‌ها: {projectTasks.length} / انجام شده:{" "}
                  {doneTasks.length}
                </p>

                <div className="card-actions">
                  <Link to={`/projects/${project.id}`}>
                    ورود به مدیریت تسک‌ها
                  </Link>

                  {canManageProjects && (
                    <>
                      <button onClick={() => startEdit(project)}>
                        ویرایش
                      </button>

                      <button onClick={() => handleDelete(project)}>
                        حذف
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}