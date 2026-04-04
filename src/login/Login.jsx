import React, { useState } from "react";
import { auth, googleProvider } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Ticket } from "lucide-react";

function Login({ darkMode, onBack, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [googleHover, setGoogleHover] = useState(false);
  const [linkHover, setLinkHover] = useState(false);
  const [backHover, setBackHover] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [hoveredInput, setHoveredInput] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const theme = {
    text: darkMode ? "#f1f5f9" : "#0f172a",
    card: darkMode ? "#1e293b" : "#ffffff",
    primary: "#4facfe",
    input: darkMode ? "#0f172a" : "#f1f5f9",
    border: darkMode ? "#334155" : "#e2e8f0",
  };

  const styles = {
    page: {
      fontFamily: "'Segoe UI', Arial, sans-serif",
      background: darkMode
        ? "linear-gradient(135deg, #020617, #0f172a)"
        : "linear-gradient(135deg, #e0f2fe, #f0f9ff)",
      color: theme.text,
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
    },
    card: {
      background: theme.card,
      padding: "40px",
      borderRadius: "20px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
      width: "100%",
      maxWidth: "420px",
    },
    title: {
      fontSize: "28px",
      fontWeight: "800",
      marginBottom: "8px",
      textAlign: "center",
      background: "linear-gradient(135deg, #4facfe, #a78bfa)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    subtitle: {
      fontSize: "14px",
      textAlign: "center",
      marginBottom: "24px",
      color: darkMode ? "#94a3b8" : "#64748b",
    },
    label: {
      display: "block",
      fontSize: "13px",
      marginBottom: "6px",
      fontWeight: "700",
      color: darkMode ? "#94a3b8" : "#64748b",
      letterSpacing: "0.5px",
      textTransform: "uppercase",
    },
    button: {
      width: "100%",
      padding: "13px",
      border: "none",
      borderRadius: "999px",
      background: btnHover
        ? "linear-gradient(135deg, #0ea5e9, #8b5cf6)"
        : "linear-gradient(135deg, #4facfe, #a78bfa)",
      color: "#fff",
      fontSize: "16px",
      cursor: "pointer",
      fontWeight: "700",
      boxShadow: btnHover
        ? "0 8px 25px rgba(79,172,254,0.6)"
        : "0 4px 15px rgba(79,172,254,0.3)",
      transform: btnHover
        ? "translateY(-3px) scale(1.02)"
        : "translateY(0) scale(1)",
      transition: "all 0.3s ease",
      opacity: loading ? 0.7 : 1,
    },
    googleBtn: {
      width: "100%",
      padding: "12px",
      border: `1.5px solid ${googleHover ? "#4facfe" : theme.border}`,
      borderRadius: "999px",
      background: googleHover
        ? darkMode ? "#1e293b" : "#f0f9ff"
        : theme.card,
      color: theme.text,
      fontSize: "15px",
      cursor: "pointer",
      fontWeight: "600",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      marginBottom: "20px",
      transform: googleHover
        ? "translateY(-2px) scale(1.01)"
        : "translateY(0) scale(1)",
      boxShadow: googleHover
        ? "0 6px 20px rgba(79,172,254,0.2)"
        : "none",
      transition: "all 0.3s ease",
    },
    divider: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "20px",
    },
    dividerLine: {
      flex: 1,
      height: "1px",
      background: theme.border,
    },
    dividerText: {
      fontSize: "12px",
      color: "#94a3b8",
      fontWeight: "600",
    },
    error: {
      background: "rgba(239,68,68,0.1)",
      border: "1px solid rgba(239,68,68,0.3)",
      borderRadius: "8px",
      padding: "10px 14px",
      fontSize: "13px",
      color: "#ef4444",
      marginBottom: "16px",
      textAlign: "center",
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
      fontWeight: "700",
      fontSize: "15px",
      textDecoration: linkHover ? "underline" : "none",
      transform: linkHover ? "scale(1.1)" : "scale(1)",
      display: "inline-block",
      transition: "all 0.2s ease",
    },
    backLink: {
      display: "block",
      textAlign: "center",
      marginTop: "14px",
      fontSize: "14px",
      color: theme.primary,
      cursor: "pointer",
      fontWeight: "600",
      transform: backHover ? "translateX(-5px)" : "translateX(0)",
      transition: "all 0.2s ease",
      opacity: backHover ? 0.8 : 1,
    },
  };

  const getInputStyle = (name) => ({
    width: "100%",
    padding: "11px 14px",
    borderRadius: "10px",
    border: focusedInput === name || hoveredInput === name
      ? "1.5px solid #4facfe"
      : `1.5px solid ${theme.border}`,
    background: theme.input,
    color: theme.text,
    fontSize: "15px",
    marginBottom: "20px",
    boxSizing: "border-box",
    outline: "none",
    boxShadow: focusedInput === name
      ? "0 0 0 3px rgba(79,172,254,0.2), 0 4px 12px rgba(79,172,254,0.15)"
      : hoveredInput === name
      ? "0 8px 25px rgba(79,172,254,0.3)"
      : "none",
    transform: focusedInput === name
      ? "translateY(-3px) scale(1.01)"
      : hoveredInput === name
      ? "translateY(-2px) scale(1.01)"
      : "translateY(0) scale(1)",
    transition: "all 0.3s ease",
  });

  const saveUserToFirestore = async (user) => {
    await setDoc(doc(db, "users", user.uid), {
      name: user.displayName || name,
      email: user.email,
      createdAt: new Date(),
      role: "user",
    }, { merge: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isSignUp) {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, { displayName: name });
        await saveUserToFirestore(result.user);
        onLoginSuccess(result.user);
      } else {
        const result = await signInWithEmailAndPassword(auth, email, password);
        onLoginSuccess(result.user);
      }
    } catch (err) {
      setError(
        err.code === "auth/email-already-in-use" ? "Email already in use." :
        err.code === "auth/wrong-password" ? "Wrong password." :
        err.code === "auth/user-not-found" ? "No account found with this email." :
        err.code === "auth/weak-password" ? "Password must be at least 6 characters." :
        err.code === "auth/invalid-email" ? "Invalid email address." :
        err.code === "auth/invalid-credential" ? "Invalid email or password." :
        "Something went wrong. Please try again."
      );
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await saveUserToFirestore(result.user);
      onLoginSuccess(result.user);
    } catch (err) {
      setError("Google sign-in failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px", cursor: "pointer" }} onClick={onBack}>
        <Ticket size={22} color="#4facfe" />
        <span style={{ fontSize: "22px", fontWeight: "800", background: "linear-gradient(135deg, #4facfe, #00f2fe)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>PrimePass</span>
      </div>

      <div style={styles.card}>
        <h2 style={styles.title}>{isSignUp ? "Create Account" : "Welcome Back"}</h2>
        <p style={styles.subtitle}>
          {isSignUp ? "Sign up for a PrimePass account" : "Login to your PrimePass account"}
        </p>

        <button style={styles.googleBtn} onClick={handleGoogle}
          onMouseEnter={() => setGoogleHover(true)}
          onMouseLeave={() => setGoogleHover(false)}
          disabled={loading}
        >
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Continue with Google
        </button>

        <div style={styles.divider}>
          <div style={styles.dividerLine} />
          <span style={styles.dividerText}>OR</span>
          <div style={styles.dividerLine} />
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <label style={styles.label}>Full Name</label>
              <input
                style={getInputStyle("name")}
                type="text" placeholder="John Doe" value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setFocusedInput("name")}
                onBlur={() => setFocusedInput(null)}
                onMouseEnter={() => setHoveredInput("name")}
                onMouseLeave={() => setHoveredInput(null)}
                required
              />
            </>
          )}

          <label style={styles.label}>Email</label>
          <input
            style={getInputStyle("email")}
            type="email" placeholder="you@example.com" value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocusedInput("email")}
            onBlur={() => setFocusedInput(null)}
            onMouseEnter={() => setHoveredInput("email")}
            onMouseLeave={() => setHoveredInput(null)}
            required
          />

          <label style={styles.label}>Password</label>
          <input
            style={getInputStyle("password")}
            type="password" placeholder="••••••••" value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setFocusedInput("password")}
            onBlur={() => setFocusedInput(null)}
            onMouseEnter={() => setHoveredInput("password")}
            onMouseLeave={() => setHoveredInput(null)}
            required
          />

          <button style={styles.button} type="submit"
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            disabled={loading}
          >
            {loading ? "Please wait..." : isSignUp ? "Create Account" : "Login"}
          </button>
        </form>

        <div style={styles.toggleRow}>
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <span style={styles.toggleLink}
            onClick={() => { setIsSignUp(!isSignUp); setError(""); }}
            onMouseEnter={() => setLinkHover(true)}
            onMouseLeave={() => setLinkHover(false)}
          >
            {isSignUp ? "Login" : "Sign Up"}
          </span>
        </div>

        <span style={styles.backLink} onClick={onBack}
          onMouseEnter={() => setBackHover(true)}
          onMouseLeave={() => setBackHover(false)}
        >
          ← Back to Home
        </span>
      </div>
    </div>
  );
}

export default Login;