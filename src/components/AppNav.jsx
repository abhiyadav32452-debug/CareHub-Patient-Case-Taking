import { Link, useLocation } from "react-router-dom";
import Brand from "./Brand";

export default function AppNav({ patient = false }) {
  const location = useLocation();

  return (
    <header className="app-nav">
      <div className="shell nav-shell">
        <Brand />

        <nav className="nav-links">
          {patient ? (
            <>
              <Link className={location.pathname === "/patient" ? "active" : ""} to="/patient">Dashboard</Link>
              <Link className={location.pathname === "/check-in" ? "active" : ""} to="/check-in">Check-in</Link>
              <Link className={location.pathname === "/documents" ? "active" : ""} to="/documents">Documents</Link>
              <Link className={location.pathname === "/case-summary" ? "active" : ""} to="/case-summary">Case</Link>
            </>
          ) : (
            <>
              <Link to="/">Home</Link>
              <Link to="/patient">Patient</Link>
              <Link className={location.pathname.startsWith("/doctor") ? "active" : ""} to="/doctor">Doctor Dashboard</Link>
            </>
          )}
        </nav>

        <div className="nav-profile">
          <span className="status-dot" />
          <span>{patient ? "Patient" : "Clinical workspace"}</span>
          <Link to="/" className="nav-exit">Exit</Link>
        </div>
      </div>
    </header>
  );
}