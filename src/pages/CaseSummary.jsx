import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppNav from "../components/AppNav";
import { INTERVIEW_QUESTIONS } from "../data/appData";
import { api } from "../services/api";
import { FileIcon, ShieldIcon } from "../components/Icons";

export default function CaseSummary() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("carehub_case_id");
    if (!id) { navigate("/check-in"); return; }
    api.getCase(id).then(setData).catch((err) => setError(err.message));
  }, [navigate]);

  async function submit() {
    setSubmitting(true);
    try { setData(await api.status(data.id, "submitted")); }
    catch (err) { setError(err.message); }
    finally { setSubmitting(false); }
  }

  if (!data) return <div className="app-page"><AppNav patient /><main className="shell workflow-main"><div className="loading-panel">{error || "Loading case summary..."}</div></main></div>;

  return (
    <div className="app-page">
      <AppNav patient />
      <main className="shell summary-main">
        <div className="summary-header"><div><span className="step-count">STEP 04 / 04 · FINAL REVIEW</span><h1>Your case is taking shape.</h1><p>Review the information below before sending it to the doctor.</p></div><span className={`status-pill ${data.status}`}>{data.status}</span></div>

        <div className="summary-grid">
          <section className="summary-card patient-summary"><div className="card-kicker">PATIENT PROFILE</div><div className="patient-summary-head"><div className="big-avatar">{data.name?.[0]}</div><div><h2>{data.name}</h2><p>{data.age} years · {data.gender}</p></div></div><div className="summary-fields"><div><span>CASE ID</span><strong>{data.id}</strong></div><div><span>PHONE</span><strong>{data.phone || "—"}</strong></div><div className="wide"><span>PRIMARY CONCERN</span><strong>{data.concern}</strong></div></div></section>

          <section className="summary-card"><div className="card-kicker">CLINICAL HISTORY</div>{INTERVIEW_QUESTIONS.map((q) => <div className="summary-answer" key={q.id}><span>{q.label}</span><strong>{data.interview?.[q.id] || "Not provided"}</strong></div>)}</section>

          <section className="summary-card documents-summary"><div className="card-kicker">DOCUMENTS</div>{data.documents.length ? data.documents.map((doc) => <div className="summary-file" key={doc.id}><FileIcon/><span>{doc.name}</span><i>✓</i></div>) : <div className="empty-docs">No documents uploaded. <button onClick={() => navigate("/documents")}>Add documents →</button></div>}</section>
        </div>

        <div className="submit-bar"><div><ShieldIcon/><span><b>Clinician review remains essential.</b><small>CareHub organizes patient information; it does not provide a diagnosis.</small></span></div><button disabled={data.status === "submitted" || data.status === "reviewed" || submitting} className="primary-btn" onClick={submit}>{data.status === "submitted" || data.status === "reviewed" ? "Case submitted ✓" : submitting ? "Submitting..." : "Submit case to doctor →"}</button></div>
        {error && <div className="form-error">{error}</div>}
      </main>
    </div>
  );
}