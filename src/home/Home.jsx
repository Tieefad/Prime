import React from "react";

function Home({ darkMode, setDarkMode, onGetStarted }) {
  const theme = {
    background: darkMode ? "#0f172a" : "#f8fafc",
    text: darkMode ? "#f1f5f9" : "#0f172a",
    card: darkMode ? "#1e293b" : "#ffffff",
    primary: "#4facfe",
  };

  const styles = {
    page: {
      fontFamily: "Arial, sans-serif",
      background: theme.background,
      color: theme.text,
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    },

    /* Navbar */
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 40px",
      background: theme.card,
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    },
    logo: {
      fontSize: "22px",
      fontWeight: "bold",
      color: theme.primary,
    },
    navLinks: {
      display: "flex",
      gap: "25px",
      alignItems: "center",
    },
    link: {
      cursor: "pointer",
      fontSize: "15px",
    },
    toggleBtn: {
      padding: "6px 12px",
      borderRadius: "20px",
      border: "none",
      cursor: "pointer",
      background: theme.primary,
      color: "#fff",
    },

    /* Hero */
    hero: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "60px 20px",
      background: darkMode
        ? "linear-gradient(135deg, #020617, #0f172a)"
        : "linear-gradient(135deg, #e0f2fe, #f0f9ff)",
    },
    title: {
      fontSize: "42px",
      marginBottom: "15px",
    },
    subtitle: {
      fontSize: "18px",
      maxWidth: "600px",
      marginBottom: "25px",
    },
    button: {
      padding: "12px 25px",
      border: "none",
      borderRadius: "25px",
      background: theme.primary,
      color: "#fff",
      cursor: "pointer",
      fontSize: "16px",
    },

    /* Features */
    section: {
      padding: "60px 20px",
      textAlign: "center",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
      marginTop: "30px",
    },
    card: {
      background: theme.card,
      padding: "25px",
      borderRadius: "12px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    },

    /* Footer */
    footer: {
      background: theme.card,
      textAlign: "center",
      padding: "20px",
      borderTop: "1px solid #ccc",
    },
  };

  return (
    <div style={styles.page}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>Prime</div>

        <div style={styles.navLinks}>
          <span style={styles.link}>Home</span>
          <span style={styles.link}>About</span>
          <span style={styles.link}>Contact</span>

          <button
            style={styles.toggleBtn}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "Light" : "Dark"}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.title}>Welcome to Prime</h1>
        <p style={styles.subtitle}>
          A modern, fast, and scalable React application with clean UI and
          powerful features.
        </p>
        <button style={styles.button} onClick={onGetStarted}>
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section style={styles.section}>
        <h2>Our Features</h2>

        <div style={styles.grid}>
          <div style={styles.card}>
            <h3>Fast Performance</h3>
            <p>Optimized for speed using modern React tools.</p>
          </div>

          <div style={styles.card}>
            <h3>Clean UI</h3>
            <p>Professional and minimal design for better experience.</p>
          </div>

          <div style={styles.card}>
            <h3>Responsive</h3>
            <p>Works perfectly on mobile, tablet, and desktop.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2026 Prime. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;