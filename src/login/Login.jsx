import React, { useState } from "react";

function Login({ darkMode, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

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
    toggleRow: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "6px",
      marginTop: "20px",
      fontSize: "14px",
      color: darkMode ? "#94a3b8" : "#64748b",
    },
    toggleLink: {
      color: theme.primary,
      cursor: "pointer",
      fontWeight: "600",
    },
    backLink: {
      display: "block",
      textAlign: "center",
      marginTop: "14px",
      fontSize: "14px",
      color: theme.primary,
      cursor: "pointer",
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      alert(`Account created for ${name} (${email})`);
    } else {
      alert(`Logged in as ${email}`);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>{isSignUp ? "Create Account" : "Welcome Back"}</h2>
        <p style={styles.subtitle}>
          {isSignUp ? "Sign up for a Prime account" : "Login to your Prime account"}
        </p>

        <form onSubmit={handleSubmit}>
          {/* Name field only for Sign Up */}
          {isSignUp && (
            <>
              <label style={styles.label}>Full Name</label>
              <input
                style={styles.input}
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </>
          )}

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
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Toggle between Login and Sign Up */}
        <div style={styles.toggleRow}>
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <span
            style={styles.toggleLink}
            onClick={() => {
              setIsSignUp(!isSignUp);
              setEmail("");
              setPassword("");
              setName("");
            }}
          >
            {isSignUp ? "Login" : "Sign Up"}
          </span>
        </div>

        <span style={styles.backLink} onClick={onBack}>
          ← Back to Home
        </span>
      </div>
    </div>
  );
}

export default Login;