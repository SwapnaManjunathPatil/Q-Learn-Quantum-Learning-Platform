import { useMemo, useState } from "react";

import {
  Target,
  CheckCircle2,
  XCircle,
  Zap,
  RotateCcw,
} from "lucide-react";

import "./PredictOutput.css";

/*
|--------------------------------------------------------------------------
| PHASE 1 - PREDICT THE OUTPUT
|--------------------------------------------------------------------------
| 12 Algorithms × 3 Questions = 36 Questions
|
| Options are shuffled automatically.
| The correct answer is NOT always A.
|--------------------------------------------------------------------------
*/

const PREDICTIONS = {
  "Bell State": {
    icon: "🔗",
    questions: [
      {
        question:
          "What measurement results should you expect from the Bell state?",
        circuit: ["H", "CNOT"],
        options: [
          { text: "00 and 11", correct: true },
          { text: "00 and 01", correct: false },
          { text: "01 and 10", correct: false },
          { text: "All four outcomes equally", correct: false },
        ],
        explanation:
          "The Bell state created by H followed by CNOT is (|00⟩ + |11⟩)/√2, so measurements produce 00 or 11 with equal probability.",
      },
      {
        question:
          "After creating the Bell state, what is the relationship between the two qubits?",
        circuit: ["H", "CNOT"],
        options: [
          { text: "They are entangled", correct: true },
          { text: "They are completely independent", correct: false },
          { text: "Both qubits are always 0", correct: false },
          { text: "Only the second qubit exists", correct: false },
        ],
        explanation:
          "The H and CNOT gates create an entangled two-qubit Bell state.",
      },
      {
        question:
          "If the first qubit of the Bell state is measured as 1, what result will the second qubit have?",
        circuit: ["H", "CNOT"],
        options: [
          { text: "It must be 0", correct: false },
          { text: "It must be 1", correct: true },
          { text: "It is always random", correct: false },
          { text: "It cannot be measured", correct: false },
        ],
        explanation:
          "For the Bell state (|00⟩ + |11⟩)/√2, observing the first qubit as 1 corresponds to the |11⟩ component, so the second qubit is also 1.",
      },
    ],
  },

  "Grover's Algorithm": {
    icon: "🔎",
    questions: [
      {
        question:
          "What happens to the marked state during Grover's algorithm?",
        circuit: ["Oracle", "Diffusion"],
        options: [
          { text: "Its probability is amplified", correct: true },
          { text: "Its probability becomes zero", correct: false },
          { text: "It is removed from the circuit", correct: false },
          {
            text: "Every state gets exactly the same probability",
            correct: false,
          },
        ],
        explanation:
          "Grover's oracle marks the target and the diffusion operation amplifies its probability.",
      },
      {
        question:
          "What is the main purpose of the oracle in Grover's algorithm?",
        circuit: ["Oracle"],
        options: [
          { text: "Mark the target state", correct: true },
          { text: "Measure every qubit", correct: false },
          { text: "Delete the target state", correct: false },
          {
            text: "Convert qubits into classical bits",
            correct: false,
          },
        ],
        explanation:
          "The oracle identifies the desired state by changing its phase.",
      },
      {
        question:
          "For an ideal Grover search, which state is most likely to be measured after the amplification steps?",
        circuit: ["Oracle", "Diffusion"],
        options: [
          { text: "The marked target state", correct: true },
          { text: "A state chosen randomly", correct: false },
          { text: "Only the all-zero state", correct: false },
          { text: "No state can be measured", correct: false },
        ],
        explanation:
          "Grover's amplification increases the probability of the marked target state.",
      },
    ],
  },

  "Deutsch's Algorithm": {
    icon: "⚡",
    questions: [
      {
        question:
          "What property of a one-bit function does Deutsch's algorithm determine?",
        circuit: ["H", "Oracle", "H"],
        options: [
          {
            text: "Whether it is constant or balanced",
            correct: true,
          },
          { text: "Whether it has two qubits", correct: false },
          { text: "Whether it is periodic", correct: false },
          { text: "Whether it contains noise", correct: false },
        ],
        explanation:
          "Deutsch's algorithm determines whether a Boolean function is constant or balanced with one oracle query.",
      },
      {
        question:
          "If a Deutsch algorithm circuit produces measurement 0 on the first qubit, what does that indicate?",
        circuit: ["H", "Oracle", "H"],
        options: [
          { text: "The function is constant", correct: true },
          { text: "The function is balanced", correct: false },
          { text: "The qubit was deleted", correct: false },
          { text: "The oracle was not used", correct: false },
        ],
        explanation:
          "For the standard Deutsch algorithm, measuring 0 on the first qubit indicates a constant function.",
      },
      {
        question:
          "If the first qubit is measured as 1 in Deutsch's algorithm, what should you conclude?",
        circuit: ["H", "Oracle", "H"],
        options: [
          { text: "The function is constant", correct: false },
          { text: "The function is balanced", correct: true },
          { text: "The function has no output", correct: false },
          { text: "The circuit has no oracle", correct: false },
        ],
        explanation:
          "A measurement of 1 on the first qubit indicates that the function is balanced.",
      },
    ],
  },

  "Deutsch-Jozsa Algorithm": {
    icon: "🧠",
    questions: [
      {
        question:
          "What property of a promised Boolean function does Deutsch-Jozsa determine?",
        circuit: ["H", "Oracle", "H"],
        options: [
          {
            text: "Whether it is constant or balanced",
            correct: true,
          },
          { text: "Its exact numerical output", correct: false },
          { text: "Its execution time", correct: false },
          {
            text: "The number of physical qubits in the processor",
            correct: false,
          },
        ],
        explanation:
          "Deutsch-Jozsa distinguishes between constant and balanced functions under its promise.",
      },
      {
        question:
          "For a constant function in the standard Deutsch-Jozsa algorithm, what is expected when the input register is measured?",
        circuit: ["H", "Oracle", "H"],
        options: [
          { text: "All zeros", correct: true },
          { text: "All ones", correct: false },
          { text: "A random bit string", correct: false },
          { text: "No measurement result", correct: false },
        ],
        explanation:
          "A constant function produces the all-zero state in the input register after the final Hadamard gates.",
      },
      {
        question:
          "For a balanced function, what happens to the all-zero measurement outcome of the input register?",
        circuit: ["H", "Oracle", "H"],
        options: [
          { text: "It has zero probability", correct: true },
          { text: "It is guaranteed", correct: false },
          {
            text: "It becomes the only possible outcome",
            correct: false,
          },
          { text: "It is measured twice", correct: false },
        ],
        explanation:
          "For a balanced function, destructive interference makes the all-zero input-register outcome impossible in the ideal circuit.",
      },
    ],
  },

  "Bernstein-Vazirani Algorithm": {
    icon: "🔐",
    questions: [
      {
        question:
          "What hidden information does the Bernstein-Vazirani algorithm find?",
        circuit: ["H", "Oracle", "H"],
        options: [
          { text: "A hidden bit string", correct: true },
          { text: "A random measurement time", correct: false },
          {
            text: "The number of physical processors",
            correct: false,
          },
          { text: "A classical sorting order", correct: false },
        ],
        explanation:
          "The Bernstein-Vazirani algorithm identifies the hidden bit string used by the oracle.",
      },
      {
        question:
          "If the hidden string is 101, what should the ideal measurement of the input register return?",
        circuit: ["H", "Oracle", "H"],
        options: [
          { text: "111", correct: false },
          { text: "101", correct: true },
          { text: "010", correct: false },
          { text: "000", correct: false },
        ],
        explanation:
          "The algorithm is designed so that the hidden string is recovered directly from the input-register measurement.",
      },
      {
        question:
          "What is a key advantage of Bernstein-Vazirani over classical querying for the promised linear function?",
        circuit: ["H", "Oracle", "H"],
        options: [
          {
            text: "It finds the hidden string with one oracle query",
            correct: true,
          },
          { text: "It never uses quantum gates", correct: false },
          { text: "It requires no oracle", correct: false },
          {
            text: "It always measures every possible string",
            correct: false,
          },
        ],
        explanation:
          "The quantum Bernstein-Vazirani algorithm can determine the hidden string using a single oracle query.",
      },
    ],
  },

  "Quantum Teleportation": {
    icon: "📡",
    questions: [
      {
        question: "What is transferred in quantum teleportation?",
        circuit: ["Bell Pair", "CNOT", "H", "Measure"],
        options: [
          { text: "An unknown quantum state", correct: true },
          {
            text: "A physical qubit through space",
            correct: false,
          },
          { text: "A classical computer file", correct: false },
          { text: "A copy of the original state", correct: false },
        ],
        explanation:
          "Quantum teleportation transfers an unknown quantum state using entanglement and classical communication.",
      },
      {
        question:
          "What resource is essential for the standard quantum teleportation protocol?",
        circuit: ["Entanglement", "Classical Bits"],
        options: [
          { text: "An entangled Bell pair", correct: true },
          { text: "Only a classical bit", correct: false },
          {
            text: "A random number generator",
            correct: false,
          },
          {
            text: "A second copy of the unknown state",
            correct: false,
          },
        ],
        explanation:
          "The protocol uses a pre-shared entangled Bell pair between the sender and receiver.",
      },
      {
        question:
          "Why does quantum teleportation not violate the no-cloning theorem?",
        circuit: ["Measure", "Classical Bits", "Correction"],
        options: [
          {
            text: "The original state is destroyed during the protocol",
            correct: true,
          },
          { text: "The original state is copied twice", correct: false },
          {
            text: "The receiver creates a third copy",
            correct: false,
          },
          {
            text: "Measurement is completely avoided",
            correct: false,
          },
        ],
        explanation:
          "The sender's original quantum state is consumed by the teleportation process, so an independent copy is not created.",
      },
    ],
  },

  "Quantum Fourier Transform": {
    icon: "〽️",
    questions: [
      {
        question:
          "What does the Quantum Fourier Transform primarily transform?",
        circuit: ["H", "Phase", "QFT"],
        options: [
          {
            text: "Quantum amplitudes into a Fourier-transformed representation",
            correct: true,
          },
          {
            text: "Qubits into classical computers",
            correct: false,
          },
          {
            text: "Measurements into physical gates",
            correct: false,
          },
          {
            text: "Errors into additional qubits",
            correct: false,
          },
        ],
        explanation:
          "The QFT performs the quantum analogue of the discrete Fourier transform on amplitudes.",
      },
      {
        question:
          "Which gates are commonly used to construct a QFT circuit?",
        circuit: ["H", "Controlled Phase", "SWAP"],
        options: [
          {
            text: "Hadamard and controlled phase rotations",
            correct: true,
          },
          { text: "Only X gates", correct: false },
          {
            text: "Only measurement operations",
            correct: false,
          },
          { text: "Only CNOT gates", correct: false },
        ],
        explanation:
          "QFT circuits are commonly constructed using Hadamard gates, controlled phase rotations, and sometimes SWAP gates.",
      },
      {
        question:
          "What important information can the QFT help reveal in quantum algorithms?",
        circuit: ["Phase Structure"],
        options: [
          {
            text: "Periodic or phase-related structure",
            correct: true,
          },
          {
            text: "The physical temperature of a qubit",
            correct: false,
          },
          { text: "The screen resolution", correct: false },
          { text: "The classical CPU frequency", correct: false },
        ],
        explanation:
          "The QFT is particularly useful for extracting periodicity and phase information.",
      },
    ],
  },

  "Quantum Phase Estimation": {
    icon: "📐",
    questions: [
      {
        question:
          "What quantity does Quantum Phase Estimation estimate?",
        circuit: ["H", "Controlled-U", "QFT†"],
        options: [
          {
            text: "The phase associated with an eigenvalue",
            correct: true,
          },
          {
            text: "The physical size of the processor",
            correct: false,
          },
          { text: "The number of classical bits", correct: false },
          {
            text: "The temperature of the circuit",
            correct: false,
          },
        ],
        explanation:
          "QPE estimates the phase θ when an eigenstate satisfies U|ψ⟩ = e^(2πiθ)|ψ⟩.",
      },
      {
        question:
          "What operation is typically applied at the end of standard Quantum Phase Estimation?",
        circuit: ["Controlled-U", "QFT†"],
        options: [
          {
            text: "Inverse Quantum Fourier Transform",
            correct: true,
          },
          {
            text: "Only a measurement reset",
            correct: false,
          },
          {
            text: "A second random oracle",
            correct: false,
          },
          {
            text: "A classical sorting algorithm",
            correct: false,
          },
        ],
        explanation:
          "The inverse QFT converts the accumulated phase information into a measurable computational-basis bit string.",
      },
      {
        question:
          "If an eigenvalue is written as e^(2πiθ), what does θ represent?",
        circuit: ["Eigenvalue", "Phase"],
        options: [
          { text: "The phase parameter", correct: true },
          { text: "The number of qubits", correct: false },
          { text: "The measurement count", correct: false },
          { text: "The circuit depth", correct: false },
        ],
        explanation:
          "In e^(2πiθ), θ is the phase parameter that Quantum Phase Estimation seeks to estimate.",
      },
    ],
  },

  "Shor's Algorithm": {
    icon: "🔢",
    questions: [
      {
        question:
          "What important computational problem is Shor's algorithm designed to solve efficiently on a quantum computer?",
        circuit: ["Superposition", "QFT", "Period Finding"],
        options: [
          { text: "Integer factorization", correct: true },
          { text: "Image compression", correct: false },
          {
            text: "Sorting an arbitrary list",
            correct: false,
          },
          { text: "Rendering graphics", correct: false },
        ],
        explanation:
          "Shor's algorithm provides a polynomial-time quantum algorithm for integer factorization.",
      },
      {
        question:
          "What mathematical structure is central to the quantum part of Shor's algorithm?",
        circuit: ["Modular Arithmetic", "QFT"],
        options: [
          {
            text: "Finding the period of a modular function",
            correct: true,
          },
          {
            text: "Searching an unsorted list by amplitude amplification",
            correct: false,
          },
          {
            text: "Training a neural network",
            correct: false,
          },
          {
            text: "Measuring a Bell state",
            correct: false,
          },
        ],
        explanation:
          "The quantum portion of Shor's algorithm uses period finding for modular exponentiation.",
      },
      {
        question:
          "Which quantum transform is especially important in Shor's period-finding procedure?",
        circuit: ["QFT"],
        options: [
          { text: "Quantum Fourier Transform", correct: true },
          {
            text: "Only the Pauli-X transform",
            correct: false,
          },
          {
            text: "Only the measurement operation",
            correct: false,
          },
          {
            text: "Classical Fast Fourier Transform",
            correct: false,
          },
        ],
        explanation:
          "The Quantum Fourier Transform is used to extract information about the period.",
      },
    ],
  },

  VQE: {
    icon: "⚛️",
    questions: [
      {
        question:
          "What does the Variational Quantum Eigensolver primarily estimate?",
        circuit: ["Ansatz", "Measure", "Optimize"],
        options: [
          {
            text: "The ground-state energy of a quantum system",
            correct: true,
          },
          {
            text: "The number of classical processors",
            correct: false,
          },
          {
            text: "The length of a quantum circuit only",
            correct: false,
          },
          {
            text: "A random measurement result",
            correct: false,
          },
        ],
        explanation:
          "VQE uses a parameterized quantum state and classical optimization to estimate the ground-state energy.",
      },
      {
        question:
          "What is adjusted during the classical optimization loop in VQE?",
        circuit: ["Parameterized Ansatz", "Measurement", "Optimizer"],
        options: [
          {
            text: "Parameters of the quantum ansatz",
            correct: true,
          },
          {
            text: "The computer's operating system",
            correct: false,
          },
          {
            text: "The number of measurement devices",
            correct: false,
          },
          {
            text: "The definition of the Hamiltonian",
            correct: false,
          },
        ],
        explanation:
          "The classical optimizer updates parameters of the variational quantum circuit to reduce the measured energy.",
      },
      {
        question:
          "What quantity does VQE try to minimize?",
        circuit: ["Hamiltonian", "Expectation Value"],
        options: [
          {
            text: "The expectation value of the Hamiltonian",
            correct: true,
          },
          {
            text: "The number of qubit names",
            correct: false,
          },
          {
            text: "The circuit's screen brightness",
            correct: false,
          },
          {
            text: "The number of classical variables only",
            correct: false,
          },
        ],
        explanation:
          "VQE minimizes the expectation value of the Hamiltonian over a chosen parameterized state family.",
      },
    ],
  },

  QAOA: {
    icon: "🎯",
    questions: [
      {
        question:
          "What type of problems is QAOA designed to address?",
        circuit: ["Cost Hamiltonian", "Mixer", "Optimize"],
        options: [
          {
            text: "Combinatorial optimization problems",
            correct: true,
          },
          {
            text: "Only quantum state tomography",
            correct: false,
          },
          {
            text: "Only image classification",
            correct: false,
          },
          {
            text: "Classical file compression",
            correct: false,
          },
        ],
        explanation:
          "QAOA is a hybrid quantum-classical algorithm designed for approximate solutions to combinatorial optimization problems.",
      },
      {
        question:
          "What does the cost Hamiltonian represent in QAOA?",
        circuit: ["Cost Hamiltonian"],
        options: [
          {
            text: "The objective function encoded as a quantum operator",
            correct: true,
          },
          {
            text: "The physical temperature of the processor",
            correct: false,
          },
          {
            text: "The number of available qubits",
            correct: false,
          },
          {
            text: "The final measurement device",
            correct: false,
          },
        ],
        explanation:
          "The problem's objective function is encoded into a cost Hamiltonian whose expectation value is optimized.",
      },
      {
        question:
          "What happens to QAOA parameters during the hybrid optimization process?",
        circuit: ["Cost", "Mixer", "Classical Optimizer"],
        options: [
          {
            text: "They are optimized to improve the objective",
            correct: true,
          },
          {
            text: "They are permanently fixed before every run",
            correct: false,
          },
          {
            text: "They are removed after the first gate",
            correct: false,
          },
          {
            text: "They are replaced by measurement results directly",
            correct: false,
          },
        ],
        explanation:
          "A classical optimizer adjusts QAOA parameters using information obtained from quantum circuit evaluations.",
      },
    ],
  },

  "Quantum Error Correction": {
    icon: "🛡️",
    questions: [
      {
        question:
          "What is the main purpose of quantum error correction?",
        circuit: ["Encode", "Error", "Decode"],
        options: [
          {
            text: "Protect quantum information from errors",
            correct: true,
          },
          {
            text: "Increase the temperature of qubits",
            correct: false,
          },
          {
            text: "Remove the need for measurements",
            correct: false,
          },
          {
            text: "Convert all quantum states into classical states",
            correct: false,
          },
        ],
        explanation:
          "Quantum error correction protects encoded quantum information from noise and errors.",
      },
      {
        question:
          "What type of error does a bit-flip error correspond to?",
        circuit: ["|0⟩ → |1⟩", "|1⟩ → |0⟩"],
        options: [
          { text: "X-type error", correct: true },
          { text: "Z-type error", correct: false },
          {
            text: "Measurement-only error",
            correct: false,
          },
          {
            text: "Phase-estimation error",
            correct: false,
          },
        ],
        explanation:
          "A bit flip corresponds to the Pauli-X operation, which exchanges |0⟩ and |1⟩.",
      },
      {
        question:
          "Why are logical qubits encoded using multiple physical qubits in quantum error correction?",
        circuit: ["Encode", "Syndrome", "Correct"],
        options: [
          {
            text: "To detect and correct certain errors",
            correct: true,
          },
          {
            text: "To make measurement impossible",
            correct: false,
          },
          {
            text: "To eliminate all quantum gates",
            correct: false,
          },
          {
            text: "To guarantee that noise never occurs",
            correct: false,
          },
        ],
        explanation:
          "Encoding information across multiple physical qubits provides redundancy that can be used to detect and correct certain errors.",
      },
    ],
  },
};

/*
|--------------------------------------------------------------------------
| ALIASES
|--------------------------------------------------------------------------
*/

const ALIASES = {
  Bell: "Bell State",
  "Bell State Algorithm": "Bell State",

  Grover: "Grover's Algorithm",
  "Grover Algorithm": "Grover's Algorithm",

  Deutsch: "Deutsch's Algorithm",
  "Deutsch Algorithm": "Deutsch's Algorithm",

  "Deutsch-Jozsa": "Deutsch-Jozsa Algorithm",
  "Deutsch-Jozsa Algorithm": "Deutsch-Jozsa Algorithm",

  "Bernstein Vazirani": "Bernstein-Vazirani Algorithm",
  "Bernstein-Vazirani": "Bernstein-Vazirani Algorithm",

  "Quantum Teleportation Algorithm": "Quantum Teleportation",

  QFT: "Quantum Fourier Transform",
  "Quantum Fourier": "Quantum Fourier Transform",

  QPE: "Quantum Phase Estimation",
  "Phase Estimation": "Quantum Phase Estimation",

  Shor: "Shor's Algorithm",
  "Shor Algorithm": "Shor's Algorithm",

  "Variational Quantum Eigensolver": "VQE",
  "VQE Algorithm": "VQE",

  "QAOA Algorithm": "QAOA",

  QEC: "Quantum Error Correction",
  "Quantum Error Correction Algorithm":
    "Quantum Error Correction",
};

/*
|--------------------------------------------------------------------------
| HELPERS
|--------------------------------------------------------------------------
*/

function normalizeAlgorithm(algorithm) {
  if (!algorithm) {
    return "Bell State";
  }

  const raw =
    typeof algorithm === "string"
      ? algorithm
      : algorithm.title || algorithm.name || "Bell State";

  const trimmed = raw.trim();

  if (PREDICTIONS[trimmed]) {
    return trimmed;
  }

  if (ALIASES[trimmed]) {
    return ALIASES[trimmed];
  }

  const foundKey = Object.keys(PREDICTIONS).find(
    (key) => key.toLowerCase() === trimmed.toLowerCase()
  );

  if (foundKey) {
    return foundKey;
  }

  const aliasKey = Object.keys(ALIASES).find(
    (key) => key.toLowerCase() === trimmed.toLowerCase()
  );

  if (aliasKey) {
    return ALIASES[aliasKey];
  }

  return "Bell State";
}

function shuffleArray(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [
      shuffled[j],
      shuffled[i],
    ];
  }

  return shuffled;
}

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);

    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function saveStorage(key, value) {
  try {
    localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  } catch (error) {
    console.error(`Could not save ${key}`, error);
  }
}

/*
|--------------------------------------------------------------------------
| COMPONENT
|--------------------------------------------------------------------------
*/

function PredictOutput({
  algorithm = "Bell State",
  onComplete,
  onPrediction,
}) {
  const algorithmName = normalizeAlgorithm(algorithm);

  const predictionData =
    PREDICTIONS[algorithmName] ||
    PREDICTIONS["Bell State"];

  /*
  |--------------------------------------------------------------------------
  | Pick random question
  |--------------------------------------------------------------------------
  */

  const [questionIndex, setQuestionIndex] =
    useState(() =>
      Math.floor(
        Math.random() *
          predictionData.questions.length
      )
    );

  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [earnedXP, setEarnedXP] = useState(0);

  /*
  |--------------------------------------------------------------------------
  | Current question
  |--------------------------------------------------------------------------
  */

  const currentQuestion =
    predictionData.questions[questionIndex];

  /*
  |--------------------------------------------------------------------------
  | Shuffle options
  |--------------------------------------------------------------------------
  */

  const shuffledOptions = useMemo(() => {
    return shuffleArray(currentQuestion.options);
  }, [questionIndex, currentQuestion]);

  /*
  |--------------------------------------------------------------------------
  | Submit answer
  |--------------------------------------------------------------------------
  */

  const handleSubmit = () => {
    if (!selected || submitted) {
      return;
    }

    const selectedOption =
      shuffledOptions.find(
        (option) => option.text === selected
      );

    const correct =
      selectedOption?.correct === true;

    const correctAnswer =
      shuffledOptions.find(
        (option) => option.correct
      )?.text || "";

    const newAttempts = attempts + 1;

    setAttempts(newAttempts);
    setSubmitted(true);

    /*
    |--------------------------------------------------------------------------
    | Save prediction result
    |--------------------------------------------------------------------------
    */

    const predictionResults = readStorage(
      "quantumPredictionResults",
      {}
    );

    const previousResult =
      predictionResults[algorithmName];

    const alreadyCompleted =
      previousResult?.completed === true;

    const firstSuccessfulCompletion =
      correct && !alreadyCompleted;

    const xpReward =
      firstSuccessfulCompletion ? 10 : 0;

    predictionResults[algorithmName] = {
      completed:
        correct ||
        previousResult?.completed === true,

      correct,

      attempts: newAttempts,

      xp:
        previousResult?.xp ||
        xpReward,

      completedAt:
        correct
          ? new Date().toISOString()
          : previousResult?.completedAt || null,

      lastAttemptAt:
        new Date().toISOString(),
    };

    saveStorage(
      "quantumPredictionResults",
      predictionResults
    );

    /*
    |--------------------------------------------------------------------------
    | Add XP only on first successful completion
    |--------------------------------------------------------------------------
    */

    if (firstSuccessfulCompletion) {
      const xpData = readStorage(
        "quantumXP",
        {}
      );

      xpData[algorithmName] =
        (xpData[algorithmName] || 0) +
        xpReward;

      saveStorage(
        "quantumXP",
        xpData
      );

      setEarnedXP(xpReward);
    } else {
      setEarnedXP(0);
    }

    /*
    |--------------------------------------------------------------------------
    | Activity tracking
    |--------------------------------------------------------------------------
    */

    const activities = readStorage(
      "quantumActivities",
      {}
    );

    activities[algorithmName] = {
      ...(activities[algorithmName] || {}),

      predictionCompleted:
        correct ||
        previousResult?.completed === true,

      predictionCorrect: correct,

      predictionAttempts: newAttempts,

      predictionXP:
        previousResult?.xp ||
        xpReward,

      lastActivity:
        new Date().toISOString(),
    };

    saveStorage(
      "quantumActivities",
      activities
    );

    /*
    |--------------------------------------------------------------------------
    | Notify Dashboard
    |--------------------------------------------------------------------------
    */

    window.dispatchEvent(
      new Event("quantumProgressUpdated")
    );

    /*
    |--------------------------------------------------------------------------
    | NEW:
    | Send prediction result to AlgorithmDetail / AI Teacher
    |--------------------------------------------------------------------------
    */

    const predictionDataForTeacher = {
      algorithm: algorithmName,

      question: currentQuestion.question,

      circuit: currentQuestion.circuit,

      selectedAnswer: selected,

      correctAnswer,

      correct,

      explanation:
        currentQuestion.explanation,

      attempts: newAttempts,

      step: "Predict Output",
    };

    if (onPrediction) {
      onPrediction(
        predictionDataForTeacher
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Completion callback
    |--------------------------------------------------------------------------
    */

    if (correct && onComplete) {
      onComplete({
        algorithm: algorithmName,
        correct: true,
        xp: xpReward,
        attempts: newAttempts,
      });
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Try another question
  |--------------------------------------------------------------------------
  */

  const handleTryAgain = () => {
    let newIndex = questionIndex;

    if (predictionData.questions.length > 1) {
      while (newIndex === questionIndex) {
        newIndex = Math.floor(
          Math.random() *
            predictionData.questions.length
        );
      }
    }

    setQuestionIndex(newIndex);
    setSelected(null);
    setSubmitted(false);
    setEarnedXP(0);
  };

  /*
  |--------------------------------------------------------------------------
  | Current result
  |--------------------------------------------------------------------------
  */

  const selectedOption =
    shuffledOptions.find(
      (option) => option.text === selected
    );

  const isCurrentAnswerCorrect =
    selectedOption?.correct === true;

  const correctAnswer =
    shuffledOptions.find(
      (option) => option.correct
    )?.text;

  return (
    <section className="predict-output">
      {/* HEADER */}

      <div className="predict-header">
        <div className="predict-icon">
          <Target size={30} />
        </div>

        <div>
          <div className="predict-eyebrow">
            PHASE 1 • PREDICT
          </div>

          <h2>Predict the Output</h2>

          <p>
            Think about what the quantum circuit
            will produce before seeing the result.
          </p>
        </div>
      </div>

      {/* CIRCUIT PREVIEW */}

      <div className="predict-circuit-card">
        <div className="predict-circuit-title">
          <strong>
            Quantum Circuit
          </strong>

          <span>
            {algorithmName}
          </span>
        </div>

        <div className="predict-circuit">
          <div className="predict-wire">
            <span>q₀</span>

            {currentQuestion.circuit.map(
              (gate, index) => (
                <div
                  className="gate"
                  key={`${gate}-${index}`}
                >
                  {gate}
                </div>
              )
            )}
          </div>

          <div className="predict-wire">
            <span>q₁</span>
          </div>
        </div>
      </div>

      {/* QUESTION */}

      <div className="predict-question-card">
        <div className="question-label">
          QUESTION
        </div>

        <h3>
          {currentQuestion.question}
        </h3>

        {/* OPTIONS */}

        <div className="prediction-options">
          {shuffledOptions.map(
            (option, index) => {
              const optionLetter =
                String.fromCharCode(
                  65 + index
                );

              const isSelected =
                selected === option.text;

              const isCorrect =
                submitted &&
                option.correct;

              const isWrong =
                submitted &&
                isSelected &&
                !option.correct;

              return (
                <button
                  key={option.text}
                  type="button"
                  className={`prediction-option ${
                    isSelected
                      ? "selected"
                      : ""
                  } ${
                    isCorrect
                      ? "correct"
                      : ""
                  } ${
                    isWrong
                      ? "wrong"
                      : ""
                  }`}
                  onClick={() => {
                    if (!submitted) {
                      setSelected(
                        option.text
                      );
                    }
                  }}
                  disabled={submitted}
                >
                  <span className="option-letter">
                    {optionLetter}
                  </span>

                  <span className="option-text">
                    {option.text}
                  </span>

                  {isCorrect && (
                    <CheckCircle2
                      size={22}
                    />
                  )}

                  {isWrong && (
                    <XCircle
                      size={22}
                    />
                  )}
                </button>
              );
            }
          )}
        </div>

        {/* SUBMIT */}

        {!submitted && (
          <button
            className="predict-submit-button"
            onClick={handleSubmit}
            disabled={!selected}
          >
            <Target size={20} />

            Check Prediction
          </button>
        )}

        {/* RESULT */}

        {submitted && (
          <div
            className={`prediction-result ${
              isCurrentAnswerCorrect
                ? "success"
                : "failure"
            }`}
          >
            {isCurrentAnswerCorrect ? (
              <>
                <div className="result-icon">
                  <CheckCircle2
                    size={28}
                  />
                </div>

                <div>
                  <strong>
                    Excellent prediction!
                  </strong>

                  <p>
                    {currentQuestion.explanation}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="result-icon">
                  <XCircle size={28} />
                </div>

                <div>
                  <strong>
                    Not quite!
                  </strong>

                  <p>
                    The correct answer is{" "}
                    <strong>
                      {correctAnswer}
                    </strong>
                    .
                  </p>

                  <p>
                    {currentQuestion.explanation}
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        {/* XP */}

        {submitted &&
          earnedXP > 0 && (
            <div className="prediction-xp">
              <Zap size={20} />

              <strong>
                +{earnedXP} XP
              </strong>

              <span>
                First successful prediction!
              </span>
            </div>
          )}

        {/* TRY AGAIN */}

        {submitted && (
          <button
            className="predict-retry-button"
            onClick={handleTryAgain}
          >
            <RotateCcw size={18} />

            Try Another Question
          </button>
        )}

        {/* ATTEMPTS */}

        {attempts > 0 && (
          <div className="prediction-attempts">
            Attempts this session:{" "}
            <strong>{attempts}</strong>
          </div>
        )}
      </div>
    </section>
  );
}

export default PredictOutput;