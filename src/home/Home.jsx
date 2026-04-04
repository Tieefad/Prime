import React, { useState, useEffect } from "react";
import { Sun, Moon, Ticket, MapPin, Calendar, ChevronRight, Star, Search, LogOut, User } from "lucide-react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Home({ darkMode, setDarkMode, onNavigate, user }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [btnHover, setBtnHover] = useState(false);
  const [toggleHover, setToggleHover] = useState(false);
  const [hoveredCat, setHoveredCat] = useState(null);
  const [signInHover, setSignInHover] = useState(false);
  const [hoveredFooterLink, setHoveredFooterLink] = useState(null);
  const [hoveredContact, setHoveredContact] = useState(null);
  const [hoveredNavLink, setHoveredNavLink] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const theme = {
    background: darkMode ? "#0a0f1e" : "#f8fafc",
    text: darkMode ? "#f1f5f9" : "#0f172a",
    subtext: darkMode ? "#94a3b8" : "#64748b",
    card: darkMode ? "#111827" : "#ffffff",
    cardBorder: darkMode ? "#1e293b" : "#e2e8f0",
    primary: "#4facfe",
    navbar: darkMode ? "rgba(10,15,30,0.95)" : "rgba(255,255,255,0.95)",
  };

  const categories = ["All", "Cricket", "Concert", "Movie", "Football", "Other"];
  const navLinks = ["Events", "Movies", "Sports", "Concerts"];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const q = query(collection(db, "events"), orderBy("createdAt", "desc"), limit(6));
      const snap = await getDocs(q);
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const filteredEvents = events.filter(e => {
    const matchSearch = e.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = activeCategory === "All" || e.category === activeCategory;
    return matchSearch && matchCat;
  });

  const handleLogout = async () => {
    await signOut(auth);
    setUserMenuOpen(false);
  };

  const getCategoryColor = (cat) => {
    const colors = {
      Cricket: "#10b981", Concert: "#8b5cf6",
      Movie: "#f59e0b", Football: "#3b82f6", Other: "#ec4899"
    };
    return colors[cat] || "#4facfe";
  };

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
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", background: theme.background, color: theme.text, minHeight: "100vh", display: "flex", flexDirection: "column" }}>

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

          {user ? (
            <div style={{ position: "relative" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: "8px", cursor: "pointer",
                padding: "8px 16px", borderRadius: "999px",
                background: darkMode ? "#1e293b" : "#f1f5f9",
                border: `1px solid ${theme.cardBorder}`,
              }} onClick={() => setUserMenuOpen(!userMenuOpen)}>
                <User size={16} color={theme.primary} />
                <span style={{ fontSize: "14px", fontWeight: "600", color: theme.text }}>
                  {user.displayName || user.email?.split("@")[0]}
                </span>
              </div>
              {userMenuOpen && (
                <div style={{
                  position: "absolute", right: 0, top: "50px",
                  background: theme.card, borderRadius: "12px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  border: `1px solid ${theme.cardBorder}`,
                  padding: "8px", minWidth: "180px", zIndex: 100,
                }}>
                  <div style={{ padding: "8px 12px", fontSize: "13px", color: theme.subtext, borderBottom: `1px solid ${theme.cardBorder}`, marginBottom: "8px" }}>
                    {user.email}
                  </div>
                  <div style={{ padding: "8px 12px", cursor: "pointer", borderRadius: "8px", fontSize: "14px", color: "#ef4444", display: "flex", alignItems: "center", gap: "8px" }}
                    onClick={handleLogout}
                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(239,68,68,0.1)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    <LogOut size={14} /> Sign Out
                  </div>
                </div>
              )}
            </div>
          ) : (
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
          )}
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        padding: "80px 40px 60px", textAlign: "center",
        background: darkMode ? "linear-gradient(135deg, #0a0f1e 0%, #0f172a 50%, #1a1040 100%)" : "linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 50%, #ede9fe 100%)",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          background: darkMode ? "rgba(79,172,254,0.15)" : "rgba(79,172,254,0.1)",
          border: "1px solid rgba(79,172,254,0.3)", borderRadius: "999px",
          padding: "6px 16px", fontSize: "13px", color: theme.primary, fontWeight: "600", marginBottom: "24px",
        }}>
          <Ticket size={13} /> Bangladesh's #1 Ticket Platform
        </div>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 58px)", fontWeight: "800", marginBottom: "16px", lineHeight: "1.15", letterSpacing: "-1px" }}>
          Book Tickets for <br />
          <span style={{ background: "linear-gradient(135deg, #4facfe, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Events in Dhaka
          </span>
        </h1>
        <p style={{ fontSize: "18px", color: theme.subtext, maxWidth: "560px", margin: "0 auto 36px", lineHeight: "1.6" }}>
          Cricket, Concerts, Movies & Sports — all in one place. Instant booking, real seats, zero hassle.
        </p>

        {/* SEARCH BAR */}
        <div style={{
          display: "flex", alignItems: "center", gap: "12px",
          background: theme.card, borderRadius: "999px", padding: "8px 8px 8px 20px",
          maxWidth: "520px", margin: "0 auto",
          border: `1.5px solid ${searchFocus ? "#4facfe" : theme.cardBorder}`,
          boxShadow: searchFocus ? "0 0 0 3px rgba(79,172,254,0.2)" : "0 4px 20px rgba(0,0,0,0.08)",
          transition: "all 0.3s ease",
        }}>
          <Search size={18} color={theme.subtext} />
          <input
            placeholder="Search events, concerts, movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
            style={{
              flex: 1, border: "none", outline: "none",
              background: "transparent", fontSize: "15px", color: theme.text,
            }}
          />
          <button style={{
            padding: "10px 24px", borderRadius: "999px", border: "none",
            background: btnHover ? "linear-gradient(135deg, #0ea5e9, #8b5cf6)" : "linear-gradient(135deg, #4facfe, #a78bfa)",
            color: "#fff", fontWeight: "700", fontSize: "14px", cursor: "pointer",
            transform: btnHover ? "scale(1.05)" : "scale(1)", transition: "all 0.3s ease",
          }}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
          >Search</button>
        </div>
      </section>

      {/* CATEGORIES */}
      <div style={{ padding: "30px 40px 10px", display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
        {categories.map((c, i) => (
          <div key={i} style={{
            padding: "8px 20px", borderRadius: "999px", cursor: "pointer",
            fontSize: "14px", fontWeight: "600",
            background: activeCategory === c ? "linear-gradient(135deg, #4facfe, #a78bfa)" : theme.card,
            color: activeCategory === c ? "#fff" : theme.text,
            border: `1.5px solid ${activeCategory === c ? "transparent" : theme.cardBorder}`,
            boxShadow: hoveredCat === i ? "0 8px 20px rgba(79,172,254,0.35)" : "0 2px 8px rgba(0,0,0,0.06)",
            transform: hoveredCat === i ? "translateY(-3px) scale(1.05)" : "translateY(0) scale(1)",
            transition: "all 0.3s ease",
          }}
            onClick={() => setActiveCategory(c)}
            onMouseEnter={() => setHoveredCat(i)}
            onMouseLeave={() => setHoveredCat(null)}
          >{c}</div>
        ))}
      </div>

      {/* EVENTS */}
      <section style={{ padding: "40px 40px 60px", flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
          <span style={{ fontSize: "24px", fontWeight: "800", letterSpacing: "-0.5px" }}>
            🔥 {searchQuery ? `Results for "${searchQuery}"` : "Trending in Dhaka"}
          </span>
          <span style={{ color: theme.primary, cursor: "pointer", fontSize: "14px", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}
            onClick={() => onNavigate("events")}
          >See all <ChevronRight size={14} /></span>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px", color: theme.subtext }}>
            <div style={{
              width: "40px", height: "40px", borderRadius: "50%",
              border: "3px solid #4facfe", borderTopColor: "transparent",
              animation: "spin 0.8s linear infinite", margin: "0 auto 16px",
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            Loading events...
          </div>
        ) : filteredEvents.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px", color: theme.subtext }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎫</div>
            <p style={{ fontSize: "18px", fontWeight: "600" }}>No events found</p>
            <p style={{ fontSize: "14px", marginTop: "8px" }}>
              {user ? "Check back later or ask admin to add events." : "Sign in to see personalized events."}
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
            {filteredEvents.map((e, i) => (
              <div key={e.id} style={getCardStyle(i)}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => onNavigate(`event-${e.id}`)}
              >
                <div style={{ height: "6px", background: `linear-gradient(90deg, ${getCategoryColor(e.category)}, #4facfe)` }} />
                <div style={{ padding: "20px" }}>
                  <div style={{
                    display: "inline-block", background: `${getCategoryColor(e.category)}22`,
                    color: getCategoryColor(e.category), fontSize: "12px", fontWeight: "700",
                    padding: "4px 10px", borderRadius: "999px", marginBottom: "12px",
                  }}>{e.category}</div>
                  <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "12px", lineHeight: "1.4", color: theme.text }}>{e.title}</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: theme.subtext, marginBottom: "6px" }}>
                    <MapPin size={13} /> {e.location}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: theme.subtext, marginBottom: "16px" }}>
                    <Calendar size={13} /> {e.date}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "20px", fontWeight: "800", color: theme.primary }}>৳ {e.price}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Star size={13} fill="#fbbf24" color="#fbbf24" />
                      <span style={{ fontSize: "13px", fontWeight: "600" }}>{e.rating || "4.8"}</span>
                    </div>
                  </div>
                  <button style={{
                    width: "100%", marginTop: "14px", padding: "10px", borderRadius: "999px", border: "none",
                    background: hoveredCard === i ? "linear-gradient(135deg, #4facfe, #a78bfa)" : darkMode ? "#1e293b" : "#f1f5f9",
                    color: hoveredCard === i ? "#fff" : theme.subtext,
                    fontWeight: "700", fontSize: "14px", cursor: "pointer", transition: "all 0.3s ease",
                  }}>Book Now</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer style={{ background: darkMode ? "#060d1a" : "#0f172a", color: "#94a3b8", padding: "50px 40px 30px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px", marginBottom: "40px" }}>
          <div>
            <div style={{ fontSize: "20px", fontWeight: "800", background: "linear-gradient(135deg, #4facfe, #00f2fe)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "10px" }}>PrimePass</div>
            <p style={{ fontSize: "14px", lineHeight: "1.7" }}>Bangladesh's fastest ticket booking platform for events, movies, and sports.</p>
          </div>
          <div>
            <p style={{ fontWeight: "700", color: "#f1f5f9", marginBottom: "12px" }}>Quick Links</p>
            {["Events", "Movies", "Sports", "Concerts"].map((l, i) => (
              <p key={l} style={{
                fontSize: "14px", marginBottom: "8px", cursor: "pointer",
                color: hoveredFooterLink === i ? "#4facfe" : "#94a3b8",
                transform: hoveredFooterLink === i ? "translateX(6px)" : "translateX(0)",
                transition: "all 0.25s ease", display: "flex", alignItems: "center", gap: "6px",
              }}
                onMouseEnter={() => setHoveredFooterLink(i)}
                onMouseLeave={() => setHoveredFooterLink(null)}
                onClick={() => onNavigate(l.toLowerCase())}
              >
                {hoveredFooterLink === i && <ChevronRight size={13} color="#4facfe" />}{l}
              </p>
            ))}
          </div>
          <div>
            <p style={{ fontWeight: "700", color: "#f1f5f9", marginBottom: "12px" }}>Contact</p>
            {[
              { icon: "📧", text: "support@primepass.com.bd" },
              { icon: "📞", text: "+880 1700-000000" },
              { icon: "🌏", text: "Dhaka, Bangladesh" },
            ].map((c, i) => (
              <p key={i} style={{
                fontSize: "14px", marginBottom: "8px", cursor: "pointer",
                color: hoveredContact === i ? "#4facfe" : "#94a3b8",
                transform: hoveredContact === i ? "translateX(6px)" : "translateX(0)",
                transition: "all 0.25s ease", display: "flex", alignItems: "center", gap: "8px",
              }}
                onMouseEnter={() => setHoveredContact(i)}
                onMouseLeave={() => setHoveredContact(null)}
              >{c.icon} {c.text}</p>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid #1e293b", paddingTop: "20px", textAlign: "center", fontSize: "13px" }}>
          © 2026 PrimePass. All rights reserved. Made with ❤️ in Bangladesh.
        </div>
      </footer>
    </div>
  );
}

export default Home;