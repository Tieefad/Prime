import React, { useState } from "react";
import { Sun, Moon, Ticket, MapPin, Calendar, Star } from "lucide-react";

function Movies({ darkMode, setDarkMode, onNavigate }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [toggleHover, setToggleHover] = useState(false);
  const [hoveredNavLink, setHoveredNavLink] = useState(null);
  const [signInHover, setSignInHover] = useState(false);

  const theme = {
    background: darkMode ? "#0a0f1e" : "#f8fafc",
    text: darkMode ? "#f1f5f9" : "#0f172a",
    subtext: darkMode ? "#94a3b8" : "#64748b",
    card: darkMode ? "#111827" : "#ffffff",
    cardBorder: darkMode ? "#1e293b" : "#e2e8f0",
    primary: "#4facfe",
    navbar: darkMode ? "rgba(10,15,30,0.85)" : "rgba(255,255,255,0.85)",
  };

  const movies = [
    { id: 1, title: "Toofan", location: "Star Cineplex, Bashundhara", date: "Now Showing", price: "৳ 350", rating: 4.7, badge: "🎬 Action", color: "#f59e0b" },
    { id: 2, title: "Oppenheimer Re-release", location: "Blockbuster Cinemas, Uttara", date: "Now Showing", price: "৳ 400", rating: 4.8, badge: "🎬 Drama", color: "#3b82f6" },
    { id: 3, title: "Hawa 2", location: "Star Cineplex, Shimanto Square", date: "10 Mar 2026", price: "৳ 350", rating: 4.9, badge: "🎬 Thriller", color: "#8b5cf6" },
    { id: 4, title: "Poran", location: "Blockbuster Cinemas, Dhanmondi", date: "Now Showing", price: "৳ 300", rating: 4.6, badge: "🎬 Romance", color: "#ec4899" },
    { id: 5, title: "Avatar 3", location: "Star Cineplex, Bashundhara", date: "15 Mar 2026", price: "৳ 500", rating: 4.9, badge: "🎬 Sci-Fi", color: "#10b981" },
    { id: 6, title: "Shonibar Bikel", location: "Minster Cineplex, Gulshan", date: "Now Showing", price: "৳ 280", rating: 4.7, badge: "🎬 Drama", color: "#f59e0b" },
  ];

  const navLinks = ["Home", "Events", "Movies", "Sports", "Concerts"];

  const getNavLinkStyle = (index) => ({
    cursor: "pointer", fontSize: "15px", fontWeight: "600",
    color: hoveredNavLink === index ? theme.primary : theme.subtext,
    transform: hoveredNavLink === index ? "translateY(-2px)" : "translateY(0)",
    transition: "all 0.25s ease", paddingBottom: "4px",
    borderBottom: hoveredNavLink === index ? `2px solid ${theme.primary}` : "2px solid transparent",
  });

  const getCardStyle = (index) => ({
    background: theme.card, borderRadius: "16px",
    border: `1px solid ${hoveredCard === index ? "#4facfe" : theme.cardBorder}`,
    boxShadow: hoveredCard === index ? "0 20px 40px rgba(79,172,254,0.2)" : "0 4px 16px rgba(0,0,0,0.06)",
    transform: hoveredCard === index ? "translateY(-8px)" : "translateY(0)",
    transition: "all 0.3s ease", cursor: "pointer", overflow: "hidden",
  });

  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", background: theme.background, color: theme.text, minHeight: "100vh" }}>

      {/* NAVBAR */}
      <nav style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "14px 40px", background: theme.navbar, backdropFilter: "blur(12px)",
        boxShadow: "0 1px 20px rgba(0,0,0,0.1)", position: "sticky", top: 0, zIndex: 1000,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }} onClick={() => onNavigate("home")}>
          <Ticket size={22} color={theme.primary} />
          <span style={{ fontSize: "22px", fontWeight: "800", background: "linear-gradient(135deg, #4facfe, #00f2fe)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>PrimePass</span>
        </div>
        <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
          {navLinks.map((l, i) => (
            <span key={i} style={getNavLinkStyle(i)}
              onMouseEnter={() => setHoveredNavLink(i)}
              onMouseLeave={() => setHoveredNavLink(null)}
              onClick={() => onNavigate(l.toLowerCase())}
            >{l}</span>
          ))}
          <button style={{
            width: "42px", height: "42px", borderRadius: "50%",
            border: `2px solid ${darkMode ? "#1e293b" : "#e2e8f0"}`,
            cursor: "pointer", background: darkMode ? "#1e293b" : "#f1f5f9",
            color: darkMode ? "#fbbf24" : "#6366f1",
            display: "flex", alignItems: "center", justifyContent: "center",
            transform: toggleHover ? "scale(1.1) rotate(15deg)" : "scale(1)", transition: "all 0.3s ease",
          }}
            onClick={() => setDarkMode(!darkMode)}
            onMouseEnter={() => setToggleHover(true)}
            onMouseLeave={() => setToggleHover(false)}
          >
            {darkMode ? <Sun size={17} strokeWidth={2} /> : <Moon size={17} strokeWidth={2} />}
          </button>
          <button style={{
            padding: "9px 22px", borderRadius: "999px", border: "none",
            background: signInHover ? "linear-gradient(135deg, #0ea5e9, #8b5cf6)" : "linear-gradient(135deg, #4facfe, #a78bfa)",
            color: "#fff", fontWeight: "700", fontSize: "14px", cursor: "pointer",
            transform: signInHover ? "translateY(-2px) scale(1.05)" : "translateY(0) scale(1)", transition: "all 0.3s ease",
          }}
            onClick={() => onNavigate("login")}
            onMouseEnter={() => setSignInHover(true)}
            onMouseLeave={() => setSignInHover(false)}
          >Sign In</button>
        </div>
      </nav>

      {/* BACK BUTTON */}
      <div style={{ padding: "16px 40px", background: theme.background }}>
        <button
          onClick={() => onNavigate("home")}
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "none", border: `1.5px solid ${theme.cardBorder}`,
            borderRadius: "999px", padding: "7px 18px",
            color: theme.subtext, fontSize: "14px", fontWeight: "600",
            cursor: "pointer", transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#4facfe";
            e.currentTarget.style.borderColor = "#4facfe";
            e.currentTarget.style.transform = "translateX(-3px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = theme.subtext;
            e.currentTarget.style.borderColor = theme.cardBorder;
            e.currentTarget.style.transform = "translateX(0)";
          }}
        >
          ← Back to Home
        </button>
      </div>

      {/* HERO */}
      <div style={{
        padding: "40px 40px 40px", textAlign: "center",
        background: darkMode ? "linear-gradient(135deg, #0a0f1e, #0f172a, #1a1040)" : "linear-gradient(135deg, #e0f2fe, #f0f9ff, #ede9fe)",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          background: darkMode ? "rgba(79,172,254,0.15)" : "rgba(79,172,254,0.1)",
          border: "1px solid rgba(79,172,254,0.3)", borderRadius: "999px",
          padding: "6px 16px", fontSize: "13px", color: theme.primary, fontWeight: "600", marginBottom: "20px",
        }}>🎬 Now Showing in Dhaka</div>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: "800", marginBottom: "12px", letterSpacing: "-1px" }}>
          Latest <span style={{ background: "linear-gradient(135deg, #4facfe, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Movies</span>
        </h1>
        <p style={{ fontSize: "16px", color: theme.subtext, maxWidth: "500px", margin: "0 auto" }}>
          Book your seats at Star Cineplex, Blockbuster and more across Dhaka.
        </p>
      </div>

      {/* GRID */}
      <div style={{ padding: "50px 40px 60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
          {movies.map((e, i) => (
            <div key={e.id} style={getCardStyle(i)} onMouseEnter={() => setHoveredCard(i)} onMouseLeave={() => setHoveredCard(null)}>
              <div style={{ height: "6px", background: `linear-gradient(90deg, ${e.color}, #4facfe)` }} />
              <div style={{ padding: "20px" }}>
                <div style={{ display: "inline-block", background: `${e.color}22`, color: e.color, fontSize: "12px", fontWeight: "700", padding: "4px 10px", borderRadius: "999px", marginBottom: "12px" }}>{e.badge}</div>
                <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "12px", lineHeight: "1.4", color: theme.text }}>{e.title}</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: theme.subtext, marginBottom: "6px" }}><MapPin size={13} /> {e.location}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: theme.subtext, marginBottom: "16px" }}><Calendar size={13} /> {e.date}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "20px", fontWeight: "800", color: theme.primary }}>{e.price}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <Star size={13} fill="#fbbf24" color="#fbbf24" />
                    <span style={{ fontSize: "13px", fontWeight: "600" }}>{e.rating}</span>
                  </div>
                </div>
                <button style={{
                  width: "100%", marginTop: "14px", padding: "10px", borderRadius: "999px", border: "none",
                  background: hoveredCard === i ? "linear-gradient(135deg, #4facfe, #a78bfa)" : darkMode ? "#1e293b" : "#f1f5f9",
                  color: hoveredCard === i ? "#fff" : theme.subtext, fontWeight: "700", fontSize: "14px", cursor: "pointer", transition: "all 0.3s ease",
                }}>Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Movies;