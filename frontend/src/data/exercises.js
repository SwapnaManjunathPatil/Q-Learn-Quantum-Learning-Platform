export const exercises = {
  "Bell State": {
    title: "Build a Bell State",
    description:
      "Arrange the gates correctly to create quantum entanglement.",

    steps: [
      {
        question: "Which gate should be applied first to qubit 0?",
        options: ["X", "H", "Z", "CNOT"],
        correct: "H",
        explanation:
          "The Hadamard gate creates a superposition on qubit 0.",
      },
      {
        question:
          "Which gate should be applied next to create entanglement?",
        options: ["X", "Z", "H", "CNOT"],
        correct: "CNOT",
        explanation:
          "The CNOT gate entangles qubit 0 with qubit 1.",
      },
    ],

    circuit: [
      {
        qubit: "q₀",
        gates: ["H", "CNOT"],
      },
      {
        qubit: "q₁",
        gates: ["", "X"],
      },
    ],

    reward: 50,
  },

  Grover: {
    title: "Find the Marked State",
    description:
      "Use the oracle and diffusion steps to amplify the marked state.",

    steps: [
      {
        question: "What identifies the target state?",
        options: ["Oracle", "SWAP", "Measurement", "Decoder"],
        correct: "Oracle",
        explanation:
          "The oracle marks the state that we want to find.",
      },
      {
        question: "What amplifies the probability of the marked state?",
        options: [
          "Diffusion",
          "Measurement",
          "SWAP",
          "Classical sorting",
        ],
        correct: "Diffusion",
        explanation:
          "The diffusion operator amplifies the marked state's amplitude.",
      },
    ],

    circuit: [
      {
        qubit: "q₀",
        gates: ["H", "Oracle", "D"],
      },
      {
        qubit: "q₁",
        gates: ["H", "Oracle", "D"],
      },
    ],

    reward: 50,
  },
};