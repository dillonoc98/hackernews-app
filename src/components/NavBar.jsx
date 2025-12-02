import React from "react";

function Navbar({ onSignOut }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary px-3">
      <a className="navbar-brand" href="#">HackerNews App</a>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <button
                className="btn"
                style={{
                    backgroundColor: "#ff6600",
                    color: "#000",
                    border: "none",
                }}
                onClick={() => setLoggedIn(false)}
                >
                Sign Out
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;