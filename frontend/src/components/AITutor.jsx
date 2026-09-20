import { useState } from "react";
import { askAITutor } from "../services/api";
import "./AITutor.css";

const TUTOR_QUESTIONS = {
  "Bell State": [
    "Why does the Hadamard gate create superposition?",
    "How does the CNOT gate create entanglement?",
    "Why do we mainly measure |00⟩ and |11⟩?",
    "Why are the Bell State probabilities close to 50% and 50%?",
  ],

  "Deutsch's Algorithm": [
    "What is the difference between a constant and balanced function?",
    "Why does Deutsch's algorithm use Hadamard gates?",
    "How does quantum interference help this algorithm?",
    "What does the final measurement tell us?",
  ],

  "Grover's Algorithm": [
    "What is the oracle in Grover's algorithm?",
    "What is amplitude amplification?",
    "Why does Grover's algorithm increase the probability of the marked state?",
    "How does the diffusion operation work?",
  ],

  "Quantum Teleportation": [
    "What is actually being teleported?",
    "How does entanglement help quantum teleportation?",
    "Why are classical measurement results required?",
    "Does quantum teleportation send matter from one place to another?",
  ],

  "Deutsch-Jozsa Algorithm": [
    "What is a constant function?",
    "What is a balanced function?",
    "How does Deutsch-Jozsa use quantum parallelism?",
    "How does interference help distinguish the functions?",
  ],

  "Bernstein-Vazirani Algorithm": [
    "What is the hidden bit string?",
    "How does the oracle encode the hidden string?",
    "Why are Hadamard gates used before and after the oracle?",
    "How can one oracle query reveal the hidden string?",
  ],

  "Quantum Fourier Transform": [
    "What does the Quantum Fourier Transform do?",
    "Why are phase rotations important in QFT?",
    "How is QFT different from the classical Fourier transform?",
    "Where is QFT used in quantum algorithms?",
  ],

  "Quantum Phase Estimation": [
    "What is a quantum phase?",
    "Why does phase estimation use controlled operations?",
    "What is the role of the inverse QFT?",
    "What does the final measurement represent?",
  ],

  "Shor's Algorithm": [
    "Why is period finding important in Shor's algorithm?",
    "How does the Quantum Fourier Transform help Shor's algorithm?",
    "Which part of Shor's algorithm is quantum?",
    "Why is Shor's algorithm important for cryptography?",
  ],

  VQE: [
    "What is the Variational Quantum Eigensolver?",
    "Why does VQE use a classical optimizer?",
    "What is a parameterized quantum circuit?",
    "What does the measured expectation value represent?",
  ],

  QAOA: [
    "What problem is QAOA designed to solve?",
    "What is the cost Hamiltonian?",
    "What is the mixer Hamiltonian?",
    "Why does QAOA alternate between cost and mixer operations?",
  ],

  "Quantum Error Correction": [
    "Why is quantum error correction necessary?",
    "How can multiple qubits protect quantum information?",
    "What is a syndrome measurement?",
    "How can an error be detected without directly measuring the quantum state?",
  ],
};

const GENERIC_QUESTIONS = [
  "Explain this algorithm step by step.",
  "What is the main idea behind this algorithm?",
  "Why are quantum gates used in this algorithm?",
  "What should I understand from the measurement result?",
];

function AITutor({
  algorithm = "Quantum Computing",
  lessonStep = "",
  currentConcept = "",
  lesson = "",
  circuitInfo = "",
}) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const algorithmName =
    typeof algorithm === "string"
      ? algorithm
      : algorithm?.title || "Quantum Computing";

  const suggestedQuestions =
    TUTOR_QUESTIONS[algorithmName] ||
    GENERIC_QUESTIONS;

  const submitQuestion = async (
    selectedQuestion = question
  ) => {
    const finalQuestion =
      selectedQuestion.trim();

    if (!finalQuestion) {
      setError("Please enter a question.");
      return;
    }

    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const context = {
        algorithm: algorithmName,
        lesson_step: lessonStep || "",
        current_concept:
          currentConcept || "",
        lesson: lesson || "",
        circuit_info:
          circuitInfo || "",
      };

      Object.keys(context).forEach(
        (key) => {
          if (!context[key]) {
            delete context[key];
          }
        }
      );

      const data = await askAITutor(
        finalQuestion,
        algorithmName,
        context
      );

      setAnswer(
        data?.answer ||
          "The AI Tutor did not return an answer."
      );
    } catch (err) {
      setError(
        err?.message ||
          "Unable to connect to the AI Tutor."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitQuestion();
  };

  const handleSuggestedQuestion = (
    selectedQuestion
  ) => {
    setQuestion(selectedQuestion);
    submitQuestion(selectedQuestion);
  };

  const handleClear = () => {
    setQuestion("");
    setAnswer("");
    setError("");
  };

  return (
    <section className="ai-tutor">

      {/* HEADER */}

      <div className="ai-tutor-header">

        <div className="ai-tutor-avatar">
          🤖
        </div>

        <div className="ai-tutor-heading">

          <span>
            AI LEARNING ASSISTANT
          </span>

          <h2>
            Quantum Tutor
          </h2>

          <p>
            Ask questions specifically about{" "}
            <strong>
              {algorithmName}
            </strong>
            .
          </p>

        </div>

        <div className="ai-tutor-status">
          <span></span>
          Online
        </div>

      </div>

      {/* CURRENT CONTEXT */}

      <div className="ai-tutor-context">

        <div className="context-item">

          <span>
            ALGORITHM
          </span>

          <strong>
            {algorithmName}
          </strong>

        </div>

        {lessonStep && (
          <div className="context-item">

            <span>
              CURRENT STEP
            </span>

            <strong>
              {lessonStep}
            </strong>

          </div>
        )}

        {currentConcept && (
          <div className="context-item">

            <span>
              CONCEPT
            </span>

            <strong>
              {currentConcept}
            </strong>

          </div>
        )}

      </div>

      {/* SUGGESTED QUESTIONS */}

      <div className="suggested-section">

        <div className="suggested-heading">

          <div>
            <span>
              SUGGESTED QUESTIONS
            </span>

            <h3>
              Explore {algorithmName}
            </h3>
          </div>

          <span className="question-count">
            {suggestedQuestions.length} questions
          </span>

        </div>

        <div className="suggested-questions">

          {suggestedQuestions.map(
            (item, index) => (
              <button
                type="button"
                className="suggested-question"
                key={index}
                onClick={() =>
                  handleSuggestedQuestion(item)
                }
                disabled={loading}
              >
                <span className="question-number">
                  {String(index + 1).padStart(
                    2,
                    "0"
                  )}
                </span>

                <span>
                  {item}
                </span>

                <b>
                  →
                </b>
              </button>
            )
          )}

        </div>

      </div>

      {/* ASK FORM */}

      <form
        className="ai-tutor-form"
        onSubmit={handleSubmit}
      >

        <label htmlFor="ai-tutor-question">
          Ask your own question
        </label>

        <div className="ai-input-row">

          <input
            id="ai-tutor-question"
            type="text"
            value={question}
            onChange={(event) =>
              setQuestion(event.target.value)
            }
            placeholder={`Ask anything about ${algorithmName}...`}
            disabled={loading}
          />

          <button
            type="submit"
            disabled={
              loading ||
              !question.trim()
            }
          >
            {loading
              ? "Thinking..."
              : "Ask Tutor"}
          </button>

        </div>

      </form>

      {/* ERROR */}

      {error && (
        <div className="ai-tutor-error">
          <strong>
            Tutor error
          </strong>

          <span>
            {error}
          </span>
        </div>
      )}

      {/* ANSWER */}

      {loading && (
        <div className="ai-tutor-loading">

          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div>
            <strong>
              AI Tutor is thinking...
            </strong>

            <p>
              Preparing an explanation for{" "}
              {algorithmName}.
            </p>
          </div>

        </div>
      )}

      {answer && !loading && (
        <div className="ai-tutor-answer">

          <div className="answer-header">

            <div>
              <span>
                AI EXPLANATION
              </span>

              <h3>
                Here's what you need to know
              </h3>
            </div>

            <button
              type="button"
              onClick={handleClear}
            >
              Clear
            </button>

          </div>

          <div className="answer-body">
            {answer
              .split("\n")
              .filter(
                (line) =>
                  line.trim() !== ""
              )
              .map((line, index) => (
                <p key={index}>
                  {line}
                </p>
              ))}
          </div>

        </div>
      )}

      {/* FOOTER */}

      <div className="ai-tutor-footer">

        <span>
          ✦
        </span>

        <p>
          The tutor uses your selected algorithm,
          lesson context, and available simulation
          results to answer your question.
        </p>

      </div>

    </section>
  );
}

export default AITutor;