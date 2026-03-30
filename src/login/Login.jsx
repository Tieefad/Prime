import React, { useState } from "react";

function Login({ darkMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const theme = {
    background: darkMode ? "#0f172a" : "#f8fafc",
    text: darkMode ? "#f1f5f9" : "#0f172a",
    card: darkMode ? "#1e293b" : "#ffffff",
    primary: "#4facfe",
    input: darkMode ? "#0f172a" : "#f1f5f9",
    border: darkMode ? "#334155" : "#e2e8f0",
  };

  const styles = {
    page: {
      fontFamily: "Arial, sans-serif",
      background: darkMode
        ? "linear-gradient(135deg, #020617, #0f172a)"
        : "linear-gradient(135deg, #e0f2fe, #f0f9ff)",
      color: theme.text,
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    card: {
      background: theme.card,
      padding: "40px",
      borderRadius: "16px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
      width: "100%",
      maxWidth: "400px",
    },
    title: {
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "8px",
      textAlign: "center",
      color: theme.primary,
    },
    subtitle: {
      fontSize: "14px",
      textAlign: "center",
      marginBottom: "30px",
      color: darkMode ? "#94a3b8" : "#64748b",
    },
    label: {
      display: "block",
      fontSize: "14px",
      marginBottom: "6px",
      fontWeight: "600",
    },
    input: {
      width: "100%",
      padding: "10px 14px",
      borderRadius: "8px",
      border: `1px solid ${theme.border}`,
      background: theme.input,
      color: theme.text,
      fontSize: "15px",
      marginBottom: "20px",
      boxSizing: "border-box",
      outline: "none",
    },
    button: {
      width: "100%",
      padding: "12px",
      border: "none",
      borderRadius: "25px",
      background: theme.primary,
      color: "#fff",
      fontSize: "16px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    backLink: {
      display: "block",
      textAlign: "center",
      marginTop: "20px",
      fontSize: "14px",
      color: theme.primary,
      cursor: "pointer",
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logged in as ${email}`);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Login to your Prime account</p>

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Email</label>
          <input
            style={styles.input}
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label style={styles.label}>Password</label>
          <input
            style={styles.input}
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button style={styles.button} type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;