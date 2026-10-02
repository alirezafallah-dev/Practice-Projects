import { useState } from "react";
import { useApp } from "../context/AppContext.jsx";
import { ROLE_LABELS, ROLES } from "../constants";
import { useConfirm } from "../context/ConfirmDialogContext.jsx";

export default function UsersPage() {
  const {
    users,
    tasks,
    projects,
    addUser,
    updateUser,
    deleteUser,
    addTask,
    currentUser,
    canManageUsers,
    canCreateTask,
  } = useApp();

  const confirm = useConfirm();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: ROLES.MEMBER,
  });

  const [error, setError] = useState("");

  const [assignUser, setAssignUser] = useState(null);

  const [assignForm, setAssignForm] = useState({
    projectId: "",
    title: "",
  });

  const [assignError, setAssignError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError("نام، ایمیل و رمز عبور الزامی است.");
      return;
    }

    const result = addUser(form);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setForm({
      name: "",
      email: "",
      password: "",
      role: ROLES.MEMBER,
    });

    setError("");
  };

  const assignedTasksCount = (userId) => {
    return tasks.filter((task) => task.assigneeId === userId).length;
  };

  const handleDeleteUser = async (user) => {
    const confirmed = await confirm(
      `کاربر «${user.name}» حذف شود؟`
    );

    if (confirmed) {
      deleteUser(user.id);
    }
  };

  const openAssignTask = (user) => {
    setAssignUser(user);

    setAssignForm({
      projectId: projects[0]?.id || "",
      title: "",
    });

    setAssignError("");
  };

  const closeAssignTask = () => {
    setAssignUser(null);

    setAssignForm({
      projectId: "",
      title: "",
    });

    setAssignError("");
  };

  const handleSubmitAssignTask = (e) => {
    e.preventDefault();

    if (!assignForm.projectId) {
      setAssignError("برای اختصاص وظیفه ابتدا باید یک پروژه بسازید.");
      return;
    }

    if (!assignForm.title.trim()) {
      setAssignError("عنوان وظیفه الزامی است.");
      return;
    }

    addTask({
      projectId: assignForm.projectId,
      title: assignForm.title,
      assigneeId: assignUser.id,
    });

    closeAssignTask();
  };

  return (
    <div>
      <div className="page-header">
        <h1>مدیریت کاربران</h1>
      </div>

      {canManageUsers && (
        <form className="card form" onSubmit={handleSubmit}>
          <h2>افزودن عضو جدید</h2>

          {error && <p className="error">{error}</p>}

          <label>نام</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <label>ایمیل</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <label>رمز عبور</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          <label>نقش</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value={ROLES.MEMBER}>
              {ROLE_LABELS[ROLES.MEMBER]}
            </option>

            <option value={ROLES.ADMIN}>
              {ROLE_LABELS[ROLES.ADMIN]}
            </option>
          </select>

          <button type="submit">افزودن کاربر</button>
        </form>
      )}

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>نام</th>
              <th>ایمیل</th>
              <th>نقش</th>
              <th>تعداد تسک‌های محول‌شده</th>
              {canManageUsers && <th>عملیات</th>}
            </tr>
          </thead>

          <tbody>
            {users.map((user) => {
              const isSelf = currentUser?.id === user.id;

              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>

                  <td>
                    {canManageUsers ? (
                      <select
                        disabled={isSelf}
                        value={user.role}
                        onChange={(e) =>
                          updateUser(user.id, { role: e.target.value })
                        }
                      >
                        <option value={ROLES.MEMBER}>
                          {ROLE_LABELS[ROLES.MEMBER]}
                        </option>

                        <option value={ROLES.ADMIN}>
                          {ROLE_LABELS[ROLES.ADMIN]}
                        </option>
                      </select>
                    ) : (
                      <span className="badge">
                        {ROLE_LABELS[user.role]}
                      </span>
                    )}
                  </td>

                  <td>{assignedTasksCount(user.id)}</td>

                  {canManageUsers && (
                    <td>
                      <div className="user-actions">
                        {canCreateTask && (
                          <button onClick={() => openAssignTask(user)}>
                            اختصاص وظیفه
                          </button>
                        )}

                        <button
                          disabled={isSelf}
                          onClick={() => handleDeleteUser(user)}
                        >
                          حذف
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {assignUser && (
        <div
          className="modal-overlay"
          onClick={closeAssignTask}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>اختصاص وظیفه به {assignUser.name}</h3>

            {projects.length === 0 ? (
              <>
                <p className="error">
                  ابتدا یک پروژه بسازید، سپس می‌توانید وظیفه اختصاص دهید.
                </p>

                <div className="modal-actions">
                  <button onClick={closeAssignTask}>بستن</button>
                </div>
              </>
            ) : (
              <form
                className="form"
                onSubmit={handleSubmitAssignTask}
              >
                {assignError && <p className="error">{assignError}</p>}

                <label>پروژه</label>
                <select
                  value={assignForm.projectId}
                  onChange={(e) =>
                    setAssignForm((prev) => ({
                      ...prev,
                      projectId: e.target.value,
                    }))
                  }
                >
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.title}
                    </option>
                  ))}
                </select>

                <label>عنوان وظیفه</label>
                <input
                  type="text"
                  value={assignForm.title}
                  onChange={(e) =>
                    setAssignForm((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />

                <div className="modal-actions">
                  <button type="submit">ثبت وظیفه</button>
                  <button type="button" onClick={closeAssignTask}>
                    انصراف
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}