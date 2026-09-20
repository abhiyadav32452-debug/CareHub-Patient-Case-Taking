import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [role, setRole] = useState("patient");
  const [name, setName] = useState("");

  function submit(e) {
    e.preventDefault();
    localStorage.setItem("carehub_patient_name", name || "Patient User");
    localStorage.setItem("carehub_role", role);
    navigate(role === "patient" ? "/patient" : "/doctor");
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/login" className="back-link">← Back to login</Link>
        <div className="auth-brand"><span className="brand-mark">✦</span><div><b>CareHub</b><small>Prototype registration</small></div></div>
        <h1>Create account access.</h1>
        <p>This is prototype-only registration. No real account is created.</p>
        <form onSubmit={submit}>
          <label>Full name<input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Patient User" /></label>
          <label>Role<select value={role} onChange={(e) => setRole(e.target.value)}><option value="patient">Patient</option><option value="doctor">Doctor</option></select></label>
          <button className="primary-btn full">Continue as {role} <span>→</span></button>
        </form>
        <div className="account-credentials"><b>Account note</b><span>Your name is stored only in this browser for this presentation environment.</span></div>
      </div>
    </div>
  );
}