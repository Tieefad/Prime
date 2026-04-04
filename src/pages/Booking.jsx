import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { doc, getDoc, updateDoc, addDoc, collection, serverTimestamp, arrayUnion } from "firebase/firestore";
import { Ticket, MapPin, Calendar, Star, ArrowLeft, Check } from "lucide-react";

function Booking({ darkMode, onNavigate, eventId, user }) {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [booking, setBooking] = useState(false);
  const [booked, setBooked] = useState(false);
  const [error, setError] = useState("");

  const theme = {
    background: darkMode ? "#0a0f1e" : "#f8fafc",
    text: darkMode ? "#f1f5f9" : "#0f172a",
    subtext: darkMode ? "#94a3b8" : "#64748b",
    card: darkMode ? "#111827" : "#ffffff",
    cardBorder: darkMode ? "#1e293b" : "#e2e8f0",
    primary: "#4facfe",
  };

  const getCategoryColor = (cat) => {
    const colors = { Cricket: "#10b981", Concert: "#8b5cf6", Movie: "#f59e0b", Football: "#3b82f6", Other: "#ec4899" };
    return colors[cat] || "#4facfe";
  };

  useEffect(() => { if (eventId) fetchEvent(); }, [eventId]);

  const fetchEvent = async () => {
    setLoading(true);
    try {
      const snap = await getDoc(doc(db, "events", eventId));
      if (snap.exists()) setEvent({ id: snap.id, ...snap.data() });
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const totalSeats = event?.totalSeats || 50;
  const bookedSeats = event?.bookedSeats || [];

  const getSeatStatus = (seatNum) => {
    if (bookedSeats.includes(seatNum)) return "booked";
    if (selectedSeats.includes(seatNum)) return "selected";
    return "available";
  };

  const toggleSeat = (seatNum) => {
    if (bookedSeats.includes(seatNum)) return;
    setSelectedSeats(prev =>
      prev.includes(seatNum)
        ? prev.filter(s => s !== seatNum)
        : prev.length < 6 ? [...prev, seatNum] : prev
    );
  };

  const handleBooking = async () => {
    if (!user) { onNavigate("login"); return; }
    if (selectedSeats.length === 0) { setError("Please select at least one seat."); return; }
    setBooking(true);
    setError("");
    try {
      await updateDoc(doc(db, "events", eventId), {
        bookedSeats: arrayUnion(...selectedSeats),
      });
      await addDoc(collection(db, "bookings"), {
        userId: user.uid,
        userEmail: user.email,
        userName: user.displayName || user.email,
        eventId: eventId,
        eventTitle: event.title,
        eventDate: event.date,
        eventLocation: event.location,
        seats: selectedSeats,
        totalAmount: selectedSeats.length * event.price,
        status: "confirmed",
        createdAt: serverTimestamp(),
      });
      setBooked(true);
      fetchEvent();
    } catch (err) {
      console.error(err);
      setError("Booking failed. Please try again.");
    }
    setBooking(false);
  };

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: theme.background }}>
      <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "3px solid #4facfe", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (!event) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: theme.background, color: theme.text }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>😕</div>
        <p style={{ fontSize: "18px", fontWeight: "600" }}>Event not found</p>
        <button style={{ marginTop: "16px", padding: "10px 24px", borderRadius: "999px", border: "none", background: "linear-gradient(135deg, #4facfe, #a78bfa)", color: "#fff", cursor: "pointer", fontWeight: "600" }}
          onClick={() => onNavigate("home")}>Go Home</button>
      </div>
    </div>
  );

  if (booked) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: theme.background, color: theme.text, padding: "20px" }}>
      <div style={{ textAlign: "center", maxWidth: "400px" }}>
        <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "linear-gradient(135deg, #10b981, #4facfe)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
          <Check size={40} color="#fff" strokeWidth={3} />
        </div>
        <h2 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "12px" }}>Booking Confirmed! 🎉</h2>
        <p style={{ color: theme.subtext, marginBottom: "8px" }}>{event.title}</p>
        <p style={{ color: theme.subtext, marginBottom: "8px" }}>📍 {event.location}</p>
        <p style={{ color: theme.subtext, marginBottom: "8px" }}>📅 {event.date}</p>
        <p style={{ color: theme.subtext, marginBottom: "24px" }}>💺 Seats: {selectedSeats.join(", ")}</p>
        <div style={{
          background: darkMode ? "#1e293b" : "#f0fdf4", borderRadius: "12px",
          padding: "16px", marginBottom: "24px",
          border: "1px solid #10b981",
        }}>
          <p style={{ fontSize: "24px", fontWeight: "800", color: "#10b981" }}>৳ {selectedSeats.length * event.price}</p>
          <p style={{ fontSize: "13px", color: theme.subtext }}>Total Amount</p>
        </div>
        <button style={{
          width: "100%", padding: "14px", borderRadius: "999px", border: "none",
          background: "linear-gradient(135deg, #4facfe, #a78bfa)",
          color: "#fff", fontWeight: "700", fontSize: "16px", cursor: "pointer",
          boxShadow: "0 4px 15px rgba(79,172,254,0.3)",
        }} onClick={() => onNavigate("home")}>Back to Home</button>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", background: theme.background, color: theme.text, minHeight: "100vh" }}>

      {/* NAVBAR */}
      <nav style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "14px 40px", background: darkMode ? "rgba(10,15,30,0.95)" : "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)", boxShadow: "0 1px 20px rgba(0,0,0,0.1)",
        position: "sticky", top: 0, zIndex: 1000,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }} onClick={() => onNavigate("home")}>
          <Ticket size={22} color={theme.primary} />
          <span style={{ fontSize: "22px", fontWeight: "800", background: "linear-gradient(135deg, #4facfe, #00f2fe)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>PrimePass</span>
        </div>
        <button style={{
          display: "flex", alignItems: "center", gap: "6px",
          padding: "8px 18px", borderRadius: "999px",
          border: `1.5px solid ${theme.cardBorder}`,
          background: "transparent", color: theme.text,
          fontSize: "14px", fontWeight: "600", cursor: "pointer",
        }} onClick={() => onNavigate("home")}>
          <ArrowLeft size={16} /> Back
        </button>
      </nav>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px" }}>

        {/* EVENT INFO */}
        <div style={{
          background: theme.card, borderRadius: "20px", overflow: "hidden",
          border: `1px solid ${theme.cardBorder}`,
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)", marginBottom: "32px",
        }}>
          <div style={{ height: "6px", background: `linear-gradient(90deg, ${getCategoryColor(event.category)}, #4facfe)` }} />
          <div style={{ padding: "28px" }}>
            <div style={{ display: "inline-block", background: `${getCategoryColor(event.category)}22`, color: getCategoryColor(event.category), fontSize: "12px", fontWeight: "700", padding: "4px 12px", borderRadius: "999px", marginBottom: "12px" }}>
              {event.category}
            </div>
            <h1 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: "800", marginBottom: "16px", lineHeight: "1.3" }}>{event.title}</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: theme.subtext, fontSize: "14px" }}>
                <MapPin size={16} color={theme.primary} /> {event.location}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: theme.subtext, fontSize: "14px" }}>
                <Calendar size={16} color={theme.primary} /> {event.date}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: theme.subtext, fontSize: "14px" }}>
                <Star size={16} fill="#fbbf24" color="#fbbf24" /> {event.rating || "4.8"}
              </div>
            </div>
            {event.description && (
              <p style={{ color: theme.subtext, fontSize: "15px", lineHeight: "1.6" }}>{event.description}</p>
            )}
            <div style={{ display: "flex", gap: "24px", marginTop: "20px", flexWrap: "wrap" }}>
              <div style={{ background: darkMode ? "#1e293b" : "#f8fafc", borderRadius: "12px", padding: "16px 24px", textAlign: "center" }}>
                <p style={{ fontSize: "24px", fontWeight: "800", color: theme.primary }}>৳ {event.price}</p>
                <p style={{ fontSize: "12px", color: theme.subtext }}>Per Seat</p>
              </div>
              <div style={{ background: darkMode ? "#1e293b" : "#f8fafc", borderRadius: "12px", padding: "16px 24px", textAlign: "center" }}>
                <p style={{ fontSize: "24px", fontWeight: "800", color: "#10b981" }}>{totalSeats - bookedSeats.length}</p>
                <p style={{ fontSize: "12px", color: theme.subtext }}>Available Seats</p>
              </div>
              <div style={{ background: darkMode ? "#1e293b" : "#f8fafc", borderRadius: "12px", padding: "16px 24px", textAlign: "center" }}>
                <p style={{ fontSize: "24px", fontWeight: "800", color: "#f59e0b" }}>{bookedSeats.length}</p>
                <p style={{ fontSize: "12px", color: theme.subtext }}>Booked Seats</p>
              </div>
            </div>
          </div>
        </div>

        {/* SEAT MAP */}
        <div style={{
          background: theme.card, borderRadius: "20px", padding: "28px",
          border: `1px solid ${theme.cardBorder}`,
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)", marginBottom: "32px",
        }}>
          <h2 style={{ fontSize: "20px", fontWeight: "800", marginBottom: "8px" }}>Select Your Seats</h2>
          <p style={{ color: theme.subtext, fontSize: "14px", marginBottom: "24px" }}>
            Select up to 6 seats. Click to select or deselect.
          </p>

          {/* LEGEND */}
          <div style={{ display: "flex", gap: "20px", marginBottom: "24px", flexWrap: "wrap" }}>
            {[
              { color: darkMode ? "#1e293b" : "#e2e8f0", label: "Available" },
              { color: "#4facfe", label: "Selected" },
              { color: "#ef4444", label: "Booked" },
            ].map((l, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "20px", height: "20px", borderRadius: "4px", background: l.color }} />
                <span style={{ fontSize: "13px", color: theme.subtext }}>{l.label}</span>
              </div>
            ))}
          </div>

          {/* SCREEN */}
          <div style={{
            background: "linear-gradient(135deg, #4facfe, #a78bfa)",
            borderRadius: "8px", padding: "8px", textAlign: "center",
            fontSize: "13px", fontWeight: "700", color: "#fff",
            marginBottom: "32px", letterSpacing: "2px",
          }}>STAGE / SCREEN</div>

          {/* SEATS GRID */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: "8px", marginBottom: "24px" }}>
            {Array.from({ length: totalSeats }, (_, i) => i + 1).map(seat => {
              const status = getSeatStatus(seat);
              return (
                <div key={seat} onClick={() => toggleSeat(seat)} style={{
                  aspectRatio: "1", borderRadius: "6px", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "11px", fontWeight: "700",
                  cursor: status === "booked" ? "not-allowed" : "pointer",
                  background: status === "booked" ? "#ef4444" : status === "selected" ? "#4facfe" : darkMode ? "#1e293b" : "#e2e8f0",
                  color: status === "available" ? theme.subtext : "#fff",
                  transition: "all 0.2s ease",
                  transform: status === "selected" ? "scale(1.1)" : "scale(1)",
                  boxShadow: status === "selected" ? "0 4px 12px rgba(79,172,254,0.4)" : "none",
                }}>{seat}</div>
              );
            })}
          </div>

          {/* SELECTED INFO */}
          {selectedSeats.length > 0 && (
            <div style={{
              background: darkMode ? "#1e293b" : "#f0f9ff",
              borderRadius: "12px", padding: "16px",
              border: "1px solid rgba(79,172,254,0.3)",
            }}>
              <p style={{ fontSize: "14px", color: theme.subtext, marginBottom: "4px" }}>
                Selected Seats: <span style={{ color: theme.primary, fontWeight: "700" }}>{selectedSeats.sort((a,b)=>a-b).join(", ")}</span>
              </p>
              <p style={{ fontSize: "18px", fontWeight: "800", color: theme.primary }}>
                Total: ৳ {selectedSeats.length * event.price}
              </p>
            </div>
          )}
        </div>

        {/* BOOK BUTTON */}
        {error && (
          <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "8px", padding: "12px 16px", fontSize: "14px", color: "#ef4444", marginBottom: "16px", textAlign: "center" }}>
            {error}
          </div>
        )}

        <button style={{
          width: "100%", padding: "16px", borderRadius: "999px", border: "none",
          background: selectedSeats.length === 0
            ? darkMode ? "#1e293b" : "#e2e8f0"
            : "linear-gradient(135deg, #4facfe, #a78bfa)",
          color: selectedSeats.length === 0 ? theme.subtext : "#fff",
          fontWeight: "700", fontSize: "18px", cursor: selectedSeats.length === 0 ? "not-allowed" : "pointer",
          boxShadow: selectedSeats.length > 0 ? "0 8px 25px rgba(79,172,254,0.4)" : "none",
          transition: "all 0.3s ease",
          opacity: booking ? 0.7 : 1,
        }} onClick={handleBooking} disabled={booking || selectedSeats.length === 0}>
          {booking ? "Processing..." : selectedSeats.length === 0 ? "Select seats to continue" : `Confirm Booking — ৳ ${selectedSeats.length * event.price}`}
        </button>
      </div>
    </div>
  );
}

export default Booking;