import React from "react";

function Home({ posts }) {
  return (
    <div className="container mt-4">
      <div className="row g-4">
        {posts.map((post) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={post.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <a
                  href={post.url}
                  className="btn btn-warning mt-3"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read Post
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;