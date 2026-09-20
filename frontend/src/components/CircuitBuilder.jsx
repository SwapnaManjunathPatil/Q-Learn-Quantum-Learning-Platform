import { useEffect, useMemo, useState } from "react";
import "./CircuitBuilder.css";
import { runQuantumCircuit } from "../services/api";

const CIRCUIT_CHALLENGES = {
  "Bell State": {
    description: "Create an entangled Bell pair using H and CNOT.",
    qubits: 2,
    columns: 3,
    palette: ["H", "CNOT", "X", "Measure"],
    target: [
      ["H", "CNOT", null],
      [null, "TARGET", null],
    ],
  },

  "Grover's Algorithm": {
    description: "Build a simple Grover search circuit.",
    qubits: 2,
    columns: 5,
    palette: ["H", "Oracle", "Diffusion", "X", "Measure"],
    target: [
      ["H", "Oracle", "H", "Diffusion", "Measure"],
      ["H", "Oracle", "H", "Diffusion", "Measure"],
    ],
  },

  "Deutsch's Algorithm": {
    description: "Construct the Deutsch algorithm circuit.",
    qubits: 2,
    columns: 4,
    palette: ["H", "X", "Oracle", "Measure"],
    target: [
      ["H", "Oracle", "H", "Measure"],
      ["X", "H", "Oracle", null],
    ],
  },

  "Deutsch-Jozsa Algorithm": {
    description: "Build the Deutsch-Jozsa circuit.",
    qubits: 2,
    columns: 4,
    palette: ["H", "X", "Oracle", "Measure"],
    target: [
      ["H", "Oracle", "H", "Measure"],
      ["X", "H", "Oracle", "H"],
    ],
  },

  "Bernstein-Vazirani Algorithm": {
    description: "Construct the Bernstein-Vazirani circuit.",
    qubits: 3,
    columns: 4,
    palette: ["H", "X", "Oracle", "Measure"],
    target: [
      ["H", "Oracle", "H", "Measure"],
      ["H", "Oracle", "H", "Measure"],
      ["X", "H", "Oracle", "H"],
    ],
  },

  "Quantum Teleportation": {
    description: "Build a three-qubit quantum teleportation circuit.",
    qubits: 3,
    columns: 6,
    palette: ["H", "CNOT", "X", "Z", "Measure"],
    target: [
      ["H", "CNOT", null, null, "Measure", null],
      [null, "TARGET", "CNOT", "Z", "Measure", null],
      ["X", "H", "TARGET", "X", "Measure", null],
    ],
  },

  "Quantum Fourier Transform": {
    description: "Construct a basic QFT circuit.",
    qubits: 2,
    columns: 5,
    palette: ["H", "CP", "SWAP", "Measure"],
    target: [
      ["H", "CP", null, "SWAP_TOP", "Measure"],
      [null, "H", "CP", "SWAP_BOTTOM", "Measure"],
    ],
  },

  "Quantum Phase Estimation": {
    description: "Build the main structure of Quantum Phase Estimation.",
    qubits: 3,
    columns: 5,
    palette: ["H", "Controlled-U", "QFT†", "Measure"],
    target: [
      ["H", "CONTROL_U", null, "QFT†", "Measure"],
      ["H", "CONTROL_U", null, "QFT†", "Measure"],
      ["H", "TARGET_U", null, null, "Measure"],
    ],
  },

  "Shor's Algorithm": {
    description:
      "Construct a simplified quantum portion of Shor's algorithm.",
    qubits: 3,
    columns: 5,
    palette: ["H", "ModExp", "QFT†", "Measure"],
    target: [
      ["H", "ModExp", "QFT†", null, "Measure"],
      ["H", "ModExp", "QFT†", null, "Measure"],
      ["H", "ModExp", "QFT†", null, "Measure"],
    ],
  },

  VQE: {
    description:
      "Build a variational circuit using rotation gates and entanglement.",
    qubits: 2,
    columns: 4,
    palette: ["RY(θ)", "RZ(θ)", "CNOT", "Measure"],
    target: [
      ["RY(θ)", "RZ(θ)", "CNOT", "Measure"],
      ["RY(θ)", null, "TARGET", "Measure"],
    ],
  },

  QAOA: {
    description: "Construct a simplified QAOA circuit.",
    qubits: 2,
    columns: 4,
    palette: ["H", "Cost", "Mixer", "Measure"],
    target: [
      ["H", "Cost", "Mixer", "Measure"],
      ["H", "Cost", "Mixer", "Measure"],
    ],
  },

  "Quantum Error Correction": {
    description: "Build a simplified error correction circuit.",
    qubits: 3,
    columns: 4,
    palette: ["Encode", "Error", "Correct", "Measure"],
    target: [
      ["Encode", "Error", "Correct", "Measure"],
      ["Encode", null, "Correct", "Measure"],
      ["Encode", null, "Correct", "Measure"],
    ],
  },
};

const ALIASES = {
  Bell: "Bell State",
  "Bell State": "Bell State",

  Grover: "Grover's Algorithm",
  "Grover Algorithm": "Grover's Algorithm",
  "Grover's Search": "Grover's Algorithm",
  "Grover Search": "Grover's Algorithm",
  "Grover's Algorithm": "Grover's Algorithm",

  Deutsch: "Deutsch's Algorithm",
  "Deutsch Algorithm": "Deutsch's Algorithm",
  "Deutsch's Algorithm": "Deutsch's Algorithm",

  "Deutsch-Jozsa": "Deutsch-Jozsa Algorithm",
  "Deutsch Jozsa": "Deutsch-Jozsa Algorithm",
  "Deutsch-Jozsa Algorithm": "Deutsch-Jozsa Algorithm",

  "Bernstein-Vazirani": "Bernstein-Vazirani Algorithm",
  "Bernstein Vazirani": "Bernstein-Vazirani Algorithm",
  "Bernstein–Vazirani": "Bernstein-Vazirani Algorithm",
  "Bernstein-Vazirani Algorithm": "Bernstein-Vazirani Algorithm",

  Teleportation: "Quantum Teleportation",
  "Quantum Teleportation Algorithm": "Quantum Teleportation",
  "Quantum Teleportation": "Quantum Teleportation",

  QFT: "Quantum Fourier Transform",
  "Quantum Fourier Transform": "Quantum Fourier Transform",

  QPE: "Quantum Phase Estimation",
  "Phase Estimation": "Quantum Phase Estimation",
  "Quantum Phase Estimation": "Quantum Phase Estimation",

  Shor: "Shor's Algorithm",
  "Shor's Algorithm": "Shor's Algorithm",

  VQE: "VQE",
  "Variational Quantum Eigensolver": "VQE",
  "Variational Quantum Eigensolver (VQE)": "VQE",

  QAOA: "QAOA",
  "Quantum Approximate Optimization Algorithm": "QAOA",

  "Quantum Error Correction": "Quantum Error Correction",
};

const FREE_BUILD_GATES = [
  {
    category: "Single Qubit",
    gates: ["H", "X", "Y", "Z", "S", "T"],
  },
  {
    category: "Rotation",
    gates: ["RX", "RY", "RZ"],
  },
  {
    category: "Multi Qubit",
    gates: ["CNOT", "CZ", "SWAP"],
  },
  {
    category: "Other",
    gates: ["Measure", "Reset"],
  },
];

const FREE_QUBITS = 3;
const FREE_COLUMNS = 8;

function normalizeAlgorithm(algorithm) {
  if (!algorithm) {
    return "Bell State";
  }

  const raw =
    typeof algorithm === "string"
      ? algorithm
      : algorithm.title || algorithm.name || "Bell State";

  return ALIASES[raw] || raw;
}

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function saveStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors.
  }
}

function createEmptyGrid(qubits, columns) {
  return Array.from(
    { length: qubits },
    () => Array.from({ length: columns }, () => null)
  );
}

function getGateLabel(gate) {
  if (!gate) {
    return "";
  }

  const labels = {
    CONTROL: "●",
    TARGET: "⊕",

    CONTROL_CZ: "●",
    TARGET_CZ: "⊙",

    SWAP_TOP: "×",
    SWAP_BOTTOM: "×",

    CONTROL_U: "●",
    TARGET_U: "U",
  };

  return labels[gate] || gate;
}

function CircuitBuilder({
  algorithm = "Bell State",
  onComplete,
}) {
  const algorithmName = normalizeAlgorithm(algorithm);

  const challenge = useMemo(() => {
    return (
      CIRCUIT_CHALLENGES[algorithmName] ||
      CIRCUIT_CHALLENGES["Bell State"]
    );
  }, [algorithmName]);

  const [mode, setMode] = useState("challenge");

  const [challengeCircuit, setChallengeCircuit] = useState(() =>
    createEmptyGrid(
      challenge.qubits,
      challenge.columns
    )
  );

  const [freeCircuit, setFreeCircuit] = useState(() =>
    createEmptyGrid(
      FREE_QUBITS,
      FREE_COLUMNS
    )
  );

  const [draggedGate, setDraggedGate] = useState(null);

  const [dragOverCell, setDragOverCell] = useState(null);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [completed, setCompleted] = useState(false);

  const [freeRunResult, setFreeRunResult] = useState(null);

  const [isRunning, setIsRunning] = useState(false);

  const currentCircuit =
    mode === "challenge"
      ? challengeCircuit
      : freeCircuit;

  const currentQubits =
    mode === "challenge"
      ? challenge.qubits
      : FREE_QUBITS;

  const currentColumns =
    mode === "challenge"
      ? challenge.columns
      : FREE_COLUMNS;

  const currentPalette =
    mode === "challenge"
      ? challenge.palette
      : FREE_BUILD_GATES.flatMap(
          (group) => group.gates
        );

  useEffect(() => {
    setChallengeCircuit(
      createEmptyGrid(
        challenge.qubits,
        challenge.columns
      )
    );

    setDraggedGate(null);
    setDragOverCell(null);
    setCompleted(false);
    setMessage("");
    setMessageType("");
  }, [
    challenge.qubits,
    challenge.columns,
    algorithmName,
  ]);

  const updateCircuit = (updater) => {
    if (mode === "challenge") {
      setChallengeCircuit(updater);
    } else {
      setFreeCircuit(updater);
    }
  };

  /*
   * Remove a gate from the circuit.
   */
  const removeGate = (row, column) => {
    updateCircuit((previous) => {
      const next = previous.map((line) => [...line]);

      const gate = next[row][column];

      if (!gate) {
        return previous;
      }

      /*
       * CNOT
       */
      if (
        gate === "CNOT" ||
        gate === "CONTROL" ||
        gate === "TARGET"
      ) {
        for (let r = 0; r < next.length; r += 1) {
          if (
            next[r][column] === "CNOT" ||
            next[r][column] === "CONTROL" ||
            next[r][column] === "TARGET"
          ) {
            next[r][column] = null;
          }
        }

        return next;
      }

      /*
       * CZ
       */
      if (
        gate === "CZ" ||
        gate === "CONTROL_CZ" ||
        gate === "TARGET_CZ"
      ) {
        for (let r = 0; r < next.length; r += 1) {
          if (
            next[r][column] === "CZ" ||
            next[r][column] === "CONTROL_CZ" ||
            next[r][column] === "TARGET_CZ"
          ) {
            next[r][column] = null;
          }
        }

        return next;
      }

      /*
       * SWAP
       */
      if (
        gate === "SWAP_TOP" ||
        gate === "SWAP_BOTTOM"
      ) {
        for (let r = 0; r < next.length; r += 1) {
          if (
            next[r][column] === "SWAP_TOP" ||
            next[r][column] === "SWAP_BOTTOM"
          ) {
            next[r][column] = null;
          }
        }

        return next;
      }

      /*
       * Normal gate.
       */
      next[row][column] = null;

      return next;
    });
  };

  /*
   * Start dragging a gate.
   */
  const handleDragStart = (event, gate) => {
    setDraggedGate(gate);

    event.dataTransfer.effectAllowed = "copy";

    event.dataTransfer.setData(
      "text/plain",
      gate
    );
  };

  /*
   * End dragging.
   */
  const handleDragEnd = () => {
    setDraggedGate(null);
    setDragOverCell(null);
  };

  /*
   * Allow gate to be dropped.
   */
  const handleDragOver = (event, row, column) => {
    event.preventDefault();

    event.dataTransfer.dropEffect = "copy";

    setDragOverCell({
      row,
      column,
    });
  };

  /*
   * Leave a cell.
   */
  const handleDragLeave = () => {
    setDragOverCell(null);
  };

  /*
   * Main drop function.
   */
  const handleDrop = (event, row, column) => {
    event.preventDefault();

    const gate =
      event.dataTransfer.getData("text/plain") ||
      draggedGate;

    setDragOverCell(null);
    setDraggedGate(null);

    if (!gate) {
      return;
    }

    placeGate(gate, row, column);
  };

  /*
   * Place gate into circuit.
   */
  const placeGate = (gate, row, column) => {
    const existingGate =
      currentCircuit[row]?.[column];

    if (existingGate) {
      setMessage(
        "This position is already occupied. Remove the existing gate first."
      );
      setMessageType("error");
      return;
    }

    /*
     * Multi-qubit gates.
     */
    if (
      ["CNOT", "CZ", "SWAP"].includes(gate)
    ) {
      if (row >= currentQubits - 1) {
        setMessage(
          `${gate} needs another qubit directly below q${row}.`
        );
        setMessageType("error");
        return;
      }

      const targetGate =
        currentCircuit[row + 1]?.[column];

      if (targetGate) {
        setMessage(
          `${gate} cannot be placed because q${row + 1}, column ${column + 1} is occupied.`
        );
        setMessageType("error");
        return;
      }
    }

    updateCircuit((previous) => {
      const next = previous.map((line) => [...line]);

      /*
       * CNOT
       */
      if (gate === "CNOT") {
        next[row][column] =
          mode === "challenge"
            ? "CNOT"
            : "CONTROL";

        next[row + 1][column] = "TARGET";

        return next;
      }

      /*
       * CZ
       */
      if (gate === "CZ") {
        next[row][column] = "CONTROL_CZ";
        next[row + 1][column] = "TARGET_CZ";

        return next;
      }

      /*
       * SWAP
       */
      if (gate === "SWAP") {
        next[row][column] = "SWAP_TOP";
        next[row + 1][column] = "SWAP_BOTTOM";

        return next;
      }

      /*
       * Normal gate.
       */
      next[row][column] = gate;

      return next;
    });

    setMessage(
      `${gate} placed on q${row}, column ${column + 1}.`
    );

    setMessageType("success");
  };

  /*
   * Clicking an occupied gate removes it.
   */
  const handleCellClick = (row, column) => {
    if (currentCircuit[row][column]) {
      removeGate(row, column);

      setMessage(
        "Gate removed from the circuit."
      );

      setMessageType("info");

      return;
    }

    setMessage(
      "Drag a gate from the palette and drop it here."
    );

    setMessageType("info");
  };

  /*
   * Check challenge.
   */
  const checkCircuit = () => {
    const target = challenge.target;

    let correct = true;

    for (
      let row = 0;
      row < challenge.qubits;
      row += 1
    ) {
      for (
        let column = 0;
        column < challenge.columns;
        column += 1
      ) {
        const expected =
          target[row]?.[column] || null;

        const actual =
          challengeCircuit[row]?.[column] || null;

        if (expected !== actual) {
          correct = false;
          break;
        }
      }

      if (!correct) {
        break;
      }
    }

    if (!correct) {
      setMessage(
        "The circuit does not match the target yet. Check the gate positions and try again."
      );

      setMessageType("error");

      return;
    }

    setCompleted(true);

    setMessage(
      "Circuit completed successfully! Moving to quantum execution."
    );

    setMessageType("success");

    /*
     * Save circuit completion.
     */
    const results = readStorage(
      "quantumCircuitResults",
      {}
    );

    const previousResult =
      results[algorithmName];

    results[algorithmName] = {
      completed: true,
      xp: previousResult?.xp || 20,
      completedAt:
        new Date().toISOString(),
    };

    saveStorage(
      "quantumCircuitResults",
      results
    );

    /*
     * Award XP only once.
     */
    if (!previousResult?.completed) {
      const xpData = readStorage(
        "quantumXP",
        {}
      );

      xpData[algorithmName] =
        (xpData[algorithmName] || 0) + 20;

      saveStorage(
        "quantumXP",
        xpData
      );
    }

    /*
     * Activity tracking.
     */
    const activities = readStorage(
      "quantumActivities",
      {}
    );

    activities[algorithmName] = {
      ...(activities[algorithmName] || {}),
      circuitCompleted: true,
      circuitXP: 20,
      lastCircuitActivity:
        new Date().toISOString(),
    };

    saveStorage(
      "quantumActivities",
      activities
    );

    window.dispatchEvent(
      new CustomEvent(
        "quantumProgressUpdated"
      )
    );

    if (onComplete) {
      onComplete({
        algorithm: algorithmName,
        completed: true,
        circuit: challengeCircuit,
      });
    }
  };

  /*
   * Convert free circuit into backend operations.
   */
  const convertFreeCircuitToOperations = () => {
    const operations = [];

    for (
      let column = 0;
      column < FREE_COLUMNS;
      column += 1
    ) {
      let row = 0;

      while (row < FREE_QUBITS) {
        const gate =
          freeCircuit[row][column];

        if (!gate) {
          row += 1;
          continue;
        }

        /*
         * CNOT.
         */
        if (gate === "CONTROL") {
          const targetRow = row + 1;

          if (
            targetRow < FREE_QUBITS &&
            freeCircuit[targetRow][column] ===
              "TARGET"
          ) {
            operations.push({
              gate: "CNOT",
              control: row,
              target: targetRow,
              column,
            });

            row += 2;
            continue;
          }
        }

        /*
         * CZ.
         */
        if (gate === "CONTROL_CZ") {
          const targetRow = row + 1;

          if (
            targetRow < FREE_QUBITS &&
            freeCircuit[targetRow][column] ===
              "TARGET_CZ"
          ) {
            operations.push({
              gate: "CZ",
              control: row,
              target: targetRow,
              column,
            });

            row += 2;
            continue;
          }
        }

        /*
         * SWAP.
         */
        if (gate === "SWAP_TOP") {
          const targetRow = row + 1;

          if (
            targetRow < FREE_QUBITS &&
            freeCircuit[targetRow][column] ===
              "SWAP_BOTTOM"
          ) {
            operations.push({
              gate: "SWAP",
              qubit1: row,
              qubit2: targetRow,
              column,
            });

            row += 2;
            continue;
          }
        }

        /*
         * Single qubit gates.
         */
        if (
          [
            "H",
            "X",
            "Y",
            "Z",
            "S",
            "T",
            "RX",
            "RY",
            "RZ",
            "Reset",
          ].includes(gate)
        ) {
          operations.push({
            gate,
            qubit: row,
            column,
          });
        }

        row += 1;
      }
    }

    return operations;
  };

  /*
   * Run free circuit.
   */
  const runFreeCircuit = async () => {
    if (isRunning) {
      return;
    }

    const hasGate = freeCircuit.some(
      (row) =>
        row.some(
          (gate) => gate !== null
        )
    );

    if (!hasGate) {
      setMessage(
        "Add at least one gate before running the circuit."
      );

      setMessageType("error");

      return;
    }

    const operations =
      convertFreeCircuitToOperations();

    if (operations.length === 0) {
      setMessage(
        "The selected circuit contains no executable Qiskit gates."
      );

      setMessageType("error");

      return;
    }

    setIsRunning(true);
    setFreeRunResult(null);

    setMessage(
      "Sending your circuit to the Qiskit simulator..."
    );

    setMessageType("info");

    try {
      const data =
        await runQuantumCircuit(
          operations,
          FREE_QUBITS,
          1024
        );

      setFreeRunResult(data);

      setMessage(
        "Circuit executed successfully using Qiskit."
      );

      setMessageType("success");
    } catch (error) {
      setMessage(
        error?.message ||
          "Quantum circuit execution failed."
      );

      setMessageType("error");
    } finally {
      setIsRunning(false);
    }
  };

  /*
   * Reset.
   */
  const resetCircuit = () => {
    if (mode === "challenge") {
      setChallengeCircuit(
        createEmptyGrid(
          challenge.qubits,
          challenge.columns
        )
      );

      setCompleted(false);
    } else {
      setFreeCircuit(
        createEmptyGrid(
          FREE_QUBITS,
          FREE_COLUMNS
        )
      );

      setFreeRunResult(null);
    }

    setDraggedGate(null);
    setDragOverCell(null);
    setMessage("");
    setMessageType("");
  };

  /*
   * Probability.
   */
  const getProbability = (count) => {
    if (
      !freeRunResult ||
      !freeRunResult.shots
    ) {
      return "0.0";
    }

    return (
      (count / freeRunResult.shots) *
      100
    ).toFixed(1);
  };

  /*
   * Render target gate.
   */
  const renderTargetGate = (gate) => {
    if (!gate) {
      return null;
    }

    return (
      <span className="target-gate-symbol">
        {getGateLabel(gate)}
      </span>
    );
  };

  return (
    <section className="circuit-builder">

      {/* HEADER */}

      <div className="circuit-builder-header">
        <div>
          <span className="builder-eyebrow">
            CIRCUIT WORKSHOP
          </span>

          <h2>
            Build the Quantum Circuit
          </h2>

          <p>
            Drag quantum gates from the palette
            and drop them onto the qubit circuit.
            Build the circuit step by step and
            observe how quantum operations work.
          </p>
        </div>

        <div className="algorithm-pill">
          {algorithmName}
        </div>
      </div>

      {/* MODE SWITCH */}

      <div className="mode-switch">

        <button
          type="button"
          className={`mode-button ${
            mode === "challenge"
              ? "active"
              : ""
          }`}
          onClick={() => {
            setMode("challenge");
            setDraggedGate(null);
            setDragOverCell(null);
            setMessage("");
            setFreeRunResult(null);
          }}
        >
          <span className="mode-icon">
            ◈
          </span>

          <span>
            <strong>
              Circuit Challenge
            </strong>

            <small>
              Drag gates to match the target
            </small>
          </span>
        </button>

        <button
          type="button"
          className={`mode-button ${
            mode === "free"
              ? "active free"
              : ""
          }`}
          onClick={() => {
            setMode("free");
            setDraggedGate(null);
            setDragOverCell(null);
            setMessage("");
          }}
        >
          <span className="mode-icon">
            ⚛
          </span>

          <span>
            <strong>
              Free Quantum Lab
            </strong>

            <small>
              Build and run your own circuit
            </small>
          </span>
        </button>

      </div>

      {/* INFORMATION */}

      {mode === "challenge" && (
        <div className="challenge-tip">
          <span>💡</span>

          <div>
            <strong>
              Your Mission
            </strong>

            <p>
              Drag a gate from the Gate Palette
              and drop it into the correct position
              in your circuit. Multi-qubit gates such
              as CNOT automatically connect two
              adjacent qubits.
            </p>
          </div>
        </div>
      )}

      {mode === "free" && (
        <div className="free-build-tip">
          <span>⚛</span>

          <div>
            <strong>
              Free Quantum Lab
            </strong>

            <p>
              Experiment freely. Drag gates into
              the circuit and run your design using
              the Qiskit Aer simulator.
            </p>
          </div>
        </div>
      )}

      {/* TARGET CIRCUIT */}

      {mode === "challenge" && (
        <div className="target-circuit-wrapper">

          <div className="section-heading">
            <div>
              <span className="section-eyebrow">
                REFERENCE
              </span>

              <h3>
                Target Circuit
              </h3>
            </div>

            <span className="target-badge">
              Follow this structure
            </span>
          </div>

          <div
            className="circuit-scroll"
          >
            <div
              className="circuit-grid target-grid"
              style={{
                "--circuit-columns":
                  challenge.columns,
              }}
            >

              <div className="wire-label header-label">
                Qubit
              </div>

              {Array.from(
                {
                  length:
                    challenge.columns,
                },
                (_, columnIndex) => (
                  <div
                    className="column-label"
                    key={`target-column-${columnIndex}`}
                  >
                    {columnIndex + 1}
                  </div>
                )
              )}

              {Array.from(
                {
                  length:
                    challenge.qubits,
                },
                (_, rowIndex) => {
                  const row =
                    challenge.target?.[
                      rowIndex
                    ] || [];

                  return (
                    <div
                      className="target-row"
                      key={`target-row-${rowIndex}`}
                    >
                      <div className="wire-label">
                        q{rowIndex}
                      </div>

                      {Array.from(
                        {
                          length:
                            challenge.columns,
                        },
                        (_, columnIndex) => {
                          const gate =
                            row[
                              columnIndex
                            ] || null;

                          return (
                            <div
                              key={`target-cell-${rowIndex}-${columnIndex}`}
                              className={`target-cell ${
                                gate
                                  ? "has-target"
                                  : ""
                              }`}
                            >
                              {renderTargetGate(
                                gate
                              )}
                            </div>
                          );
                        }
                      )}
                    </div>
                  );
                }
              )}

            </div>
          </div>
        </div>
      )}

      {/* GATE PALETTE */}

      <div className="palette-section">

        <div className="section-heading">
          <div>
            <h3>
              Gate Palette
            </h3>

            <span className="palette-subtitle">
              Drag a gate and drop it onto the circuit
            </span>
          </div>
        </div>

        {mode === "free" ? (
          <div className="palette-groups">

            {FREE_BUILD_GATES.map(
              (group) => (
                <div
                  className="free-gate-group"
                  key={group.category}
                >
                  <h4>
                    {group.category}
                  </h4>

                  <div className="gate-palette">
                    {group.gates.map(
                      (gate) => (
                        <button
                          type="button"
                          draggable="true"
                          key={gate}
                          className={`gate-button ${
                            draggedGate === gate
                              ? "dragging"
                              : ""
                          }`}
                          onDragStart={(event) =>
                            handleDragStart(
                              event,
                              gate
                            )
                          }
                          onDragEnd={
                            handleDragEnd
                          }
                          title={`Drag ${gate} into the circuit`}
                        >
                          <span className="gate-symbol">
                            {gate === "CNOT"
                              ? "⊕"
                              : gate === "Measure"
                              ? "M"
                              : gate}
                          </span>

                          <span>
                            {gate}
                          </span>
                        </button>
                      )
                    )}
                  </div>
                </div>
              )
            )}

          </div>
        ) : (
          <div className="gate-palette">

            {currentPalette.map(
              (gate) => (
                <button
                  type="button"
                  draggable="true"
                  key={gate}
                  className={`gate-button ${
                    draggedGate === gate
                      ? "dragging"
                      : ""
                  }`}
                  onDragStart={(event) =>
                    handleDragStart(
                      event,
                      gate
                    )
                  }
                  onDragEnd={handleDragEnd}
                  title={`Drag ${gate} into the circuit`}
                >
                  <span className="gate-symbol">
                    {gate === "CNOT"
                      ? "⊕"
                      : gate === "Measure"
                      ? "M"
                      : gate}
                  </span>

                  <span>
                    {gate}
                  </span>
                </button>
              )
            )}

          </div>
        )}
      </div>

      {/* USER CIRCUIT */}

      <div className="builder-wrapper">

        <div className="builder-toolbar">

          <div>
            <strong>
              Your Circuit
            </strong>

            <span>
              {draggedGate
                ? `Dragging ${draggedGate} — drop it on a qubit`
                : "Drag a gate from the palette to begin"}
            </span>
          </div>

          <button
            type="button"
            className="reset-circuit-button"
            onClick={resetCircuit}
          >
            Reset
          </button>

        </div>

        <div className="circuit-scroll">

          <div
            className="circuit-grid builder-grid"
            style={{
              "--circuit-columns":
                currentColumns,
            }}
          >

            <div className="wire-label header-label">
              Qubit
            </div>

            {Array.from(
              {
                length:
                  currentColumns,
              },
              (_, column) => (
                <div
                  className="column-label"
                  key={`column-${column}`}
                >
                  {column + 1}
                </div>
              )
            )}

            {currentCircuit.map(
              (row, rowIndex) => (
                <div
                  className="builder-row"
                  key={`builder-row-${rowIndex}`}
                >

                  <div className="wire-label">
                    q{rowIndex}
                  </div>

                  {row.map(
                    (
                      gate,
                      columnIndex
                    ) => {

                      const isDragOver =
                        dragOverCell?.row ===
                          rowIndex &&
                        dragOverCell?.column ===
                          columnIndex;

                      return (
                        <button
                          type="button"
                          key={`cell-${rowIndex}-${columnIndex}`}
                          className={`circuit-cell ${
                            gate
                              ? "occupied"
                              : ""
                          } ${
                            isDragOver
                              ? "drag-over"
                              : ""
                          }`}
                          onClick={() =>
                            handleCellClick(
                              rowIndex,
                              columnIndex
                            )
                          }
                          onDragOver={(event) =>
                            handleDragOver(
                              event,
                              rowIndex,
                              columnIndex
                            )
                          }
                          onDragEnter={(event) => {
                            event.preventDefault();

                            setDragOverCell({
                              row: rowIndex,
                              column:
                                columnIndex,
                            });
                          }}
                          onDragLeave={
                            handleDragLeave
                          }
                          onDrop={(event) =>
                            handleDrop(
                              event,
                              rowIndex,
                              columnIndex
                            )
                          }
                          aria-label={
                            gate
                              ? `q${rowIndex}, column ${
                                  columnIndex + 1
                                }, ${gate}. Click to remove.`
                              : `Empty q${rowIndex}, column ${
                                  columnIndex + 1
                                }. Drop a gate here.`
                          }
                        >

                          {!gate && (
                            <span className="drop-placeholder">
                              {isDragOver
                                ? "↓"
                                : "+"}
                            </span>
                          )}

                          {gate && (
                            <span
                              className={`placed-gate ${
                                gate.includes(
                                  "CONTROL"
                                ) ||
                                gate ===
                                  "CNOT"
                                  ? "control-gate"
                                  : ""
                              }`}
                            >
                              {getGateLabel(
                                gate
                              )}
                            </span>
                          )}

                        </button>
                      );
                    }
                  )}

                </div>
              )
            )}

          </div>

        </div>

        <div className="grid-help">

          <span>
            ↕ Drag & drop gates
          </span>

          <span>
            ● Control
          </span>

          <span>
            ⊕ Target
          </span>

          <span>
            Click a gate to remove
          </span>

        </div>

      </div>

      {/* MESSAGE */}

      {message && (
        <div
          className={`circuit-message ${messageType}`}
          role="status"
          aria-live="polite"
        >
          <span>
            {messageType === "success"
              ? "✓"
              : messageType === "error"
              ? "!"
              : "•"}
          </span>

          {message}
        </div>
      )}

      {/* CHALLENGE ACTION */}

      {mode === "challenge" && (
        <div className="circuit-actions">

          <button
            type="button"
            className="check-circuit-button"
            onClick={checkCircuit}
          >
            {completed
              ? "Circuit Completed ✓"
              : "Check Circuit"}
          </button>

        </div>
      )}

      {/* FREE BUILD */}

      {mode === "free" && (
        <div className="free-run-section">

          <div className="free-run-header">

            <div>
              <h3>
                Execute with Qiskit
              </h3>

              <p>
                Your circuit will be sent to
                the FastAPI backend and executed
                using Qiskit Aer.
              </p>
            </div>

            <button
              type="button"
              className="run-circuit-button"
              onClick={runFreeCircuit}
              disabled={isRunning}
            >
              {isRunning
                ? "Running..."
                : "Run Circuit"}
            </button>

          </div>

          {freeRunResult && (
            <div className="simulation-result">

              <div className="result-heading">

                <span>⚛</span>

                <div>
                  <h3>
                    Measurement Results
                  </h3>

                  <p>
                    Generated by Qiskit Aer
                  </p>
                </div>

              </div>

              <div className="measurement-grid">

                {Object.entries(
                  freeRunResult.counts || {}
                ).map(
                  ([state, count]) => (
                    <div
                      className="measurement-card"
                      key={state}
                    >
                      <span>
                        State
                      </span>

                      <strong>
                        |{state}⟩
                      </strong>

                      <span>
                        {count} shots ·{" "}
                        {getProbability(
                          count
                        )}
                        %
                      </span>

                      <div className="state-bar">
                        <div
                          className="state-bar-fill"
                          style={{
                            width: `${Math.min(
                              100,
                              Number(
                                getProbability(
                                  count
                                )
                              )
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  )
                )}

              </div>

              <div className="result-note">
                These measurements were generated
                using the Qiskit Aer quantum simulator.
              </div>

            </div>
          )}

        </div>
      )}

      {/* COMPLETION */}

      {mode === "challenge" &&
        completed && (
          <div className="completion-card">

            <div className="completion-icon">
              ✓
            </div>

            <div>
              <strong>
                Circuit Challenge Complete
              </strong>

              <p>
                +20 XP earned. Continue to the
                execution stage to observe the
                quantum measurement results.
              </p>
            </div>

          </div>
        )}

      {/* FOOTER */}

      <div className="builder-footer">

        <span>
          {currentQubits} qubits
        </span>

        <span>
          {currentColumns} columns
        </span>

        <span>
          Drag & Drop Circuit Builder
        </span>

        <span>
          Qiskit Aer Simulator
        </span>

      </div>

    </section>
  );
}

export default CircuitBuilder;