import "./Home.css";

function Home({ onNavigate }) {
  const algorithms = [
    {
      id: "bell",
      name: "Bell State",
      level: "Beginner",
      icon: "⟷",
      description: "Explore quantum entanglement",
    },
    {
      id: "deutsch",
      name: "Deutsch",
      level: "Intermediate",
      icon: "◇",
      description: "Discover quantum advantage",
    },
    {
      id: "grover",
      name: "Grover",
      level: "Advanced",
      icon: "⌕",
      description: "Search faster with quantum",
    },
    {
      id: "teleportation",
      name: "Teleportation",
      level: "Advanced",
      icon: "↗",
      description: "Transfer quantum states",
    },
  ];

  const handleAlgorithm = (algorithm) => {
    if (onNavigate) {
      onNavigate("algorithms", algorithm);
    }
  };

  return (
    <main className="home-page">
      {/* HERO */}
      <section className="home-hero">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="eyebrow-dot"></span>
            INTERACTIVE QUANTUM LEARNING
          </div>

          <h1>
            Quantum computing,
            <br />
            <span>made interactive.</span>
          </h1>

          <p>
            Learn quantum algorithms by understanding the idea,
            predicting the result, building the circuit, and running it.
          </p>

          <div className="hero-actions">
            <button
              className="primary-button"
              onClick={() => onNavigate && onNavigate("algorithms")}
            >
              Start Learning
              <span>→</span>
            </button>

            <button
              className="secondary-button"
              onClick={() => onNavigate && onNavigate("playground")}
            >
              Open Playground
            </button>
          </div>

          <div className="hero-flow">
            <span>Learn</span>
            <i>→</i>
            <span>Predict</span>
            <i>→</i>
            <span>Build</span>
            <i>→</i>
            <span>Run</span>
            <i>→</i>
            <span>Understand</span>
          </div>
        </div>

        {/* QUANTUM CIRCUIT VISUAL */}
        <div className="hero-visual">
          <div className="visual-header">
            <span>QUANTUM CIRCUIT</span>
            <span className="live-status">
              <b></b> LIVE
            </span>
          </div>

          <div className="circuit-board">
            <div className="circuit-state">
              <span className="state-label">INPUT</span>
              <strong>|00⟩</strong>
            </div>

            <div className="circuit">
              <div className="wire-row">
                <span className="qubit">q₀</span>
                <div className="wire"></div>
                <div className="gate hadamard">H</div>
                <div className="wire"></div>
                <div className="control"></div>
                <div className="wire"></div>
              </div>

              <div className="wire-row">
                <span className="qubit">q₁</span>
                <div className="wire"></div>
                <div className="empty-gate"></div>
                <div className="wire"></div>
                <div className="target">
                  <span>+</span>
                </div>
                <div className="wire"></div>
              </div>

              <div className="connection"></div>
            </div>

            <div className="circuit-state output">
              <span className="state-label">OUTPUT</span>
              <strong>|00⟩ / |11⟩</strong>
            </div>
          </div>

          <div className="visual-caption">
            <span>Hadamard + CNOT</span>
            <span>Entanglement</span>
          </div>
        </div>
      </section>

      {/* LEARNING FLOW */}
      <section className="learning-flow">
        <div className="section-heading">
          <div>
            <span className="small-label">HOW IT WORKS</span>
            <h2>Learn by doing.</h2>
          </div>
        </div>

        <div className="flow-line">
          <div className="flow-item active">
            <div className="flow-number">01</div>
            <div>
              <strong>Learn</strong>
              <span>Understand the concept</span>
            </div>
          </div>

          <div className="flow-arrow">→</div>

          <div className="flow-item">
            <div className="flow-number">02</div>
            <div>
              <strong>Predict</strong>
              <span>Think before execution</span>
            </div>
          </div>

          <div className="flow-arrow">→</div>

          <div className="flow-item">
            <div className="flow-number">03</div>
            <div>
              <strong>Build</strong>
              <span>Create the circuit</span>
            </div>
          </div>

          <div className="flow-arrow">→</div>

          <div className="flow-item">
            <div className="flow-number">04</div>
            <div>
              <strong>Run</strong>
              <span>Execute with Qiskit</span>
            </div>
          </div>

          <div className="flow-arrow">→</div>

          <div className="flow-item">
            <div className="flow-number">05</div>
            <div>
              <strong>Understand</strong>
              <span>Compare and learn</span>
            </div>
          </div>
        </div>
      </section>

      {/* ALGORITHMS */}
      <section className="algorithm-section">
        <div className="algorithm-heading">
          <div>
            <span className="small-label">EXPLORE</span>
            <h2>Start with an algorithm.</h2>
          </div>

          <button
            className="view-all"
            onClick={() => onNavigate && onNavigate("algorithms")}
          >
            View all algorithms →
          </button>
        </div>

        <div className="algorithm-row">
          {algorithms.map((algorithm) => (
            <button
              key={algorithm.id}
              className="algorithm-mini-card"
              onClick={() => handleAlgorithm(algorithm.id)}
            >
              <div className="algorithm-icon">{algorithm.icon}</div>

              <div className="algorithm-info">
                <span className="algorithm-level">{algorithm.level}</span>
                <h3>{algorithm.name}</h3>
                <p>{algorithm.description}</p>
              </div>

              <span className="card-arrow">↗</span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;