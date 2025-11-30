import { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login validation
    if (username && password) {
      onLogin(username);
    } else {
      alert("Please enter both username and password.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button style={styles.button} type="submit">Login</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    backgroundColor: "#2c2c2c",
    borderRadius: "8px",
    boxShadow: "0 0 15px rgba(0,0,0,0.5)",
    color: "#fff",
    textAlign: "center",
  },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #444",
    backgroundColor: "#3a3a3a",
    color: "#fff",
  },
  button: {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#ff6600",
    color: "#fff",
    cursor: "pointer",
  },
};