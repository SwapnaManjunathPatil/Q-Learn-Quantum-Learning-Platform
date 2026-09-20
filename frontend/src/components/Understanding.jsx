import React, { useMemo } from "react";
import "./Understanding.css";

const UNDERSTANDING_DATA = {
  "Bell State": {
    title: "Understanding Entanglement",
    concept: "Superposition + Entanglement",
    explanation:
      "The Hadamard gate puts the first qubit into superposition. The CNOT gate then correlates the two qubits, creating an entangled Bell state.",
    resultMeaning:
      "You should mainly observe |00⟩ and |11⟩. The two qubits are correlated, so measuring one gives information about the other.",
    steps: [
      "Hadamard creates superposition.",
      "CNOT links the two qubits.",
      "The circuit produces correlated measurement outcomes.",
      "Repeated measurements reveal the probability distribution.",
    ],
  },

  "Deutsch's Algorithm": {
    title: "Understanding Deutsch's Algorithm",
    concept: "Quantum Interference",
    explanation:
      "Deutsch's algorithm uses superposition and interference to determine whether a one-bit function is constant or balanced.",
    resultMeaning:
      "The measurement of the relevant output qubit is interpreted to determine the type of the function.",
    steps: [
      "Prepare the input qubits.",
      "Create superposition using Hadamard gates.",
      "Apply the oracle.",
      "Use interference to reveal information about the function.",
    ],
  },

  "Grover's Algorithm": {
    title: "Understanding Grover's Search",
    concept: "Amplitude Amplification",
    explanation:
      "Grover's algorithm increases the amplitude of a marked state using an oracle followed by a diffusion operation.",
    resultMeaning:
      "The marked state should appear with a higher probability than the other states after amplification.",
    steps: [
      "Create an equal superposition.",
      "Apply the oracle to mark the target.",
      "Apply the diffusion operation.",
      "Measure the amplified state.",
    ],
  },

  "Quantum Teleportation": {
    title: "Understanding Quantum Teleportation",
    concept: "Entanglement + Measurement",
    explanation:
      "Quantum teleportation transfers an unknown quantum state using an entangled pair together with classical measurement information.",
    resultMeaning:
      "The measurement results represent the outcomes of the teleportation circuit and its classical correction process.",
    steps: [
      "Create an entangled pair.",
      "Interact the source qubit with one member of the pair.",
      "Measure the required qubits.",
      "Use the measurement information for correction.",
    ],
  },

  "Deutsch-Jozsa Algorithm": {
    title: "Understanding Deutsch-Jozsa",
    concept: "Quantum Parallelism + Interference",
    explanation:
      "Deutsch-Jozsa uses quantum parallelism and interference to distinguish a constant function from a balanced function.",
    resultMeaning:
      "The output distribution provides information about whether the oracle belongs to the constant or balanced case.",
    steps: [
      "Prepare the input register.",
      "Create superposition.",
      "Apply the oracle.",
      "Use interference and measure the output.",
    ],
  },

  "Bernstein-Vazirani Algorithm": {
    title: "Understanding Bernstein-Vazirani",
    concept: "Hidden Bit String",
    explanation:
      "Bernstein-Vazirani uses an oracle to encode a hidden bit string and quantum interference to recover it efficiently.",
    resultMeaning:
      "The measured bit pattern represents information about the hidden string encoded by the oracle.",
    steps: [
      "Prepare the input and auxiliary qubits.",
      "Create superposition.",
      "Apply the oracle.",
      "Apply Hadamard gates and measure.",
    ],
  },

  "Quantum Fourier Transform": {
    title: "Understanding the QFT",
    concept: "Quantum Fourier Transform",
    explanation:
      "The Quantum Fourier Transform changes the representation of amplitudes and phases and is a key component of several quantum algorithms.",
    resultMeaning:
      "The measured distribution reflects the state produced after the Fourier-transform circuit.",
    steps: [
      "Prepare the input state.",
      "Apply Hadamard operations.",
      "Apply controlled phase relationships.",
      "Swap qubits when required by the transform.",
    ],
  },

  "Quantum Phase Estimation": {
    title: "Understanding Phase Estimation",
    concept: "Eigenvalue Phase",
    explanation:
      "Quantum Phase Estimation estimates the phase associated with an eigenvalue of a unitary operator.",
    resultMeaning:
      "The measured bit string encodes an estimate of the phase information extracted by the circuit.",
    steps: [
      "Prepare the phase register.",
      "Prepare an eigenstate.",
      "Apply controlled unitary operations.",
      "Use the inverse Fourier transform and measure.",
    ],
  },

  "Shor's Algorithm": {
    title: "Understanding Shor's Algorithm",
    concept: "Quantum Period Finding",
    explanation:
      "Shor's algorithm uses quantum period finding as a key component of integer factorization.",
    resultMeaning:
      "The measurement distribution contains information related to the periodic structure generated by the quantum circuit.",
    steps: [
      "Create a superposition of candidate inputs.",
      "Evaluate the periodic function.",
      "Apply a Fourier transform.",
      "Measure the resulting register.",
    ],
  },

  VQE: {
    title: "Understanding VQE",
    concept: "Variational Optimization",
    explanation:
      "The Variational Quantum Eigensolver uses a parameterized quantum circuit and a classical optimizer to search for a low-energy state.",
    resultMeaning:
      "The measurement distribution gives information about the state prepared by the current parameterized circuit.",
    steps: [
      "Prepare a parameterized quantum state.",
      "Execute the quantum circuit.",
      "Measure the resulting states.",
      "Use the measurement information to evaluate the objective.",
    ],
  },

  QAOA: {
    title: "Understanding QAOA",
    concept: "Optimization + Quantum Evolution",
    explanation:
      "QAOA alternates between problem-dependent operations and mixing operations to explore solutions to combinatorial optimization problems.",
    resultMeaning:
      "The measured bit strings represent candidate solutions generated by the quantum circuit.",
    steps: [
      "Create the initial superposition.",
      "Apply the problem-dependent operation.",
      "Apply the mixing operation.",
      "Measure candidate solutions.",
    ],
  },

  "Quantum Error Correction": {
    title: "Understanding Quantum Error Correction",
    concept: "Redundancy + Error Protection",
    explanation:
      "Quantum error correction encodes information across multiple qubits so that errors can be detected and corrected without directly measuring the encoded quantum information.",
    resultMeaning:
      "The measured states show the outcomes produced by the encoded circuit. More complete error-correction circuits would additionally include syndrome measurement and correction.",
    steps: [
      "Encode information across multiple qubits.",
      "Allow the encoded state to undergo operations.",
      "Detect error information through appropriate measurements.",
      "Apply a correction when required.",
    ],
  },
};

function Understanding({
  algorithm = "Bell State",
  result = null,
  prediction = null,
  onComplete,
}) {
  const data =
    UNDERSTANDING_DATA[algorithm] ||
    UNDERSTANDING_DATA["Bell State"];

  const sortedCounts = useMemo(() => {
    if (!result?.counts) {
      return [];
    }

    return Object.entries(result.counts).sort(
      ([, countA], [, countB]) =>
        Number(countB) - Number(countA)
    );
  }, [result]);

  const topState = sortedCounts[0];

  const topProbability =
    topState && result?.shots
      ? (Number(topState[1]) /
          Number(result.shots)) *
        100
      : 0;

  const predictedAnswer =
    prediction?.selectedAnswer || "";

  const correctPrediction =
    prediction?.correct;

  const handleComplete = () => {
    if (onComplete) {
      onComplete({
        algorithm,
        result,
        prediction,
      });
    }
  };

  return (
    <section className="understanding">
      {/* HEADER */}
      <div className="understanding-header">
        <div>
          <span className="understanding-eyebrow">
            STEP 5 · UNDERSTAND
          </span>

          <h2>{data.title}</h2>

          <p>
            Connect your prediction with the actual
            quantum measurement.
          </p>
        </div>

        <div className="understanding-badge">
          ✓ Result analyzed
        </div>
      </div>

      {/* RESULT + PREDICTION */}
      <div className="understanding-grid">
        <div className="understanding-card">
          <span className="card-label">
            YOUR MEASUREMENT
          </span>

          {result ? (
            <>
              <div className="main-result">
                {topState
                  ? `|${topState[0]}⟩`
                  : "—"}
              </div>

              <p className="result-caption">
                Most frequently measured state
              </p>

              <div className="result-mini-grid">
                <div>
                  <span>SHOTS</span>
                  <strong>
                    {result.shots || "—"}
                  </strong>
                </div>

                <div>
                  <span>STATES</span>
                  <strong>
                    {sortedCounts.length}
                  </strong>
                </div>

                <div>
                  <span>TOP PROBABILITY</span>
                  <strong>
                    {topProbability.toFixed(1)}%
                  </strong>
                </div>
              </div>
            </>
          ) : (
            <div className="no-result">
              No measurement result available.
            </div>
          )}
        </div>

        <div className="understanding-card">
          <span className="card-label">
            YOUR PREDICTION
          </span>

          {predictedAnswer ? (
            <>
              <div className="prediction-answer">
                {predictedAnswer}
              </div>

              <div
                className={`prediction-status ${
                  correctPrediction
                    ? "correct"
                    : "needs-review"
                }`}
              >
                {correctPrediction
                  ? "✓ Prediction matched"
                  : "↗ Compare with the measured result"}
              </div>
            </>
          ) : (
            <div className="no-result">
              Prediction information is not
              available.
            </div>
          )}
        </div>
      </div>

      {/* CORE CONCEPT */}
      <div className="concept-explanation-card">
        <div className="concept-icon">
          ⚛
        </div>

        <div>
          <span className="card-label">
            CORE CONCEPT
          </span>

          <h3>{data.concept}</h3>

          <p>{data.explanation}</p>
        </div>
      </div>

      {/* MEASUREMENT DISTRIBUTION */}
      {sortedCounts.length > 0 && (
        <div className="distribution-card">
          <div className="distribution-header">
            <div>
              <span className="card-label">
                MEASUREMENT DISTRIBUTION
              </span>

              <h3>
                What did the simulator observe?
              </h3>
            </div>

            <span>
              {result.shots} total shots
            </span>
          </div>

          <div className="distribution-list">
            {sortedCounts.map(
              ([state, count]) => {
                const probability =
                  result.shots
                    ? (Number(count) /
                        Number(result.shots)) *
                      100
                    : 0;

                return (
                  <div
                    className="distribution-row"
                    key={state}
                  >
                    <div className="distribution-state">
                      |{state}⟩
                    </div>

                    <div className="distribution-bar">
                      <div
                        className="distribution-fill"
                        style={{
                          width: `${Math.min(
                            100,
                            probability
                          )}%`,
                        }}
                      />
                    </div>

                    <div className="distribution-value">
                      {probability.toFixed(1)}%
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}

      {/* WHAT THE RESULT MEANS */}
      <div className="meaning-card">
        <span className="card-label">
          WHAT DOES THE RESULT MEAN?
        </span>

        <h3>{data.resultMeaning}</h3>
      </div>

      {/* STEP BREAKDOWN */}
      <div className="understanding-steps">
        <div className="steps-heading">
          <span className="card-label">
            CIRCUIT BREAKDOWN
          </span>

          <h3>
            What happened inside the algorithm?
          </h3>
        </div>

        <div className="steps-list">
          {data.steps.map(
            (step, index) => (
              <div
                className="understanding-step"
                key={index}
              >
                <div className="step-number">
                  {String(index + 1).padStart(
                    2,
                    "0"
                  )}
                </div>

                <p>{step}</p>
              </div>
            )
          )}
        </div>
      </div>

      {/* FINAL ACTION */}
      <div className="understanding-complete">
        <div>
          <span>
            CONCEPT UNDERSTOOD
          </span>

          <strong>
            You connected the circuit with its
            measured output.
          </strong>
        </div>

        <button
          type="button"
          onClick={handleComplete}
        >
          Complete Module ✓
        </button>
      </div>
    </section>
  );
}

export default Understanding;