import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppNav from "../components/AppNav";
import { FileIcon, ShieldIcon } from "../components/Icons";
import { api } from "../services/api";

const API_ORIGIN = (import.meta.env.VITE_API_URL || "http://localhost:4000/api").replace(/\/api\/?$/, "");
const urlFor = (doc) => doc.url ? `${API_ORIGIN}${doc.url}` : doc.storedName ? `${API_ORIGIN}/uploads/${doc.storedName}` : "";

export default function Documents() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [caseData, setCaseData] = useState(null);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("carehub_case_id");
    if (!id) { navigate("/check-in"); return; }
    api.getCase(id).then(setCaseData).catch(() => setError("Could not load the case."));
  }, [navigate]);

  function onFiles(files) {
    const accepted = Array.from(files).slice(0, 5);
    setSelected(accepted);
    setMessage(accepted.length ? `${accepted.length} document${accepted.length > 1 ? "s" : ""} ready to upload.` : "");
  }

  async function upload() {
    if (!selected.length) return;
    setLoading(true); setError("");
    try {
      const item = await api.uploadDocuments(caseData.id, selected);
      setCaseData(item); setSelected([]); setMessage("Documents uploaded successfully.");
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  if (!caseData) return <div className="app-page"><AppNav patient /><main className="shell workflow-main"><div className="loading-panel">{error || "Loading documents..."}</div></main></div>;

  return (
    <div className="app-page">
      <AppNav patient />
      <main className="shell workflow-main">
        <div className="step-head"><div><span className="step-count">STEP 03 / 04</span><h1>Medical documents</h1><p>Add previous reports, prescriptions or investigations to your case.</p></div><div className="step-track"><i className="active"/><i className="active"/><i className="active"/><i/></div></div>
        <div className="document-layout">
          <section className="upload-panel">
            <div className="upload-visual"><div className="upload-ring"><FileIcon /></div><div className="upload-orbit" /></div>
            <span className="panel-kicker">DOCUMENT INTAKE</span><h2>Upload medical documents</h2><p>PDF, JPG or PNG · Maximum 10 MB per file · Up to 5 files at once.</p>
            <div className="dropzone" onClick={() => inputRef.current?.click()} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); onFiles(e.dataTransfer.files); }}>
              <input ref={inputRef} hidden type="file" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => onFiles(e.target.files)} />
              <span>↑</span><strong>Drop files here</strong><small>or click to choose documents</small>
            </div>
            {selected.length > 0 && <div className="selected-files">{selected.map((file) => <div key={file.name}><FileIcon/><span>{file.name}</span><small>{Math.max(1, Math.round(file.size / 1024))} KB</small></div>)}</div>}
            {message && <div className="success-message">✓ {message}</div>}
            {error && <div className="form-error">{error}</div>}
            <button disabled={!selected.length || loading} className="primary-btn full" onClick={upload}>{loading ? "Uploading..." : "Upload documents →"}</button>
          </section>
          <aside className="document-side">
            <div className="side-card"><span className="panel-kicker">ACTIVE CASE</span><strong>{caseData.id}</strong><p>{caseData.name} · {caseData.concern}</p></div>
            <div className="side-card"><div className="side-card-title"><span>YOUR DOCUMENTS</span><b>{caseData.documents.length}</b></div>
              {caseData.documents.length ? caseData.documents.map((doc) => <div className="existing-file document-list-row" key={doc.id}><FileIcon/><div><strong>{doc.name}</strong><small>{doc.type === "application/pdf" ? "PDF" : "Image"}</small></div><button className="view-document-btn compact" onClick={() => setPreview(doc)}>View</button></div>) : <div className="empty-docs">No documents uploaded yet.</div>}
            </div>
            <div className="privacy-card"><ShieldIcon/><div><strong>Local document storage</strong><p>Files remain in the local application storage for this presentation environment.</p></div></div>
            <button className="ghost-btn full" onClick={() => navigate("/case-summary")}>Continue to case summary →</button>
          </aside>
        </div>
      </main>
      {preview && <div className="document-viewer-backdrop" onClick={() => setPreview(null)}><div className="document-viewer" onClick={(e) => e.stopPropagation()}><div className="viewer-header"><div><span className="card-kicker">DOCUMENT PREVIEW</span><h2>{preview.name}</h2></div><button className="viewer-close" onClick={() => setPreview(null)}>×</button></div><div className="viewer-body">{urlFor(preview) ? (preview.type === "application/pdf" || /\.pdf$/i.test(preview.name) ? <iframe title={preview.name} src={urlFor(preview)} /> : <img src={urlFor(preview)} alt={preview.name} />) : <div className="empty-docs">Preview unavailable.</div>}</div>{urlFor(preview) && <a className="ghost-btn" href={urlFor(preview)} target="_blank" rel="noreferrer">Open in new tab ↗</a>}</div></div>}
    </div>
  );
}
