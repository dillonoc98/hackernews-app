export default function PostCard({ story }) {
  if (!story) return null;

  return (
    <div style={styles.card}>
      <a href={story.url} target="_blank" style={styles.title} rel="noopener noreferrer">
        {story.title}
      </a>
      <p style={styles.meta}>
        by <strong>{story.by}</strong> • {story.score} points
      </p>
    </div>
  );
}

const styles = {
  card: {
    padding: "15px",
    background: "#fafafa",
    borderRadius: "8px",
    border: "1px solid #eee",
  },
  title: {
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "none",
  },
  meta: {
    fontSize: "13px",
    color: "#666",
    marginTop: "8px",
  },
};