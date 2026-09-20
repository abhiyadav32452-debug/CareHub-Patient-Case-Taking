import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AppNav from "../components/AppNav";
import { api } from "../services/api";
import { DoctorIcon, FileIcon, PulseIcon, ShieldIcon } from "../components/Icons";

function Status({ value }) {
  return <span className={`status-pill ${value}`}>{value}</span>;
}

export default function DoctorDashboard() {
  const [cases, setCases] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try { setCases(await api.getCases()); setError(""); }
    catch (err) { setError(`${err.message}. Start the backend with npm run server.`); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => cases.filter((item) => `${item.name} ${item.concern} ${item.id}`.toLowerCase().includes(query.toLowerCase())), [cases, query]);
  const stats = {
    total: cases.length,
    newCases: cases.filter((x) => x.status === "submitted").length,
    reviewed: cases.filter((x) => x.status === "reviewed").length,
    draft: cases.filter((x) => x.status === "draft").length,
  };

  return (
    <div className="doctor-page">
      <AppNav />
      <main className="shell doctor-main">
        <div className="doctor-header">
          <div><span className="step-count">CLINICAL WORKSPACE</span><h1>Doctor Dashboard</h1><p>Review structured patient cases before consultation.</p></div>
          <div className="doctor-actions"><button className="ghost-btn" onClick={load}>↻ Refresh</button><Link className="primary-btn" to="/check-in">+ Create new case</Link></div>
        </div>
        {error && <div className="form-error">{error}</div>}

        <div className="doctor-stats">
          <div><span>ALL CASES</span><strong>{stats.total}</strong><small>Patient records</small><PulseIcon /></div>
          <div><span>NEW FOR REVIEW</span><strong>{stats.newCases}</strong><small>Submitted cases</small><FileIcon /></div>
          <div><span>REVIEWED</span><strong>{stats.reviewed}</strong><small>Completed reviews</small><DoctorIcon /></div>
          <div><span>IN PROGRESS</span><strong>{stats.draft}</strong><small>Not yet submitted</small><ShieldIcon /></div>
        </div>

        <section className="case-table-card panel">
          <div className="table-toolbar"><div><span className="card-kicker">PATIENT QUEUE</span><h2>Cases awaiting attention</h2></div><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search patient, concern or case..." /></div>
          {loading ? <div className="loading-panel">Loading clinical cases...</div> : filtered.length === 0 ? <div className="empty-docs">No matching cases.</div> :
            <div className="case-table"><div className="table-row table-head"><span>CASE</span><span>PATIENT</span><span>CONCERN</span><span>STATUS</span><span>ACTION</span></div>
              {filtered.map((item) => <div className="table-row" key={item.id}><span className="case-code">{item.id}</span><span><b>{item.name}</b><small>{item.age} · {item.gender}</small></span><span>{item.concern}</span><span><Status value={item.status}/></span><Link className="table-action" to={`/doctor/case/${item.id}`}>Open case →</Link></div>)}
            </div>
          }
        </section>
      </main>
    </div>
  );
}
