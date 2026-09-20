import React, { useMemo, useState } from "react";
import "./BlochSphere.css";

const STATES = {
  "|0⟩": {
    name: "|0⟩",
    description: "North pole of the Bloch sphere",
    theta: 0,
    phi: 0,
    probability: "100% |0⟩",
  },

  "|1⟩": {
    name: "|1⟩",
    description: "South pole of the Bloch sphere",
    theta: Math.PI,
    phi: 0,
    probability: "100% |1⟩",
  },

  "|+⟩": {
    name: "|+⟩",
    description: "Equal superposition of |0⟩ and |1⟩",
    theta: Math.PI / 2,
    phi: 0,
    probability: "50% |0⟩ + 50% |1⟩",
  },

  "|−⟩": {
    name: "|−⟩",
    description: "Superposition with a relative phase of π",
    theta: Math.PI / 2,
    phi: Math.PI,
    probability: "50% |0⟩ + 50% |1⟩",
  },

  "|i⟩": {
    name: "|i⟩",
    description: "Superposition with a +π/2 relative phase",
    theta: Math.PI / 2,
    phi: Math.PI / 2,
    probability: "50% |0⟩ + 50% |1⟩",
  },

  "|−i⟩": {
    name: "|−i⟩",
    description: "Superposition with a −π/2 relative phase",
    theta: Math.PI / 2,
    phi: -Math.PI / 2,
    probability: "50% |0⟩ + 50% |1⟩",
  },
};

const ALGORITHM_STATES = {
  "Bell State": {
    defaultState: "|+⟩",
    explanation:
      "A Bell-state circuit begins by creating superposition. The entanglement itself is a two-qubit property, so a single Bloch sphere cannot represent the complete joint state.",
    states: ["|0⟩", "|1⟩", "|+⟩", "|−⟩"],
  },

  "Grover's Algorithm": {
    defaultState: "|+⟩",
    explanation:
      "Grover's algorithm uses superposition and amplitude amplification. The Bloch sphere helps visualize a single-qubit state, while the complete search state may involve several qubits.",
    states: ["|0⟩", "|1⟩", "|+⟩", "|−⟩"],
  },

  "Deutsch's Algorithm": {
    defaultState: "|+⟩",
    explanation:
      "Hadamard gates create and transform superposition. The Bloch sphere provides an intuitive view of these single-qubit transformations.",
    states: ["|0⟩", "|1⟩", "|+⟩", "|−⟩"],
  },

  "Deutsch-Jozsa Algorithm": {
    defaultState: "|+⟩",
    explanation:
      "The input register uses Hadamard gates to create superposition. The Bloch sphere can visualize individual qubit transformations.",
    states: ["|0⟩", "|1⟩", "|+⟩", "|−⟩"],
  },

  "Bernstein-Vazirani Algorithm": {
    defaultState: "|+⟩",
    explanation:
      "The Bernstein-Vazirani circuit uses superposition and phase information to recover the hidden bit string.",
    states: ["|0⟩", "|1⟩", "|+⟩", "|−⟩"],
  },

  "Quantum Teleportation": {
    defaultState: "|+⟩",
    explanation:
      "Quantum teleportation transfers an unknown quantum state using entanglement and classical communication. The Bloch sphere is useful for visualizing the state being teleported.",
    states: ["|0⟩", "|1⟩", "|+⟩", "|−⟩", "|i⟩", "|−i⟩"],
  },

  "Quantum Fourier Transform": {
    defaultState: "|+⟩",
    explanation:
      "The QFT manipulates amplitudes and phases. The Bloch sphere provides an intuitive picture of phase changes for individual qubits.",
    states: ["|0⟩", "|1⟩", "|+⟩", "|−⟩", "|i⟩", "|−i⟩"],
  },

  "Quantum Phase Estimation": {
    defaultState: "|i⟩",
    explanation:
      "Quantum phase estimation encodes phase information through controlled operations. The azimuthal angle on the Bloch sphere represents relative phase for a single qubit.",
    states: ["|0⟩", "|1⟩", "|+⟩", "|−⟩", "|i⟩", "|−i⟩"],
  },

  "Shor's Algorithm": {
    defaultState: "|+⟩",
    explanation:
      "Shor's algorithm uses quantum interference and the Quantum Fourier Transform for period finding. Individual qubits can be visualized with Bloch-sphere representations.",
    states: ["|0⟩", "|1⟩", "|+⟩", "|−⟩"],
  },

  VQE: {
    defaultState: "|+⟩",
    explanation:
      "VQE uses parameterized quantum states. The Bloch sphere can illustrate how changing circuit parameters changes an individual qubit's state.",
    states: ["|0⟩", "|1⟩", "|+⟩", "|−⟩", "|i⟩", "|−i⟩"],
  },

  QAOA: {
    defaultState: "|+⟩",
    explanation:
      "QAOA repeatedly applies cost and mixer operations. The Bloch sphere gives an intuitive visualization of single-qubit state rotations.",
    states: ["|0⟩", "|1⟩", "|+⟩", "|−⟩"],
  },

  "Quantum Error Correction": {
    defaultState: "|0⟩",
    explanation:
      "Quantum error correction protects encoded information from errors. The Bloch sphere can illustrate how bit-flip and phase-flip operations affect a single qubit.",
    states: ["|0⟩", "|1⟩", "|+⟩", "|−⟩"],
  },
};

function normalizeAlgorithm(algorithm) {
  if (!algorithm) {
    return "Bell State";
  }

  const raw =
    typeof algorithm === "string"
      ? algorithm
      : algorithm.title || algorithm.name || "Bell State";

  const trimmed = raw.trim();

  const aliases = {
    Bell: "Bell State",
    "Bell State Algorithm": "Bell State",

    Grover: "Grover's Algorithm",
    "Grover Algorithm": "Grover's Algorithm",

    Deutsch: "Deutsch's Algorithm",
    "Deutsch Algorithm": "Deutsch's Algorithm",

    "Deutsch-Jozsa": "Deutsch-Jozsa Algorithm",

    "Bernstein Vazirani": "Bernstein-Vazirani Algorithm",
    "Bernstein-Vazirani": "Bernstein-Vazirani Algorithm",

    "Quantum Teleportation Algorithm": "Quantum Teleportation",

    QFT: "Quantum Fourier Transform",

    QPE: "Quantum Phase Estimation",

    Shor: "Shor's Algorithm",
    "Shor Algorithm": "Shor's Algorithm",

    "Variational Quantum Eigensolver": "VQE",
    "VQE Algorithm": "VQE",

    "QAOA Algorithm": "QAOA",

    QEC: "Quantum Error Correction",
    "Quantum Error Correction Algorithm":
      "Quantum Error Correction",
  };

  if (ALGORITHM_STATES[trimmed]) {
    return trimmed;
  }

  if (aliases[trimmed]) {
    return aliases[trimmed];
  }

  const found = Object.keys(ALGORITHM_STATES).find(
    (key) => key.toLowerCase() === trimmed.toLowerCase()
  );

  return found || "Bell State";
}

function getSpherePoint(state) {
  const { theta, phi } = state;

  return {
    x: Math.sin(theta) * Math.cos(phi),
    y: Math.sin(theta) * Math.sin(phi),
    z: Math.cos(theta),
  };
}

function BlochSphere({ algorithm = "Bell State" }) {
  const algorithmName = normalizeAlgorithm(algorithm);

  const algorithmConfig =
    ALGORITHM_STATES[algorithmName] ||
    ALGORITHM_STATES["Bell State"];

  const [selectedState, setSelectedState] = useState(
    algorithmConfig.defaultState
  );

  const [rotation, setRotation] = useState(0);

  const state = STATES[selectedState] || STATES["|0⟩"];

  const point = useMemo(
    () => getSpherePoint(state),
    [state]
  );

  const svgPoint = useMemo(() => {
    const centerX = 210;
    const centerY = 210;
    const radius = 135;

    const x = centerX + point.x * radius;

    const y =
      centerY -
      point.z * radius * 0.9 +
      point.y * radius * 0.28;

    return {
      x,
      y,
    };
  }, [point]);

  const handleStateChange = (newState) => {
    setSelectedState(newState);
  };

  const handleRotate = () => {
    setRotation((previous) => previous + 45);
  };

  return (
    <section className="bloch-sphere-section">
      {/* HEADER */}

      <div className="bloch-header">
        <div className="bloch-header-icon">🔵</div>

        <div>
          <span className="bloch-eyebrow">
            QUANTUM VISUALIZATION
          </span>

          <h2>Bloch Sphere</h2>

          <p>
            Visualize how a single qubit's quantum state
            changes on the Bloch sphere.
          </p>
        </div>
      </div>

      {/* ALGORITHM */}

      <div className="bloch-algorithm-card">
        <div>
          <span>ALGORITHM</span>

          <strong>{algorithmName}</strong>
        </div>

        <div className="bloch-state-badge">
          State: {selectedState}
        </div>
      </div>

      {/* MAIN CONTENT */}

      <div className="bloch-main-grid">
        {/* SPHERE */}

        <div className="bloch-visual-card">
          <div className="bloch-visual-header">
            <div>
              <span>STATE VISUALIZATION</span>
              <h3>{selectedState}</h3>
            </div>

            <button
              type="button"
              className="bloch-rotate-button"
              onClick={handleRotate}
            >
              ↻ Rotate
            </button>
          </div>

          <div
            className="bloch-sphere-wrapper"
            style={{
              transform: `rotateY(${rotation}deg)`,
            }}
          >
            <svg
              className="bloch-svg"
              viewBox="0 0 420 420"
              role="img"
              aria-label={`Bloch sphere showing quantum state ${selectedState}`}
            >
              {/* Sphere */}

              <circle
                cx="210"
                cy="210"
                r="135"
                className="sphere-outline"
              />

              {/* Equator */}

              <ellipse
                cx="210"
                cy="210"
                rx="135"
                ry="42"
                className="sphere-equator"
              />

              {/* Vertical axis */}

              <line
                x1="210"
                y1="55"
                x2="210"
                y2="365"
                className="sphere-axis"
              />

              {/* Horizontal axis */}

              <line
                x1="75"
                y1="210"
                x2="345"
                y2="210"
                className="sphere-axis"
              />

              {/* X/Y direction labels */}

              <text
                x="350"
                y="215"
                className="sphere-label"
              >
                +X
              </text>

              <text
                x="55"
                y="215"
                className="sphere-label"
              >
                −X
              </text>

              <text
                x="210"
                y="48"
                textAnchor="middle"
                className="sphere-label strong"
              >
                |0⟩
              </text>

              <text
                x="210"
                y="382"
                textAnchor="middle"
                className="sphere-label strong"
              >
                |1⟩
              </text>

              {/* Z axis */}

              <line
                x1="210"
                y1="75"
                x2="210"
                y2="345"
                className="sphere-z-axis"
              />

              {/* State vector */}

              <line
                x1="210"
                y1="210"
                x2={svgPoint.x}
                y2={svgPoint.y}
                className="state-vector"
              />

              {/* Arrow head */}

              <circle
                cx={svgPoint.x}
                cy={svgPoint.y}
                r="10"
                className="state-point"
              />

              <circle
                cx={svgPoint.x}
                cy={svgPoint.y}
                r="18"
                className="state-point-glow"
              />

              {/* State label */}

              <text
                x={svgPoint.x}
                y={svgPoint.y - 18}
                textAnchor="middle"
                className="state-point-label"
              >
                {selectedState}
              </text>
            </svg>
          </div>

          <div className="bloch-axis-info">
            <div>
              <strong>X</strong>
              <span>Superposition</span>
            </div>

            <div>
              <strong>Y</strong>
              <span>Phase</span>
            </div>

            <div>
              <strong>Z</strong>
              <span>Probability</span>
            </div>
          </div>
        </div>

        {/* CONTROLS */}

        <div className="bloch-controls-card">
          <div className="bloch-controls-header">
            <span>SELECT STATE</span>

            <h3>Explore quantum states</h3>

            <p>
              Select a state to see its position on the
              Bloch sphere.
            </p>
          </div>

          <div className="bloch-state-grid">
            {algorithmConfig.states.map((stateName) => {
              const isActive =
                selectedState === stateName;

              return (
                <button
                  key={stateName}
                  type="button"
                  className={`bloch-state-button ${
                    isActive ? "active" : ""
                  }`}
                  onClick={() =>
                    handleStateChange(stateName)
                  }
                >
                  <span className="bloch-state-symbol">
                    {stateName}
                  </span>

                  <span>
                    {STATES[stateName]?.description}
                  </span>
                </button>
              );
            })}
          </div>

          {/* CURRENT STATE */}

          <div className="bloch-current-state">
            <span>CURRENT STATE</span>

            <strong>{selectedState}</strong>

            <p>{state.description}</p>

            <div className="bloch-probability">
              {state.probability}
            </div>
          </div>
        </div>
      </div>

      {/* STATE DETAILS */}

      <div className="bloch-details-grid">
        <div className="bloch-detail-card">
          <span>POLAR ANGLE θ</span>

          <strong>
            {Math.round(
              (state.theta * 180) / Math.PI
            )}
            °
          </strong>

          <p>
            Determines the balance between the |0⟩ and
            |1⟩ basis states.
          </p>
        </div>

        <div className="bloch-detail-card">
          <span>AZIMUTHAL ANGLE φ</span>

          <strong>
            {Math.round(
              (state.phi * 180) / Math.PI
            )}
            °
          </strong>

          <p>
            Represents the relative phase around the
            equator.
          </p>
        </div>

        <div className="bloch-detail-card">
          <span>STATE DESCRIPTION</span>

          <strong>{selectedState}</strong>

          <p>{state.description}</p>
        </div>
      </div>

      {/* ALGORITHM EXPLANATION */}

      <div className="bloch-explanation">
        <div className="bloch-explanation-icon">
          💡
        </div>

        <div>
          <span>HOW THIS CONNECTS</span>

          <h3>{algorithmName}</h3>

          <p>{algorithmConfig.explanation}</p>
        </div>
      </div>
    </section>
  );
}

export default BlochSphere;