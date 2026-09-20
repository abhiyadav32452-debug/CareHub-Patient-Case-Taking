import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppNav from "../components/AppNav";
import { INTERVIEW_QUESTIONS } from "../data/appData";
import { api } from "../services/api";

export default function Interview() {
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [caseData, setCaseData] = useState(null);
  const [error, setError] = useState("");

  const q = INTERVIEW_QUESTIONS[index];

  useEffect(() => {
    const id = localStorage.getItem("carehub_case_id");

    if (!id) {
      navigate("/check-in");
      return;
    }

    api
      .getCase(id)
      .then((item) => {
        setCaseData(item);

        if (item.interview) {
          setAnswers(item.interview);
        }
      })
      .catch(() => {
        setError("Could not load this case.");
      });
  }, [navigate]);

  const progress = useMemo(
    () =>
      Math.round(
        ((index + 1) / INTERVIEW_QUESTIONS.length) * 100
      ),
    [index]
  );

  async function finish() {
    const id = localStorage.getItem("carehub_case_id");

    try {
      const item = await api.interview(id, answers);

      navigate("/documents", {
        state: { caseData: item },
      });
    } catch (err) {
      setError(err.message);
    }
  }

  function next() {
    if (!answers[q.id]) return;

    if (index < INTERVIEW_QUESTIONS.length - 1) {
      setIndex((value) => value + 1);
    } else {
      finish();
    }
  }

  if (!caseData) {
    return (
      <div className="app-page">
        <AppNav patient />

        <main className="shell workflow-main">
          <div className="loading-panel">
            {error || "Loading your clinical case..."}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app-page">
      <AppNav patient />

      <main className="shell interview-main">

        {/* TOP SECTION */}
        <div className="interview-top">

          <div className="interview-heading">

            <span className="step-count">
              STEP 02 / 04 · GUIDED INTERVIEW
            </span>

            <h1>
              Let's understand your symptoms.
            </h1>

            <p>
              Answer naturally. Every response helps build the
              structured case.
            </p>

          </div>

          <div className="progress-ring">
            <strong>{progress}%</strong>
            <span>complete</span>
          </div>

        </div>


        {/* MAIN INTERVIEW AREA */}
        <div className="interview-layout">

          {/* LEFT QUESTION NAVIGATION */}
          <aside className="interview-side">

            <div className="case-mini">

              <span>ACTIVE CASE</span>

              <strong>
                {caseData.id}
              </strong>

              <small>
                {caseData.name} · {caseData.age} · {caseData.gender}
              </small>

            </div>


            <div className="question-list">

              {INTERVIEW_QUESTIONS.map((item, i) => (

                <div
                  className={
                    i === index
                      ? "current"
                      : i < index
                      ? "answered"
                      : ""
                  }
                  key={item.id}
                >

                  <b>
                    {String(i + 1).padStart(2, "0")}
                  </b>

                  <span>
                    {item.label}
                  </span>

                  <i>
                    {i < index
                      ? "✓"
                      : i === index
                      ? "●"
                      : "○"}
                  </i>

                </div>

              ))}

            </div>

          </aside>


          {/* QUESTION PANEL */}
          <section className="question-panel">

            <div className="question-meta">

              <span>
                {q.label}
              </span>

              <span>
                {index + 1} of {INTERVIEW_QUESTIONS.length}
              </span>

            </div>


            <h2>
              {q.question}
            </h2>


            <p className="question-helper">
              You can answer in your own words. This prototype
              currently uses text and touch input.
            </p>


            {/* ANSWER INPUT */}
            {q.type === "choice" ? (

              <div className="answer-options">

                {q.options.map((option) => (

                  <button
                    key={option}
                    className={
                      answers[q.id] === option
                        ? "selected"
                        : ""
                    }
                    onClick={() =>
                      setAnswers((current) => ({
                        ...current,
                        [q.id]: option,
                      }))
                    }
                  >

                    <span>
                      {option}
                    </span>

                    <i>
                      {answers[q.id] === option
                        ? "✓"
                        : "○"}
                    </i>

                  </button>

                ))}

              </div>

            ) : q.type === "textarea" ? (

              <textarea
                autoFocus
                value={answers[q.id] || ""}
                onChange={(event) =>
                  setAnswers((current) => ({
                    ...current,
                    [q.id]: event.target.value,
                  }))
                }
                placeholder={q.placeholder}
              />

            ) : (

              <input
                autoFocus
                value={answers[q.id] || ""}
                onChange={(event) =>
                  setAnswers((current) => ({
                    ...current,
                    [q.id]: event.target.value,
                  }))
                }
                placeholder={q.placeholder}
              />

            )}


            {/* ERROR */}
            {error && (
              <div className="form-error">
                {error}
              </div>
            )}


            {/* ACTION BUTTONS */}
            <div className="question-actions">

              <button
                className="ghost-btn"
                disabled={index === 0}
                onClick={() =>
                  setIndex((value) => value - 1)
                }
              >
                ← Previous
              </button>


              <button
                className="primary-btn"
                disabled={!answers[q.id]}
                onClick={next}
              >

                {index === INTERVIEW_QUESTIONS.length - 1
                  ? "Finish interview"
                  : "Next question"}

                <span>
                  →
                </span>

              </button>

            </div>

          </section>

        </div>

      </main>
    </div>
  );
}