import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { Ticket, MapPin, Calendar, ArrowLeft, CheckCircle } from "lucide-react";

function BookingHistory({ darkMode, onNavigate, user }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const theme = {
    background: darkMode ? "#0a0f1e" : "#f8fafc",
    text: darkMode ? "#f1f5f9" : "#0f172a",
    subtext: darkMode ? "#94a3b8" : "#64748b",
    card: darkMode ? "#111827" : "#ffffff",
    cardBorder: darkMode ? "#1e293b" : "#e2e8f0",
    primary: "#4facfe",
    navbar: darkMode ? "rgba(10,15,30,0.95)" : "rgba(255,255,255,0.95)",
  };

  useEffect(() => {
    if (user) fetchBookings();
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
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", background: theme.background, color: theme.text, minHeight: "100vh" }}>

      {/* NAVBAR */}
      <nav style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "14px 40px", background: theme.navbar, backdropFilter: "blur(12px)",
        boxShadow: "0 1px 20px rgba(0,0,0,0.1)", position: "sticky", top: 0, zIndex: 1000,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={() => onNavigate("home")}
            style={{
              width: "38px", height: "38px", borderRadius: "50%",
              border: `2px solid ${theme.cardBorder}`,
              background: "transparent", color: theme.subtext,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#4facfe"; e.currentTarget.style.color = "#4facfe"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.cardBorder; e.currentTarget.style.color = theme.subtext; }}
          >
            <ArrowLeft size={17} />
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }} onClick={() => onNavigate("home")}>
            <Ticket size={22} color={theme.primary} />
            <span style={{ fontSize: "22px", fontWeight: "800", background: "linear-gradient(135deg, #4facfe, #00f2fe)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>PrimePass</span>
          </div>
        </div>
        <span style={{ fontSize: "14px", color: theme.subtext }}>{user?.email}</span>
      </nav>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "8px" }}>My Bookings</h1>
        <p style={{ color: theme.subtext, marginBottom: "32px" }}>Your ticket booking history</p>

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px", color: theme.subtext }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "3px solid #4facfe", borderTopColor: "transparent", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            Loading bookings...
          </div>
        ) : bookings.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px", color: theme.subtext }}>
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>🎫</div>
            <p style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>No bookings yet</p>
            <p style={{ fontSize: "14px", marginBottom: "24px" }}>Book your first event ticket now!</p>
            <button style={{
              padding: "12px 28px", borderRadius: "999px", border: "none",
              background: "linear-gradient(135deg, #4facfe, #a78bfa)",
              color: "#fff", fontWeight: "700", fontSize: "15px", cursor: "pointer",
            }} onClick={() => onNavigate("events")}>Browse Events</button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {bookings.map((booking) => (
              <div key={booking.id} style={{
                background: theme.card, borderRadius: "16px", overflow: "hidden",
                border: `1px solid ${theme.cardBorder}`,
                boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
              }}>
                <div style={{ height: "4px", background: "linear-gradient(90deg, #10b981, #4facfe)" }} />
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
                          <MapPin size={13} color={theme.primary} /> {booking.eventLocation}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: theme.subtext }}>
                          <Calendar size={13} color={theme.primary} /> {booking.eventDate}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "24px", fontWeight: "800", color: theme.primary }}>৳ {booking.totalAmount}</div>
                      <div style={{ fontSize: "13px", color: theme.subtext, marginTop: "4px" }}>
                        {booking.seats?.length} seat{booking.seats?.length > 1 ? "s" : ""}
                      </div>
                    </div>
                  </div>

                  <div style={{
                    marginTop: "16px", padding: "12px 16px", borderRadius: "10px",
                    background: darkMode ? "#1e293b" : "#f8fafc",
                    border: `1px solid ${theme.cardBorder}`,
                    display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px",
                  }}>
                    <div>
                      <span style={{ fontSize: "12px", color: theme.subtext }}>Seat Numbers: </span>
                      <span style={{ fontSize: "13px", fontWeight: "700", color: theme.primary }}>
                        {booking.seats?.sort((a, b) => a - b).join(", ")}
                      </span>
                    </div>
                    <div style={{ fontSize: "12px", color: theme.subtext }}>
                      Booked on: {booking.createdAt?.toDate?.()?.toLocaleDateString() || "Recently"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingHistory;