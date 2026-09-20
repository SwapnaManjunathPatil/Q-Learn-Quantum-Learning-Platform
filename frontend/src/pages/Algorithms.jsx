import { useMemo, useState } from "react";
import algorithms from "../data/algorithms";
import AlgorithmCard from "../components/AlgorithmCard";

function Algorithms({ onSelectAlgorithm }) {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("All");

  const filteredAlgorithms = useMemo(() => {
    return algorithms.filter((algorithm) => {
      const matchesSearch =
        algorithm.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        algorithm.description
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        algorithm.concepts.some((concept) =>
          concept.toLowerCase().includes(search.toLowerCase())
        );

      const matchesLevel =
        level === "All" || algorithm.level === level;

      return matchesSearch && matchesLevel;
    });
  }, [search, level]);

  return (
    <main className="algorithms-page">
      <section className="page-header">
        <span className="eyebrow">QUANTUM ALGORITHM LIBRARY</span>

        <h1>Explore Quantum Algorithms</h1>

        <p>
          Learn the concepts, visualize the circuits, run simulations,
          and test your understanding.
        </p>
      </section>

      <section className="algorithm-controls">
        <div className="search-box">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search algorithms or concepts..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="filter-buttons">
          {["All", "Beginner", "Intermediate", "Advanced"].map(
            (option) => (
              <button
                key={option}
                className={
                  level === option
                    ? "filter-button active"
                    : "filter-button"
                }
                onClick={() => setLevel(option)}
              >
                {option}
              </button>
            )
          )}
        </div>
      </section>

      <div className="algorithm-result-count">
        Showing{" "}
        <strong>{filteredAlgorithms.length}</strong> algorithms
      </div>

      {filteredAlgorithms.length > 0 ? (
        <section className="algorithm-grid">
          {filteredAlgorithms.map((algorithm) => (
            <AlgorithmCard
              key={algorithm.id}
              algorithm={algorithm}
              onSelect={onSelectAlgorithm}
            />
          ))}
        </section>
      ) : (
        <div className="empty-state">
          <div>🔍</div>
          <h3>No algorithms found</h3>
          <p>
            Try another algorithm name, concept, or difficulty level.
          </p>
        </div>
      )}
    </main>
  );
}

export default Algorithms;