import "./Navbar.css";

function Navbar({ currentPage, onNavigate }) {
  const handleBrandKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onNavigate("home");
    }
  };

  const navItems = [
    {
      id: "home",
      label: "Home",
    },
    {
      id: "algorithms",
      label: "Algorithms",
    },
    {
      id: "playground",
      label: "Playground",
    },
    {
      id: "dashboard",
      label: "Dashboard",
    },
  ];

  return (
    <header className="ql-navbar">
      <div
        className="ql-brand"
        onClick={() => onNavigate("home")}
        role="button"
        tabIndex={0}
        onKeyDown={handleBrandKeyDown}
        aria-label="Go to Q-Learn home"
      >
        <div className="ql-brand-mark">
          <span>Q</span>
          <i></i>
        </div>

        <div className="ql-brand-text">
          <div className="ql-brand-name">
            Q-Learn
          </div>

          <div className="ql-brand-subtitle">
            Quantum Learning
          </div>
        </div>
      </div>

      <nav
        className="ql-nav-links"
        aria-label="Main navigation"
      >
        {navItems.map((item) => {
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              className={`ql-nav-link ${
                isActive ? "active" : ""
              }`}
              onClick={() => onNavigate(item.id)}
            >
              <span>{item.label}</span>

              {isActive && (
                <span className="ql-nav-active-dot"></span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="ql-lab-status">
        <span className="ql-status-indicator"></span>

        <div className="ql-status-text">
          <strong>Quantum Lab</strong>
          <span>Online</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;