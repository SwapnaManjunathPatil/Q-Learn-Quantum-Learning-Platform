import { useState } from "react";
import "./VisualExercise.css";

const EXERCISES = {
  "Bell State": {
    title: "Predict the Output",
    icon: "🎯",
    description:
      "Predict what happens when a Hadamard gate is applied to a qubit initially in |0⟩.",

    circuit: (
      <div className="exercise-circuit">
        <div className="circuit-row">
          <span>|0⟩</span>
          <span className="wire">──</span>
          <span className="gate">H</span>
          <span className="wire">──</span>
          <span className="question-mark">?</span>
        </div>
      </div>
    ),

    question: "What is the state of the qubit after applying H?",

    options: [
      "|0⟩",
      "|1⟩",
      "(|0⟩ + |1⟩) / √2",
      "The qubit is deleted",
    ],

    answer: "(|0⟩ + |1⟩) / √2",

    explanation:
      "Correct! The Hadamard gate transforms |0⟩ into an equal superposition of |0⟩ and |1⟩.",
  },

  Grover: {
    title: "Predict the Output",
    icon: "🎯",
    description:
      "Grover's algorithm uses an oracle to identify a marked state.",

    circuit: (
      <div className="search-visual">
        <div className="search-box">🔎 Oracle</div>
        <div className="arrow">↓</div>
        <div className="target-state">🎯 Marked State</div>
      </div>
    ),

    question: "What does the Grover oracle identify?",

    options: [
      "The desired or marked state",
      "The number of qubits",
      "A classical password",
      "The circuit temperature",
    ],

    answer: "The desired or marked state",

    explanation:
      "Correct! The oracle marks the desired state so that amplitude amplification can increase its probability.",
  },

  Deutsch: {
    title: "Predict the Output",
    icon: "🎯",
    description:
      "Deutsch's algorithm determines an important property of a Boolean function.",

    circuit: (
      <div className="search-visual">
        <div className="function-box">f(x)</div>
        <div className="arrow">↓</div>
        <div className="target-state">❓ Constant or Balanced?</div>
      </div>
    ),

    question: "What does Deutsch's algorithm determine?",

    options: [
      "Whether the function is constant or balanced",
      "Whether a number is prime",
      "The shortest path",
      "The size of a database",
    ],

    answer: "Whether the function is constant or balanced",

    explanation:
      "Correct! Deutsch's algorithm determines whether a Boolean function is constant or balanced with one oracle query.",
  },

  "Deutsch-Jozsa": {
    title: "Predict the Output",
    icon: "🎯",
    description: "Classify the given Boolean function.",

    circuit: (
      <div className="search-visual">
        <div className="function-box">f(x)</div>
        <div className="arrow">↓</div>
        <div className="target-state">⚛️ Quantum Interference</div>
      </div>
    ),

    question: "What property does Deutsch-Jozsa determine?",

    options: [
      "Constant or balanced",
      "Prime or composite",
      "Sorted or unsorted",
      "Large or small",
    ],

    answer: "Constant or balanced",

    explanation:
      "Correct! The Deutsch-Jozsa algorithm distinguishes between constant and balanced functions.",
  },

  "Bernstein-Vazirani": {
    title: "Predict the Output",
    icon: "🎯",
    description:
      "Use the quantum circuit to discover a hidden binary string.",

    circuit: (
      <div className="search-visual">
        <div className="function-box">Oracle</div>
        <div className="arrow">↓</div>
        <div className="target-state">🔐 Hidden String</div>
      </div>
    ),

    question: "What does Bernstein-Vazirani find?",

    options: [
      "A hidden binary string",
      "A prime number",
      "A shortest path",
      "A database record",
    ],

    answer: "A hidden binary string",

    explanation:
      "Correct! The algorithm can determine a hidden binary string using a single oracle query.",
  },

  "Quantum Teleportation": {
    title: "Predict the Output",
    icon: "🎯",
    description:
      "Understand what is actually transferred during quantum teleportation.",

    circuit: (
      <div className="search-visual">
        <div className="target-state">🧑 Alice</div>
        <div className="teleport-arrow">⚛️ ─────────→ ⚛️</div>
        <div className="target-state">🧑 Bob</div>
      </div>
    ),

    question: "What is transferred in quantum teleportation?",

    options: [
      "A quantum state",
      "A physical object",
      "Matter itself",
      "Only a classical file",
    ],

    answer: "A quantum state",

    explanation:
      "Correct! Quantum teleportation transfers an unknown quantum state using entanglement and classical communication. Matter itself is not transported.",
  },

  "Quantum Fourier Transform": {
    title: "Predict the Output",
    icon: "🎯",
    description:
      "Identify an important use of the Quantum Fourier Transform.",

    circuit: (
      <div className="search-visual">
        <div className="function-box">Quantum State</div>
        <div className="arrow">↓</div>
        <div className="target-state">〽️ QFT</div>
      </div>
    ),

    question: "Which algorithm makes important use of QFT?",

    options: [
      "Shor's algorithm",
      "Bubble Sort",
      "Binary Search",
      "K-Means",
    ],

    answer: "Shor's algorithm",

    explanation:
      "Correct! QFT is a central component of quantum phase estimation and Shor's algorithm.",
  },

  "Quantum Phase Estimation": {
    title: "Predict the Output",
    icon: "🎯",
    description:
      "Determine what Quantum Phase Estimation is designed to estimate.",

    circuit: (
      <div className="search-visual">
        <div className="function-box">Unitary U</div>
        <div className="arrow">↓</div>
        <div className="target-state">θ = ?</div>
      </div>
    ),

    question: "What does Quantum Phase Estimation estimate?",

    options: [
      "The phase of an eigenvalue",
      "The number of qubits",
      "The circuit depth",
      "Database size",
    ],

    answer: "The phase of an eigenvalue",

    explanation:
      "Correct! QPE estimates the phase associated with an eigenvalue of a unitary operator.",
  },

  "Shor's Algorithm": {
    title: "Predict the Output",
    icon: "🎯",
    description:
      "Identify the mathematical property Shor's quantum procedure searches for.",

    circuit: (
      <div className="search-visual">
        <div className="function-box">Quantum Period Finding</div>
        <div className="arrow">↓</div>
        <div className="target-state">🔢 Period</div>
      </div>
    ),

    question: "What mathematical property does Shor's algorithm find?",

    options: [
      "Periodicity",
      "Sorting order",
      "Image similarity",
      "Graph color",
    ],

    answer: "Periodicity",

    explanation:
      "Correct! Shor's algorithm uses quantum period finding as the key quantum component of integer factorization.",
  },

  VQE: {
    title: "Predict the Output",
    icon: "🎯",
    description: "Understand what VQE attempts to minimize.",

    circuit: (
      <div className="search-visual">
        <div className="function-box">Parameters</div>
        <div className="arrow">↓</div>
        <div className="target-state">⚡ Energy ↓</div>
      </div>
    ),

    question: "What does VQE commonly estimate?",

    options: [
      "Ground-state energy",
      "Database size",
      "Image resolution",
      "Sorting complexity",
    ],

    answer: "Ground-state energy",

    explanation:
      "Correct! VQE uses a parameterized quantum circuit and classical optimization to estimate the ground-state energy.",
  },

  QAOA: {
    title: "Predict the Output",
    icon: "🎯",
    description:
      "Understand the type of problem QAOA is designed to address.",

    circuit: (
      <div className="search-visual">
        <div className="function-box">Optimization Problem</div>
        <div className="arrow">↓</div>
        <div className="target-state">🏆 Best Solution</div>
      </div>
    ),

    question: "What type of problems is QAOA designed for?",

    options: [
      "Combinatorial optimization",
      "Image compression",
      "Text editing",
      "Classical sorting",
    ],

    answer: "Combinatorial optimization",

    explanation:
      "Correct! QAOA is a hybrid quantum-classical algorithm designed for approximate combinatorial optimization.",
  },

  "Quantum Error Correction": {
    title: "Predict the Output",
    icon: "🎯",
    description: "Understand the purpose of quantum error correction.",

    circuit: (
      <div className="search-visual">
        <div className="function-box">Noisy Qubit</div>
        <div className="arrow">↓</div>
        <div className="target-state">🛡️ Protected Information</div>
      </div>
    ),

    question: "What is the main goal of quantum error correction?",

    options: [
      "Protect quantum information from errors",
      "Compress data",
      "Increase screen resolution",
      "Speed up classical sorting",
    ],

    answer: "Protect quantum information from errors",

    explanation:
      "Correct! Quantum error correction protects quantum information against errors caused by noise and decoherence.",
  },
};

function getExercise(algorithm) {
  const name =
    typeof algorithm === "string"
      ? algorithm
      : algorithm?.title || "Bell State";

  if (EXERCISES[name]) {
    return EXERCISES[name];
  }

  const lower = name.toLowerCase();

  if (lower.includes("bell")) {
    return EXERCISES["Bell State"];
  }

  if (lower.includes("grover")) {
    return EXERCISES.Grover;
  }

  if (lower === "deutsch" || lower.includes("deutsch's")) {
    return EXERCISES.Deutsch;
  }

  if (
    lower.includes("deutsch-jozsa") ||
    lower.includes("deutsch jozsa")
  ) {
    return EXERCISES["Deutsch-Jozsa"];
  }

  if (
    lower.includes("bernstein") ||
    lower.includes("vazirani")
  ) {
    return EXERCISES["Bernstein-Vazirani"];
  }

  if (lower.includes("teleport")) {
    return EXERCISES["Quantum Teleportation"];
  }

  if (
    lower.includes("fourier") ||
    lower.includes("qft")
  ) {
    return EXERCISES["Quantum Fourier Transform"];
  }

  if (lower.includes("phase estimation")) {
    return EXERCISES["Quantum Phase Estimation"];
  }

  if (lower.includes("shor")) {
    return EXERCISES["Shor's Algorithm"];
  }

  if (
    lower.includes("vqe") ||
    lower.includes("variational")
  ) {
    return EXERCISES.VQE;
  }

  if (lower.includes("qaoa")) {
    return EXERCISES.QAOA;
  }

  if (
    lower.includes("error") ||
    lower.includes("correction")
  ) {
    return EXERCISES["Quantum Error Correction"];
  }

  return EXERCISES["Bell State"];
}

function getExerciseName(algorithm) {
  return typeof algorithm === "string"
    ? algorithm
    : algorithm?.title || "Bell State";
}

function readStorage(key, fallback = {}) {
  try {
    const data = localStorage.getItem(key);

    if (!data) {
      return fallback;
    }

    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${key}:`, error);
    return fallback;
  }
}

function saveStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
  }
}

function VisualExercise({
  algorithm = "Bell State",
  onComplete,
}) {
  const exercise = getExercise(algorithm);
  const name = getExerciseName(algorithm);

  const [selected, setSelected] = useState("");
  const [completed, setCompleted] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [earnedXP, setEarnedXP] = useState(false);

  const handleAnswer = (option) => {
    if (completed) {
      return;
    }

    setSelected(option);

    if (option === exercise.answer) {
      completeExercise();
    } else {
      setAttempts((previous) => previous + 1);
    }
  };

  const completeExercise = () => {
    if (completed) {
      return;
    }

    const today = new Date().toISOString();

    const exerciseResults = readStorage(
      "quantumExerciseResults"
    );

    const previousResult = exerciseResults[name];

    /*
     * XP is awarded only once for each algorithm.
     * Practice Again will not repeatedly increase XP.
     */
    const firstCompletion = !previousResult?.completed;

    const xpReward = firstCompletion ? 20 : 0;

    exerciseResults[name] = {
      completed: true,
      xp: previousResult?.xp || 20,
      completedAt: today,
      attempts: attempts + 1,
      lastPracticeAt: today,
    };

    saveStorage(
      "quantumExerciseResults",
      exerciseResults
    );

    /*
     * Save XP
     */
    if (firstCompletion) {
      const xpData = readStorage("quantumXP");

      xpData[name] = Number(xpData[name] || 0) + 20;

      saveStorage("quantumXP", xpData);
    }

    /*
     * Save learning activity
     */
    const activities = readStorage(
      "quantumActivities"
    );

    activities[name] = {
      ...(activities[name] || {}),
      visualExercise: true,
      exerciseCompleted: true,
      exerciseXP: 20,
      lastActivity: today,
    };

    saveStorage(
      "quantumActivities",
      activities
    );

    /*
     * Save exercise progress separately.
     * This can be used by the Dashboard later.
     */
    const exerciseProgress = readStorage(
      "quantumExercises"
    );

    exerciseProgress[name] = {
      completed: true,
      attempts: attempts + 1,
      xp: 20,
      completedAt: today,
    };

    saveStorage(
      "quantumExercises",
      exerciseProgress
    );

    /*
     * Update React state
     */
    setCompleted(true);
    setEarnedXP(firstCompletion);

    /*
     * Notify Dashboard and other components
     */
    window.dispatchEvent(
      new Event("quantumProgressUpdated")
    );

    /*
     * Notify parent component
     */
    if (onComplete) {
      onComplete({
        algorithm: name,
        xp: xpReward,
        completed: true,
        firstCompletion,
        attempts: attempts + 1,
      });
    }
  };

  const resetExercise = () => {
    setSelected("");
    setCompleted(false);
    setAttempts(0);
    setEarnedXP(false);
  };

  return (
    <section className="visual-exercise-card">

      {/* HEADER */}
      <div className="visual-exercise-header">
        <div>
          <span className="eyebrow">
            INTERACTIVE CHALLENGE
          </span>

          <h2>
            {exercise.icon} {exercise.title}
          </h2>

          <p>{exercise.description}</p>
        </div>

        <div className="exercise-xp">
          ⭐ +20 XP
        </div>
      </div>

      {/* CIRCUIT / VISUAL */}
      <div className="exercise-circuit-area">
        {exercise.circuit}
      </div>

      {/* QUESTION */}
      {!completed ? (
        <>
          <div className="exercise-question">
            <span>Challenge</span>

            <h3>{exercise.question}</h3>
          </div>

          {/* OPTIONS */}
          <div className="exercise-options">
            {exercise.options.map((option, index) => {
              const isSelected = selected === option;

              const isWrong =
                isSelected &&
                option !== exercise.answer;

              return (
                <button
                  key={option}
                  type="button"
                  className={`exercise-option ${
                    isSelected ? "selected" : ""
                  } ${
                    isWrong ? "exercise-wrong" : ""
                  }`}
                  onClick={() =>
                    handleAnswer(option)
                  }
                >
                  <span className="exercise-letter">
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span>{option}</span>
                </button>
              );
            })}
          </div>

          {/* WRONG ANSWER */}
          {selected &&
            selected !== exercise.answer && (
              <div className="exercise-feedback wrong-feedback">
                ❌ Not quite. Think about the quantum
                operation again.
              </div>
            )}

          {/* ATTEMPT COUNT */}
          {attempts > 0 && (
            <div className="exercise-attempts">
              Attempts: {attempts}
            </div>
          )}
        </>
      ) : (
        /* SUCCESS */
        <div className="exercise-success">

          <div className="success-icon">
            🎉
          </div>

          <span className="eyebrow">
            CHALLENGE COMPLETE
          </span>

          <h2>Excellent Work!</h2>

          <p>{exercise.explanation}</p>

          {earnedXP ? (
            <div className="xp-earned">
              ⭐ +20 XP earned
            </div>
          ) : (
            <div className="xp-earned">
              ✅ Exercise already completed
            </div>
          )}

          <div className="exercise-final-stats">
            <span>
              🎯 Attempts: {attempts + 1}
            </span>

            <span>
              ⚛️ Algorithm: {name}
            </span>
          </div>

          <button
            type="button"
            className="secondary-button"
            onClick={resetExercise}
          >
            Practice Again
          </button>
        </div>
      )}
    </section>
  );
}

export default VisualExercise;