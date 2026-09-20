import React, { useState } from "react";
import { runQuantumCircuit } from "../services/api";
import "./MeasurementSimulator.css";

const ALGORITHM_CIRCUITS = {
  "Bell State": {
    qubits: 2,
    operations: [
      { gate: "H", qubit: 0, column: 0 },
      { gate: "CNOT", control: 0, target: 1, column: 1 },
    ],
    description:
      "A Hadamard gate creates superposition, followed by CNOT to create entanglement.",
  },

  "Deutsch's Algorithm": {
    qubits: 2,
    operations: [
      { gate: "X", qubit: 1, column: 0 },
      { gate: "H", qubit: 0, column: 1 },
      { gate: "H", qubit: 1, column: 1 },
      { gate: "CNOT", control: 0, target: 1, column: 2 },
      { gate: "H", qubit: 0, column: 3 },
    ],
    description:
      "Hadamard gates prepare the input and interference reveals information about the function.",
  },

  "Grover's Algorithm": {
    qubits: 2,
    operations: [
      { gate: "H", qubit: 0, column: 0 },
      { gate: "H", qubit: 1, column: 0 },
      { gate: "CZ", control: 0, target: 1, column: 1 },
      { gate: "H", qubit: 0, column: 2 },
      { gate: "H", qubit: 1, column: 2 },
      { gate: "X", qubit: 0, column: 3 },
      { gate: "X", qubit: 1, column: 3 },
      { gate: "CZ", control: 0, target: 1, column: 4 },
      { gate: "X", qubit: 0, column: 5 },
      { gate: "X", qubit: 1, column: 5 },
      { gate: "H", qubit: 0, column: 6 },
      { gate: "H", qubit: 1, column: 6 },
    ],
    description:
      "Grover's algorithm uses an oracle and diffusion operation to amplify a marked state.",
  },

  "Quantum Teleportation": {
    qubits: 3,
    operations: [
      { gate: "H", qubit: 1, column: 0 },
      { gate: "CNOT", control: 1, target: 2, column: 1 },
      { gate: "CNOT", control: 0, target: 1, column: 2 },
      { gate: "H", qubit: 0, column: 3 },
    ],
    description:
      "Quantum teleportation uses entanglement and classical measurement information to transfer an unknown quantum state.",
  },

  "Deutsch-Jozsa Algorithm": {
    qubits: 2,
    operations: [
      { gate: "X", qubit: 1, column: 0 },
      { gate: "H", qubit: 0, column: 1 },
      { gate: "H", qubit: 1, column: 1 },
      { gate: "CNOT", control: 0, target: 1, column: 2 },
      { gate: "H", qubit: 0, column: 3 },
    ],
    description:
      "Deutsch-Jozsa uses quantum parallelism and interference to distinguish function types.",
  },

  "Bernstein-Vazirani Algorithm": {
    qubits: 2,
    operations: [
      { gate: "X", qubit: 1, column: 0 },
      { gate: "H", qubit: 0, column: 1 },
      { gate: "H", qubit: 1, column: 1 },
      { gate: "CNOT", control: 0, target: 1, column: 2 },
      { gate: "H", qubit: 0, column: 3 },
      { gate: "H", qubit: 1, column: 3 },
    ],
    description:
      "Bernstein-Vazirani uses an oracle to reveal a hidden bit string.",
  },

  "Quantum Fourier Transform": {
    qubits: 2,
    operations: [
      { gate: "H", qubit: 0, column: 0 },
      { gate: "H", qubit: 1, column: 1 },
      { gate: "S", qubit: 1, column: 2 },
      { gate: "SWAP", qubit1: 0, qubit2: 1, column: 3 },
    ],
    description:
      "The Quantum Fourier Transform changes the representation of quantum amplitudes and phases.",
  },

  "Quantum Phase Estimation": {
    qubits: 2,
    operations: [
      { gate: "H", qubit: 0, column: 0 },
      { gate: "H", qubit: 1, column: 0 },
      { gate: "CNOT", control: 0, target: 1, column: 1 },
      { gate: "H", qubit: 0, column: 2 },
    ],
    description:
      "Phase estimation extracts information about the phase associated with an eigenvalue.",
  },

  "Shor's Algorithm": {
    qubits: 2,
    operations: [
      { gate: "H", qubit: 0, column: 0 },
      { gate: "H", qubit: 1, column: 0 },
      { gate: "CNOT", control: 0, target: 1, column: 1 },
      { gate: "H", qubit: 0, column: 2 },
    ],
    description:
      "Shor's algorithm uses quantum period finding as part of integer factorization.",
  },

  VQE: {
    qubits: 2,
    operations: [
      { gate: "RY", qubit: 0, column: 0, theta: 1.5708 },
      { gate: "RY", qubit: 1, column: 0, theta: 1.5708 },
      { gate: "CNOT", control: 0, target: 1, column: 1 },
    ],
    description:
      "VQE combines a parameterized quantum circuit with classical optimization.",
  },

  QAOA: {
    qubits: 2,
    operations: [
      { gate: "H", qubit: 0, column: 0 },
      { gate: "H", qubit: 1, column: 0 },
      { gate: "RZ", qubit: 0, column: 1, theta: 1.5708 },
      { gate: "RZ", qubit: 1, column: 1, theta: 1.5708 },
      { gate: "CNOT", control: 0, target: 1, column: 2 },
    ],
    description:
      "QAOA alternates between problem-dependent and mixing operations.",
  },

  "Quantum Error Correction": {
    qubits: 3,
    operations: [
      { gate: "H", qubit: 0, column: 0 },
      { gate: "CNOT", control: 0, target: 1, column: 1 },
      { gate: "CNOT", control: 0, target: 2, column: 2 },
    ],
    description:
      "Quantum error correction distributes information across multiple qubits so errors can be detected and corrected.",
  },
};

function MeasurementSimulator({
  algorithm = "Bell State",
  onComplete,
}) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const circuit =
    ALGORITHM_CIRCUITS[algorithm] ||
    ALGORITHM_CIRCUITS["Bell State"];

  const runSimulation = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await runQuantumCircuit(
        circuit.operations,
        circuit.qubits,
        1024
      );

      setResult(data);

      // IMPORTANT:
      // Do NOT call onComplete here.
      // The student must first see the measurement result.
    } catch (err) {
      console.error("Measurement error:", err);

      setError(
        err?.message ||
          "Unable to run the quantum circuit."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (onComplete && result) {
      onComplete(result);
    }
  };

  const getProbability = (count) => {
    if (!result?.shots) {
      return 0;
    }

    return (
      (Number(count) / Number(result.shots)) *
      100
    );
  };

  const sortedCounts = result?.counts
    ? Object.entries(result.counts).sort(
        ([, countA], [, countB]) =>
          Number(countB) - Number(countA)
      )
    : [];

  return (
    <section className="measurement-simulator">
      <div className="measurement-header">
        <div>
          <span className="measurement-eyebrow">
            STEP 4 · QUANTUM EXECUTION
          </span>

          <h2>Execute {algorithm}</h2>

          <p>
            Run the quantum circuit on the Qiskit
            simulator and observe the measurement
            results.
          </p>
        </div>

        <div className="simulator-status">
          <span></span>
          Qiskit Simulator
        </div>
      </div>

      <div className="measurement-card">
        <div className="card-heading">
          <div>
            <span>CIRCUIT</span>
            <h3>{algorithm}</h3>
          </div>

          <div className="qubit-badge">
            {circuit.qubits} qubits
          </div>
        </div>

        <div className="circuit-description">
          {circuit.description}
        </div>

        <div className="operation-list">
          {circuit.operations.map(
            (operation, index) => {
              let label = operation.gate;

              if (operation.gate === "CNOT") {
                label = `CNOT q${operation.control} → q${operation.target}`;
              }

              if (operation.gate === "CZ") {
                label = `CZ q${operation.control} → q${operation.target}`;
              }

              if (operation.gate === "SWAP") {
                label = `SWAP q${operation.qubit1} ↔ q${operation.qubit2}`;
              }

              if (
                ["RX", "RY", "RZ"].includes(
                  operation.gate
                )
              ) {
                label = `${operation.gate} q${operation.qubit}`;
              }

              return (
                <div
                  className="circuit-operation"
                  key={`${operation.gate}-${index}`}
                >
                  <span className="operation-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <strong>{label}</strong>

                  <span className="operation-column">
                    Column {operation.column + 1}
                  </span>
                </div>
              );
            }
          )}
        </div>
      </div>

      <div className="run-section">
        <button
          type="button"
          className="run-quantum-button"
          onClick={runSimulation}
          disabled={loading}
        >
          {loading
            ? "Running Quantum Circuit..."
            : "▶ Run Quantum Circuit"}
        </button>

        <p>
          The simulator will execute 1024 shots.
        </p>
      </div>

      {error && (
        <div className="measurement-error">
          <strong>Simulation failed</strong>

          <p>{error}</p>

          <span>
            Make sure the FastAPI backend is running
            on port 8000.
          </span>
        </div>
      )}

      {result && !error && (
        <div className="measurement-results">
          <div className="results-header">
            <div>
              <span>MEASUREMENT RESULTS</span>
              <h3>Quantum output</h3>
            </div>

            <div className="shots-badge">
              {result.shots} shots
            </div>
          </div>

          <div className="result-summary">
            <div className="summary-item">
              <span>QUBITS</span>
              <strong>{result.qubits}</strong>
            </div>

            <div className="summary-item">
              <span>SHOTS</span>
              <strong>{result.shots}</strong>
            </div>

            <div className="summary-item">
              <span>STATES</span>
              <strong>{sortedCounts.length}</strong>
            </div>
          </div>

          <div className="state-results">
            {sortedCounts.map(
              ([state, count]) => {
                const probability =
                  getProbability(count);

                return (
                  <div
                    className="state-result"
                    key={state}
                  >
                    <div className="state-info">
                      <div className="state-label">
                        |{state}⟩
                      </div>

                      <div className="state-count">
                        {count} measurements
                      </div>
                    </div>

                    <div className="state-bar-area">
                      <div className="state-bar">
                        <div
                          className="state-bar-fill"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.max(
                                0,
                                probability
                              )
                            )}%`,
                          }}
                        />
                      </div>

                      <strong>
                        {probability.toFixed(1)}%
                      </strong>
                    </div>
                  </div>
                );
              }
            )}
          </div>

          <div className="measurement-explanation">
            <span>WHAT DOES THIS MEAN?</span>

            <p>
              Each measurement represents one
              execution of the quantum circuit.
              Because quantum measurement is
              probabilistic, repeated shots help
              reveal the probability distribution
              of the possible states.
            </p>
          </div>
        </div>
      )}

      {result && !error && (
        <div className="continue-section">
          <div>
            <strong>
              Measurement complete
            </strong>

            <p>
              You have executed {algorithm}. Now
              analyze what the measured states mean.
            </p>
          </div>

          <button
            type="button"
            onClick={handleContinue}
          >
            Continue to Understanding →
          </button>
        </div>
      )}
    </section>
  );
}

export default MeasurementSimulator;