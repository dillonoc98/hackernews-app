import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [posts, setPosts] = useState([]);
  const [type, setType] = useState("topstories");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [viewAll, setViewAll] = useState(false);

  // Fetch post IDs
  async function fetchPosts(type) {
    const res = await fetch(
      `https://hacker-news.firebaseio.com/v0/${type}.json`
    );
    return res.json();
  }

  // Fetch single post
  async function fetchItem(id) {
    const res = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    );
    return res.json();
  }

  // Fetch posts whenever type, pagination, or viewAll changes
  useEffect(() => {
    async function load() {
      const ids = await fetchPosts(type);

      const selectedIds = viewAll
        ? ids
        : ids.slice(0, currentPage * postsPerPage);

      const fullPosts = await Promise.all(selectedIds.map(fetchItem));
      setPosts(fullPosts.filter(Boolean));
    }

    load();
  }, [type, currentPage, postsPerPage, viewAll]);

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ background: "#1e1e1e", color: "#fff" }}>
      {/* HEADER / NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <a className="navbar-brand fw-bold" href="#" style={{ color: "#ff6600" }}>
          HackerNews React
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row gap-2">
            <li className="nav-item">
              <button
                className={`btn ${type === "topstories" ? "btn-warning" : "btn-outline-warning"}`}
                style={{ backgroundColor: type === "topstories" ? "#ff6600" : "transparent", color: type === "topstories" ? "#000" : "#ff6600", borderColor: "#ff6600" }}
                onClick={() => { setType("topstories"); setCurrentPage(1); }}
              >
                Top Posts
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`btn ${type === "newstories" ? "btn-warning" : "btn-outline-warning"}`}
                style={{ backgroundColor: type === "newstories" ? "#ff6600" : "transparent", color: type === "newstories" ? "#000" : "#ff6600", borderColor: "#ff6600" }}
                onClick={() => { setType("newstories"); setCurrentPage(1); }}
              >
                New Posts
              </button>
            </li>
          </ul>
          <button
            className="btn"
            style={{ backgroundColor: "#ff6600", color: "#000", border: "none" }}
            onClick={() => setLoggedIn(false)}
          >
            Sign Out
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="container py-4 flex-grow-1">
        {/* Pagination Controls */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <select
            className="form-select w-auto"
            value={postsPerPage}
            onChange={(e) => {
              setPostsPerPage(Number(e.target.value));
              setCurrentPage(1);
              setViewAll(false); // collapse viewAll when changing per-page
            }}
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
          </select>

          <button
            className="btn"
            style={{ backgroundColor: "#ff6600", color: "#000", border: "none" }}
            onClick={() => { setViewAll(!viewAll); setCurrentPage(1); }}
          >
            {viewAll ? "Collapse" : "View All"}
          </button>
        </div>

        {/* POSTS GRID */}
        <div className="row g-4">
          {posts.map((post) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={post.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="text-warning mb-2">⭐ {post.score || 0}</p>
                  <p className="text-muted mb-3" style={{ fontSize: "0.8rem" }}>
                    by {post.by || "unknown"}
                  </p>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn"
                    style={{ backgroundColor: "#ff6600", color: "#000", border: "none", marginTop: "auto" }}
                  >
                    Read
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        {!viewAll && (
          <div className="d-flex justify-content-center mt-4 gap-2 flex-wrap">
            <button
              className="btn"
              style={{ backgroundColor: "#ff6600", color: "#000", border: "none" }}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
            <button
              className="btn"
              style={{ backgroundColor: "#ff6600", color: "#000", border: "none" }}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="bg-dark text-light text-center py-3 mt-auto">
        <small>Built with React + HackerNews API</small>
      </footer>
    </div>
  );
}