import { useState } from "react";

import AITutor from "../components/AITutor";
import Quiz from "../components/Quiz";
import CircuitBuilder from "../components/CircuitBuilder";

function LearningModule({ algorithm, onBack }) {
  const [activeSection, setActiveSection] = useState("learn");
  const [quizResult, setQuizResult] = useState(null);

  // Safety check
  if (!algorithm || typeof algorithm !== "object") {
    return (
      <main className="placeholder-page">
        <h1>Module Not Found</h1>
        <p>Please select a quantum algorithm again.</p>

        <button className="primary-button" onClick={onBack}>
          ← Back to Algorithms
        </button>
      </main>
    );
  }

  const algorithmName = algorithm.title || "Quantum Algorithm";

  return (
    <main className="learning-module-page">

      {/* BACK BUTTON */}
      <button className="back-button" onClick={onBack}>
        ← Back to Algorithms
      </button>

      {/* HEADER */}
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

        <h1>{algorithmName}</h1>

        <p>
          {algorithm.description ||
            "Learn quantum computing through interactive lessons, experiments and quizzes."}
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

      {/* NAVIGATION TABS */}
      <section className="module-navigation">

        <button
          className={activeSection === "learn" ? "active" : ""}
          onClick={() => setActiveSection("learn")}
        >
          📖 Learn
        </button>

        <button
          className={activeSection === "ai" ? "active" : ""}
          onClick={() => setActiveSection("ai")}
        >
          🤖 AI Tutor
        </button>

        <button
          className={activeSection === "circuit" ? "active" : ""}
          onClick={() => setActiveSection("circuit")}
        >
          ⚛️ Circuit Builder
        </button>

        <button
          className={activeSection === "quiz" ? "active" : ""}
          onClick={() => setActiveSection("quiz")}
        >
          📝 Quiz
        </button>

      </section>

      {/* LEARNING SECTION */}
      {activeSection === "learn" && (
        <section className="module-content">

          {/* KEY CONCEPTS */}
          {Array.isArray(algorithm.concepts) &&
            algorithm.concepts.length > 0 && (
              <section className="content-card">

                <span className="eyebrow">
                  KEY CONCEPTS
                </span>

                <h2>What You Will Learn</h2>

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
          <section className="content-card">

            <span className="eyebrow">
              CONCEPT EXPLANATION
            </span>

            <h2>
              Understanding {algorithmName}
            </h2>

            <p>
              {algorithm.explanation ||
                `Learn how ${algorithmName} works, why it is important, and how quantum computing concepts are used in the algorithm.`}
            </p>

          </section>

          {/* LEARNING STEPS */}
          <section className="content-card">

            <span className="eyebrow">
              LEARNING PATH
            </span>

            <h2>Explore This Module</h2>

            <div className="module-learning-grid">

              <div
                className="module-learning-card"
                onClick={() => setActiveSection("ai")}
              >
                <div className="module-card-icon">
                  🤖
                </div>

                <h3>Ask AI Tutor</h3>

                <p>
                  Ask questions and get simple explanations
                  about {algorithmName}.
                </p>

                <button className="secondary-button">
                  Start Learning →
                </button>
              </div>

              <div
                className="module-learning-card"
                onClick={() => setActiveSection("circuit")}
              >
                <div className="module-card-icon">
                  ⚛️
                </div>

                <h3>Build Circuit</h3>

                <p>
                  Experiment with quantum gates and
                  simulate your own circuit.
                </p>

                <button className="secondary-button">
                  Open Lab →
                </button>
              </div>

              <div
                className="module-learning-card"
                onClick={() => setActiveSection("quiz")}
              >
                <div className="module-card-icon">
                  📝
                </div>

                <h3>Take Quiz</h3>

                <p>
                  Test your understanding of{" "}
                  {algorithmName}.
                </p>

                <button className="secondary-button">
                  Take Quiz →
                </button>
              </div>

            </div>

          </section>

          {/* TIP */}
          <section className="playground-tip">

            <div className="tip-icon">
              💡
            </div>

            <div>
              <strong>Learning Tip</strong>

              <p>
                Start by understanding the concepts,
                then ask the AI Tutor questions, experiment
                with the circuit and finally take the quiz.
              </p>
            </div>

          </section>

        </section>
      )}

      {/* AI TUTOR */}
      {activeSection === "ai" && (
        <section className="module-tool-section">

          <AITutor algorithm={algorithm} />

        </section>
      )}

      {/* CIRCUIT BUILDER */}
      {activeSection === "circuit" && (
        <section className="module-tool-section">

          <CircuitBuilder />

        </section>
      )}

      {/* QUIZ */}
      {activeSection === "quiz" && (
        <section className="module-tool-section">

          {!quizResult ? (
            <Quiz
              algorithm={algorithmName}
              onComplete={(result) => {
                setQuizResult(result);
              }}
            />
          ) : (
            <div className="content-card quiz-completed-card">

              <div className="quiz-result-icon">
                {quizResult.score / quizResult.total >= 0.7
                  ? "🎉"
                  : "📚"}
              </div>

              <span className="eyebrow">
                MODULE QUIZ COMPLETE
              </span>

              <h2>
                {algorithmName} Completed
              </h2>

              <div className="quiz-score">
                <strong>{quizResult.score}</strong>
                <span>
                  / {quizResult.total}
                </span>
              </div>

              <p>
                Great work! You completed the{" "}
                {algorithmName} quiz.
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginTop: "20px",
                }}
              >
                <button
                  className="secondary-button"
                  onClick={() => {
                    setQuizResult(null);
                  }}
                >
                  Try Quiz Again
                </button>

                <button
                  className="primary-button"
                  onClick={() => setActiveSection("ai")}
                >
                  Ask AI Tutor →
                </button>
              </div>

            </div>
          )}

        </section>
      )}

    </main>
  );
}

export default LearningModule;