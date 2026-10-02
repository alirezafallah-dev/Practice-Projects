import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

export default function LoginPage() {
  const { login, currentUser } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = login({ email, password });

    if (!result.ok) {
      setError(result.error);
      return;
    }

    navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="card auth-card">
        <h1>ورود</h1>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit} className="form">
          <label>ایمیل</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>رمز عبور</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">ورود</button>
        </form>

        <p>
          حساب کاربری ندارید؟ <Link to="/register">ثبت‌نام</Link>
        </p>
      </div>
    </div>
  );
}