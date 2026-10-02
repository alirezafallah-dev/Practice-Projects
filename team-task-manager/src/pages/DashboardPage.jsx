import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import {
  isOverdue,
  isDueToday,
  isDueSoon,
  formatDate,
} from "../utils/date.js";
import { PRIORITY_LABELS, ROLE_LABELS } from "../constants";

export default function DashboardPage() {
  const { projects, tasks, users, currentUser } = useApp();

  const stats = useMemo(() => {
    const totalProjects = projects.length;
    const totalTasks = tasks.length;

    const done = tasks.filter((task) => task.status === "done").length;

    const inProgress = tasks.filter(
      (task) => task.status === "in_progress"
    ).length;

    const todo = tasks.filter((task) => task.status === "todo").length;

    const overdue = tasks.filter(isOverdue).length;

    const dueToday = tasks.filter(isDueToday).length;

    const dueSoon = tasks.filter((task) => isDueSoon(task, 3)).length;

    const myTasks = tasks.filter(
      (task) => task.assigneeId === currentUser?.id
    ).length;

    const completionRate = totalTasks
      ? Math.round((done / totalTasks) * 100)
      : 0;

    return {
      totalProjects,
      totalTasks,
      done,
      inProgress,
      todo,
      overdue,
      dueToday,
      dueSoon,
      myTasks,
      completionRate,
    };
  }, [projects, tasks, currentUser]);

  const overdueTasks = useMemo(() => {
    return tasks.filter(isOverdue).slice(0, 5);
  }, [tasks]);

  const todayTasks = useMemo(() => {
    return tasks.filter(isDueToday).slice(0, 5);
  }, [tasks]);

  const soonTasks = useMemo(() => {
    return tasks.filter((task) => isDueSoon(task, 3)).slice(0, 5);
  }, [tasks]);

  const usersTaskStats = useMemo(() => {
    return users.map((user) => {
      const userTasks = tasks.filter((task) => task.assigneeId === user.id);

      const done = userTasks.filter((task) => task.status === "done").length;

      return {
        user,
        total: userTasks.length,
        done,
      };
    });
  }, [users, tasks]);

  const getProjectTitle = (projectId) => {
    return (
      projects.find((project) => project.id === projectId)?.title ||
      "پروژه نامشخص"
    );
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>داشبورد</h1>
          <p>خوش آمدی، {currentUser?.name}</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value stat-info">
            {stats.totalProjects}
          </div>
          <div className="stat-label">کل پروژه‌ها</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{stats.totalTasks}</div>
          <div className="stat-label">کل تسک‌ها</div>
        </div>

        <div className="stat-card">
          <div className="stat-value stat-success">{stats.done}</div>
          <div className="stat-label">انجام شده</div>
        </div>

        <div className="stat-card">
          <div className="stat-value stat-info">{stats.inProgress}</div>
          <div className="stat-label">در حال انجام</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{stats.todo}</div>
          <div className="stat-label">در انتظار</div>
        </div>

        <div className="stat-card">
          <div className="stat-value stat-danger">{stats.overdue}</div>
          <div className="stat-label">عقب‌افتاده</div>
        </div>

        <div className="stat-card">
          <div className="stat-value stat-warning">{stats.dueToday}</div>
          <div className="stat-label">مهلت امروز</div>
        </div>

        <div className="stat-card">
          <div className="stat-value stat-warning">{stats.dueSoon}</div>
          <div className="stat-label">نزدیک به مهلت</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{stats.myTasks}</div>
          <div className="stat-label">تسک‌های من</div>
        </div>
      </div>

      <div className="card">
        <h2>پیشرفت کلی تسک‌ها</h2>

        <p>
          {stats.done} تسک از {stats.totalTasks} تسک انجام شده است.
        </p>

        <div className="progress">
          <div
            className="progress-bar"
            style={{ width: `${stats.completionRate}%` }}
          ></div>
        </div>

        <p className="muted">{stats.completionRate}% پیشرفت</p>
      </div>

      <div className="dashboard-columns">
        <div className="card">
          <h3>تسک‌های عقب‌افتاده</h3>

          {overdueTasks.length === 0 ? (
            <p className="muted">موردی وجود ندارد.</p>
          ) : (
            overdueTasks.map((task) => (
              <div key={task.id} className="task-mini">
                <p className="task-mini-title">
                  <Link to={`/projects/${task.projectId}`}>
                    {task.title}
                  </Link>
                </p>

                <div className="task-mini-meta">
                  <span>پروژه: {getProjectTitle(task.projectId)}</span>
                  <span>مهلت: {formatDate(task.dueDate)}</span>
                  <span>اولویت: {PRIORITY_LABELS[task.priority]}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="card">
          <h3>تسک‌هایی که مهلتشان امروز است</h3>

          {todayTasks.length === 0 ? (
            <p className="muted">موردی وجود ندارد.</p>
          ) : (
            todayTasks.map((task) => (
              <div key={task.id} className="task-mini">
                <p className="task-mini-title">
                  <Link to={`/projects/${task.projectId}`}>
                    {task.title}
                  </Link>
                </p>

                <div className="task-mini-meta">
                  <span>پروژه: {getProjectTitle(task.projectId)}</span>
                  <span>مهلت: {formatDate(task.dueDate)}</span>
                  <span>اولویت: {PRIORITY_LABELS[task.priority]}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="card">
          <h3>تسک‌های نزدیک به مهلت</h3>

          {soonTasks.length === 0 ? (
            <p className="muted">موردی وجود ندارد.</p>
          ) : (
            soonTasks.map((task) => (
              <div key={task.id} className="task-mini">
                <p className="task-mini-title">
                  <Link to={`/projects/${task.projectId}`}>
                    {task.title}
                  </Link>
                </p>

                <div className="task-mini-meta">
                  <span>پروژه: {getProjectTitle(task.projectId)}</span>
                  <span>مهلت: {formatDate(task.dueDate)}</span>
                  <span>اولویت: {PRIORITY_LABELS[task.priority]}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="card">
        <h2>آمار کاربران</h2>

        {usersTaskStats.length === 0 ? (
          <p className="muted">هنوز کاربری ثبت نشده است.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>نام کاربر</th>
                <th>نقش</th>
                <th>تعداد تسک‌های محول‌شده</th>
                <th>تعداد تسک‌های انجام‌شده</th>
              </tr>
            </thead>

            <tbody>
              {usersTaskStats.map(({ user, total, done }) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{ROLE_LABELS[user.role]}</td>
                  <td>{total}</td>
                  <td>{done}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}