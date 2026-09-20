import { ArrowRight } from "lucide-react";

export default function AlgorithmCard({
  algorithm,
  onSelect,
}) {
  return (
    <article
      className="algorithm-card"
      onClick={() => onSelect(algorithm)}
    >
      <div className="algorithm-top">
        <div className="algorithm-icon">
          {algorithm.icon}
        </div>

        <span className={`level ${algorithm.level.toLowerCase()}`}>
          {algorithm.level}
        </span>
      </div>

      <h3>{algorithm.title}</h3>

      <p>{algorithm.description}</p>

      <div className="concept-list">
        {algorithm.concepts.slice(0, 3).map((concept) => (
          <span key={concept}>{concept}</span>
        ))}
      </div>

      <button className="text-button">
        Explore
        <ArrowRight size={16} />
      </button>
    </article>
  );
}