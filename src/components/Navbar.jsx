import React, { useState } from "react";
import { Sun, Moon, Menu, X, LogOut, User, ChevronRight } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth, ADMIN_EMAIL } from "../firebase";

function Navbar({ darkMode, setDarkMode, onNavigate, user }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [toggleHover, setToggleHover] = useState(false);
  const [hoveredNavLink, setHoveredNavLink] = useState(null);

  const isAdmin = user?.email === ADMIN_EMAIL;

  const theme = {
    text: darkMode ? "#f1f5f9" : "#0f172a",
    subtext: darkMode ? "#94a3b8" : "#64748b",
    card: darkMode ? "#111827" : "#ffffff",
    cardBorder: darkMode ? "#1e293b" : "#e2e8f0",
    primary: "#f59e0b",
    navbar: darkMode ? "rgba(10,8,3,0.98)" : "rgba(255,255,255,0.98)",
  };

  const navLinks = isAdmin
    ? ["Events", "Movies", "Sports", "Admin"]
    : ["Events", "Movies", "Sports"];

  const handleLogout = async () => {
    await signOut(auth);
    setUserMenuOpen(false);
    setMenuOpen(false);
    onNavigate("home");
  };

  const getNavLinkStyle = (index, label) => {
    const isHovered = hoveredNavLink === index;
    const isAdminLink = label === "Admin";
    return {
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
      color: isAdminLink
        ? isHovered ? "#fff" : "#ef4444"
        : isHovered ? "#000" : theme.subtext,
      padding: "6px 14px",
      borderRadius: "999px",
      background: isAdminLink
        ? isHovered ? "#ef4444" : "rgba(239,68,68,0.1)"
        : isHovered ? "linear-gradient(135deg, #f59e0b, #fbbf24)" : "transparent",
      border: isAdminLink
        ? `1.5px solid ${isHovered ? "#ef4444" : "rgba(239,68,68,0.3)"}`
        : "1.5px solid transparent",
      transform: isHovered ? "translateY(-2px)" : "translateY(0)",
      transition: "all 0.25s ease",
      boxShadow: isHovered && !isAdminLink ? "0 4px 15px rgba(245,158,11,0.3)" : "none",
    };
  };

  return (
    <>
      <nav style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "14px 24px",
        background: theme.navbar,
        backdropFilter: "blur(12px)",
        boxShadow: darkMode ? "0 1px 20px rgba(245,158,11,0.1)" : "0 1px 20px rgba(0,0,0,0.1)",
        position: "sticky", top: 0, zIndex: 1000,
        borderBottom: `1px solid ${darkMode ? "rgba(245,158,11,0.2)" : "#e2e8f0"}`,
      }}>
        {/* LOGO */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
          onClick={() => { onNavigate("home"); setMenuOpen(false); }}>
          <span style={{ fontSize: "28px" }}>🐉</span>
          <span style={{
            fontSize: "20px", fontWeight: "900",
            background: "linear-gradient(135deg, #f59e0b, #fbbf24, #f59e0b)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            letterSpacing: "-0.5px",
          }}>Dragon Piece</span>
        </div>

        {/* DESKTOP LINKS */}
        <div className="desktop-only" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {navLinks.map((l, i) => (
            <span key={i}
              style={getNavLinkStyle(i, l)}
              onMouseEnter={() => setHoveredNavLink(i)}
              onMouseLeave={() => setHoveredNavLink(null)}
              onClick={() => onNavigate(l.toLowerCase())}
            >{l}</span>
          ))}

          <div style={{ width: "1px", height: "24px", background: theme.cardBorder, margin: "0 8px" }} />

          <button style={{
            width: "42px", height: "42px", borderRadius: "50%",
            border: `2px solid ${darkMode ? "rgba(245,158,11,0.3)" : "#e2e8f0"}`,
            cursor: "pointer",
            background: darkMode ? "rgba(245,158,11,0.1)" : "#f1f5f9",
            color: darkMode ? "#fbbf24" : "#6366f1",
            display: "flex", alignItems: "center", justifyContent: "center",
            transform: toggleHover ? "scale(1.1) rotate(15deg)" : "scale(1)",
            transition: "all 0.3s ease",
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
                background: darkMode ? "rgba(245,158,11,0.1)" : "#f1f5f9",
                border: `1px solid ${darkMode ? "rgba(245,158,11,0.3)" : theme.cardBorder}`,
              }} onClick={() => setUserMenuOpen(!userMenuOpen)}>
                <User size={16} color="#f59e0b" />
                <span style={{ fontSize: "14px", fontWeight: "600", color: theme.text }}>
                  {user.displayName || user.email?.split("@")[0]}
                </span>
              </div>
              {userMenuOpen && (
                <div style={{
                  position: "absolute", right: 0, top: "50px",
                  background: theme.card, borderRadius: "12px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  border: `1px solid ${darkMode ? "rgba(245,158,11,0.2)" : theme.cardBorder}`,
                  padding: "8px", minWidth: "180px", zIndex: 100,
                }}>
                  <div style={{ padding: "8px 12px", fontSize: "13px", color: theme.subtext, borderBottom: `1px solid ${theme.cardBorder}`, marginBottom: "8px" }}>
                    {user.email}
                  </div>
                  <div style={{
                    padding: "8px 12px", cursor: "pointer", borderRadius: "8px",
                    fontSize: "14px", color: theme.text,
                    display: "flex", alignItems: "center", gap: "8px",
                  }}
                    onClick={() => { setUserMenuOpen(false); onNavigate("bookings"); }}
                    onMouseEnter={(e) => e.currentTarget.style.background = darkMode ? "#1e293b" : "#f1f5f9"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    🎫 My Bookings
                  </div>
                  <div style={{
                    padding: "8px 12px", cursor: "pointer", borderRadius: "8px",
                    fontSize: "14px", color: "#ef4444",
                    display: "flex", alignItems: "center", gap: "8px",
                  }}
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
              background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
              color: "#000", fontWeight: "700", fontSize: "14px", cursor: "pointer",
              boxShadow: "0 4px 15px rgba(245,158,11,0.3)",
              transition: "all 0.3s ease",
            }} onClick={() => onNavigate("login")}>Sign In</button>
          )}
        </div>

        {/* MOBILE RIGHT */}
        <div className="mobile-only" style={{ display: "none", alignItems: "center", gap: "12px" }}>
          <button style={{
            width: "38px", height: "38px", borderRadius: "50%",
            border: `2px solid ${darkMode ? "rgba(245,158,11,0.3)" : "#e2e8f0"}`,
            cursor: "pointer",
            background: darkMode ? "rgba(245,158,11,0.1)" : "#f1f5f9",
            color: darkMode ? "#fbbf24" : "#6366f1",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.3s ease",
          }} onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun size={16} strokeWidth={2} /> : <Moon size={16} strokeWidth={2} />}
          </button>
          <button style={{
            width: "38px", height: "38px", borderRadius: "50%",
            border: `2px solid ${darkMode ? "rgba(245,158,11,0.3)" : "#e2e8f0"}`,
            cursor: "pointer", background: "transparent", color: theme.text,
            display: "flex", alignItems: "center", justifyContent: "center",
          }} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: "65px", left: 0, right: 0, bottom: 0,
          background: theme.navbar, backdropFilter: "blur(12px)",
          zIndex: 999, padding: "24px",
          display: "flex", flexDirection: "column", gap: "8px",
          overflowY: "auto",
          borderTop: `1px solid ${darkMode ? "rgba(245,158,11,0.2)" : "#e2e8f0"}`,
        }}>
          {navLinks.map((l, i) => (
            <button key={i} style={{
              padding: "14px 20px", borderRadius: "12px", border: "none",
              background: l === "Admin"
                ? "rgba(239,68,68,0.1)"
                : darkMode ? "rgba(245,158,11,0.05)" : "#f1f5f9",
              color: l === "Admin" ? "#ef4444" : theme.text,
              fontWeight: "700", fontSize: "16px", cursor: "pointer",
              textAlign: "left", transition: "all 0.2s ease",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              border: `1px solid ${darkMode ? "rgba(245,158,11,0.1)" : "#e2e8f0"}`,
            }}
              onClick={() => { onNavigate(l.toLowerCase()); setMenuOpen(false); }}
            >
              {l} <ChevronRight size={16} />
            </button>
          ))}

          <div style={{ height: "1px", background: darkMode ? "rgba(245,158,11,0.2)" : "#e2e8f0", margin: "8px 0" }} />

          {user ? (
            <>
              <div style={{
                padding: "12px 20px", borderRadius: "12px",
                background: darkMode ? "rgba(245,158,11,0.05)" : "#f1f5f9",
                border: `1px solid ${darkMode ? "rgba(245,158,11,0.1)" : "#e2e8f0"}`,
              }}>
                <div style={{ fontSize: "13px", color: theme.subtext, marginBottom: "4px" }}>Signed in as</div>
                <div style={{ fontSize: "15px", fontWeight: "700", color: theme.text }}>{user.displayName || user.email?.split("@")[0]}</div>
                <div style={{ fontSize: "12px", color: theme.subtext }}>{user.email}</div>
              </div>
              <button style={{
                padding: "14px 20px", borderRadius: "12px",
                border: `1px solid ${darkMode ? "rgba(245,158,11,0.1)" : "#e2e8f0"}`,
                background: darkMode ? "rgba(245,158,11,0.05)" : "#f1f5f9",
                color: theme.text, fontWeight: "700", fontSize: "16px", cursor: "pointer",
                textAlign: "left", display: "flex", alignItems: "center", justifyContent: "space-between",
              }}
                onClick={() => { onNavigate("bookings"); setMenuOpen(false); }}
              >
                🎫 My Bookings <ChevronRight size={16} />
              </button>
              <button style={{
                padding: "14px 20px", borderRadius: "12px", border: "none",
                background: "rgba(239,68,68,0.1)",
                color: "#ef4444", fontWeight: "700", fontSize: "16px", cursor: "pointer",
                textAlign: "left", display: "flex", alignItems: "center", gap: "8px",
              }} onClick={handleLogout}>
                <LogOut size={16} /> Sign Out
              </button>
            </>
          ) : (
            <button style={{
              padding: "14px 20px", borderRadius: "12px", border: "none",
              background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
              color: "#000", fontWeight: "700", fontSize: "16px", cursor: "pointer",
              boxShadow: "0 4px 15px rgba(245,158,11,0.3)",
            }} onClick={() => { onNavigate("login"); setMenuOpen(false); }}>
              Sign In
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;