import React, { useEffect, useMemo, useState } from "react";
import "./AITeacher.css";

const LESSONS = {
  "Bell State": [
    {
      concept: "Initialize the qubits",
      explanation:
        "We begin with two qubits in the |00⟩ state. Both qubits start in a definite computational basis state.",
      teacher:
        "Let's start with two qubits. At the beginning, both are in the zero state, written as |00⟩.",
      visual: "initialize",
    },
    {
      concept: "Apply the Hadamard gate",
      explanation:
        "Apply a Hadamard gate to the first qubit. This creates a superposition where the qubit can behave like both 0 and 1.",
      teacher:
        "Now I apply a Hadamard gate. This puts the first qubit into superposition.",
      visual: "hadamard",
    },
    {
      concept: "Apply the CNOT gate",
      explanation:
        "The CNOT gate uses the first qubit as the control and the second qubit as the target. This creates entanglement between the two qubits.",
      teacher:
        "Next comes CNOT. The second qubit changes depending on the first qubit, creating quantum entanglement.",
      visual: "cnot",
    },
    {
      concept: "Measure the Bell state",
      explanation:
        "When measured, the Bell state produces correlated results. The most common outcomes are |00⟩ and |11⟩.",
      teacher:
        "Finally, we measure both qubits. We should see correlated results such as 00 or 11.",
      visual: "measure",
    },
  ],

  "Deutsch's Algorithm": [
    {
      concept: "Prepare the input qubits",
      explanation:
        "Deutsch's algorithm begins with two qubits. The input qubit starts in |0⟩ and the auxiliary qubit starts in |1⟩.",
      teacher:
        "We begin with two qubits. The first stores the input, while the second is prepared as an auxiliary qubit.",
      visual: "initialize",
    },
    {
      concept: "Create superposition",
      explanation:
        "Hadamard gates are applied to create superposition. This allows the algorithm to investigate the function using a quantum state.",
      teacher:
        "Hadamard gates create superposition so that the algorithm can evaluate the function quantum mechanically.",
      visual: "hadamard",
    },
    {
      concept: "Apply the oracle",
      explanation:
        "The oracle represents the unknown function. The quantum circuit interacts with it without directly revealing the function's complete behavior.",
      teacher:
        "Now the oracle acts on the qubits. This is where information about the unknown function is encoded.",
      visual: "oracle",
    },
    {
      concept: "Measure the result",
      explanation:
        "After the final Hadamard operation, measuring the input qubit determines whether the function is constant or balanced.",
      teacher:
        "The final measurement tells us whether the function is constant or balanced.",
      visual: "measure",
    },
  ],

  "Grover's Algorithm": [
    {
      concept: "Initialize the search space",
      explanation:
        "Grover's algorithm begins with qubits initialized in the |0⟩ state. The goal is to search for a marked item in an unsorted space.",
      teacher:
        "Let's prepare our quantum search space. Every possible state will initially have an equal opportunity.",
      visual: "initialize",
    },
    {
      concept: "Create superposition",
      explanation:
        "Hadamard gates create an equal superposition of the possible states. For two qubits, the states are |00⟩, |01⟩, |10⟩, and |11⟩.",
      teacher:
        "Hadamard gates spread the quantum state across all possible search candidates.",
      visual: "hadamard",
    },
    {
      concept: "Apply the oracle",
      explanation:
        "The oracle identifies the marked state by changing its phase. For our example, the marked state is |11⟩.",
      teacher:
        "The oracle knows which state we are searching for. Here, we mark |11⟩ by changing its phase.",
      visual: "oracle",
    },
    {
      concept: "Apply the diffusion operator",
      explanation:
        "The diffusion operator amplifies the probability of the marked state while reducing the probability of the other states.",
      teacher:
        "Now the diffusion step amplifies the marked state. This makes the correct answer much more likely to appear during measurement.",
      visual: "diffusion",
    },
    {
      concept: "Measure the result",
      explanation:
        "After amplification, measuring the qubits gives the marked state with high probability.",
      teacher:
        "Let's measure the qubits. The marked state should now have the highest probability.",
      visual: "measure",
    },
  ],

  "Quantum Teleportation": [
    {
      concept: "Prepare the quantum states",
      explanation:
        "Quantum teleportation uses three qubits. One qubit contains the unknown state that we want to teleport, while two qubits form an entangled pair.",
      teacher:
        "We need three qubits. One contains the unknown quantum state and two will form an entangled pair.",
      visual: "initialize",
    },
    {
      concept: "Create entanglement",
      explanation:
        "A Hadamard gate followed by a CNOT gate creates an entangled Bell pair between two of the qubits.",
      teacher:
        "We now create an entangled pair using Hadamard and CNOT operations.",
      visual: "cnot",
    },
    {
      concept: "Perform the Bell measurement",
      explanation:
        "The sender performs operations involving the unknown qubit and one member of the entangled pair, followed by measurements.",
      teacher:
        "The sender now combines the unknown state with the entangled qubit and performs measurements.",
      visual: "measure",
    },
    {
      concept: "Apply corrections",
      explanation:
        "The measurement results determine which X and Z corrections must be applied to the receiver's qubit.",
      teacher:
        "The receiver uses the classical measurement results to decide which corrections are needed.",
      visual: "correction",
    },
    {
      concept: "Recover the quantum state",
      explanation:
        "After the appropriate corrections, the receiver's qubit contains the original quantum state.",
      teacher:
        "After the corrections, the original quantum state has been reconstructed on the receiver's qubit.",
      visual: "teleport",
    },
  ],
};

const GENERIC_LESSON = [
  {
    concept: "Initialize the qubits",
    explanation:
      "Quantum algorithms begin by preparing qubits in a known initial state.",
    teacher:
      "Let's begin by preparing the qubits in their initial state.",
    visual: "initialize",
  },
  {
    concept: "Apply quantum operations",
    explanation:
      "Quantum gates transform the state of the qubits according to the algorithm.",
    teacher:
      "Now we apply the quantum operations needed by this algorithm.",
    visual: "hadamard",
  },
  {
    concept: "Execute the algorithm",
    explanation:
      "The complete circuit is executed to transform the quantum state.",
    teacher:
      "The complete circuit is now ready to execute.",
    visual: "generic",
  },
  {
    concept: "Measure the result",
    explanation:
      "Measurement converts the quantum state into classical information that we can observe.",
    teacher:
      "Finally, we measure the qubits and observe the result.",
    visual: "measure",
  },
];

function AITeacher({
  algorithm,
  onComplete,
  onStepChange,
  onPredict,
  onTryCircuit,
  prediction,
}) {
  const algorithmName =
    typeof algorithm === "string"
      ? algorithm
      : algorithm?.title || "Quantum Computing";

  const lessons = useMemo(() => {
    return LESSONS[algorithmName] || GENERIC_LESSON;
  }, [algorithmName]);

  const [currentStep, setCurrentStep] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const lesson = lessons[currentStep];

  const predictionFeedback = useMemo(() => {
    if (!prediction) {
      return null;
    }

    if (prediction.correct) {
      return {
        type: "success",
        title: "Excellent prediction!",
        message:
          "Your prediction was correct. You understood the expected output of this step. Now continue to the next part of the algorithm.",
      };
    }

    return {
      type: "try-again",
      title: "Not quite!",
      message:
        "Your prediction was different from the expected output. Review the current step carefully and think about how the quantum gates affect the qubits before trying again.",
    };
  }, [prediction]);

  useEffect(() => {
    setCurrentStep(0);
    setIsSpeaking(false);

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, [algorithmName]);

  useEffect(() => {
    if (!lesson || !onStepChange) {
      return;
    }

    onStepChange({
      algorithm: algorithmName,
      step: currentStep + 1,
      totalSteps: lessons.length,
      concept: lesson.concept || "",
      lesson: lesson.explanation || "",
      teacher_message: lesson.teacher || "",
    });
  }, [
    currentStep,
    algorithmName,
    lesson,
    lessons.length,
    onStepChange,
  ]);

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speakLesson = () => {
    if (!("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();

    const text = `${lesson.teacher} ${lesson.explanation}`;

    const speech = new SpeechSynthesisUtterance(text);

    speech.rate = 0.92;
    speech.pitch = 1.05;
    speech.volume = 1;

    speech.onstart = () => {
      setIsSpeaking(true);
    };

    speech.onend = () => {
      setIsSpeaking(false);
    };

    speech.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(speech);
  };

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    setIsSpeaking(false);
  };

  const handleNext = () => {
    stopSpeaking();

    if (currentStep < lessons.length - 1) {
      setCurrentStep((previous) => previous + 1);
    } else if (onComplete) {
      onComplete({
        algorithm: algorithmName,
        totalSteps: lessons.length,
      });
    }
  };

  const handlePrevious = () => {
    stopSpeaking();

    if (currentStep > 0) {
      setCurrentStep((previous) => previous - 1);
    }
  };

  const handlePredict = () => {
    if (onPredict) {
      onPredict({
        algorithm: algorithmName,
        step: currentStep + 1,
        totalSteps: lessons.length,
        concept: lesson.concept || "",
        lesson: lesson.explanation || "",
        teacher_message: lesson.teacher || "",
      });
    }
  };

  const handleTryCircuit = () => {
    if (onTryCircuit) {
      onTryCircuit({
        algorithm: algorithmName,
        step: currentStep + 1,
        totalSteps: lessons.length,
        concept: lesson.concept || "",
        lesson: lesson.explanation || "",
        teacher_message: lesson.teacher || "",
      });
    }
  };

  const renderVisual = () => {
    switch (lesson.visual) {
      case "initialize":
        return (
          <div className="teacher-visual initialize-visual">
            <div className="visual-title">Initial Quantum State</div>

            <div className="qubit-row">
              <span className="qubit-label">q₀</span>
              <span className="state-box">|0⟩</span>
            </div>

            <div className="qubit-row">
              <span className="qubit-label">q₁</span>
              <span className="state-box">|0⟩</span>
            </div>
          </div>
        );

      case "hadamard":
        return (
          <div className="teacher-visual">
            <div className="visual-title">Superposition</div>

            <div className="animated-circuit">
              <span>|0⟩</span>
              <span className="wire">──</span>
              <span className="animated-gate">H</span>
              <span className="wire">──→</span>
              <span>|+⟩</span>
            </div>

            <div className="superposition-particles">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        );

      case "cnot":
        return (
          <div className="teacher-visual cnot-visual">
            <div className="visual-title">CNOT Entanglement</div>

            <div className="cnot-row">
              <span>|0⟩</span>
              <span className="control-dot animated-dot">●</span>
              <span className="vertical-wire" />
            </div>

            <div className="cnot-row">
              <span>|0⟩</span>
              <span className="target-gate animated-target">⊕</span>
            </div>
          </div>
        );

      case "oracle":
        return (
          <div className="teacher-visual oracle-visual">
            <div className="visual-title">Quantum Oracle</div>

            <div className="oracle-box animated-oracle">
              <span>ORACLE</span>
              <strong>|11⟩</strong>
              <small>Marked state</small>
            </div>
          </div>
        );

      case "diffusion":
        return (
          <div className="teacher-visual diffusion-visual">
            <div className="visual-title">Probability Amplification</div>

            <div className="probability-bars">
              <div className="probability-bar">
                <span>|00⟩</span>
                <i style={{ width: "25%" }} />
              </div>

              <div className="probability-bar">
                <span>|01⟩</span>
                <i style={{ width: "25%" }} />
              </div>

              <div className="probability-bar">
                <span>|10⟩</span>
                <i style={{ width: "25%" }} />
              </div>

              <div className="probability-bar highlighted">
                <span>|11⟩</span>
                <i className="growing-bar" style={{ width: "90%" }} />
              </div>
            </div>
          </div>
        );

      case "measure":
        return (
          <div className="teacher-visual measurement-visual">
            <div className="visual-title">Measurement</div>

            <div className="measurement-animation">
              <span>Quantum State</span>
              <strong>→</strong>
              <span className="measurement-pulse">
                Classical Result
              </span>
            </div>

            <div className="measurement-particles">
              <span />
              <span />
              <span />
            </div>
          </div>
        );

      case "correction":
        return (
          <div className="teacher-visual correction-visual">
            <div className="visual-title">Quantum Correction</div>

            <div className="correction-item">
              <span>Measurement</span>
              <strong>→</strong>
              <span className="correction-gate">X / Z</span>
            </div>
          </div>
        );

      case "teleport":
        return (
          <div className="teacher-visual teleport-visual">
            <div className="visual-title">Quantum Teleportation</div>

            <div className="teleport-flow">
              <span className="teleport-node">Unknown State</span>

              <div className="teleport-arrow">
                <span>✦</span>
                <span>→</span>
              </div>

              <span className="teleport-node">Receiver</span>
            </div>
          </div>
        );

      default:
        return (
          <div className="teacher-visual">
            <div className="visual-title">Quantum Process</div>

            <div className="generic-visual">
              <span>q₀</span>
              <span>→</span>
              <span>Quantum Gate</span>
              <span>→</span>
              <span>Measure</span>
            </div>
          </div>
        );
    }
  };

  const progress =
    lessons.length > 0
      ? ((currentStep + 1) / lessons.length) * 100
      : 0;

  return (
    <section className="ai-teacher-section">
      <div className="teacher-header">
        <div className={`teacher-avatar ${isSpeaking ? "speaking" : ""}`}>
          <div className="avatar-glow" />

          <div className="avatar-head">
            <div className="avatar-hair">
              <span />
              <span />
              <span />
            </div>

            <div className="avatar-face">
              <div className="avatar-eyes">
                <span />
                <span />
              </div>

              <div
                className={`avatar-mouth ${
                  isSpeaking ? "talking" : ""
                }`}
              />

              <div className="avatar-neck" />
            </div>
          </div>

          <div className="avatar-body">
            <div className="avatar-collar" />
            <div className="avatar-badge">Q</div>
          </div>

          {isSpeaking && (
            <div className="speaking-waves">
              <span />
              <span />
              <span />
            </div>
          )}
        </div>

        <div className="teacher-heading">
          <span className="teacher-badge">
            <span className="live-dot" />
            AI TEACHER
          </span>

          <h2>Learn {algorithmName}</h2>

          <p>
            Your interactive quantum teacher will guide you
            step by step.
          </p>

          {isSpeaking && (
            <div className="speaking-status">
              <span className="sound-bars">
                <i />
                <i />
                <i />
                <i />
              </span>

              Teacher is explaining...
            </div>
          )}
        </div>
      </div>

      <div className="teacher-progress-area">
        <div className="teacher-progress-info">
          <span>
            Step {currentStep + 1} of {lessons.length}
          </span>

          <span>{Math.round(progress)}%</span>
        </div>

        <div className="teacher-progress-track">
          <div
            className="teacher-progress-fill"
            style={{ width: `${progress}%` }}
          />

          <div className="progress-dots">
            {lessons.map((_, index) => (
              <span
                key={index}
                className={
                  index <= currentStep ? "active" : ""
                }
              />
            ))}
          </div>
        </div>
      </div>

      <div className="teacher-content">
        <div className="teacher-visual-panel">
          <div className="visual-floating-label">
            LIVE EXPLANATION
          </div>

          {renderVisual()}
        </div>

        <div className="teacher-explanation-panel">
          <span className="step-label">
            STEP {currentStep + 1}
          </span>

          <h3>{lesson.concept}</h3>

          <div className="teacher-message">
            <div className="message-icon">
              <span>AI</span>
            </div>

            <div className="message-content">
              <div className="message-header">
                <strong>Quantum Teacher</strong>

                {isSpeaking && (
                  <span className="speaking-mini">
                    ● Speaking
                  </span>
                )}
              </div>

              <p>{lesson.teacher}</p>
            </div>
          </div>

          <div className="lesson-explanation">
            <h4>
              <span>✦</span>
              Understand this step
            </h4>

            <p>{lesson.explanation}</p>
          </div>

          <div className="teacher-context-preview">
            <span>Current learning focus</span>
            <strong>{lesson.concept}</strong>
          </div>

          {predictionFeedback && (
            <div
              className={`prediction-feedback ${predictionFeedback.type}`}
            >
              <div className="prediction-feedback-icon">
                {predictionFeedback.type === "success"
                  ? "✓"
                  : "💭"}
              </div>

              <div>
                <h3>{predictionFeedback.title}</h3>
                <p>{predictionFeedback.message}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="teacher-controls">
        <button
          type="button"
          className="teacher-secondary-btn"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          ← Previous
        </button>

        {!isSpeaking ? (
          <button
            type="button"
            className="teacher-listen-btn"
            onClick={speakLesson}
          >
            🔊 Listen
          </button>
        ) : (
          <button
            type="button"
            className="teacher-listen-btn speaking"
            onClick={stopSpeaking}
          >
            ⏹ Stop
          </button>
        )}

        <button
          type="button"
          className="teacher-predict-btn"
          onClick={handlePredict}
        >
          🧠 Predict Output
        </button>

        <button
          type="button"
          className="teacher-circuit-btn"
          onClick={handleTryCircuit}
        >
          ⚛️ Try This Step
        </button>

        <button
          type="button"
          className="teacher-primary-btn"
          onClick={handleNext}
        >
          {currentStep === lessons.length - 1
            ? "Finish Lesson ✓"
            : "Next Step →"}
        </button>
      </div>

      <div className="teacher-tutor-hint">
        <div className="tutor-hint-icon">AI</div>

        <div>
          <strong>Need a deeper explanation?</strong>

          <p>
            Ask the AI Tutor about{" "}
            <b>{lesson.concept}</b> after this step.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AITeacher;