import { useMemo } from "react";

function QuantumVisualizer({ results = {} }) {

  const probabilities = useMemo(() => {

    const totalShots = Object.values(results).reduce(
      (sum, value) => sum + Number(value),
      0
    );

    if (!totalShots) {
      return [];
    }

    return Object.entries(results)
      .map(([state, count]) => ({
        state,
        count: Number(count),
        probability:
          (Number(count) / totalShots) * 100,
      }))
      .sort((a, b) => b.probability - a.probability);

  }, [results]);


  if (!Object.keys(results).length) {
    return (
      <div className="visualizer-empty">

        <div className="visualizer-icon">
          📊
        </div>

        <h2>
          Measurement Results
        </h2>

        <p>
          Run your quantum circuit to see the measurement
          probabilities here.
        </p>

      </div>
    );
  }


  return (
    <div className="quantum-visualizer">

      <div className="visualizer-header">

        <div>

          <span className="eyebrow">
            SIMULATION RESULTS
          </span>

          <h2>
            Measurement Probabilities
          </h2>

        </div>

        <div className="shots-badge">
          {probabilities.reduce(
            (sum, item) => sum + item.count,
            0
          )} shots
        </div>

      </div>


      <div className="probability-list">

        {probabilities.map((item) => (

          <div
            className="probability-item"
            key={item.state}
          >

            <div className="probability-top">

              <strong>
                |{item.state}⟩
              </strong>

              <span>
                {item.probability.toFixed(1)}%
              </span>

            </div>

            <div className="probability-bar">

              <div
                className="probability-fill"
                style={{
                  width: `${item.probability}%`,
                }}
              />

            </div>

            <small>
              {item.count} measurements
            </small>

          </div>

        ))}

      </div>


      <div className="visualizer-explanation">

        <strong>
          What does this mean?
        </strong>

        <p>
          Each bar represents how frequently a quantum state
          was measured. Because quantum measurements are
          probabilistic, individual runs can vary slightly.
        </p>

      </div>

    </div>
  );
}

export default QuantumVisualizer;