import { useMemo, useState } from "react";

const QUIZ_DATA = {
  "Bell State": [
    {
      question:
        "Which gate is commonly applied first to create superposition in a Bell-state circuit?",
      options: ["X Gate", "Hadamard Gate", "Z Gate", "SWAP Gate"],
      answer: "Hadamard Gate",
    },
    {
      question:
        "Which gate is used with the Hadamard gate to create entanglement?",
      options: ["CNOT", "Y Gate", "Z Gate", "T Gate"],
      answer: "CNOT",
    },
    {
      question:
        "How many qubits are required for a standard two-qubit Bell state?",
      options: ["1", "2", "3", "4"],
      answer: "2",
    },
    {
      question:
        "What important quantum phenomenon is demonstrated by Bell states?",
      options: [
        "Quantum entanglement",
        "Classical sorting",
        "Data compression",
        "Classical encryption",
      ],
      answer: "Quantum entanglement",
    },
    {
      question: "What is the purpose of the Hadamard gate?",
      options: [
        "Create superposition",
        "Measure the qubit",
        "Delete the qubit",
        "Swap two qubits",
      ],
      answer: "Create superposition",
    },
  ],

  Grover: [
    {
      question:
        "What type of problem is Grover's algorithm designed to speed up?",
      options: [
        "Unstructured search",
        "Matrix multiplication",
        "Classical sorting",
        "Image compression",
      ],
      answer: "Unstructured search",
    },
    {
      question:
        "What is the main quantum operation used to amplify the probability of the marked state?",
      options: [
        "Amplitude amplification",
        "Classical hashing",
        "Bit deletion",
        "Data compression",
      ],
      answer: "Amplitude amplification",
    },
    {
      question: "Which component identifies the desired state?",
      options: ["Oracle", "Compiler", "Register", "Decoder"],
      answer: "Oracle",
    },
    {
      question: "What does the Grover diffusion operator do?",
      options: [
        "Amplifies marked-state amplitude",
        "Measures every qubit",
        "Deletes the oracle",
        "Converts qubits to bits",
      ],
      answer: "Amplifies marked-state amplitude",
    },
    {
      question:
        "Grover's algorithm provides approximately what speedup over classical unstructured search?",
      options: ["Quadratic", "Cubic", "Linear", "No speedup"],
      answer: "Quadratic",
    },
  ],

  Deutsch: [
    {
      question: "What is the main purpose of Deutsch's algorithm?",
      options: [
        "Determine whether a Boolean function is constant or balanced",
        "Factor large integers",
        "Search an unsorted database",
        "Teleport a quantum state",
      ],
      answer:
        "Determine whether a Boolean function is constant or balanced",
    },
    {
      question:
        "Deutsch's algorithm demonstrates which important quantum idea?",
      options: [
        "Quantum parallelism",
        "Classical sorting",
        "Database indexing",
        "Data compression",
      ],
      answer: "Quantum parallelism",
    },
    {
      question: "What type of function does Deutsch's algorithm analyze?",
      options: [
        "Boolean function",
        "Polynomial function",
        "Trigonometric function",
        "Matrix function",
      ],
      answer: "Boolean function",
    },
    {
      question: "How many queries to the oracle are required?",
      options: ["1", "2", "3", "4"],
      answer: "1",
    },
    {
      question:
        "Which gate is typically used to create superposition in Deutsch's algorithm?",
      options: ["Hadamard", "SWAP", "CNOT", "Toffoli"],
      answer: "Hadamard",
    },
  ],

  "Deutsch-Jozsa": [
    {
      question: "What does the Deutsch-Jozsa algorithm determine?",
      options: [
        "Whether a function is constant or balanced",
        "Whether a number is prime",
        "The shortest path",
        "A database index",
      ],
      answer: "Whether a function is constant or balanced",
    },
    {
      question:
        "What type of function is used in the Deutsch-Jozsa problem?",
      options: [
        "Boolean function",
        "Sorting function",
        "Matrix function",
        "Search function",
      ],
      answer: "Boolean function",
    },
    {
      question:
        "What quantum technique is central to Deutsch-Jozsa?",
      options: [
        "Quantum interference",
        "Classical sorting",
        "Data compression",
        "Binary search",
      ],
      answer: "Quantum interference",
    },
    {
      question: "What gate is widely used to create superposition?",
      options: ["Hadamard", "SWAP", "XOR", "AND"],
      answer: "Hadamard",
    },
    {
      question: "What advantage does Deutsch-Jozsa demonstrate?",
      options: [
        "Quantum computational advantage for a specific oracle problem",
        "Faster classical sorting",
        "Lossless compression",
        "Classical encryption",
      ],
      answer:
        "Quantum computational advantage for a specific oracle problem",
    },
  ],

  "Bernstein-Vazirani": [
    {
      question: "What does the Bernstein-Vazirani algorithm find?",
      options: [
        "A hidden binary string",
        "A prime number",
        "A shortest path",
        "A database record",
      ],
      answer: "A hidden binary string",
    },
    {
      question: "What kind of function is commonly used?",
      options: [
        "Linear Boolean function",
        "Sorting function",
        "Polynomial function",
        "Random function",
      ],
      answer: "Linear Boolean function",
    },
    {
      question: "Which gate creates superposition?",
      options: ["Hadamard", "SWAP", "Z", "Y"],
      answer: "Hadamard",
    },
    {
      question: "What does the algorithm demonstrate?",
      options: [
        "Quantum query advantage",
        "Classical compression",
        "Image processing",
        "Database indexing",
      ],
      answer: "Quantum query advantage",
    },
    {
      question: "The hidden string is represented using what?",
      options: [
        "Binary bits",
        "Decimal digits",
        "Characters only",
        "Floating point numbers",
      ],
      answer: "Binary bits",
    },
  ],

  "Quantum Teleportation": [
    {
      question: "What does quantum teleportation transfer?",
      options: [
        "A quantum state",
        "A physical object",
        "Classical data only",
        "A photon physically",
      ],
      answer: "A quantum state",
    },
    {
      question: "How many entangled qubits are commonly required?",
      options: ["2", "3", "4", "1"],
      answer: "2",
    },
    {
      question:
        "Which phenomenon is essential for quantum teleportation?",
      options: [
        "Quantum entanglement",
        "Classical sorting",
        "Data compression",
        "Random guessing",
      ],
      answer: "Quantum entanglement",
    },
    {
      question:
        "What type of information is also needed for teleportation?",
      options: [
        "Classical measurement results",
        "A database",
        "A sorting algorithm",
        "A classical CPU",
      ],
      answer: "Classical measurement results",
    },
    {
      question:
        "Does quantum teleportation transport matter from one location to another?",
      options: ["No", "Yes", "Always", "Only photons"],
      answer: "No",
    },
  ],

  "Quantum Fourier Transform": [
    {
      question: "What is QFT the quantum analogue of?",
      options: [
        "Discrete Fourier Transform",
        "Binary Search",
        "Bubble Sort",
        "Hashing",
      ],
      answer: "Discrete Fourier Transform",
    },
    {
      question: "What is an important application of QFT?",
      options: [
        "Quantum phase estimation",
        "Classical sorting",
        "Image compression only",
        "Database storage",
      ],
      answer: "Quantum phase estimation",
    },
    {
      question:
        "Which gates are commonly used to construct QFT?",
      options: [
        "Hadamard and controlled phase gates",
        "Only X gates",
        "Only CNOT gates",
        "Only SWAP gates",
      ],
      answer: "Hadamard and controlled phase gates",
    },
    {
      question: "QFT operates on what?",
      options: [
        "Quantum amplitudes",
        "Classical text",
        "Only integers",
        "Classical images",
      ],
      answer: "Quantum amplitudes",
    },
    {
      question: "QFT is important in which algorithm?",
      options: [
        "Shor's algorithm",
        "Bubble Sort",
        "Binary Search",
        "K-Means",
      ],
      answer: "Shor's algorithm",
    },
  ],

  "Quantum Phase Estimation": [
    {
      question: "What does Quantum Phase Estimation estimate?",
      options: [
        "The phase of an eigenvalue",
        "The number of qubits",
        "The circuit depth only",
        "The database size",
      ],
      answer: "The phase of an eigenvalue",
    },
    {
      question:
        "Which transform is commonly used in phase estimation?",
      options: [
        "Inverse Quantum Fourier Transform",
        "Classical Fourier Transform",
        "Hadamard Transform only",
        "SWAP Transform",
      ],
      answer: "Inverse Quantum Fourier Transform",
    },
    {
      question: "What type of state is commonly used?",
      options: [
        "An eigenstate of a unitary operator",
        "A classical bit",
        "A random image",
        "A database",
      ],
      answer: "An eigenstate of a unitary operator",
    },
    {
      question:
        "Phase estimation is an important subroutine of which algorithm?",
      options: [
        "Shor's algorithm",
        "Bubble Sort",
        "Classical DFS",
        "Binary Search",
      ],
      answer: "Shor's algorithm",
    },
    {
      question:
        "What is measured at the end of phase estimation?",
      options: [
        "An estimate of the phase",
        "A classical image",
        "A sorted list",
        "A database key",
      ],
      answer: "An estimate of the phase",
    },
  ],

  "Shor's Algorithm": [
    {
      question:
        "What major problem is Shor's algorithm designed to solve efficiently?",
      options: [
        "Integer factorization",
        "Unstructured search",
        "Image classification",
        "Sorting",
      ],
      answer: "Integer factorization",
    },
    {
      question:
        "Which quantum technique is central to Shor's algorithm?",
      options: [
        "Quantum Fourier Transform",
        "Quantum teleportation",
        "Grover diffusion",
        "Bell measurement",
      ],
      answer: "Quantum Fourier Transform",
    },
    {
      question:
        "Why is Shor's algorithm important for cryptography?",
      options: [
        "It threatens RSA-style cryptography",
        "It creates passwords",
        "It compresses files",
        "It improves classical sorting",
      ],
      answer: "It threatens RSA-style cryptography",
    },
    {
      question:
        "What mathematical property is found using the quantum part?",
      options: [
        "Periodicity",
        "Sorting order",
        "Image similarity",
        "Graph coloring",
      ],
      answer: "Periodicity",
    },
    {
      question:
        "Shor's algorithm combines quantum and what type of computation?",
      options: [
        "Classical computation",
        "Analog computation only",
        "Mechanical computation",
        "Optical storage",
      ],
      answer: "Classical computation",
    },
  ],

  "Variational Quantum Eigensolver": [
    {
      question: "What does VQE stand for?",
      options: [
        "Variational Quantum Eigensolver",
        "Virtual Quantum Encoder",
        "Variable Quantum Engine",
        "Verified Quantum Emulator",
      ],
      answer: "Variational Quantum Eigensolver",
    },
    {
      question: "What is VQE commonly used to estimate?",
      options: [
        "Ground-state energy",
        "Database size",
        "Image resolution",
        "Sorting complexity",
      ],
      answer: "Ground-state energy",
    },
    {
      question:
        "VQE belongs to which type of quantum algorithms?",
      options: [
        "Variational hybrid algorithms",
        "Purely classical algorithms",
        "Sorting algorithms",
        "Encryption algorithms",
      ],
      answer: "Variational hybrid algorithms",
    },
    {
      question:
        "What does VQE use to optimize parameters?",
      options: [
        "A classical optimizer",
        "A database",
        "A compiler only",
        "A random number generator",
      ],
      answer: "A classical optimizer",
    },
    {
      question: "What type of quantum circuit is used in VQE?",
      options: [
        "Parameterized quantum circuit",
        "Only CNOT circuits",
        "Only measurement circuits",
        "Classical circuit",
      ],
      answer: "Parameterized quantum circuit",
    },
  ],

  QAOA: [
    {
      question: "What does QAOA stand for?",
      options: [
        "Quantum Approximate Optimization Algorithm",
        "Quantum Advanced Output Algorithm",
        "Quantum Array Optimization Architecture",
        "Quantum Automatic Oracle Algorithm",
      ],
      answer: "Quantum Approximate Optimization Algorithm",
    },
    {
      question:
        "What type of problems is QAOA designed for?",
      options: [
        "Combinatorial optimization",
        "Image compression",
        "Text editing",
        "Classical sorting",
      ],
      answer: "Combinatorial optimization",
    },
    {
      question: "QAOA is what type of algorithm?",
      options: [
        "Hybrid quantum-classical",
        "Purely classical",
        "Only analog",
        "Only random",
      ],
      answer: "Hybrid quantum-classical",
    },
    {
      question: "What does the cost Hamiltonian represent?",
      options: [
        "The optimization objective",
        "The screen layout",
        "The compiler",
        "The measurement device",
      ],
      answer: "The optimization objective",
    },
    {
      question: "QAOA uses parameterized quantum circuits.",
      options: ["True", "False", "Only sometimes", "Never"],
      answer: "True",
    },
  ],

  "Quantum Error Correction": [
    {
      question:
        "What is the main goal of quantum error correction?",
      options: [
        "Protect quantum information from errors",
        "Increase screen resolution",
        "Compress data",
        "Speed up classical sorting",
      ],
      answer: "Protect quantum information from errors",
    },
    {
      question:
        "Why are quantum systems vulnerable to errors?",
      options: [
        "Noise and decoherence",
        "Keyboard input",
        "File compression",
        "Classical sorting",
      ],
      answer: "Noise and decoherence",
    },
    {
      question:
        "What type of information does error correction protect?",
      options: [
        "Quantum information",
        "Only text",
        "Only images",
        "Only classical files",
      ],
      answer: "Quantum information",
    },
    {
      question:
        "What can quantum error correction help preserve?",
      options: [
        "Quantum states",
        "Web pages",
        "Classical databases",
        "Computer screens",
      ],
      answer: "Quantum states",
    },
    {
      question:
        "Is quantum error correction important for fault-tolerant quantum computing?",
      options: [
        "Yes",
        "No",
        "Never",
        "Only for classical computers",
      ],
      answer: "Yes",
    },
  ],
};

/* =========================================================
   FIND QUIZ QUESTIONS SAFELY
========================================================= */

function getQuizQuestions(algorithm) {
  if (!algorithm) {
    return QUIZ_DATA["Bell State"];
  }

  const name =
    typeof algorithm === "string"
      ? algorithm
      : algorithm?.title || "Bell State";

  if (QUIZ_DATA[name]) {
    return QUIZ_DATA[name];
  }

  const lowerName = name.toLowerCase();

  if (lowerName.includes("bell")) {
    return QUIZ_DATA["Bell State"];
  }

  if (lowerName.includes("grover")) {
    return QUIZ_DATA["Grover"];
  }

  if (
    lowerName.includes("deutsch-jozsa") ||
    lowerName.includes("deutsch jozsa")
  ) {
    return QUIZ_DATA["Deutsch-Jozsa"];
  }

  if (
    lowerName === "deutsch" ||
    lowerName.includes("deutsch's")
  ) {
    return QUIZ_DATA["Deutsch"];
  }

  if (
    lowerName.includes("bernstein") ||
    lowerName.includes("vazirani")
  ) {
    return QUIZ_DATA["Bernstein-Vazirani"];
  }

  if (lowerName.includes("teleport")) {
    return QUIZ_DATA["Quantum Teleportation"];
  }

  if (
    lowerName.includes("fourier") ||
    lowerName.includes("qft")
  ) {
    return QUIZ_DATA["Quantum Fourier Transform"];
  }

  if (lowerName.includes("phase estimation")) {
    return QUIZ_DATA["Quantum Phase Estimation"];
  }

  if (lowerName.includes("shor")) {
    return QUIZ_DATA["Shor's Algorithm"];
  }

  if (
    lowerName.includes("vqe") ||
    lowerName.includes("variational quantum")
  ) {
    return QUIZ_DATA["Variational Quantum Eigensolver"];
  }

  if (lowerName.includes("qaoa")) {
    return QUIZ_DATA["QAOA"];
  }

  if (
    lowerName.includes("error") ||
    lowerName.includes("correction")
  ) {
    return QUIZ_DATA["Quantum Error Correction"];
  }

  return QUIZ_DATA["Bell State"];
}

/* =========================================================
   UPDATE LEARNING STREAK
========================================================= */

function updateLearningStreak() {
  const today = new Date().toISOString().split("T")[0];

  const streakData = JSON.parse(
    localStorage.getItem("quantumStreak") || "{}"
  );

  if (!streakData.lastDate) {
    streakData.lastDate = today;
    streakData.streak = 1;
  } else if (streakData.lastDate !== today) {
    const last = new Date(streakData.lastDate);
    const current = new Date(today);

    const difference = Math.floor(
      (current - last) / (1000 * 60 * 60 * 24)
    );

    if (difference === 1) {
      streakData.streak = (streakData.streak || 0) + 1;
    } else if (difference > 1) {
      streakData.streak = 1;
    }

    streakData.lastDate = today;
  }

  localStorage.setItem(
    "quantumStreak",
    JSON.stringify(streakData)
  );
}

/* =========================================================
   SAVE QUIZ RESULT
========================================================= */

function saveQuizResult(
  algorithmName,
  questions,
  finalScore,
  finalAnswers
) {
  const percentage = Math.round(
    (finalScore / questions.length) * 100
  );

  /* -----------------------------------------
     Save complete quiz result
  ----------------------------------------- */

  const existingResults = JSON.parse(
    localStorage.getItem("quantumQuizResults") || "{}"
  );

  existingResults[algorithmName] = {
    score: finalScore,
    total: questions.length,
    percentage,
    completedAt: new Date().toISOString(),
    answers: finalAnswers,
  };

  localStorage.setItem(
    "quantumQuizResults",
    JSON.stringify(existingResults)
  );

  /* -----------------------------------------
     Save algorithm completion
  ----------------------------------------- */

  const progress = JSON.parse(
    localStorage.getItem("quantumProgress") || "{}"
  );

  if (percentage >= 70) {
    progress[algorithmName] = true;
  }

  localStorage.setItem(
    "quantumProgress",
    JSON.stringify(progress)
  );

  /* -----------------------------------------
     Save XP
  ----------------------------------------- */

  const xpData = JSON.parse(
    localStorage.getItem("quantumXP") || "{}"
  );

  const previousXP = xpData[algorithmName] || 0;

  if (percentage >= 70 && previousXP === 0) {
    xpData[algorithmName] = 100;
  }

  localStorage.setItem(
    "quantumXP",
    JSON.stringify(xpData)
  );

  /* -----------------------------------------
     Save activity
  ----------------------------------------- */

  const activities = JSON.parse(
    localStorage.getItem("quantumActivities") || "{}"
  );

  activities[algorithmName] = {
    quiz: true,
    quizScore: finalScore,
    quizPercentage: percentage,
    completed: percentage >= 70,
    lastActivity: new Date().toISOString(),
  };

  localStorage.setItem(
    "quantumActivities",
    JSON.stringify(activities)
  );

  /* -----------------------------------------
     Update streak
  ----------------------------------------- */

  updateLearningStreak();

  return percentage;
}

/* =========================================================
   QUIZ COMPONENT
========================================================= */

function Quiz({
  algorithm = "Bell State",
  onComplete,
}) {
  const algorithmName =
    typeof algorithm === "string"
      ? algorithm
      : algorithm?.title || "Bell State";

  const questions = useMemo(
    () => getQuizQuestions(algorithmName),
    [algorithmName]
  );

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [selectedAnswer, setSelectedAnswer] =
    useState("");

  const [score, setScore] = useState(0);

  const [finished, setFinished] = useState(false);

  const [answers, setAnswers] = useState([]);

  const question = questions[currentQuestion];

  /* =====================================================
     HANDLE ANSWER
  ===================================================== */

  const handleAnswer = (option) => {
    // Prevent selecting another option
    if (selectedAnswer) return;

    const correct = option === question.answer;

    setSelectedAnswer(option);

    // Increase score ONLY ONCE
    if (correct) {
      setScore((previous) => previous + 1);
    }

    // Save answer ONLY ONCE
    setAnswers((previous) => [
      ...previous,
      {
        question: question.question,
        selected: option,
        correct: question.answer,
        isCorrect: correct,
      },
    ]);
  };

  /* =====================================================
     NEXT QUESTION
  ===================================================== */

  const nextQuestion = () => {
    // User must select an answer
    if (!selectedAnswer) return;

    const isLastQuestion =
      currentQuestion === questions.length - 1;

    /* -----------------------------------------
       LAST QUESTION
       
       IMPORTANT:
       Do NOT add another point here.
       handleAnswer() already updated score.
       
       The old code was causing:
       5/5 -> 6/5
       ----------------------------------------- */

    if (isLastQuestion) {
      const finalScore = score;

      const finalAnswers = answers;

      setFinished(true);

      const percentage = saveQuizResult(
        algorithmName,
        questions,
        finalScore,
        finalAnswers
      );

      if (onComplete) {
        onComplete({
          score: finalScore,
          total: questions.length,
          percentage,
          algorithm: algorithmName,
          answers: finalAnswers,
          completed: percentage >= 70,
        });
      }

      return;
    }

    /* -----------------------------------------
       Move to next question
    ----------------------------------------- */

    setCurrentQuestion(
      (previous) => previous + 1
    );

    setSelectedAnswer("");
  };

  /* =====================================================
     RESTART QUIZ
  ===================================================== */

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setFinished(false);
    setAnswers([]);
  };

  /* =====================================================
     NO QUESTIONS
  ===================================================== */

  if (!question) {
    return (
      <section className="quiz-card">
        <div className="quiz-result">
          <div className="quiz-result-icon">
            ⚠️
          </div>

          <h2>Quiz unavailable</h2>

          <p>
            No questions are available for this module.
          </p>
        </div>
      </section>
    );
  }

  /* =====================================================
     RESULT SCREEN
  ===================================================== */

  if (finished) {
    const percentage = Math.round(
      (score / questions.length) * 100
    );

    const passed = percentage >= 70;

    return (
      <section className="quiz-card">
        <div className="quiz-result">

          <div className="quiz-result-icon">
            {passed ? "🎉" : "📚"}
          </div>

          <span className="eyebrow">
            QUIZ COMPLETE
          </span>

          <h2>
            {algorithmName} Quiz
          </h2>

          <div className="quiz-score">
            <strong>{score}</strong>

            <span>
              / {questions.length}
            </span>
          </div>

          <p>
            You scored{" "}
            <strong>{percentage}%</strong>.
          </p>

          {passed ? (
            <div className="quiz-feedback correct-feedback">
              🎉 Excellent! Algorithm completed.
              <br />
              ⭐ 100 XP added to your Dashboard.
            </div>
          ) : (
            <div className="quiz-feedback wrong-feedback">
              📚 You need at least 70% to complete
              this algorithm.
            </div>
          )}

          <div className="quiz-result-actions">
            <button
              className="primary-button"
              onClick={restartQuiz}
            >
              Try Again
            </button>
          </div>

        </div>
      </section>
    );
  }

  /* =====================================================
     QUIZ SCREEN
  ===================================================== */

  return (
    <section className="quiz-card">

      {/* Header */}

      <div className="quiz-header">

        <div>
          <span className="eyebrow">
            KNOWLEDGE CHECK
          </span>

          <h2>
            {algorithmName} Quiz
          </h2>

          <p>
            Test what you have learned.
          </p>
        </div>

        <div className="quiz-progress">
          {currentQuestion + 1} / {questions.length}
        </div>

      </div>

      {/* Progress Bar */}

      <div className="quiz-progress-bar">
        <div
          style={{
            width: `${
              ((currentQuestion + 1) /
                questions.length) *
              100
            }%`,
          }}
        />
      </div>

      {/* Question */}

      <div className="quiz-question">

        <span>
          Question {currentQuestion + 1}
        </span>

        <h3>
          {question.question}
        </h3>

      </div>

      {/* Options */}

      <div className="quiz-options">

        {question.options.map(
          (option, index) => {

            const isSelected =
              selectedAnswer === option;

            const isCorrect =
              selectedAnswer &&
              option === question.answer;

            const isWrongSelected =
              isSelected &&
              option !== question.answer;

            return (
              <button
                key={option}
                className={`quiz-option ${
                  isSelected
                    ? "selected"
                    : ""
                } ${
                  isCorrect
                    ? "correct"
                    : ""
                } ${
                  isWrongSelected
                    ? "wrong"
                    : ""
                }`}
                onClick={() =>
                  handleAnswer(option)
                }
                disabled={Boolean(
                  selectedAnswer
                )}
              >

                <span className="option-letter">
                  {String.fromCharCode(
                    65 + index
                  )}
                </span>

                <span>
                  {option}
                </span>

              </button>
            );
          }
        )}

      </div>

      {/* Answer Feedback */}

      {selectedAnswer && (
        <div
          className={`quiz-feedback ${
            selectedAnswer === question.answer
              ? "correct-feedback"
              : "wrong-feedback"
          }`}
        >
          {selectedAnswer === question.answer
            ? "✅ Correct! Good job."
            : `❌ Not quite. The correct answer is "${question.answer}".`}
        </div>
      )}

      {/* Footer */}

      <div className="quiz-footer">

        <span>
          Score:{" "}
          <strong>{score}</strong>
        </span>

        <button
          className="primary-button"
          disabled={!selectedAnswer}
          onClick={nextQuestion}
        >
          {currentQuestion ===
          questions.length - 1
            ? "Finish Quiz"
            : "Next Question →"}
        </button>

      </div>

    </section>
  );
}

export default Quiz;