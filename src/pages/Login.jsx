import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { APP_ACCOUNTS } from "../data/appData";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("patient");
  const [email, setEmail] = useState(APP_ACCOUNTS.patient.email);
  const [password, setPassword] = useState(APP_ACCOUNTS.patient.password);
  const [error, setError] = useState("");

  function switchRole(next) {
    setRole(next);
    setEmail(APP_ACCOUNTS[next].email);
    setPassword(APP_ACCOUNTS[next].password);
    setError("");
  }

  function submit(e) {
    e.preventDefault();
    const account = APP_ACCOUNTS[role];
    if (email !== account.email || password !== account.password) {
      setError("For this prototype, use the account credentials shown below.");
      return;
    }
    localStorage.setItem("carehub_role", role);
    if (role === "patient") navigate("/patient");
    else navigate("/doctor");
  }

  return (
    <div className="auth-page">
      <div className="auth-orb" />
      <div className="auth-card">
        <Link to="/" className="back-link">← Back to CareHub</Link>
        <div className="auth-brand"><span className="brand-mark">✦</span><div><b>CareHub</b><small>Secure account access</small></div></div>
        <h1>Welcome back.</h1>
        <p>Choose your role and continue into the healthcare workflow.</p>

        <div className="role-switch">
          <button className={role === "patient" ? "selected" : ""} onClick={() => switchRole("patient")}>Patient</button>
          <button className={role === "doctor" ? "selected" : ""} onClick={() => switchRole("doctor")}>Doctor</button>
        </div>

        <form onSubmit={submit}>
          <label>Email<input value={email} onChange={(e) => setEmail(e.target.value)} /></label>
          <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
          {error && <div className="form-error">{error}</div>}
          <button className="primary-btn full">Enter {role} workspace <span>→</span></button>
        </form>

        <div className="account-credentials"><b>Account credentials</b><span>{APP_ACCOUNTS[role].email}</span><span>{APP_ACCOUNTS[role].password}</span></div>
        <div className="auth-footer">New here? <Link to="/signup">Create account access</Link></div>
      </div>
    </div>
  );
}