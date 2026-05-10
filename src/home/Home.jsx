import React, { useState, useEffect } from "react";
import { MapPin, Calendar, ChevronRight, Star, Search } from "lucide-react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import Navbar from "../components/Navbar";

function Home({ darkMode, setDarkMode, onNavigate, user }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredCat, setHoveredCat] = useState(null);
  const [hoveredFooterLink, setHoveredFooterLink] = useState(null);
  const [hoveredContact, setHoveredContact] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentBg, setCurrentBg] = useState(0);

  const theme = {
    background: darkMode ? "#0a0800" : "#fafaf8",
    text: darkMode ? "#f1f5f9" : "#0f172a",
    subtext: darkMode ? "#94a3b8" : "#64748b",
    card: darkMode ? "#111008" : "#ffffff",
    cardBorder: darkMode ? "rgba(245,158,11,0.2)" : "#e2e8f0",
    primary: "#f59e0b",
    gold: "#fbbf24",
  };

  const categories = ["All", "Cricket", "Concert", "Movie", "Football", "Other"];

  const bgImages = [
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&q=80",
    "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1920&q=80",
    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1920&q=80",
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&q=80",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&q=80",
  ];

  useEffect(() => {
    fetchEvents();
    const interval = setInterval(() => {
      setCurrentBg(prev => (prev + 1) % bgImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const fetchEvents = async () => {
    try {
      const q = query(collection(db, "events"), orderBy("createdAt", "desc"), limit(6));
      const snap = await getDocs(q);
      setEvents(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const filteredEvents = events.filter(e => {
    const matchSearch = e.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = activeCategory === "All" || e.category === activeCategory;
    return matchSearch && matchCat;
  });

  const getCategoryColor = (cat) => {
    const colors = {
      Cricket: "#10b981", Concert: "#8b5cf6",
      Movie: "#f59e0b", Football: "#3b82f6", Other: "#ec4899"
    };
    return colors[cat] || "#f59e0b";
  };

  const getCardStyle = (index) => ({
    background: theme.card,
    borderRadius: "16px",
    border: `1px solid ${hoveredCard === index ? "#f59e0b" : theme.cardBorder}`,
    boxShadow: hoveredCard === index
      ? "0 20px 40px rgba(245,158,11,0.2)"
      : darkMode ? "0 4px 16px rgba(0,0,0,0.3)" : "0 4px 16px rgba(0,0,0,0.06)",
    transform: hoveredCard === index ? "translateY(-8px)" : "translateY(0)",
    transition: "all 0.3s ease",
    cursor: "pointer",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  });

  return (
    <div style={{
      fontFamily: "'Segoe UI', Arial, sans-serif",
      background: theme.background,
      color: theme.text,
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .hero-bg {
          transition: opacity 1.5s ease;
        }
        .event-card:hover .book-btn {
          background: linear-gradient(135deg, #f59e0b, #fbbf24) !important;
          color: #000 !important;
        }
      `}</style>

      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} onNavigate={onNavigate} user={user} />

      {/* HERO */}
      <section style={{ position: "relative", minHeight: "560px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {/* BACKGROUND SLIDESHOW */}
        {bgImages.map((img, i) => (
          <div key={i} style={{
            position: "absolute", inset: 0,
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: currentBg === i ? 1 : 0,
            transition: "opacity 1.5s ease",
            zIndex: 0,
          }} />
        ))}

        {/* DARK OVERLAY */}
        <div style={{
          position: "absolute", inset: 0,
          background: darkMode
            ? "linear-gradient(135deg, rgba(10,8,3,0.88) 0%, rgba(20,15,5,0.85) 100%)"
            : "linear-gradient(135deg, rgba(10,8,3,0.75) 0%, rgba(20,15,5,0.72) 100%)",
          zIndex: 1,
        }} />

        {/* GOLD GRADIENT OVERLAY */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, transparent 0%, rgba(245,158,11,0.08) 100%)",
          zIndex: 1,
        }} />

        {/* CONTENT */}
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "60px 24px", width: "100%", maxWidth: "800px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(245,158,11,0.15)",
            border: "1px solid rgba(245,158,11,0.4)",
            borderRadius: "999px",
            padding: "6px 18px", fontSize: "13px",
            color: "#fbbf24", fontWeight: "600", marginBottom: "24px",
            backdropFilter: "blur(8px)",
            animation: "slideUp 0.8s ease forwards",
          }}>
            🐉 Bangladesh's #1 Entertainment Platform
          </div>

          <h1 style={{
            fontSize: "clamp(32px, 6vw, 64px)",
            fontWeight: "900",
            marginBottom: "16px",
            lineHeight: "1.1",
            letterSpacing: "-1px",
            color: "#fff",
            animation: "slideUp 0.8s ease 0.1s forwards",
          }}>
            Book Tickets for<br />
            <span style={{
              background: "linear-gradient(135deg, #f59e0b, #fbbf24, #f59e0b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "200% auto",
            }}>
              Events in Dhaka
            </span>
          </h1>

          <p style={{
            fontSize: "clamp(15px, 2vw, 18px)",
            color: "rgba(255,255,255,0.8)",
            maxWidth: "520px",
            margin: "0 auto 36px",
            lineHeight: "1.6",
            animation: "slideUp 0.8s ease 0.2s forwards",
          }}>
            Cricket, Concerts, Movies & Sports — all in one place. Instant booking, real seats, zero hassle.
          </p>

          {/* SEARCH BAR */}
          <div style={{
            display: "flex", alignItems: "center", gap: "8px",
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(12px)",
            borderRadius: "999px", padding: "8px 8px 8px 20px",
            maxWidth: "540px", margin: "0 auto",
            border: `1.5px solid ${searchFocus ? "#f59e0b" : "rgba(245,158,11,0.3)"}`,
            boxShadow: searchFocus ? "0 0 0 3px rgba(245,158,11,0.2)" : "0 8px 32px rgba(0,0,0,0.3)",
            transition: "all 0.3s ease",
            animation: "slideUp 0.8s ease 0.3s forwards",
          }}>
            <Search size={18} color="rgba(255,255,255,0.6)" />
            <input
              placeholder="Search events, concerts, movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setSearchFocus(false)}
              style={{
                flex: 1, border: "none", outline: "none",
                background: "transparent", fontSize: "15px",
                color: "#fff", minWidth: 0,
              }}
            />
            <button style={{
              padding: "10px 24px", borderRadius: "999px", border: "none",
              background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
              color: "#000", fontWeight: "700", fontSize: "14px", cursor: "pointer",
              whiteSpace: "nowrap",
              boxShadow: "0 4px 15px rgba(245,158,11,0.4)",
              transition: "all 0.3s ease",
            }}>Search</button>
          </div>

          {/* SLIDESHOW DOTS */}
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "24px" }}>
            {bgImages.map((_, i) => (
              <div key={i} onClick={() => setCurrentBg(i)} style={{
                width: currentBg === i ? "24px" : "8px",
                height: "8px", borderRadius: "999px",
                background: currentBg === i ? "#f59e0b" : "rgba(255,255,255,0.4)",
                cursor: "pointer", transition: "all 0.3s ease",
              }} />
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <div style={{
        padding: "30px 24px 10px",
        display: "flex", justifyContent: "center",
        gap: "10px", flexWrap: "wrap",
      }}>
        {categories.map((c, i) => (
          <div key={i} style={{
            padding: "8px 18px", borderRadius: "999px", cursor: "pointer",
            fontSize: "14px", fontWeight: "600",
            background: activeCategory === c
              ? "linear-gradient(135deg, #f59e0b, #fbbf24)"
              : theme.card,
            color: activeCategory === c ? "#000" : theme.text,
            border: `1.5px solid ${activeCategory === c ? "transparent" : theme.cardBorder}`,
            boxShadow: hoveredCat === i
              ? "0 8px 20px rgba(245,158,11,0.35)"
              : "0 2px 8px rgba(0,0,0,0.06)",
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
      <section style={{ padding: "40px 24px 60px", flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
          <span style={{ fontSize: "clamp(18px, 3vw, 24px)", fontWeight: "800", letterSpacing: "-0.5px" }}>
            🔥 {searchQuery ? `Results for "${searchQuery}"` : "Trending in Dhaka"}
          </span>
          <span style={{
            color: theme.primary, cursor: "pointer", fontSize: "14px",
            fontWeight: "600", display: "flex", alignItems: "center", gap: "4px",
            whiteSpace: "nowrap",
          }} onClick={() => onNavigate("events")}>
            See all <ChevronRight size={14} />
          </span>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px", color: theme.subtext }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "3px solid #f59e0b", borderTopColor: "transparent", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
            Loading events...
          </div>
        ) : filteredEvents.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px", color: theme.subtext }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎫</div>
            <p style={{ fontSize: "18px", fontWeight: "600" }}>No events found</p>
            <p style={{ fontSize: "14px", marginTop: "8px" }}>
              {user ? "Check back later." : "Sign in to see personalized events."}
            </p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px",
            alignItems: "stretch",
          }}>
            {filteredEvents.map((e, i) => (
              <div key={e.id}
                className="event-card"
                style={getCardStyle(i)}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={{ height: "6px", background: `linear-gradient(90deg, ${getCategoryColor(e.category)}, #f59e0b)`, flexShrink: 0 }} />
                <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <div style={{
                    display: "inline-block",
                    background: `${getCategoryColor(e.category)}22`,
                    color: getCategoryColor(e.category),
                    fontSize: "12px", fontWeight: "700",
                    padding: "4px 10px", borderRadius: "999px", marginBottom: "12px",
                    alignSelf: "flex-start",
                  }}>{e.category}</div>
                  <h3 style={{
                    fontSize: "16px", fontWeight: "700", marginBottom: "12px",
                    lineHeight: "1.4", color: theme.text, flex: 1,
                  }}>{e.title}</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: theme.subtext, marginBottom: "6px" }}>
                    <MapPin size={13} /> {e.location}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: theme.subtext, marginBottom: "16px" }}>
                    <Calendar size={13} /> {e.date}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                    <span style={{ fontSize: "20px", fontWeight: "800", color: "#f59e0b" }}>৳ {e.price}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Star size={13} fill="#fbbf24" color="#fbbf24" />
                      <span style={{ fontSize: "13px", fontWeight: "600" }}>{e.rating || "4.8"}</span>
                    </div>
                  </div>
                  <button
                    className="book-btn"
                    style={{
                      width: "100%", padding: "10px",
                      borderRadius: "999px", border: "none",
                      background: darkMode ? "rgba(245,158,11,0.1)" : "#f1f5f9",
                      color: darkMode ? "#fbbf24" : theme.subtext,
                      fontWeight: "700", fontSize: "14px", cursor: "pointer",
                      transition: "all 0.3s ease",
                      border: `1px solid ${darkMode ? "rgba(245,158,11,0.2)" : "#e2e8f0"}`,
                    }}
                    onClick={() => user ? onNavigate(`book-${e.id}`) : onNavigate("login")}
                  >
                    {user ? "Book Now" : "Sign In to Book"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer style={{
        background: darkMode ? "#060400" : "#0f0a00",
        color: "#94a3b8", padding: "50px 24px 30px",
        borderTop: "1px solid rgba(245,158,11,0.2)",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "40px", marginBottom: "40px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <span style={{ fontSize: "24px" }}>🐉</span>
              <span style={{ fontSize: "20px", fontWeight: "900", background: "linear-gradient(135deg, #f59e0b, #fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Dragon Piece</span>
            </div>
            <p style={{ fontSize: "14px", lineHeight: "1.7" }}>Bangladesh's #1 entertainment & ticket booking platform.</p>
          </div>
          <div>
            <p style={{ fontWeight: "700", color: "#fbbf24", marginBottom: "12px" }}>Quick Links</p>
            {["Events", "Movies", "Sports", "Concerts"].map((l, i) => (
              <p key={l} style={{
                fontSize: "14px", marginBottom: "8px", cursor: "pointer",
                color: hoveredFooterLink === i ? "#f59e0b" : "#94a3b8",
                transform: hoveredFooterLink === i ? "translateX(6px)" : "translateX(0)",
                transition: "all 0.25s ease",
                display: "flex", alignItems: "center", gap: "6px",
              }}
                onMouseEnter={() => setHoveredFooterLink(i)}
                onMouseLeave={() => setHoveredFooterLink(null)}
                onClick={() => onNavigate(l.toLowerCase())}
              >
                {hoveredFooterLink === i && <ChevronRight size={13} color="#f59e0b" />}{l}
              </p>
            ))}
          </div>
          <div>
            <p style={{ fontWeight: "700", color: "#fbbf24", marginBottom: "12px" }}>Contact</p>
            {[
              { icon: "📧", text: "support@dragonpiece.com.bd" },
              { icon: "📞", text: "+880 1700-000000" },
              { icon: "📍", text: "Dhaka, Bangladesh" },
            ].map((c, i) => (
              <p key={i} style={{
                fontSize: "14px", marginBottom: "8px", cursor: "pointer",
                color: hoveredContact === i ? "#f59e0b" : "#94a3b8",
                transform: hoveredContact === i ? "translateX(6px)" : "translateX(0)",
                transition: "all 0.25s ease",
                display: "flex", alignItems: "center", gap: "8px",
              }}
                onMouseEnter={() => setHoveredContact(i)}
                onMouseLeave={() => setHoveredContact(null)}
              >{c.icon} {c.text}</p>
            ))}
          </div>
        </div>
        <div style={{
          borderTop: "1px solid rgba(245,158,11,0.2)",
          paddingTop: "20px", textAlign: "center", fontSize: "13px",
          color: "#64748b",
        }}>
          © 2026 Dragon Piece. All rights reserved. &nbsp;|&nbsp; Made by <span style={{ color: "#f59e0b", fontWeight: "700" }}>EFAD</span> & 🌥️
        </div>
      </footer>
    </div>
  );
}

export default Home;