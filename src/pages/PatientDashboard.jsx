import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AppNav from "../components/AppNav";
import { ArrowIcon, FileIcon, PulseIcon, ShieldIcon } from "../components/Icons";
import { COMMON_PROBLEMS, problemSeed } from "../data/appData";
import { api } from "../services/api";

export default function PatientDashboard() {
  const navigate = useNavigate();

  const name =
    localStorage.getItem("carehub_patient_name") || "Patient User";

  const caseId = localStorage.getItem("carehub_case_id");

  const [checkingCase, setCheckingCase] = useState(false);

  function chooseProblem(problem) {
    navigate("/check-in", {
      state: {
        concern: problemSeed[problem.id],
      },
    });
  }

  async function continueCase() {
    if (!caseId) {
      navigate("/check-in");
      return;
    }

    setCheckingCase(true);

    try {
      // Verify that the saved case still exists in the backend.
      await api.getCase(caseId);

      // Case exists — continue normally.
      navigate("/interview");
    } catch (error) {
      // The saved case no longer exists.
      // Clear the stale ID and start a fresh case.
      localStorage.removeItem("carehub_case_id");

      navigate("/check-in", {
        replace: true,
      });
    } finally {
      setCheckingCase(false);
    }
  }

  const firstName = name.split(" ")[0];

  return (
    <div className="app-page">
      <AppNav patient />

      <main className="shell dashboard-main">

        {/* WELCOME */}
        <div className="dashboard-welcome">

          <div>
            <div className="eyebrow">
              PATIENT DASHBOARD
            </div>

            <h1>
              Good morning, {firstName}.
            </h1>

            <p>
              Your health information, organized before the consultation.
            </p>
          </div>

          <div className="secure-pill">
            <ShieldIcon />
            Secure workspace
          </div>

        </div>


        {/* METRICS */}
        <div className="patient-metrics">

          <div>
            <span>ACTIVE CASE</span>

            <strong>
              {caseId || "Not started"}
            </strong>

            <small>
              {caseId
                ? "Continue your current case"
                : "Start your first case"}
            </small>
          </div>


          <div>
            <span>DOCUMENTS</span>

            <strong>
              0
            </strong>

            <small>
              Reports & prescriptions
            </small>
          </div>


          <div>
            <span>CASE STATUS</span>

            <strong>
              {caseId ? "In progress" : "Ready"}
            </strong>

            <small>
              Doctor review follows submission
            </small>
          </div>

        </div>


        {/* MAIN DASHBOARD GRID */}
        <div className="dashboard-grid">

          {/* JOURNEY */}
          <section className="dashboard-panel journey-panel">

            <div className="panel-title">

              <div>
                <span>
                  YOUR NEXT STEPS
                </span>

                <h2>
                  Complete your case
                </h2>
              </div>

              <span className="mini-status">
                ● {caseId ? "IN PROGRESS" : "READY"}
              </span>

            </div>


            <div className="journey">

              <div className="journey-step done">

                <b>01</b>

                <div>
                  <strong>
                    Patient details
                  </strong>

                  <span>
                    Basic information and primary concern
                  </span>
                </div>

                <i>
                  ✓
                </i>

              </div>


              <div
                className={`journey-step ${
                  caseId ? "active" : ""
                }`}
              >

                <b>02</b>

                <div>
                  <strong>
                    Clinical interview
                  </strong>

                  <span>
                    Answer focused questions about your symptoms
                  </span>
                </div>

                <i>
                  {caseId ? "→" : "○"}
                </i>

              </div>


              <div className="journey-step">

                <b>03</b>

                <div>
                  <strong>
                    Documents
                  </strong>

                  <span>
                    Attach prescriptions, reports or investigations
                  </span>
                </div>

                <i>
                  ○
                </i>

              </div>


              <div className="journey-step">

                <b>04</b>

                <div>
                  <strong>
                    Doctor review
                  </strong>

                  <span>
                    Submit a structured case for clinician review
                  </span>
                </div>

                <i>
                  ○
                </i>

              </div>

            </div>


            {/* CONTINUE / START BUTTON */}
            {caseId ? (

              <button
                className="primary-btn"
                onClick={continueCase}
                disabled={checkingCase}
              >
                {checkingCase
                  ? "Checking case..."
                  : "Continue case"}

                {!checkingCase && <ArrowIcon />}
              </button>

            ) : (

              <Link
                className="primary-btn"
                to="/check-in"
              >
                Start health check-in
                <ArrowIcon />
              </Link>

            )}

          </section>


          {/* QUICK ACCESS */}
          <section className="dashboard-panel quick-panel">

            <div className="panel-title">

              <div>
                <span>
                  QUICK ACCESS
                </span>

                <h2>
                  Case tools
                </h2>
              </div>

            </div>


            <Link
              to="/check-in"
              className="tool-card"
            >

              <span className="tool-icon">
                <PulseIcon />
              </span>

              <div>
                <b>
                  Start / update check-in
                </b>

                <small>
                  Patient details & main concern
                </small>
              </div>

              <span>
                →
              </span>

            </Link>


            <Link
              to="/documents"
              className="tool-card"
            >

              <span className="tool-icon">
                <FileIcon />
              </span>

              <div>
                <b>
                  Upload documents
                </b>

                <small>
                  Prescriptions, reports, investigations
                </small>
              </div>

              <span>
                →
              </span>

            </Link>


            <Link
              to="/case-summary"
              className="tool-card"
            >

              <span className="tool-icon">
                ▣
              </span>

              <div>
                <b>
                  Review case summary
                </b>

                <small>
                  See what will reach the doctor
                </small>
              </div>

              <span>
                →
              </span>

            </Link>

          </section>

        </div>


        {/* COMMON HEALTH CONCERNS */}
        <section className="problems-section">

          <div className="section-title">

            <div>

              <span>
                COMMON HEALTH CONCERNS
              </span>

              <h2>
                Start with what brings you here.
              </h2>

            </div>

            <p>
              Selecting a common concern helps the prototype
              start with a more relevant interview.
            </p>

          </div>


          <div className="problem-grid">

            {COMMON_PROBLEMS.map((problem) => (

              <button
                key={problem.id}
                className={`problem-card ${problem.tone}`}
                onClick={() => chooseProblem(problem)}
              >

                <span className="problem-icon">
                  {problem.icon}
                </span>

                <strong>
                  {problem.name}
                </strong>

                <small>
                  {problem.description}
                </small>

                <span className="problem-arrow">
                  →
                </span>

              </button>

            ))}

          </div>

        </section>


        {/* SAFETY NOTE */}
        <div className="patient-note">

          <ShieldIcon />

          <span>
            <b>
              Prototype safety note:
            </b>{" "}
            CareHub organizes information; it does not
            diagnose or replace a clinician.
          </span>

        </div>

      </main>
    </div>
  );
}