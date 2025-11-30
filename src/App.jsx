import { useEffect, useState } from "react";
import { fetchList, fetchItem } from "./api/hackerNews";
import PostList from "./components/postList";

const STORY_TYPES = [
  { key: "topstories", label: "Top Posts" },
  { key: "newstories", label: "New Posts" },
];

const PAGE_OPTIONS = [10, 20, 50, 100]; // options for posts per page

export default function App() {
  const [postType, setPostType] = useState("topstories");
  const [storyIds, setStoryIds] = useState([]);
  const [stories, setStories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [viewAll, setViewAll] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch story IDs when postType changes
  useEffect(() => {
    async function loadIds() {
      setLoading(true);
      const ids = await fetchList(postType);
      setStoryIds(ids);
      setCurrentPage(1);
      setViewAll(false);
      setLoading(false);
    }
    loadIds();
  }, [postType]);

  // Fetch stories for current page or view all
  useEffect(() => {
    async function loadStories() {
      setLoading(true);
      let start = 0;
      let end = viewAll ? storyIds.length : currentPage * pageSize;
      const items = await Promise.all(
        storyIds.slice(start, end).map((id) => fetchItem(id))
      );
      setStories(items);
      setLoading(false);
    }
    if (storyIds.length > 0) loadStories();
  }, [storyIds, currentPage, pageSize, viewAll]);

  const totalPages = Math.ceil(storyIds.length / pageSize);

  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleViewAll = () => setViewAll(true);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Hacker News Redesign</h1>

      {/* Toggle Top/New */}
      <div style={styles.toggle}>
        {STORY_TYPES.map((type) => (
          <button
            key={type.key}
            style={postType === type.key ? styles.activeButton : styles.button}
            onClick={() => setPostType(type.key)}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Page size selector */}
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="pageSize" style={{ marginRight: "10px" }}>Posts per page:</label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(1);
            setViewAll(false);
          }}
          style={{ padding: "6px 10px", borderRadius: "6px" }}
        >
          {PAGE_OPTIONS.map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>

        <button
          style={{ ...styles.pageButton, marginLeft: "15px" }}
          onClick={handleViewAll}
        >
          View All
        </button>
      </div>

      {loading && <p style={{ textAlign: "center" }}>Loading posts...</p>}

      {!loading && <PostList stories={stories} />}

      {/* Pagination */}
      {!loading && !viewAll && totalPages > 1 && (
        <div style={styles.pagination}>
          <button
            style={styles.pageButton}
            onClick={goToPrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span style={styles.pageIndicator}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            style={styles.pageButton}
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

// --- Styles ---
const styles = {
  container: {
    width: "100%",
    maxWidth: "1200px",
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#2c2c2c",
    borderRadius: "8px",
    boxShadow: "0 0 15px rgba(0,0,0,0.5)",
    color: "#fff",
  },
  header: { marginBottom: "20px", textAlign: "center" },
  toggle: { display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" },
  button: {
    padding: "10px 20px",
    borderRadius: "6px",
    border: "1px solid #444",
    cursor: "pointer",
    background: "#3a3a3a",
    color: "#ccc",
  },
  activeButton: {
    padding: "10px 20px",
    borderRadius: "6px",
    border: "1px solid #ff6600",
    background: "#ff6600",
    color: "#fff",
    cursor: "pointer",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    marginTop: "20px",
  },
  pageButton: {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "1px solid #ff6600",
    backgroundColor: "#ff6600",
    color: "#fff",
    cursor: "pointer",
    minWidth: "90px",
  },
  pageIndicator: { fontSize: "14px" },
};