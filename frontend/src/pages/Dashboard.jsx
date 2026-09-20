import { useEffect, useState } from "react";
import {
  Trophy,
  Target,
  Flame,
  Atom,
  CheckCircle2,
  Clock3,
  BookOpen,
} from "lucide-react";

import { algorithms } from "../data/algorithms";
import "./Dashboard.css";

export default function Dashboard({ onNavigate }) {
  const [progress, setProgress] = useState({});
  const [quizResults, setQuizResults] = useState({});
  const [activities, setActivities] = useState({});
  const [xpData, setXpData] = useState({});
  const [exerciseResults, setExerciseResults] = useState({});
  const [exerciseProgress, setExerciseProgress] = useState({});
  const [streak, setStreak] = useState(0);

  // ---------------------------------------------------------
  // Safe localStorage reader
  // ---------------------------------------------------------
  const readStorage = (key, fallback = {}) => {
    try {
      const data = localStorage.getItem(key);

      if (!data) {
        return fallback;
      }

      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading ${key}:`, error);
      return fallback;
    }
  };

  // ---------------------------------------------------------
  // Load all dashboard data
  // ---------------------------------------------------------
  const loadDashboardData = () => {
    const savedProgress = readStorage("quantumProgress");
    const savedQuizResults = readStorage("quantumQuizResults");
    const savedActivities = readStorage("quantumActivities");
    const savedXP = readStorage("quantumXP");
    const savedExerciseResults = readStorage(
      "quantumExerciseResults"
    );
    const savedExerciseProgress = readStorage(
      "quantumExercises"
    );
    const savedStreak = readStorage("quantumStreak");

    setProgress(savedProgress);
    setQuizResults(savedQuizResults);
    setActivities(savedActivities);
    setXpData(savedXP);
    setExerciseResults(savedExerciseResults);
    setExerciseProgress(savedExerciseProgress);
    setStreak(Number(savedStreak?.streak || 0));
  };

  // ---------------------------------------------------------
  // Initial load + refresh events
  // ---------------------------------------------------------
  useEffect(() => {
    loadDashboardData();

    const handleStorage = () => {
      loadDashboardData();
    };

    const handleQuantumProgressUpdate = () => {
      loadDashboardData();
    };

    const handleFocus = () => {
      loadDashboardData();
    };

    window.addEventListener("storage", handleStorage);

    window.addEventListener(
      "quantumProgressUpdated",
      handleQuantumProgressUpdate
    );

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("storage", handleStorage);

      window.removeEventListener(
        "quantumProgressUpdated",
        handleQuantumProgressUpdate
      );

      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  // ---------------------------------------------------------
  // Algorithm progress
  // ---------------------------------------------------------
  const completedAlgorithms = algorithms.filter(
    (algorithm) => progress[algorithm.title] === true
  );

  const completed = completedAlgorithms.length;
  const totalAlgorithms = algorithms.length;

  const percentage =
    totalAlgorithms === 0
      ? 0
      : Math.round((completed / totalAlgorithms) * 100);

  // ---------------------------------------------------------
  // XP
  // ---------------------------------------------------------
  // IMPORTANT:
  // VisualExercise XP is already added to quantumXP.
  // Therefore we DON'T add exercise XP again here.
  const xp = Object.values(xpData).reduce(
    (total, value) => total + Number(value || 0),
    0
  );

  // ---------------------------------------------------------
  // Quiz statistics
  // ---------------------------------------------------------
  const quizCount = Object.keys(quizResults).length;

  const averageQuizScore =
    quizCount === 0
      ? 0
      : Math.round(
          Object.values(quizResults).reduce(
            (total, result) =>
              total + Number(result?.percentage || 0),
            0
          ) / quizCount
        );

  const bestQuizScore =
    quizCount === 0
      ? 0
      : Math.max(
          ...Object.values(quizResults).map((result) =>
            Number(result?.percentage || 0)
          )
        );

  // ---------------------------------------------------------
  // Visual Exercise statistics
  // ---------------------------------------------------------
  const getExerciseData = (algorithm) => {
    return (
      exerciseResults[algorithm.title] ||
      exerciseProgress[algorithm.title] ||
      null
    );
  };

  const completedExercises = algorithms.filter((algorithm) => {
    const exercise = getExerciseData(algorithm);
    return exercise?.completed === true;
  });

  const exerciseCount = completedExercises.length;

  const totalExerciseAttempts = algorithms.reduce(
    (total, algorithm) => {
      const exercise = getExerciseData(algorithm);

      return total + Number(exercise?.attempts || 0);
    },
    0
  );

  const exerciseXP = completedExercises.reduce(
    (total, algorithm) => {
      const exercise = getExerciseData(algorithm);

      return total + Number(exercise?.xp || 0);
    },
    0
  );

  const exercisePercentage =
    totalAlgorithms === 0
      ? 0
      : Math.round((exerciseCount / totalAlgorithms) * 100);

  // ---------------------------------------------------------
  // Badges
  // ---------------------------------------------------------
  const badges = [
    {
      title: "Qubit Explorer",
      description: "Complete your first algorithm",
      unlocked: completed >= 1,
      icon: "⚛️",
    },
    {
      title: "Algorithm Learner",
      description: "Complete 3 algorithms",
      unlocked: completed >= 3,
      icon: "📚",
    },
    {
      title: "Exercise Explorer",
      description: "Complete your first visual exercise",
      unlocked: exerciseCount >= 1,
      icon: "🧩",
    },
    {
      title: "Quantum Explorer",
      description: "Complete 6 algorithms",
      unlocked: completed >= 6,
      icon: "🚀",
    },
    {
      title: "Quantum Master",
      description: "Complete 10 algorithms",
      unlocked: completed >= 10,
      icon: "🏆",
    },
    {
      title: "Quiz Champion",
      description: "Score 100% in a quiz",
      unlocked: bestQuizScore === 100,
      icon: "🎯",
    },
    {
      title: "7 Day Streak",
      description: "Maintain a 7 day learning streak",
      unlocked: streak >= 7,
      icon: "🔥",
    },
  ];

  // ---------------------------------------------------------
  // Algorithm status
  // ---------------------------------------------------------
  const getAlgorithmStatus = (algorithm) => {
    if (progress[algorithm.title]) {
      return {
        text: "Completed",
        className: "completed",
      };
    }

    const activity = activities[algorithm.title];

    if (activity) {
      return {
        text: "In Progress",
        className: "in-progress",
      };
    }

    return {
      text: "Not Started",
      className: "not-started",
    };
  };

  // ---------------------------------------------------------
  // Navigation
  // ---------------------------------------------------------
  const handleContinue = () => {
    if (onNavigate) {
      onNavigate("algorithms");
    }
  };

  // ---------------------------------------------------------
  // Render
  // ---------------------------------------------------------
  return (
    <main className="section page-section">
      {/* =====================================================
          HEADER
      ====================================================== */}
      <div className="page-header">
        <div>
          <p className="eyebrow">YOUR PROGRESS</p>

          <h1>
            Quantum <span>Dashboard</span>
          </h1>

          <p className="page-description">
            Track your quantum learning journey, quiz performance,
            visual exercises, XP and achievements.
          </p>
        </div>

        <div className="dashboard-header-icon">
          <Atom size={42} />
        </div>
      </div>

      {/* =====================================================
          MAIN STATS
      ====================================================== */}
      <div className="dashboard-stats">
        {/* Algorithms Completed */}
        <div className="dashboard-stat-card">
          <div className="stat-icon">
            <CheckCircle2 size={24} />
          </div>

          <div>
            <span>Algorithms Completed</span>

            <strong>
              {completed}/{totalAlgorithms}
            </strong>
          </div>
        </div>

        {/* Learning Progress */}
        <div className="dashboard-stat-card">
          <div className="stat-icon">
            <Target size={24} />
          </div>

          <div>
            <span>Learning Progress</span>

            <strong>{percentage}%</strong>
          </div>
        </div>

        {/* XP */}
        <div className="dashboard-stat-card">
          <div className="stat-icon">
            <Trophy size={24} />
          </div>

          <div>
            <span>XP Earned</span>

            <strong>{xp} XP</strong>
          </div>
        </div>

        {/* Streak */}
        <div className="dashboard-stat-card">
          <div className="stat-icon">
            <Flame size={24} />
          </div>

          <div>
            <span>Learning Streak</span>

            <strong>{streak} days</strong>
          </div>
        </div>
      </div>

      {/* =====================================================
          OVERALL ALGORITHM PROGRESS
      ====================================================== */}
      <section className="dashboard-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">LEARNING JOURNEY</p>

            <h2>Overall Progress</h2>
          </div>

          <div className="progress-percentage">
            {percentage}%
          </div>
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="progress-details">
          <span>
            {completed} of {totalAlgorithms} algorithms completed
          </span>

          <span>
            {totalAlgorithms - completed} remaining
          </span>
        </div>
      </section>

      {/* =====================================================
          QUIZ + EXERCISE SUMMARY
      ====================================================== */}
      <section className="dashboard-learning-summary">
        {/* Quizzes */}
        <div className="summary-card">
          <div className="summary-icon">
            <BookOpen size={22} />
          </div>

          <span>Quizzes Completed</span>

          <strong>{quizCount}</strong>
        </div>

        {/* Visual Exercises */}
        <div className="summary-card">
          <div className="summary-icon">
            <Atom size={22} />
          </div>

          <span>Exercises Completed</span>

          <strong>
            {exerciseCount}/{totalAlgorithms}
          </strong>

          <small>{exercisePercentage}% complete</small>
        </div>

        {/* Average Quiz */}
        <div className="summary-card">
          <div className="summary-icon">
            <Target size={22} />
          </div>

          <span>Average Quiz Score</span>

          <strong>{averageQuizScore}%</strong>
        </div>

        {/* Best Quiz */}
        <div className="summary-card">
          <div className="summary-icon">
            <Trophy size={22} />
          </div>

          <span>Best Quiz Score</span>

          <strong>{bestQuizScore}%</strong>
        </div>

        {/* Exercise XP */}
        <div className="summary-card">
          <div className="summary-icon">
            <span style={{ fontSize: "20px" }}>✨</span>
          </div>

          <span>Exercise XP</span>

          <strong>{exerciseXP} XP</strong>

          <small>
            {totalExerciseAttempts} total attempt
            {totalExerciseAttempts === 1 ? "" : "s"}
          </small>
        </div>
      </section>

      {/* =====================================================
          ALGORITHM PROGRESS
      ====================================================== */}
      <section className="algorithm-progress-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">ALGORITHM TRACKER</p>

            <h2>Your Algorithms</h2>

            <p>
              Follow your progress through each quantum algorithm.
            </p>
          </div>
        </div>

        <div className="algorithm-progress-list">
          {algorithms.map((algorithm) => {
            const status = getAlgorithmStatus(algorithm);

            const quiz = quizResults[algorithm.title];

            const exercise = getExerciseData(algorithm);

            return (
              <div
                className="algorithm-progress-card"
                key={algorithm.title}
              >
                {/* Algorithm Icon */}
                <div className="algorithm-progress-icon">
                  {algorithm.icon || "⚛️"}
                </div>

                {/* Main Information */}
                <div className="algorithm-progress-info">
                  <div className="algorithm-progress-title">
                    <h3>{algorithm.title}</h3>

                    <span
                      className={`algorithm-level ${String(
                        algorithm.level || ""
                      ).toLowerCase()}`}
                    >
                      {algorithm.level || "Quantum"}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="algorithm-status-row">
                    <span
                      className={`algorithm-status ${status.className}`}
                    >
                      {status.text}
                    </span>
                  </div>

                  {/* Quiz Result */}
                  <div className="algorithm-quiz-score">
                    <span>Quiz</span>

                    {quiz ? (
                      <>
                        <strong>
                          {Number(quiz.percentage || 0)}%
                        </strong>

                        <span>
                          {Number(quiz.score || 0)}/
                          {Number(quiz.total || 0)}
                        </span>
                      </>
                    ) : (
                      <span>Not Attempted</span>
                    )}
                  </div>

                  {/* Visual Exercise Result */}
                  <div className="algorithm-quiz-score">
                    <span>Visual Exercise</span>

                    {exercise?.completed ? (
                      <>
                        <strong>✓ Completed</strong>

                        <span>
                          {Number(exercise.attempts || 0)} attempt
                          {Number(exercise.attempts || 0) === 1
                            ? ""
                            : "s"}
                        </span>
                      </>
                    ) : (
                      <span>Not Completed</span>
                    )}
                  </div>

                  {/* Exercise XP */}
                  {exercise?.completed && (
                    <div className="algorithm-quiz-score">
                      <span>Exercise XP</span>

                      <strong>
                        +{Number(exercise.xp || 20)} XP
                      </strong>
                    </div>
                  )}
                </div>

                {/* Action */}
                <div className="algorithm-progress-action">
                  <button
                    className="secondary-button"
                    onClick={handleContinue}
                  >
                    {progress[algorithm.title]
                      ? "Review Module"
                      : activities[algorithm.title]
                      ? "Continue Learning"
                      : "Start Module"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          ACHIEVEMENTS
      ====================================================== */}
      <section className="achievements-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">ACHIEVEMENTS</p>

            <h2>Your Badges</h2>

            <p>
              Unlock badges by completing algorithms, exercises,
              quizzes and learning streaks.
            </p>
          </div>
        </div>

        <div className="badges-grid">
          {badges.map((badge) => (
            <div
              className={`badge-card ${
                badge.unlocked ? "unlocked" : "locked"
              }`}
              key={badge.title}
            >
              <div className="badge-icon">{badge.icon}</div>

              <div className="badge-content">
                <h3>{badge.title}</h3>

                <p>{badge.description}</p>

                <span>
                  {badge.unlocked ? "Unlocked" : "Locked"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          MOTIVATION
      ====================================================== */}
      <section className="dashboard-motivation">
        <div className="motivation-icon">
          <Atom size={30} />
        </div>

        <div>
          <p className="eyebrow">KEEP GOING</p>

          <h2>
            {completed === 0
              ? "Start your quantum journey!"
              : completed === totalAlgorithms
              ? "Amazing! You've completed everything!"
              : "You're making great progress!"}
          </h2>

          <p>
            {completed === 0
              ? "Choose an algorithm and start exploring quantum computing."
              : completed === totalAlgorithms
              ? "You have mastered all the available quantum algorithms."
              : `You've completed ${completed} of ${totalAlgorithms} algorithms. Keep learning and practicing!`}
          </p>
        </div>

        <button
          className="primary-button"
          onClick={handleContinue}
        >
          Continue Learning
        </button>
      </section>
    </main>
  );
}