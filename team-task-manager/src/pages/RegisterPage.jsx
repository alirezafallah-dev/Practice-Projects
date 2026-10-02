import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

export default function RegisterPage() {
  const { registerUser, currentUser } = useApp();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

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

    if (form.password.length < 6) {
      setError("رمز عبور باید حداقل ۶ کاراکتر باشد.");
      return;
    }

    const result = registerUser(form);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="card auth-card">
        <h1>ثبت‌نام</h1>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit} className="form">
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

          <button type="submit">ثبت‌نام</button>
        </form>

        <p>
          حساب کاربری دارید؟ <Link to="/login">ورود</Link>
        </p>
      </div>
    </div>
  );
}