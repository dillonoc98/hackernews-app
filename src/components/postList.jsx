export default function PostList({ stories }) {
  return (
    <div className="row g-4">
      {stories.map((story) => (
        <div key={story.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="card bg-secondary text-light h-100 shadow-sm border-0">

            <div className="card-body d-flex flex-column">
              <h5 className="card-title" style={{ fontSize: "1rem", minHeight: "40px" }}>
                {story.title || "Untitled"}
              </h5>

              <p className="card-text text-warning mb-1" style={{ color: "#ff6600" }}>
                ⭐ {story.score} points
              </p>

              <p className="card-text text-light opacity-75" style={{ fontSize: "0.8rem" }}>
                by {story.by}
              </p>

              <a
                href={story.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-warning btn-sm mt-auto"
                style={{ backgroundColor: "#ff6600", borderColor: "#ff6600" }}
              >
                View Post
              </a>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}