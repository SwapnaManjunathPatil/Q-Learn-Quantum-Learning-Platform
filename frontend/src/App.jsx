import { useState } from "react";

import "./App.css";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Algorithms from "./pages/Algorithms";
import AlgorithmDetail from "./pages/AlgorithmDetail";
import Playground from "./pages/Playground";
import Dashboard from "./pages/Dashboard";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);

  const navigate = (page) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openAlgorithm = (algorithm) => {
    setSelectedAlgorithm(algorithm);
    setCurrentPage("algorithm-detail");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const startModule = () => {
  if (!selectedAlgorithm) {
    navigate("algorithms");
    return;
  }

  navigate("algorithm-detail");
};
  const backFromPlayground = () => {
    navigate("algorithm-detail");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <Home
            onNavigate={navigate}
          />
        );

      case "algorithms":
        return (
          <Algorithms
            onSelectAlgorithm={openAlgorithm}
          />
        );

      case "algorithm-detail":
        return (
          <AlgorithmDetail
            algorithm={selectedAlgorithm}
            onStartModule={startModule}
            onBack={() => navigate("algorithms")}
          />
        );

      case "playground":
        return (
          <Playground
            algorithm={selectedAlgorithm}
            onBack={backFromPlayground}
            onNavigate={navigate}
          />
        );

      case "dashboard":
        return (
          <Dashboard
            onNavigate={navigate}
          />
        );

      default:
        return (
          <Home
            onNavigate={navigate}
          />
        );
    }
  };

  return (
    <div className="app-shell">

      <Navbar
        currentPage={currentPage}
        onNavigate={navigate}
      />

      <main className="page-container">
        {renderPage()}
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <strong>⚛ Q-Learn</strong>

          <span>
            AI-Based Interactive Quantum Algorithm Learning Platform
          </span>
        </div>

        <span className="footer-status">
          Quantum Learning Environment
        </span>
      </footer>

    </div>
  );
}

export default App;