import React, { useState } from "react";

import Understanding from "../components/Understanding";
import MeasurementSimulator from "../components/MeasurementSimulator";
import AITutor from "../components/AITutor";
import PredictOutput from "../components/PredictOutput";
import CircuitBuilder from "../components/CircuitBuilder";
import BlochSphere from "../components/BlochSphere";
import AITeacher from "../components/AITeacher";

import "./AlgorithmDetail.css";

function AlgorithmDetail({ algorithm, onStartModule, onBack }) {
  const [learningStage, setLearningStage] = useState("intro");

  const [showTutor, setShowTutor] = useState(false);
  const [showMeasurement, setShowMeasurement] = useState(false);
  const [showBlochSphere, setShowBlochSphere] = useState(false);

  const [teacherContext, setTeacherContext] = useState({
    step: 1,
    totalSteps: 0,
    concept: "",
    lesson: "",
    teacher_message: "",
    prediction: null,
  });

  const [measurementResult, setMeasurementResult] = useState(null);

  /*
   * --------------------------------------------------
   * SAFETY CHECK
   * --------------------------------------------------
   */

  if (!algorithm) {
    return (
      <div className="algorithm-detail-page">
        <div className="algorithm-detail-card">
          <h2>Algorithm not found</h2>

          <button
            type="button"
            className="back-button"
            onClick={onBack}
          >
            ← Back to Algorithms
          </button>
        </div>
      </div>
    );
  }

  /*
   * --------------------------------------------------
   * START INTERACTIVE MODULE
   * --------------------------------------------------
   */

  const handleStartModule = () => {
    setLearningStage("teacher");

    setShowTutor(false);
    setShowMeasurement(false);
    setShowBlochSphere(false);

    setMeasurementResult(null);

    setTeacherContext({
      step: 1,
      totalSteps: 0,
      concept: "",
      lesson: "",
      teacher_message: "",
      prediction: null,
    });

    if (onStartModule) {
      onStartModule();
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*
   * --------------------------------------------------
   * AI TEACHER STEP CHANGE
   * --------------------------------------------------
   */

  const handleTeacherStep = (data) => {
    if (!data) {
      return;
    }

    setTeacherContext((previous) => ({
      ...previous,

      step:
        data.step !== undefined
          ? data.step
          : previous.step,

      totalSteps:
        data.totalSteps !== undefined
          ? data.totalSteps
          : previous.totalSteps,

      concept:
        data.concept !== undefined
          ? data.concept
          : previous.concept,

      lesson:
        data.lesson !== undefined
          ? data.lesson
          : previous.lesson,

      teacher_message:
        data.teacher_message !== undefined
          ? data.teacher_message
          : previous.teacher_message,
    }));
  };

  /*
   * --------------------------------------------------
   * AI TEACHER → PREDICT OUTPUT
   * --------------------------------------------------
   */

  const handleTeacherPredict = (data) => {
    if (data) {
      setTeacherContext((previous) => ({
        ...previous,

        step:
          data.step !== undefined
            ? data.step
            : previous.step,

        totalSteps:
          data.totalSteps !== undefined
            ? data.totalSteps
            : previous.totalSteps,

        concept:
          data.concept !== undefined
            ? data.concept
            : previous.concept,

        lesson:
          data.lesson !== undefined
            ? data.lesson
            : previous.lesson,

        teacher_message:
          data.teacher_message !== undefined
            ? data.teacher_message
            : previous.teacher_message,
      }));
    }

    setLearningStage("predict");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*
   * --------------------------------------------------
   * AI TEACHER → CIRCUIT
   * --------------------------------------------------
   */

  const handleTeacherTryCircuit = (data) => {
    if (!data) {
      return;
    }

    setTeacherContext((previous) => ({
      ...previous,

      step:
        data.step !== undefined
          ? data.step
          : previous.step,

      totalSteps:
        data.totalSteps !== undefined
          ? data.totalSteps
          : previous.totalSteps,

      concept:
        data.concept !== undefined
          ? data.concept
          : previous.concept,

      lesson:
        data.lesson !== undefined
          ? data.lesson
          : previous.lesson,

      teacher_message:
        data.teacher_message !== undefined
          ? data.teacher_message
          : previous.teacher_message,
    }));
  };

  /*
   * --------------------------------------------------
   * AI TEACHER COMPLETE
   * --------------------------------------------------
   */

  const handleTeacherComplete = (result) => {
    if (result) {
      setTeacherContext((previous) => ({
        ...previous,

        totalSteps:
          result.totalSteps !== undefined
            ? result.totalSteps
            : previous.totalSteps,
      }));
    }

    setLearningStage("predict");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*
   * --------------------------------------------------
   * PREDICT OUTPUT
   * --------------------------------------------------
   */

  const handlePrediction = (data) => {
    setTeacherContext((previous) => ({
      ...previous,
      prediction: data || null,
    }));
  };

  /*
   * --------------------------------------------------
   * PREDICTION COMPLETE
   * --------------------------------------------------
   */

  const handlePredictionComplete = () => {
    setLearningStage("circuit");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*
   * --------------------------------------------------
   * CIRCUIT COMPLETE
   * --------------------------------------------------
   */

  const handleCircuitComplete = () => {
    setLearningStage("execute");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*
   * --------------------------------------------------
   * MEASUREMENT COMPLETE
   * --------------------------------------------------
   */

  const handleMeasurementComplete = (result) => {
    setMeasurementResult(result || null);

    setLearningStage("understand");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*
   * --------------------------------------------------
   * UNDERSTANDING COMPLETE
   * --------------------------------------------------
   */

  const handleUnderstandingComplete = () => {
    setLearningStage("complete");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*
   * --------------------------------------------------
   * POST-LEARNING TOOLS
   * --------------------------------------------------
   */

  const handleTutorClick = () => {
    setShowTutor((previous) => !previous);

    setShowMeasurement(false);
    setShowBlochSphere(false);
  };

  const handleMeasurementClick = () => {
    setShowMeasurement((previous) => !previous);

    setShowTutor(false);
    setShowBlochSphere(false);
  };

  const handleBlochSphereClick = () => {
    setShowBlochSphere((previous) => !previous);

    setShowTutor(false);
    setShowMeasurement(false);
  };

  /*
   * --------------------------------------------------
   * LEARNING PROGRESS
   * --------------------------------------------------
   */

  const stageProgress = {
    intro: 0,
    teacher: 20,
    predict: 40,
    circuit: 60,
    execute: 75,
    understand: 90,
    complete: 100,
  };

  const progress = stageProgress[learningStage] || 0;

  const stageLabels = {
    teacher: "AI Teacher",
    predict: "Predict Output",
    circuit: "Build Circuit",
    execute: "Execute",
    understand: "Understanding",
    complete: "Complete",
  };

  /*
   * --------------------------------------------------
   * MAIN UI
   * --------------------------------------------------
   */

  return (
    <div className="algorithm-detail-page">

      {/* BACK BUTTON */}

      <button
        type="button"
        className="back-button"
        onClick={onBack}
      >
        ← Back to Algorithms
      </button>

      {/* ==================================================
          INTRODUCTION
      ================================================== */}

      <div className="algorithm-detail-card">

        <div className="algorithm-detail-icon">
          {algorithm.icon || "⚛️"}
        </div>

        <span className="level">
          {algorithm.level || "Beginner"}
        </span>

        <h1>{algorithm.title}</h1>

        <p className="algorithm-description">
          {algorithm.description}
        </p>

        {/* KEY CONCEPTS */}

        {algorithm.concepts &&
          algorithm.concepts.length > 0 && (
            <div className="concept-section">

              <h2>Key Concepts</h2>

              <div className="concepts">
                {algorithm.concepts.map(
                  (concept, index) => (
                    <span
                      className="concept"
                      key={`${concept}-${index}`}
                    >
                      {concept}
                    </span>
                  )
                )}
              </div>

            </div>
          )}

        {/* WHAT YOU WILL LEARN */}

        {algorithm.explanation && (
          <div className="explanation-section">

            <h2>What You Will Learn</h2>

            <p>
              {algorithm.explanation}
            </p>

          </div>
        )}

        {/* START MODULE */}

        {learningStage === "intro" && (
          <div className="module-start-section">

            <h2>Ready to learn?</h2>

            <p>
              Your interactive lesson will guide
              you through the algorithm step by
              step.
            </p>

            <div className="learning-sequence-preview">

              <span>01 Learn</span>

              <b>→</b>

              <span>02 Predict</span>

              <b>→</b>

              <span>03 Build</span>

              <b>→</b>

              <span>04 Execute</span>

              <b>→</b>

              <span>05 Understand</span>

            </div>

            <button
              type="button"
              className="start-module-btn"
              onClick={handleStartModule}
            >
              Start Interactive Lesson →
            </button>

          </div>
        )}

      </div>

      {/* ==================================================
          LEARNING PROGRESS
      ================================================== */}

      {learningStage !== "intro" && (
        <div className="learning-progress-container">

          <div className="learning-progress-header">

            <div>
              <span>
                LEARNING MODULE
              </span>

              <strong>
                {algorithm.title}
              </strong>
            </div>

            <strong>
              {stageLabels[learningStage]}
            </strong>

          </div>

          <div className="learning-progress-bar">

            <div
              className="learning-progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          <div className="learning-progress-steps">

            <span
              className={
                progress >= 20
                  ? "completed"
                  : ""
              }
            >
              01 Learn
            </span>

            <span
              className={
                progress >= 40
                  ? "completed"
                  : ""
              }
            >
              02 Predict
            </span>

            <span
              className={
                progress >= 60
                  ? "completed"
                  : ""
              }
            >
              03 Build
            </span>

            <span
              className={
                progress >= 75
                  ? "completed"
                  : ""
              }
            >
              04 Execute
            </span>

            <span
              className={
                progress >= 90
                  ? "completed"
                  : ""
              }
            >
              05 Understand
            </span>

          </div>

        </div>
      )}

      {/* ==================================================
          STEP 1 — AI TEACHER
      ================================================== */}

      {learningStage === "teacher" && (
        <div className="algorithm-teacher-section">

          <AITeacher
            algorithm={algorithm.title}
            prediction={teacherContext.prediction}
            onStepChange={handleTeacherStep}
            onComplete={handleTeacherComplete}
            onPredict={handleTeacherPredict}
            onTryCircuit={handleTeacherTryCircuit}
          />

        </div>
      )}

      {/* ==================================================
          STEP 2 — PREDICT OUTPUT
      ================================================== */}

      {learningStage === "predict" && (
        <div className="algorithm-predict-section">

          <div className="stage-heading">

            <span>STEP 2</span>

            <h2>
              Predict the Output
            </h2>

            <p>
              Think about what the quantum
              circuit will produce before
              running it.
            </p>

          </div>

          <PredictOutput
            algorithm={algorithm.title}
            onComplete={handlePredictionComplete}
            onPrediction={handlePrediction}
          />

        </div>
      )}

      {/* ==================================================
          STEP 3 — BUILD CIRCUIT
      ================================================== */}

      {learningStage === "circuit" && (
        <div className="algorithm-circuit-section">

          <div className="stage-heading">

            <span>STEP 3</span>

            <h2>
              Build the Quantum Circuit
            </h2>

            <p>
              Construct the circuit you just
              learned about.
            </p>

          </div>

          <CircuitBuilder
            algorithm={algorithm.title}
            onComplete={handleCircuitComplete}
          />

        </div>
      )}

      {/* ==================================================
          STEP 4 — EXECUTE
      ================================================== */}

      {learningStage === "execute" && (
        <div className="algorithm-execute-section">

          <div className="stage-heading">

            <span>STEP 4</span>

            <h2>
              Execute the Circuit
            </h2>

            <p>
              Run the quantum circuit and
              observe the measured result.
            </p>

          </div>

          <MeasurementSimulator
            algorithm={algorithm.title}
            onComplete={handleMeasurementComplete}
          />

        </div>
      )}

      {/* ==================================================
          STEP 5 — UNDERSTAND
      ================================================== */}

      {learningStage === "understand" && (
        <div className="algorithm-understanding-section">

          <div className="stage-heading">

            <span>STEP 5</span>

            <h2>
              Understand the Result
            </h2>

            <p>
              Connect the measured output to
              the quantum concept you learned.
            </p>

          </div>

          <Understanding
            algorithm={algorithm.title}
            result={measurementResult}
            prediction={teacherContext.prediction}
            onComplete={handleUnderstandingComplete}
          />

        </div>
      )}

      {/* ==================================================
          MODULE COMPLETE
      ================================================== */}

      {learningStage === "complete" && (
        <div className="algorithm-complete-section">

          <div className="completion-icon">
            ✓
          </div>

          <span className="completion-label">
            MODULE COMPLETE
          </span>

          <h2>
            You completed {algorithm.title}
          </h2>

          <p>
            You learned the concept, predicted
            the output, built the circuit,
            executed it, and understood the
            result.
          </p>

          <div className="completion-flow">

            <span>Learn</span>
            <b>✓</b>

            <span>Predict</span>
            <b>✓</b>

            <span>Build</span>
            <b>✓</b>

            <span>Execute</span>
            <b>✓</b>

            <span>Understand</span>
            <b>✓</b>

          </div>

        </div>
      )}

      {/* ==================================================
          POST LEARNING — GO DEEPER
      ================================================== */}

      {learningStage === "complete" && (
        <div className="post-learning-section">

          <div className="post-learning-header">

            <span>
              GO DEEPER
            </span>

            <h2>
              Explore {algorithm.title}
            </h2>

            <p>
              Continue experimenting after
              completing the core lesson.
            </p>

          </div>

          <div className="post-learning-tools">

            {/* AI TUTOR */}

            <button
              type="button"
              className={`post-tool-button ${
                showTutor ? "active" : ""
              }`}
              onClick={handleTutorClick}
            >

              <div className="post-tool-icon">
                🤖
              </div>

              <div>
                <strong>
                  AI Tutor
                </strong>

                <span>
                  Ask questions and go deeper
                </span>
              </div>

              <b>
                {showTutor ? "▲" : "→"}
              </b>

            </button>

            {/* MEASUREMENT SIMULATOR */}

            <button
              type="button"
              className={`post-tool-button ${
                showMeasurement ? "active" : ""
              }`}
              onClick={handleMeasurementClick}
            >

              <div className="post-tool-icon">
                🔬
              </div>

              <div>
                <strong>
                  Measurement Simulator
                </strong>

                <span>
                  Run more quantum shots
                </span>
              </div>

              <b>
                {showMeasurement ? "▲" : "→"}
              </b>

            </button>

            {/* BLOCH SPHERE */}

            <button
              type="button"
              className={`post-tool-button ${
                showBlochSphere ? "active" : ""
              }`}
              onClick={handleBlochSphereClick}
            >

              <div className="post-tool-icon">
                🔵
              </div>

              <div>
                <strong>
                  Bloch Sphere
                </strong>

                <span>
                  Visualize the quantum state
                </span>
              </div>

              <b>
                {showBlochSphere ? "▲" : "→"}
              </b>

            </button>

          </div>

        </div>
      )}

      {/* ==================================================
          AI TUTOR
      ================================================== */}

      {showTutor &&
        learningStage === "complete" && (
          <div className="algorithm-tutor-section">

            <AITutor
              algorithm={algorithm.title}

              lessonStep={
                teacherContext.step
                  ? `Step ${teacherContext.step}`
                  : ""
              }

              currentConcept={
                teacherContext.concept
              }

              lesson={
                teacherContext.lesson
              }

              circuitInfo={
                teacherContext.prediction
                  ? `Prediction: ${
                      teacherContext.prediction
                        .selectedAnswer || ""
                    }; Correct answer: ${
                      teacherContext.prediction
                        .correctAnswer || ""
                    }; Result: ${
                      teacherContext.prediction.correct
                        ? "correct"
                        : "incorrect"
                    }`
                  : ""
              }
            />

          </div>
        )}

      {/* ==================================================
          EXTRA MEASUREMENT SIMULATOR
      ================================================== */}

      {showMeasurement &&
        learningStage === "complete" && (
          <div className="algorithm-measurement-section">

            <MeasurementSimulator
              algorithm={algorithm.title}
            />

          </div>
        )}

      {/* ==================================================
          BLOCH SPHERE
      ================================================== */}

      {showBlochSphere &&
        learningStage === "complete" && (
          <div className="algorithm-bloch-section">

            <BlochSphere
              algorithm={algorithm.title}
            />

          </div>
        )}

    </div>
  );
}

export default AlgorithmDetail;