import { useState } from "react";

import CircuitBuilder from "../components/CircuitBuilder";
import AITutor from "../components/AITutor";
import Quiz from "../components/Quiz";

function Playground({
  algorithm,
  onBack,
}) {
  const [activeTab, setActiveTab] = useState("learn");

  if (!algorithm || typeof algorithm !== "object") {
    return (
      <div className="placeholder-page">
        <h1>Module Not Found</h1>

        <p>
          Please select a quantum algorithm again.
        </p>

        <button
          className="primary-button"
          onClick={onBack}
        >
          ← Back to Algorithms
        </button>
      </div>
    );
  }

  const algorithmName =
    algorithm.title || "Quantum Algorithm";

  return (
    <main className="playground-page">

      {/* BACK BUTTON */}

      <button
        className="back-button"
        onClick={onBack}
      >
        ← Back to Algorithms
      </button>


      {/* MODULE HEADER */}

      <section className="playground-hero">

        <span className="hero-badge">
          QUANTUM LEARNING MODULE
        </span>

        <div
          style={{
            fontSize: "60px",
            marginBottom: "10px",
          }}
        >
          {algorithm.icon || "⚛️"}
        </div>

        <h1>
          {algorithmName}
        </h1>

        <p>
          {algorithm.description ||
            "Explore this quantum computing concept interactively."}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >

          {algorithm.level && (
            <span className="level">
              {algorithm.level}
            </span>
          )}

          {algorithm.category && (
            <span className="algorithm-category">
              {algorithm.category}
            </span>
          )}

        </div>

      </section>


      {/* TABS */}

      <div className="playground-tabs">

        <button
          className={
            activeTab === "learn"
              ? "playground-tab active"
              : "playground-tab"
          }
          onClick={() => setActiveTab("learn")}
        >
          📖 Learn
        </button>


        <button
          className={
            activeTab === "circuit"
              ? "playground-tab active"
              : "playground-tab"
          }
          onClick={() => setActiveTab("circuit")}
        >
          ⚛️ Circuit Lab
        </button>


        <button
          className={
            activeTab === "ai"
              ? "playground-tab active"
              : "playground-tab"
          }
          onClick={() => setActiveTab("ai")}
        >
          🤖 AI Tutor
        </button>


        <button
          className={
            activeTab === "quiz"
              ? "playground-tab active"
              : "playground-tab"
          }
          onClick={() => setActiveTab("quiz")}
        >
          📝 Quiz
        </button>

      </div>


      {/* =====================================================
          LEARN TAB
      ===================================================== */}

      {activeTab === "learn" && (
        <div className="learning-tab">

          {/* CONCEPTS */}

          {Array.isArray(algorithm.concepts) &&
            algorithm.concepts.length > 0 && (

              <section className="content-card">

                <span className="eyebrow">
                  KEY CONCEPTS
                </span>

                <h2>
                  What You Will Learn
                </h2>

                <div className="detail-concepts">

                  {algorithm.concepts.map(
                    (concept, index) => (
                      <div
                        className="detail-concept"
                        key={index}
                      >
                        <span>✓</span>
                        {concept}
                      </div>
                    )
                  )}

                </div>

              </section>
            )}


          {/* EXPLANATION */}

          {algorithm.explanation && (

            <section className="content-card">

              <span className="eyebrow">
                CONCEPT EXPLANATION
              </span>

              <h2>
                Understanding {algorithmName}
              </h2>

              <p>
                {algorithm.explanation}
              </p>

            </section>
          )}


          {/* LEARNING OBJECTIVE */}

          <section className="playground-tip">

            <div className="tip-icon">
              💡
            </div>

            <div>

              <strong>
                Learning Tip
              </strong>

              <p>
                Read the concepts carefully, then
                experiment with the circuit and test
                yourself using the quiz.
              </p>

            </div>

          </section>

        </div>
      )}


      {/* =====================================================
          CIRCUIT TAB
      ===================================================== */}

      {activeTab === "circuit" && (

        <section className="playground-section">

          <div className="builder-header">

            <div>

              <span className="eyebrow">
                INTERACTIVE LAB
              </span>

              <h2>
                Experiment With Quantum Gates
              </h2>

              <p>
                Build and simulate your own quantum
                circuit using Qiskit.
              </p>

            </div>

          </div>

          <CircuitBuilder />

        </section>
      )}


      {/* =====================================================
          AI TUTOR TAB
      ===================================================== */}

      {activeTab === "ai" && (

        <div className="algorithm-tutor-section">

          <AITutor
            algorithm={algorithm}
          />

        </div>
      )}


      {/* =====================================================
          QUIZ TAB
      ===================================================== */}

      {activeTab === "quiz" && (

        <div className="quiz-section">

          <Quiz
            algorithm={algorithm}
          />

        </div>
      )}

    </main>
  );
}

export default Playground;