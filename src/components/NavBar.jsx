import React from "react";

function Navbar({ type, setType, setCurrentPage, onSignOut }) {
  return (
    <nav
      className="navbar navbar-expand-lg px-3"
      style={{ backgroundColor: "#2c2c2c" }} // dark grey
    >
      <a className="navbar-brand fw-bold" href="#" style={{ color: "#d0d0d0ff" }}>
        HackerNews React
      </a>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
        style={{ borderColor: "#ff6600" }}
      >
        <span
          className="navbar-toggler-icon"
          style={{ filter: "invert(100%)" }} // makes burger icon visible
        ></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row gap-2">
          <li className="nav-item">
            <button
              className="btn"
              style={{
                backgroundColor: type === "topstories" ? "#ff6600" : "transparent",
                color: type === "topstories" ? "#000" : "#ff6600",
                borderColor: "#ff6600",
                borderStyle: "solid",
                borderWidth: "1px",
              }}
              onClick={() => {
                setType("topstories");
                setCurrentPage(1);
              }}
            >
              Top Posts
            </button>
          </li>
          <li className="nav-item">
            <button
              className="btn"
              style={{
                backgroundColor: type === "newstories" ? "#ff6600" : "transparent",
                color: type === "newstories" ? "#000" : "#ff6600",
                borderColor: "#ff6600",
                borderStyle: "solid",
                borderWidth: "1px",
              }}
              onClick={() => {
                setType("newstories");
                setCurrentPage(1);
              }}
            >
              New Posts
            </button>
          </li>
        </ul>

        <button
          className="btn"
          style={{ backgroundColor: "#ff6600", color: "#000", border: "none" }}
          onClick={onSignOut}
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}

export default Navbar;