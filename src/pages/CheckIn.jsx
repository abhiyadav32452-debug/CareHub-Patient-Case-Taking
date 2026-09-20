import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppNav from "../components/AppNav";
import { COMMON_PROBLEMS } from "../data/appData";
import { api } from "../services/api";

export default function CheckIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ name: localStorage.getItem("carehub_patient_name") || "", age: "", gender: "", phone: "", concern: location.state?.concern || "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (location.state?.concern) setForm((f) => ({ ...f, concern: location.state.concern }));
  }, [location.state]);

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const item = await api.createCase(form);
      localStorage.setItem("carehub_case_id", item.id);
      navigate("/interview");
    } catch (err) {
      setError(`${err.message}. Make sure the backend is running with npm run server.`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-page">
      <AppNav patient />
      <main className="shell workflow-main">
        <div className="step-head"><div><span className="step-count">STEP 01 / 04</span><h1>Patient check-in</h1><p>Let's create the basic clinical case before the guided interview.</p></div><div className="step-track"><i className="active"/><i/><i/><i/></div></div>

        <div className="workflow-layout">
          <section className="form-panel">
            <div className="form-panel-head"><span className="panel-kicker">PATIENT INFORMATION</span><h2>Tell us who you are.</h2><p>Use sample information for the presentation.</p></div>
            <form onSubmit={submit}>
              <div className="field-grid">
                <label>Full name<input required value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Abhishek Sharma" /></label>
                <label>Age<input required type="number" min="1" max="120" value={form.age} onChange={(e) => set("age", e.target.value)} placeholder="28" /></label>
                <label>Gender<select required value={form.gender} onChange={(e) => set("gender", e.target.value)}><option value="">Select gender</option><option>Male</option><option>Female</option><option>Other</option><option>Prefer not to say</option></select></label>
                <label>Phone <span className="optional">optional</span><input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="9000000000" /></label>
              </div>
              <label>Primary concern<textarea required value={form.concern} onChange={(e) => set("concern", e.target.value)} placeholder="What is the main problem bringing you to the hospital today?" /></label>

              <div className="suggestions"><span>Common concerns</span><div>{COMMON_PROBLEMS.slice(0, 6).map((p) => <button type="button" key={p.id} onClick={() => set("concern", p.name)}>{p.name}</button>)}</div></div>

              {error && <div className="form-error">{error}</div>}
              <div className="form-submit"><span>🔒 Temporary local storage</span><button disabled={loading} className="primary-btn">{loading ? "Creating case..." : "Continue to interview →"}</button></div>
            </form>
          </section>

          <aside className="side-info">
            <div className="mini-holo"><div className="mini-ring"/><div className="mini-person"><span/></div></div>
            <span className="panel-kicker">WHY THIS MATTERS</span>
            <h3>One structured case.</h3>
            <p>The information you enter becomes the foundation for the interview, document collection and doctor review.</p>
            <div className="side-list"><div>✓ Basic demographics</div><div>✓ Primary complaint</div><div>✓ Guided next step</div></div>
          </aside>
        </div>
      </main>
    </div>
  );
}