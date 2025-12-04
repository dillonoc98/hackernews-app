import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Optional: add validation here
    onLogin(); // ✅ Call parent login handler
  };

  return (
    <div
      className="vh-100 d-flex justify-content-center align-items-center"
      style={{ background: "#1e1e1e", padding: "20px" }}
    >
      <div
        className="card p-4 text-center"
        style={{ width: "100%", maxWidth: "400px", minWidth: "300px" }}
      >
        <h2 className="mb-4 text-dark">Sign In</h2>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-3 text-start">
            <label htmlFor="username" className="form-label text-light">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3 text-start">
            <label htmlFor="password" className="form-label text-light">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "#ff6600",
              color: "#000",
              border: "1px solid #ff6600",
            }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}