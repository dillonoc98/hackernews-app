import PostCard from "./postCard";

export default function PostList({ stories }) {
  return (
    <div style={styles.grid}>
      {stories.map((story) => (
        <PostCard key={story.id} story={story} />
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 300px)", // fixed card width
    justifyContent: "center",  // center the grid in the container
    gap: "15px",
    margin: "0 auto",           // center grid itself
  },
};