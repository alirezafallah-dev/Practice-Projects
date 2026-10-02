import { useMemo, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import { getReminderTasks } from "../utils/date.js";
import { ROLE_LABELS } from "../constants";

export default function Layout() {
  const { currentUser, logout, tasks } = useApp();
  const navigate = useNavigate();

  const [showReminder, setShowReminder] = useState(true);

  const reminders = useMemo(() => {
    return getReminderTasks(tasks);
  }, [tasks]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="brand">مدیریت وظایف تیمی</div>

        <nav className="nav">
          <NavLink to="/dashboard">داشبورد</NavLink>
          <NavLink to="/projects">پروژه‌ها</NavLink>
          <NavLink to="/users">کاربران</NavLink>
        </nav>

        <div className="user-info">
          <span>{currentUser?.name}</span>
          <span className="badge">{ROLE_LABELS[currentUser?.role]}</span>
          <button onClick={handleLogout}>خروج</button>
        </div>
      </header>

      {showReminder && reminders.total > 0 && (
        <div
          className="modal-overlay"
          onClick={() => setShowReminder(false)}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>یادآور وظایف</h3>

            <p>
              برخی وظایف به مهلت انجام رسیده‌اند یا به‌زودی به مهلت انجام
              می‌رسند.
            </p>

            <ul className="reminder-list">
              {reminders.overdue.length > 0 && (
                <li className="reminder-danger">
                  {reminders.overdue.length} تسک عقب‌افتاده دارید
                </li>
              )}

              {reminders.today.length > 0 && (
                <li className="reminder-warning">
                  {reminders.today.length} تسک با مهلت امروز دارید
                </li>
              )}

              {reminders.soon.length > 0 && (
                <li className="reminder-info">
                  {reminders.soon.length} تسک نزدیک به مهلت دارید
                </li>
              )}
            </ul>

            <div className="modal-actions">
              <button onClick={() => setShowReminder(false)}>
                متوجه شدم
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}