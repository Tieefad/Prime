import React, { useState } from "react";
import { Sun, Moon, Ticket, MapPin, Calendar, ChevronRight, Star } from "lucide-react";

function Home({ darkMode, setDarkMode, onGetStarted }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [btnHover, setBtnHover] = useState(false);
  const [toggleHover, setToggleHover] = useState(false);
  const [hoveredCat, setHoveredCat] = useState(null);
  const [signInHover, setSignInHover] = useState(false);
  const [hoveredFooterLink, setHoveredFooterLink] = useState(null);
  const [hoveredContact, setHoveredContact] = useState(null);
  const [hoveredNavLink, setHoveredNavLink] = useState(null);

  const theme = {
    background: darkMode ? "#0a0f1e" : "#f8fafc",
    text: darkMode ? "#f1f5f9" : "#0f172a",
    subtext: darkMode ? "#94a3b8" : "#64748b",
    card: darkMode ? "#111827" : "#ffffff",
    cardBorder: darkMode ? "#1e293b" : "#e2e8f0",
    primary: "#4facfe",
    navbar: darkMode ? "rgba(10,15,30,0.85)" : "rgba(255,255,255,0.85)",
  };

  const events = [
    {
      id: 1,
      category: "Cricket",
      title: "BPL 2025 — Dhaka Capitals vs Chattogram Challengers",
      location: "Sher-e-Bangla National Cricket Stadium, Mirpur",
      date: "15 Feb 2026",
      price: "৳ 500",
      rating: 4.9,
      badge: "🏏 Cricket",
      color: "#10b981",
    },
    {
      id: 2,
      category: "Concert",
      title: "Shironamhin Live in Concert — Dhaka",
      location: "Bangladesh Army Stadium, Banani",
      date: "22 Feb 2026",
      price: "৳ 800",
      rating: 4.8,
      badge: "🎵 Concert",
      color: "#8b5cf6",
    },
    {
      id: 3,
      category: "Movie",
      title: "Toofan — Star Cineplex, Bashundhara",
      location: "Star Cineplex, Bashundhara City",
      date: "Now Showing",
      price: "৳ 350",
      rating: 4.7,
      badge: "🎬 Movie",
      color: "#f59e0b",
    },
    {
      id: 4,
      category: "Concert",
      title: "Aurthohin Live — Dhaka Special Night",
      location: "International Convention City Bashundhara",
      date: "1 Mar 2026",
      price: "৳ 1000",
      rating: 4.9,
      badge: "🎵 Concert",
      color: "#8b5cf6",
    },
    {
      id: 5,
      category: "Sports",
      title: "Abahani vs Mohammedan — DPL Football",
      location: "Bangabandhu National Stadium, Motijheel",
      date: "10 Mar 2026",
      price: "৳ 200",
      rating: 4.6,
      badge: "⚽ Football",
      color: "#10b981",
    },
    {
      id: 6,
      category: "Movie",
      title: "Oppenheimer Re-release — Blockbuster Cinemas",
      location: "Blockbuster Cinemas, Uttara",
      date: "Now Showing",
      price: "৳ 400",
      rating: 4.8,
      badge: "🎬 Movie",
      color: "#f59e0b",
    },
  ];

  const categories = [
    { icon: "🏏", label: "Cricket" },
    { icon: "🎵", label: "Concerts" },
    { icon: "🎬", label: "Movies" },
    { icon: "⚽", label: "Football" },
  ];

  const navLinks = ["Events", "Movies", "Sports", "Concerts"];

  const styles = {
    page: {
      fontFamily: "'Segoe UI', Arial, sans-serif",
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
      padding: "14px 40px",
      background: theme.navbar,
      backdropFilter: "blur(12px)",
      boxShadow: "0 1px 20px rgba(0,0,0,0.1)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    },
    logoWrap: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    logoIcon: {
      color: theme.primary,
    },
    logoText: {
      fontSize: "22px",
      fontWeight: "800",
      background: "linear-gradient(135deg, #4facfe, #00f2fe)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      letterSpacing: "-0.5px",
    },
    navLinks: {
      display: "flex",
      gap: "30px",
      alignItems: "center",
    },
    toggleBtn: {
      width: "42px",
      height: "42px",
      borderRadius: "50%",
      border: `2px solid ${darkMode ? "#1e293b" : "#e2e8f0"}`,
      cursor: "pointer",
      background: darkMode ? "#1e293b" : "#f1f5f9",
      color: darkMode ? "#fbbf24" : "#6366f1",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: toggleHover
        ? darkMode
          ? "0 0 15px rgba(251,191,36,0.4)"
          : "0 0 15px rgba(99,102,241,0.4)"
        : "0 2px 8px rgba(0,0,0,0.1)",
      transform: toggleHover
        ? "scale(1.1) rotate(15deg)"
        : "scale(1) rotate(0deg)",
      transition: "all 0.3s ease",
    },
    hero: {
      padding: "90px 40px 70px",
      textAlign: "center",
      background: darkMode
        ? "linear-gradient(135deg, #0a0f1e 0%, #0f172a 50%, #1a1040 100%)"
        : "linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 50%, #ede9fe 100%)",
      position: "relative",
      overflow: "hidden",
    },
    heroBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      background: darkMode
        ? "rgba(79,172,254,0.15)"
        : "rgba(79,172,254,0.1)",
      border: "1px solid rgba(79,172,254,0.3)",
      borderRadius: "999px",
      padding: "6px 16px",
      fontSize: "13px",
      color: theme.primary,
      fontWeight: "600",
      marginBottom: "24px",
    },
    heroTitle: {
      fontSize: "clamp(32px, 5vw, 58px)",
      fontWeight: "800",
      marginBottom: "16px",
      lineHeight: "1.15",
      letterSpacing: "-1px",
    },
    heroGradient: {
      background: "linear-gradient(135deg, #4facfe, #a78bfa)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    heroSub: {
      fontSize: "18px",
      color: theme.subtext,
      maxWidth: "560px",
      margin: "0 auto 36px",
      lineHeight: "1.6",
    },
    heroBtn: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "14px 36px",
      border: "none",
      borderRadius: "999px",
      background: btnHover
        ? "linear-gradient(135deg, #0ea5e9, #8b5cf6)"
        : "linear-gradient(135deg, #4facfe, #a78bfa)",
      color: "#fff",
      cursor: "pointer",
      fontSize: "17px",
      fontWeight: "700",
      boxShadow: btnHover
        ? "0 12px 30px rgba(79,172,254,0.5)"
        : "0 6px 20px rgba(79,172,254,0.35)",
      transform: btnHover
        ? "translateY(-4px) scale(1.05)"
        : "translateY(0) scale(1)",
      transition: "all 0.3s ease",
    },
    catSection: {
      padding: "40px 40px 10px",
      textAlign: "center",
    },
    catGrid: {
      display: "flex",
      justifyContent: "center",
      gap: "16px",
      flexWrap: "wrap",
      marginTop: "20px",
    },
    catChip: {
      padding: "10px 24px",
      borderRadius: "999px",
      cursor: "pointer",
      fontSize: "15px",
      fontWeight: "600",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    section: {
      padding: "50px 40px 60px",
    },
    sectionHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "28px",
    },
    sectionTitle: {
      fontSize: "24px",
      fontWeight: "800",
      letterSpacing: "-0.5px",
    },
    seeAll: {
      color: theme.primary,
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
      display: "flex",
      alignItems: "center",
      gap: "4px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "24px",
    },
    footer: {
      background: darkMode ? "#060d1a" : "#0f172a",
      color: "#94a3b8",
      padding: "50px 40px 30px",
      marginTop: "auto",
    },
    footerGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "40px",
      marginBottom: "40px",
    },
    footerLogo: {
      fontSize: "20px",
      fontWeight: "800",
      background: "linear-gradient(135deg, #4facfe, #00f2fe)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      marginBottom: "10px",
    },
    footerBottom: {
      borderTop: "1px solid #1e293b",
      paddingTop: "20px",
      textAlign: "center",
      fontSize: "13px",
    },
  };

  const getCardStyle = (index) => ({
    background: theme.card,
    borderRadius: "16px",
    border: `1px solid ${hoveredCard === index ? "#4facfe" : theme.cardBorder}`,
    boxShadow:
      hoveredCard === index
        ? "0 20px 40px rgba(79,172,254,0.2)"
        : "0 4px 16px rgba(0,0,0,0.06)",
    transform: hoveredCard === index ? "translateY(-8px)" : "translateY(0)",
    transition: "all 0.3s ease",
    cursor: "pointer",
    overflow: "hidden",
  });

  const getNavLinkStyle = (index) => ({
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
    color: hoveredNavLink === index ? theme.primary : theme.subtext,
    transform: hoveredNavLink === index
      ? "translateY(-2px)"
      : "translateY(0)",
    transition: "all 0.25s ease",
    position: "relative",
    paddingBottom: "4px",
    borderBottom: hoveredNavLink === index
      ? `2px solid ${theme.primary}`
      : "2px solid transparent",
  });

  return (
    <div style={styles.page}>

      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <div style={styles.logoWrap}>
          <Ticket size={22} style={styles.logoIcon} />
          <span style={styles.logoText}>PrimePass</span>
        </div>
        <div style={styles.navLinks}>
          {navLinks.map((l, i) => (
            <span
              key={i}
              style={getNavLinkStyle(i)}
              onMouseEnter={() => setHoveredNavLink(i)}
              onMouseLeave={() => setHoveredNavLink(null)}
            >
              {l}
            </span>
          ))}
          <button
            style={styles.toggleBtn}
            onClick={() => setDarkMode(!darkMode)}
            onMouseEnter={() => setToggleHover(true)}
            onMouseLeave={() => setToggleHover(false)}
            title={darkMode ? "Switch to Light" : "Switch to Dark"}
          >
            {darkMode
              ? <Sun size={17} strokeWidth={2} />
              : <Moon size={17} strokeWidth={2} />}
          </button>
          <button
            style={{
              padding: "9px 22px",
              borderRadius: "999px",
              border: "none",
              background: signInHover
                ? "linear-gradient(135deg, #0ea5e9, #8b5cf6)"
                : "linear-gradient(135deg, #4facfe, #a78bfa)",
              color: "#fff",
              fontWeight: "700",
              fontSize: "14px",
              cursor: "pointer",
              boxShadow: signInHover
                ? "0 8px 25px rgba(79,172,254,0.6)"
                : "0 4px 14px rgba(79,172,254,0.35)",
              transform: signInHover
                ? "translateY(-2px) scale(1.05)"
                : "translateY(0) scale(1)",
              transition: "all 0.3s ease",
            }}
            onClick={onGetStarted}
            onMouseEnter={() => setSignInHover(true)}
            onMouseLeave={() => setSignInHover(false)}
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroBadge}>
          <Ticket size={13} /> Bangladesh's #1 Ticket Platform
        </div>
        <h1 style={styles.heroTitle}>
          Book Tickets for <br />
          <span style={styles.heroGradient}>Events in Dhaka</span>
        </h1>
        <p style={styles.heroSub}>
          Cricket, Concerts, Movies & Sports — all in one place.
          Instant booking, real seats, zero hassle.
        </p>
        <button
          style={styles.heroBtn}
          onClick={onGetStarted}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
        >
          Explore Events <ChevronRight size={18} />
        </button>
      </section>

      {/* CATEGORIES */}
      <div style={styles.catSection}>
        <div style={styles.catGrid}>
          {categories.map((c, i) => (
            <div
              key={i}
              style={{
                ...styles.catChip,
                background: hoveredCat === i
                  ? "linear-gradient(135deg, #4facfe, #a78bfa)"
                  : theme.card,
                color: hoveredCat === i ? "#fff" : theme.text,
                border: `1.5px solid ${hoveredCat === i ? "transparent" : theme.cardBorder}`,
                boxShadow: hoveredCat === i
                  ? "0 8px 20px rgba(79,172,254,0.35)"
                  : "0 2px 8px rgba(0,0,0,0.06)",
                transform: hoveredCat === i
                  ? "translateY(-3px) scale(1.05)"
                  : "translateY(0) scale(1)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={() => setHoveredCat(i)}
              onMouseLeave={() => setHoveredCat(null)}
            >
              {c.icon} {c.label}
            </div>
          ))}
        </div>
      </div>

      {/* EVENTS */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionTitle}>🔥 Trending in Dhaka</span>
          <span style={styles.seeAll}>
            See all <ChevronRight size={14} />
          </span>
        </div>
        <div style={styles.grid}>
          {events.map((e, i) => (
            <div
              key={e.id}
              style={getCardStyle(i)}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={{
                height: "6px",
                background: `linear-gradient(90deg, ${e.color}, #4facfe)`,
              }} />
              <div style={{ padding: "20px" }}>
                <div style={{
                  display: "inline-block",
                  background: `${e.color}22`,
                  color: e.color,
                  fontSize: "12px",
                  fontWeight: "700",
                  padding: "4px 10px",
                  borderRadius: "999px",
                  marginBottom: "12px",
                }}>
                  {e.badge}
                </div>
                <h3 style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  marginBottom: "12px",
                  lineHeight: "1.4",
                  color: theme.text,
                }}>
                  {e.title}
                </h3>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "13px",
                  color: theme.subtext,
                  marginBottom: "6px",
                }}>
                  <MapPin size={13} /> {e.location}
                </div>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "13px",
                  color: theme.subtext,
                  marginBottom: "16px",
                }}>
                  <Calendar size={13} /> {e.date}
                </div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                  <span style={{
                    fontSize: "20px",
                    fontWeight: "800",
                    color: theme.primary,
                  }}>
                    {e.price}
                  </span>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}>
                    <Star size={13} fill="#fbbf24" color="#fbbf24" />
                    <span style={{
                      fontSize: "13px",
                      fontWeight: "600",
                    }}>
                      {e.rating}
                    </span>
                  </div>
                </div>
                <button style={{
                  width: "100%",
                  marginTop: "14px",
                  padding: "10px",
                  borderRadius: "999px",
                  border: "none",
                  background: hoveredCard === i
                    ? "linear-gradient(135deg, #4facfe, #a78bfa)"
                    : darkMode ? "#1e293b" : "#f1f5f9",
                  color: hoveredCard === i ? "#fff" : theme.subtext,
                  fontWeight: "700",
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}>
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerGrid}>
          <div>
            <div style={styles.footerLogo}>PrimePass</div>
            <p style={{ fontSize: "14px", lineHeight: "1.7" }}>
              Bangladesh's fastest ticket booking platform for
              events, movies, and sports.
            </p>
          </div>
          <div>
            <p style={{
              fontWeight: "700",
              color: "#f1f5f9",
              marginBottom: "12px",
            }}>
              Quick Links
            </p>
            {["Events", "Movies", "Sports", "Concerts"].map((l, i) => (
              <p
                key={l}
                style={{
                  fontSize: "14px",
                  marginBottom: "8px",
                  cursor: "pointer",
                  color: hoveredFooterLink === i ? "#4facfe" : "#94a3b8",
                  transform: hoveredFooterLink === i
                    ? "translateX(6px)"
                    : "translateX(0)",
                  transition: "all 0.25s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
                onMouseEnter={() => setHoveredFooterLink(i)}
                onMouseLeave={() => setHoveredFooterLink(null)}
              >
                {hoveredFooterLink === i && (
                  <ChevronRight size={13} color="#4facfe" />
                )}
                {l}
              </p>
            ))}
          </div>
          <div>
            <p style={{
              fontWeight: "700",
              color: "#f1f5f9",
              marginBottom: "12px",
            }}>
              Contact
            </p>
            {[
              { icon: "📧", text: "support@primepass.com.bd" },
              { icon: "📞", text: "+880 1700-000000" },
              { icon: "🌏", text: "Dhaka, Bangladesh" },
            ].map((c, i) => (
              <p
                key={i}
                style={{
                  fontSize: "14px",
                  marginBottom: "8px",
                  cursor: "pointer",
                  color: hoveredContact === i ? "#4facfe" : "#94a3b8",
                  transform: hoveredContact === i
                    ? "translateX(6px)"
                    : "translateX(0)",
                  transition: "all 0.25s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                onMouseEnter={() => setHoveredContact(i)}
                onMouseLeave={() => setHoveredContact(null)}
              >
                {c.icon} {c.text}
              </p>
            ))}
          </div>
        </div>
        <div style={styles.footerBottom}>
          © 2026 PrimePass. All rights reserved. Made with ❤️ in Bangladesh.
        </div>
      </footer>

    </div>
  );
}

export default Home;