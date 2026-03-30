import React, { useState } from "react";

function Home({ darkMode, setDarkMode, onGetStarted }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [btnHover, setBtnHover] = useState(false);

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
      padding: "12px 30px",
      border: "none",
      borderRadius: "25px",
      background: btnHover
        ? "linear-gradient(135deg, #0ea5e9, #6366f1)"
        : "linear-gradient(135deg, #4facfe, #00f2fe)",
      color: "#fff",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "bold",
      boxShadow: btnHover
        ? "0 8px 25px rgba(79,172,254,0.6)"
        : "0 4px 15px rgba(79,172,254,0.3)",
      transform: btnHover ? "translateY(-3px) scale(1.05)" : "translateY(0) scale(1)",
      transition: "all 0.3s ease",
    },

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

    footer: {
      background: theme.card,
      textAlign: "center",
      padding: "20px",
      borderTop: "1px solid #ccc",
    },
  };

  const getCardStyle = (index) => ({
    background: hoveredCard === index
      ? darkMode
        ? "linear-gradient(135deg, #1e3a5f, #1e293b)"
        : "linear-gradient(135deg, #e0f2fe, #ffffff)"
      : theme.card,
    padding: "30px 25px",
    borderRadius: "16px",
    boxShadow: hoveredCard === index
      ? "0 20px 40px rgba(79,172,254,0.3)"
      : "0 5px 15px rgba(0,0,0,0.1)",
    transform: hoveredCard === index ? "translateY(-10px) scale(1.03)" : "translateY(0) scale(1)",
    transition: "all 0.35s ease",
    cursor: "pointer",
    borderTop: hoveredCard === index ? "3px solid #4facfe" : "3px solid transparent",
  });

  const features = [
    {
      icon: "⚡",
      title: "Fast Performance",
      desc: "Optimized for speed using modern React tools.",
    },
    {
      icon: "🎨",
      title: "Clean UI",
      desc: "Professional and minimal design for better experience.",
    },
    {
      icon: "📱",
      title: "Responsive",
      desc: "Works perfectly on mobile, tablet, and desktop.",
    },
  ];

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

      {/* Hero */}
      <section style={styles.hero}>
        <h1 style={styles.title}>Welcome to Prime</h1>
        <p style={styles.subtitle}>
          A modern, fast, and scalable React application with clean UI and
          powerful features.
        </p>
        <button
          style={styles.button}
          onClick={onGetStarted}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
        >
          Get Started
        </button>
      </section>

      {/* Features */}
      <section style={styles.section}>
        <h2>Our Features</h2>
        <div style={styles.grid}>
          {features.map((f, i) => (
            <div
              key={i}
              style={getCardStyle(i)}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={{ fontSize: "36px", marginBottom: "12px" }}>{f.icon}</div>
              <h3 style={{ marginBottom: "10px" }}>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
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