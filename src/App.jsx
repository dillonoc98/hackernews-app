import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [posts, setPosts] = useState([]);
  const [type, setType] = useState("topstories");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [viewAll, setViewAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch post IDs
  async function fetchPosts(type) {
    try {
      const res = await fetch(`https://hacker-news.firebaseio.com/v0/${type}.json`);
      if (!res.ok) throw new Error("Failed to fetch post IDs");
      return await res.json();
    } catch (err) {
      console.error("Error fetching posts:", err);
      return [];
    }
  }

  // Fetch single post
  async function fetchItem(id) {
    try {
      const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
      if (!res.ok) throw new Error(`Failed to fetch item ${id}`);
      return await res.json();
    } catch (err) {
      console.error(`Error fetching item ${id}:`, err);
      return null;
    }
  }

  // Fetch posts whenever type, pagination, or viewAll changes
  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const ids = await fetchPosts(type);
        const selectedIds = viewAll ? ids : ids.slice(0, currentPage * postsPerPage);
        const fullPosts = await Promise.all(selectedIds.map(fetchItem));
        setPosts(fullPosts.filter(Boolean));
      } catch (err) {
        console.error(err);
        setError("Failed to load posts. Please try again later.");
        setPosts([]);
      }
      setLoading(false);
    }

    load();
  }, [type, currentPage, postsPerPage, viewAll]);

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ background: "#1e1e1e", color: "#fff" }}>
      {/* Navbar */}
      <Navbar
        type={type}
        setType={setType}
        setCurrentPage={setCurrentPage}
        onSignOut={() => setLoggedIn(false)}
      />

      {/* Main Content */}
      <div className="container py-4 flex-grow-1">
        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}

        {/* Pagination Controls */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <select
            className="form-select w-auto"
            value={postsPerPage}
            onChange={(e) => {
              setPostsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            style={{
              backgroundColor: "#ff6600",
              color: "#000",
              border: "1px solid #ff6600",
              WebkitAppearance: "none",
              MozAppearance: "none",
              appearance: "none",
            }}
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
          </select>

          <button
            className="btn"
            style={{
              backgroundColor: viewAll ? "#000" : "#ff6600",
              color: viewAll ? "#ff6600" : "#000",
              border: "1px solid #ff6600",
            }}
            onClick={() => setViewAll(!viewAll)}
          >
            {viewAll ? "Collapse" : "View All"}
          </button>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="d-flex justify-content-center my-5">
            <div
              className="spinner-border"
              role="status"
              style={{ color: "#ff6600", width: "3rem", height: "3rem" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {/* Posts Grid */}
        <div className="row g-4">
          {!loading &&
            posts.map((post) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={post.id}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title"><b>{post.title}</b></h5><p className="text-dark mb-2">
                      Points: <b>{post.score || 0}</b> 
                    </p>
                    <p className="text-muted mb-3" style={{ fontSize: "0.8rem" }}>
                      by {post.by || "unknown"}
                    </p>
                    <p className="text-muted mb-3" style={{ fontSize: "0.8rem" }}>
                      Date: {post.time
                        ? new Date(post.time * 1000).toLocaleDateString(undefined, { 
                            day: "numeric", 
                            month: "long", 
                            year: "numeric" 
                          })
                        : "unknown"}
                    </p>
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-warning mt-auto"
                      style={{ color: "#000", borderColor: "#ff6600", backgroundColor: "#ff6600" }}
                    >
                      Read
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Pagination */}
        {!viewAll && !loading && (
          <div className="d-flex justify-content-center mt-4 gap-2 flex-wrap">
            <button
              className="btn"
              style={{ color: "#ff6600", border: "1px solid #ff6600", background: "transparent" }}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
            <button
              className="btn"
              style={{ color: "#ff6600", border: "1px solid #ff6600", background: "transparent" }}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}