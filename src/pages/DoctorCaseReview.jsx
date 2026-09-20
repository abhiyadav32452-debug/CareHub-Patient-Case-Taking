import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AppNav from "../components/AppNav";
import { api } from "../services/api";
import { FileIcon, ShieldIcon } from "../components/Icons";
import { INTERVIEW_QUESTIONS } from "../data/appData";

const API_ORIGIN = (import.meta.env.VITE_API_URL || "http://localhost:4000/api").replace(/\/api\/?$/, "");

function documentUrl(doc) {
  if (doc.url) return `${API_ORIGIN}${doc.url}`;
  if (doc.storedName) return `${API_ORIGIN}/uploads/${doc.storedName}`;
  return "";
}

export default function DoctorCaseReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [reviewing, setReviewing] = useState(false);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    api.getCase(id).then(setData).catch((err) => setError(err.message));
  }, [id]);

  const answers = useMemo(() => INTERVIEW_QUESTIONS.map((q) => ({
    label: q.label,
    value: data?.interview?.[q.id] || "Not provided",
  })), [data]);

  async function markReviewed() {
    setReviewing(true);
    setError("");
    try {
      const updated = await api.status(id, "reviewed");
      setData(updated);
    } catch (err) {
      setError(err.message);
    } finally {
      setReviewing(false);
    }
  }

  if (!data) {
    return <div className="app-page"><AppNav /><main className="shell doctor-main"><div className="loading-panel">{error || "Loading case..."}</div></main></div>;
  }

  return (
    <div className="app-page">
      <AppNav />
      <main className="shell case-review-main">
        <div className="case-review-top">
          <div>
            <Link to="/doctor" className="back-link">← Back to Doctor Dashboard</Link>
            <span className="step-count">CLINICAL CASE REVIEW</span>
            <h1>Patient Case {data.id}</h1>
            <p>Review the complete structured history, symptoms and supporting documents.</p>
          </div>
          <div className="case-review-actions">
            <span className={`status-pill ${data.status}`}>{data.status}</span>
            {data.status !== "reviewed" && <button className="primary-btn" disabled={reviewing} onClick={markReviewed}>{reviewing ? "Saving..." : "Mark as reviewed ✓"}</button>}
          </div>
        </div>

        {error && <div className="form-error">{error}</div>}

        <div className="clinical-overview">
          <section className="review-card patient-identity">
            <div className="card-kicker">PATIENT PROFILE</div>
            <div className="review-identity-row">
              <div className="big-avatar">{data.name?.[0] || "P"}</div>
              <div><h2>{data.name}</h2><p>{data.age} years · {data.gender}</p></div>
            </div>
            <div className="identity-grid">
              <div><span>CASE ID</span><strong>{data.id}</strong></div>
              <div><span>PHONE</span><strong>{data.phone || "Not provided"}</strong></div>
              <div><span>PRIMARY CONCERN</span><strong>{data.concern}</strong></div>
              <div><span>CASE STATUS</span><strong>{data.status}</strong></div>
            </div>
          </section>

          <section className="review-card concern-card">
            <div className="card-kicker">CLINICAL FOCUS</div>
            <div className="concern-icon">+</div>
            <span>PRIMARY CONCERN</span>
            <h2>{data.concern}</h2>
            <p>This summary is an organized record of information provided during intake and interview.</p>
          </section>
        </div>

        <div className="review-layout">
          <div className="review-main-column">
            <section className="review-card">
              <div className="review-section-heading"><div><span className="card-kicker">STRUCTURED HISTORY</span><h2>Interview responses</h2></div><span className="review-count">{answers.length} fields</span></div>
              <div className="clinical-answer-grid">
                {answers.map((item) => <div className="clinical-answer" key={item.label}><span>{item.label}</span><strong>{item.value}</strong></div>)}
              </div>
            </section>

            <section className="review-card">
              <div className="review-section-heading"><div><span className="card-kicker">SUPPORTING RECORDS</span><h2>Medical documents</h2></div><span className="review-count">{data.documents?.length || 0} files</span></div>
              {data.documents?.length ? (
                <div className="review-document-list">
                  {data.documents.map((doc) => {
                    const url = documentUrl(doc);
                    const isPdf = doc.type === "application/pdf" || /\.pdf$/i.test(doc.name);
                    return <div className="review-document" key={doc.id}>
                      <div className="document-file-icon"><FileIcon /></div>
                      <div className="document-meta"><strong>{doc.name}</strong><span>{isPdf ? "PDF document" : "Image document"} · {Math.max(1, Math.round((doc.size || 0) / 1024))} KB</span></div>
                      <button className="view-document-btn" onClick={() => setPreview({ ...doc, url })}>View document</button>
                    </div>;
                  })}
                </div>
              ) : <div className="empty-docs">No supporting documents were attached to this case.</div>}
            </section>
          </div>

          <aside className="review-side-column">
            <section className="review-card clinician-note">
              <ShieldIcon />
              <span className="card-kicker">CLINICIAN REVIEW</span>
              <h3>Human review remains essential.</h3>
              <p>CareHub organizes information for the consultation. It does not provide a diagnosis.</p>
            </section>

            <section className="review-card review-checklist">
              <div className="card-kicker">REVIEW CHECKLIST</div>
              <div>✓ Patient identity</div>
              <div>✓ Primary concern</div>
              <div>✓ Structured history</div>
              <div>{data.documents?.length ? "✓ Supporting documents" : "○ Supporting documents"}</div>
              <button className="primary-btn full" disabled={data.status === "reviewed" || reviewing} onClick={markReviewed}>{data.status === "reviewed" ? "Case reviewed ✓" : reviewing ? "Saving..." : "Complete review"}</button>
            </section>
          </aside>
        </div>
      </main>

      {preview && <div className="document-viewer-backdrop" onClick={() => setPreview(null)}>
        <div className="document-viewer" onClick={(e) => e.stopPropagation()}>
          <div className="viewer-header"><div><span className="card-kicker">DOCUMENT PREVIEW</span><h2>{preview.name}</h2></div><button className="viewer-close" onClick={() => setPreview(null)}>×</button></div>
          <div className="viewer-body">
            {preview.url ? (preview.type === "application/pdf" || /\.pdf$/i.test(preview.name) ? <iframe title={preview.name} src={preview.url} /> : <img src={preview.url} alt={preview.name} />) : <div className="empty-docs">Preview unavailable for this file.</div>}
          </div>
          {preview.url && <a className="ghost-btn" href={preview.url} target="_blank" rel="noreferrer">Open in new tab ↗</a>}
        </div>
      </div>}
    </div>
  );
}
