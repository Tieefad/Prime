import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { MapPin, Calendar, ArrowLeft, CheckCircle, Ticket } from "lucide-react";
import Navbar from "../components/Navbar";

function BookingHistory({ darkMode, setDarkMode, onNavigate, user }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const theme = {
    background: darkMode ? "#0a0800" : "#fafaf8",
    text: darkMode ? "#f1f5f9" : "#0f172a",
    subtext: darkMode ? "#94a3b8" : "#64748b",
    card: darkMode ? "#111008" : "#ffffff",
    cardBorder: darkMode ? "rgba(245,158,11,0.2)" : "#e2e8f0",
    primary: "#f59e0b",
  };

  useEffect(() => {
    if (user) fetchBookings();
    else setLoading(false);
  }, [user]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "bookings"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(q);
      setBookings(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  return (
    <div style={{
      fontFamily: "'Segoe UI', Arial, sans-serif",
      background: theme.background,
      color: theme.text,
      minHeight: "100vh",
    }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} onNavigate={onNavigate} user={user} />

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px" }}>

        {/* HEADER */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "8px" }}>
          <button
            onClick={() => onNavigate("home")}
            style={{
              width: "42px", height: "42px", borderRadius: "50%",
              border: `2px solid ${theme.cardBorder}`,
              background: "transparent", color: theme.subtext,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "all 0.25s ease",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#f59e0b";
              e.currentTarget.style.color = "#f59e0b";
              e.currentTarget.style.transform = "translateX(-4px)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(245,158,11,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = theme.cardBorder;
              e.currentTarget.style.color = theme.subtext;
              e.currentTarget.style.transform = "translateX(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "800", margin: 0 }}>My Bookings</h1>
            <p style={{ color: theme.subtext, margin: "4px 0 0", fontSize: "14px" }}>Your ticket booking history</p>
          </div>
        </div>

        <div style={{ marginTop: "32px" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "60px", color: theme.subtext }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "3px solid #f59e0b", borderTopColor: "transparent", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
              Loading bookings...
            </div>
          ) : !user ? (
            <div style={{ textAlign: "center", padding: "60px", color: theme.subtext }}>
              <div style={{ fontSize: "64px", marginBottom: "16px" }}>🔐</div>
              <p style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>Please sign in</p>
              <button style={{
                marginTop: "16px", padding: "12px 28px", borderRadius: "999px", border: "none",
                background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
                color: "#000", fontWeight: "700", fontSize: "15px", cursor: "pointer",
              }} onClick={() => onNavigate("login")}>Sign In</button>
            </div>
          ) : bookings.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px", color: theme.subtext }}>
              <div style={{ fontSize: "64px", marginBottom: "16px" }}>🎫</div>
              <p style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>No bookings yet</p>
              <p style={{ fontSize: "14px", marginBottom: "24px" }}>Book your first event ticket now!</p>
              <button style={{
                padding: "12px 28px", borderRadius: "999px", border: "none",
                background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
                color: "#000", fontWeight: "700", fontSize: "15px", cursor: "pointer",
                boxShadow: "0 4px 15px rgba(245,158,11,0.3)",
              }} onClick={() => onNavigate("events")}>Browse Events</button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {bookings.map((booking) => (
                <div key={booking.id} style={{
                  background: theme.card, borderRadius: "16px", overflow: "hidden",
                  border: `1px solid ${theme.cardBorder}`,
                  boxShadow: darkMode ? "0 4px 16px rgba(0,0,0,0.3)" : "0 4px 16px rgba(0,0,0,0.06)",
                  transition: "all 0.3s ease",
                }}>
                  <div style={{ height: "4px", background: "linear-gradient(90deg, #10b981, #f59e0b)" }} />
                  <div style={{ padding: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                          <CheckCircle size={16} color="#10b981" />
                          <span style={{ fontSize: "12px", fontWeight: "700", color: "#10b981", textTransform: "uppercase", letterSpacing: "0.5px" }}>Confirmed</span>
                        </div>
                        <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "10px", color: theme.text }}>{booking.eventTitle}</h3>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: theme.subtext }}>
                            <MapPin size={13} color="#f59e0b" /> {booking.eventLocation}
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: theme.subtext }}>
                            <Calendar size={13} color="#f59e0b" /> {booking.eventDate}
                          </div>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "24px", fontWeight: "800", color: "#f59e0b" }}>৳ {booking.totalAmount}</div>
                        <div style={{ fontSize: "13px", color: theme.subtext, marginTop: "4px" }}>
                          {booking.seats?.length} seat{booking.seats?.length > 1 ? "s" : ""}
                        </div>
                      </div>
                    </div>

                    <div style={{
                      marginTop: "16px", padding: "12px 16px", borderRadius: "10px",
                      background: darkMode ? "rgba(245,158,11,0.05)" : "#fffbeb",
                      border: `1px solid rgba(245,158,11,0.2)`,
                      display: "flex", justifyContent: "space-between",
                      alignItems: "center", flexWrap: "wrap", gap: "8px",
                    }}>
                      <div>
                        <span style={{ fontSize: "12px", color: theme.subtext }}>Seat Numbers: </span>
                        <span style={{ fontSize: "13px", fontWeight: "700", color: "#f59e0b" }}>
                          {booking.seats?.sort((a, b) => a - b).join(", ")}
                        </span>
                      </div>
                      <div style={{ fontSize: "12px", color: theme.subtext }}>
                        {booking.createdAt?.toDate?.()?.toLocaleDateString() || "Recently"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingHistory;