const algorithms = [
  {
    id: "bell",
    title: "Bell State",
    icon: "🔗",
    level: "Beginner",
    category: "Foundations",
    description:
      "Learn how Hadamard and CNOT gates create quantum entanglement.",
    concepts: [
      "Qubits",
      "Superposition",
      "Entanglement",
      "Hadamard Gate",
      "CNOT Gate",
      "Measurement",
    ],
    explanation:
      "The Bell State is one of the simplest examples of quantum entanglement. Two qubits become correlated so that measuring one determines the corresponding state of the other.",
  },

  {
    id: "grover",
    title: "Grover's Search",
    icon: "🔎",
    level: "Intermediate",
    category: "Search",
    description:
      "Explore quantum search using an oracle and amplitude amplification.",
    concepts: [
      "Superposition",
      "Oracle",
      "Amplitude Amplification",
      "Diffusion Operator",
      "Measurement",
    ],
    explanation:
      "Grover's algorithm provides a quadratic speedup for searching an unsorted database.",
  },

  {
    id: "deutsch",
    title: "Deutsch's Algorithm",
    icon: "⚡",
    level: "Intermediate",
    category: "Quantum Algorithms",
    description:
      "Determine whether a function is constant or balanced with one quantum query.",
    concepts: [
      "Oracle",
      "Hadamard Gate",
      "Phase Kickback",
      "Constant Function",
      "Balanced Function",
    ],
    explanation:
      "Deutsch's algorithm demonstrates how quantum interference can solve a problem with fewer oracle queries than a classical approach.",
  },

  {
    id: "deutsch-jozsa",
    title: "Deutsch-Jozsa",
    icon: "🧩",
    level: "Intermediate",
    category: "Quantum Algorithms",
    description:
      "Determine whether a Boolean function is constant or balanced.",
    concepts: [
      "Oracle",
      "Superposition",
      "Interference",
      "Constant Function",
      "Balanced Function",
    ],
    explanation:
      "The Deutsch-Jozsa algorithm generalizes Deutsch's algorithm to multiple input qubits.",
  },

  {
    id: "bernstein-vazirani",
    title: "Bernstein-Vazirani",
    icon: "🎯",
    level: "Intermediate",
    category: "Quantum Algorithms",
    description:
      "Discover a hidden binary string using a quantum oracle.",
    concepts: [
      "Oracle",
      "Hidden String",
      "Hadamard Gates",
      "Phase Kickback",
      "Measurement",
    ],
    explanation:
      "The Bernstein-Vazirani algorithm demonstrates how quantum phase information can reveal a hidden string efficiently.",
  },

  {
    id: "teleportation",
    title: "Quantum Teleportation",
    icon: "📡",
    level: "Intermediate",
    category: "Quantum Communication",
    description:
      "Learn how an unknown quantum state can be transferred using entanglement.",
    concepts: [
      "Entanglement",
      "Bell State",
      "Measurement",
      "Classical Communication",
      "Quantum State",
    ],
    explanation:
      "Quantum teleportation transfers an unknown quantum state from one qubit to another using an entangled pair and classical communication.",
  },

  {
    id: "qft",
    title: "Quantum Fourier Transform",
    icon: "〽️",
    level: "Advanced",
    category: "Quantum Transform",
    description:
      "Understand the quantum version of the Fourier transform.",
    concepts: [
      "Fourier Transform",
      "Phase",
      "Hadamard Gate",
      "Controlled Phase",
      "Interference",
    ],
    explanation:
      "The Quantum Fourier Transform transforms amplitudes between computational and Fourier bases and is an important component of several quantum algorithms.",
  },

  {
    id: "phase-estimation",
    title: "Quantum Phase Estimation",
    icon: "📐",
    level: "Advanced",
    category: "Quantum Algorithms",
    description:
      "Estimate the phase associated with an eigenvalue of a unitary operator.",
    concepts: [
      "Eigenvalues",
      "Eigenvectors",
      "Phase",
      "QFT",
      "Controlled Operations",
    ],
    explanation:
      "Quantum Phase Estimation estimates the phase of an eigenvalue and is a fundamental subroutine used by algorithms such as Shor's algorithm.",
  },

  {
    id: "shor",
    title: "Shor's Algorithm",
    icon: "🔐",
    level: "Advanced",
    category: "Cryptography",
    description:
      "Explore quantum factoring and its implications for cryptography.",
    concepts: [
      "Integer Factorization",
      "Period Finding",
      "QFT",
      "Phase Estimation",
      "Cryptography",
    ],
    explanation:
      "Shor's algorithm uses quantum period finding to factor integers more efficiently than the best-known classical general-purpose factoring methods.",
  },

  {
    id: "vqe",
    title: "Variational Quantum Eigensolver",
    icon: "🧪",
    level: "Advanced",
    category: "Quantum Chemistry",
    description:
      "Learn how hybrid quantum-classical optimization can estimate molecular energies.",
    concepts: [
      "Variational Principle",
      "Ansatz",
      "Expectation Value",
      "Optimization",
      "Hybrid Computing",
    ],
    explanation:
      "VQE combines a parameterized quantum circuit with a classical optimizer to minimize the expectation value of a Hamiltonian.",
  },

  {
    id: "qaoa",
    title: "QAOA",
    icon: "🧠",
    level: "Advanced",
    category: "Optimization",
    description:
      "Explore quantum approximate optimization for combinatorial problems.",
    concepts: [
      "Optimization",
      "Cost Hamiltonian",
      "Mixer Hamiltonian",
      "Variational Circuit",
      "Classical Optimization",
    ],
    explanation:
      "QAOA is a hybrid quantum-classical algorithm designed to find approximate solutions to certain combinatorial optimization problems.",
  },

  {
    id: "error-correction",
    title: "Quantum Error Correction",
    icon: "🛡️",
    level: "Advanced",
    category: "Quantum Error Correction",
    description:
      "Understand how quantum information can be protected from errors.",
    concepts: [
      "Quantum Noise",
      "Bit Flip",
      "Phase Flip",
      "Syndrome",
      "Error Correction",
    ],
    explanation:
      "Quantum error correction uses additional qubits and carefully designed circuits to detect and correct certain quantum errors.",
  },
];

export { algorithms };

export default algorithms;