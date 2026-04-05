import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection, addDoc, getDocs, deleteDoc,
  doc, updateDoc, query, orderBy, serverTimestamp
} from "firebase/firestore";
import { Ticket, Plus, Trash2, Edit3, X, Check, Sun, Moon, LogOut, ArrowLeft } from "lucide-react";
import { signOut } from "firebase/auth";

function Admin({ darkMode, setDarkMode, onNavigate, user }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [activeTab, setActiveTab] = useState("events");

  const [form, setForm] = useState({
    title: "", category: "Concert", location: "",
    date: "", price: "", totalSeats: "100",
    description: "", rating: "4.8",
  });

  const theme = {
    background: darkMode ? "#0a0f1e" : "#f8fafc",
    text: darkMode ? "#f1f5f9" : "#0f172a",
    subtext: darkMode ? "#94a3b8" : "#64748b",
    card: darkMode ? "#111827" : "#ffffff",
    cardBorder: darkMode ? "#1e293b" : "#e2e8f0",
    primary: "#4facfe",
    navbar: darkMode ? "rgba(10,15,30,0.95)" : "rgba(255,255,255,0.95)",
    input: darkMode ? "#0f172a" : "#f8fafc",
  };

  const categories = ["Cricket", "Concert", "Movie", "Football", "Other"];

  useEffect(() => { fetchEvents(); }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "events"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setEvents(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = {
        ...form,
        price: Number(form.price),
        totalSeats: Number(form.totalSeats),
        rating: Number(form.rating),
        updatedAt: serverTimestamp(),
      };
      if (!editingId) {
        data.createdAt = serverTimestamp();
        data.bookedSeats = [];
      }
      if (editingId) {
        await updateDoc(doc(db, "events", editingId), data);
      } else {
        await addDoc(collection(db, "events"), data);
      }
      resetForm();
      fetchEvents();
    } catch (err) { console.error(err); }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "events", id));
      setDeleteConfirm(null);
      fetchEvents();
    } catch (err) { console.error(err); }
  };

  const handleEdit = (event) => {
    setForm({
      title: event.title || "",
      category: event.category || "Concert",
      location: event.location || "",
      date: event.date || "",
      price: event.price?.toString() || "",
      totalSeats: event.totalSeats?.toString() || "100",
      description: event.description || "",
      rating: event.rating?.toString() || "4.8",
    });
    setEditingId(event.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setForm({
      title: "", category: "Concert", location: "",
      date: "", price: "", totalSeats: "100",
      description: "", rating: "4.8"
    });
    setEditingId(null);
    setShowForm(false);
  };

  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: "8px",
    border: `1.5px solid ${theme.cardBorder}`, background: theme.input,
    color: theme.text, fontSize: "14px", outline: "none",
    boxSizing: "border-box", marginBottom: "16px",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    display: "block", fontSize: "12px", fontWeight: "700",
    color: theme.subtext, marginBottom: "6px",
    textTransform: "uppercase", letterSpacing: "0.5px",
  };

  const getCategoryColor = (cat) => {
    const colors = {
      Cricket: "#10b981", Concert: "#8b5cf6",
      Movie: "#f59e0b", Football: "#3b82f6", Other: "#ec4899"
    };
    return colors[cat] || "#4facfe";
  };

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
          <span style={{ fontSize: "12px", fontWeight: "700", background: "#ef4444", color: "#fff", padding: "2px 8px", borderRadius: "999px", marginLeft: "4px" }}>ADMIN</span>
        </div>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <button
            onClick={() => onNavigate("home")}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "8px 16px", borderRadius: "999px",
              border: `1.5px solid ${theme.cardBorder}`,
              background: "transparent", color: theme.text,
              fontSize: "14px", fontWeight: "600", cursor: "pointer",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#4facfe";
              e.currentTarget.style.borderColor = "#4facfe";
              e.currentTarget.style.transform = "translateX(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = theme.text;
              e.currentTarget.style.borderColor = theme.cardBorder;
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            <ArrowLeft size={16} /> Back to Home
          </button>
          <span style={{ fontSize: "14px", color: theme.subtext }}>{user?.email}</span>
          <button style={{
            width: "38px", height: "38px", borderRadius: "50%",
            border: `2px solid ${darkMode ? "#1e293b" : "#e2e8f0"}`,
            cursor: "pointer", background: darkMode ? "#1e293b" : "#f1f5f9",
            color: darkMode ? "#fbbf24" : "#6366f1",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.3s ease",
          }} onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Moon size={15} /> : <Sun size={15} />}
          </button>
          <button style={{
            padding: "8px 16px", borderRadius: "999px", border: "none",
            background: "rgba(239,68,68,0.1)", color: "#ef4444",
            fontWeight: "600", fontSize: "13px", cursor: "pointer",
            display: "flex", alignItems: "center", gap: "6px",
          }} onClick={() => signOut(auth).then(() => onNavigate("home"))}>
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </nav>

      <div style={{ padding: "40px" }}>

        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "800", letterSpacing: "-0.5px" }}>Admin Dashboard</h1>
            <p style={{ color: theme.subtext, marginTop: "4px" }}>Manage events, bookings and users</p>
          </div>
          <button style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "12px 24px", borderRadius: "999px", border: "none",
            background: "linear-gradient(135deg, #4facfe, #a78bfa)",
            color: "#fff", fontWeight: "700", fontSize: "14px", cursor: "pointer",
            boxShadow: "0 4px 15px rgba(79,172,254,0.3)",
          }} onClick={() => { resetForm(); setShowForm(true); }}>
            <Plus size={18} /> Add Event
          </button>
        </div>

        {/* TABS */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "32px" }}>
          {["events", "stats"].map(tab => (
            <button key={tab} style={{
              padding: "8px 20px", borderRadius: "999px", border: "none", cursor: "pointer",
              background: activeTab === tab ? "linear-gradient(135deg, #4facfe, #a78bfa)" : theme.card,
              color: activeTab === tab ? "#fff" : theme.subtext,
              fontWeight: "600", fontSize: "14px",
              border: activeTab === tab ? "none" : `1px solid ${theme.cardBorder}`,
              transition: "all 0.2s ease",
            }} onClick={() => setActiveTab(tab)}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* STATS TAB */}
        {activeTab === "stats" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "32px" }}>
            {[
              { label: "Total Events", value: events.length, icon: "🎫", color: "#4facfe" },
              { label: "Total Seats", value: events.reduce((a, e) => a + (e.totalSeats || 0), 0), icon: "💺", color: "#10b981" },
              { label: "Booked Seats", value: events.reduce((a, e) => a + (e.bookedSeats?.length || 0), 0), icon: "✅", color: "#8b5cf6" },
              { label: "Categories", value: [...new Set(events.map(e => e.category))].length, icon: "📂", color: "#f59e0b" },
            ].map((s, i) => (
              <div key={i} style={{
                background: theme.card, borderRadius: "16px", padding: "24px",
                border: `1px solid ${theme.cardBorder}`,
                boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
              }}>
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>{s.icon}</div>
                <div style={{ fontSize: "28px", fontWeight: "800", color: s.color }}>{s.value}</div>
                <div style={{ fontSize: "14px", color: theme.subtext, marginTop: "4px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* EVENTS TAB */}
        {activeTab === "events" && (
          <>
            {loading ? (
              <div style={{ textAlign: "center", padding: "60px", color: theme.subtext }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "3px solid #4facfe", borderTopColor: "transparent", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                Loading events...
              </div>
            ) : events.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px", color: theme.subtext }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎫</div>
                <p style={{ fontSize: "18px", fontWeight: "600" }}>No events yet</p>
                <p style={{ fontSize: "14px", marginTop: "8px" }}>Click "Add Event" to create your first event!</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
                {events.map((event) => (
                  <div key={event.id} style={{
                    background: theme.card, borderRadius: "16px",
                    border: `1px solid ${theme.cardBorder}`,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                    overflow: "hidden",
                  }}>
                    <div style={{ height: "5px", background: `linear-gradient(90deg, ${getCategoryColor(event.category)}, #4facfe)` }} />
                    <div style={{ padding: "20px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                        <div style={{
                          background: `${getCategoryColor(event.category)}22`,
                          color: getCategoryColor(event.category),
                          fontSize: "12px", fontWeight: "700",
                          padding: "4px 10px", borderRadius: "999px",
                        }}>{event.category}</div>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button style={{
                            width: "32px", height: "32px", borderRadius: "50%", border: "none",
                            background: "rgba(79,172,254,0.1)", color: "#4facfe",
                            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                          }} onClick={() => handleEdit(event)}>
                            <Edit3 size={14} />
                          </button>
                          <button style={{
                            width: "32px", height: "32px", borderRadius: "50%", border: "none",
                            background: "rgba(239,68,68,0.1)", color: "#ef4444",
                            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                          }} onClick={() => setDeleteConfirm(event.id)}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "8px", color: theme.text }}>{event.title}</h3>
                      <p style={{ fontSize: "13px", color: theme.subtext, marginBottom: "4px" }}>📍 {event.location}</p>
                      <p style={{ fontSize: "13px", color: theme.subtext, marginBottom: "12px" }}>📅 {event.date}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "18px", fontWeight: "800", color: theme.primary }}>৳ {event.price}</span>
                        <span style={{ fontSize: "12px", color: theme.subtext }}>
                          {event.bookedSeats?.length || 0}/{event.totalSeats} seats
                        </span>
                      </div>

                      {deleteConfirm === event.id && (
                        <div style={{
                          marginTop: "12px", padding: "12px", borderRadius: "8px",
                          background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
                        }}>
                          <p style={{ fontSize: "13px", color: "#ef4444", marginBottom: "8px", fontWeight: "600" }}>Delete this event?</p>
                          <div style={{ display: "flex", gap: "8px" }}>
                            <button style={{
                              flex: 1, padding: "6px", borderRadius: "6px", border: "none",
                              background: "#ef4444", color: "#fff", fontSize: "13px",
                              fontWeight: "600", cursor: "pointer",
                            }} onClick={() => handleDelete(event.id)}>Yes, Delete</button>
                            <button style={{
                              flex: 1, padding: "6px", borderRadius: "6px",
                              border: `1px solid ${theme.cardBorder}`, background: "transparent",
                              color: theme.text, fontSize: "13px", cursor: "pointer",
                            }} onClick={() => setDeleteConfirm(null)}>Cancel</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* ADD/EDIT FORM MODAL */}
      {showForm && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 2000, padding: "20px",
        }}>
          <div style={{
            background: theme.card, borderRadius: "20px", padding: "32px",
            width: "100%", maxWidth: "520px", maxHeight: "90vh",
            overflowY: "auto", boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h2 style={{ fontSize: "22px", fontWeight: "800" }}>
                {editingId ? "Edit Event" : "Add New Event"}
              </h2>
              <button style={{
                width: "36px", height: "36px", borderRadius: "50%", border: "none",
                background: darkMode ? "#1e293b" : "#f1f5f9", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", color: theme.text,
              }} onClick={resetForm}><X size={18} /></button>
            </div>

            <form onSubmit={handleSubmit}>
              <label style={labelStyle}>Event Title *</label>
              <input style={inputStyle} placeholder="e.g. BPL 2026 Final" value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })} required
                onFocus={(e) => e.target.style.borderColor = "#4facfe"}
                onBlur={(e) => e.target.style.borderColor = theme.cardBorder}
              />

              <label style={labelStyle}>Category *</label>
              <select style={{ ...inputStyle, cursor: "pointer" }} value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>

              <label style={labelStyle}>Location *</label>
              <input style={inputStyle} placeholder="e.g. Sher-e-Bangla Stadium, Mirpur" value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })} required
                onFocus={(e) => e.target.style.borderColor = "#4facfe"}
                onBlur={(e) => e.target.style.borderColor = theme.cardBorder}
              />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Date *</label>
                  <input style={{ ...inputStyle, marginBottom: 0 }} placeholder="e.g. 15 Mar 2026" value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })} required
                    onFocus={(e) => e.target.style.borderColor = "#4facfe"}
                    onBlur={(e) => e.target.style.borderColor = theme.cardBorder}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Price (৳) *</label>
                  <input style={{ ...inputStyle, marginBottom: 0 }} type="number" placeholder="500" value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })} required
                    onFocus={(e) => e.target.style.borderColor = "#4facfe"}
                    onBlur={(e) => e.target.style.borderColor = theme.cardBorder}
                  />
                </div>
              </div>
              <div style={{ height: "16px" }} />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Total Seats *</label>
                  <input style={{ ...inputStyle, marginBottom: 0 }} type="number" placeholder="100" value={form.totalSeats}
                    onChange={(e) => setForm({ ...form, totalSeats: e.target.value })} required
                    onFocus={(e) => e.target.style.borderColor = "#4facfe"}
                    onBlur={(e) => e.target.style.borderColor = theme.cardBorder}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Rating</label>
                  <input style={{ ...inputStyle, marginBottom: 0 }} type="number" step="0.1" min="0" max="5" placeholder="4.8" value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: e.target.value })}
                    onFocus={(e) => e.target.style.borderColor = "#4facfe"}
                    onBlur={(e) => e.target.style.borderColor = theme.cardBorder}
                  />
                </div>
              </div>
              <div style={{ height: "16px" }} />

              <label style={labelStyle}>Description</label>
              <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
                placeholder="Event description..." value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                onFocus={(e) => e.target.style.borderColor = "#4facfe"}
                onBlur={(e) => e.target.style.borderColor = theme.cardBorder}
              />

              <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                <button type="button" style={{
                  flex: 1, padding: "12px", borderRadius: "999px",
                  border: `1px solid ${theme.cardBorder}`, background: "transparent",
                  color: theme.text, fontWeight: "600", fontSize: "14px", cursor: "pointer",
                }} onClick={resetForm}>Cancel</button>
                <button type="submit" style={{
                  flex: 2, padding: "12px", borderRadius: "999px", border: "none",
                  background: "linear-gradient(135deg, #4facfe, #a78bfa)",
                  color: "#fff", fontWeight: "700", fontSize: "14px", cursor: "pointer",
                  opacity: saving ? 0.7 : 1,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                }} disabled={saving}>
                  {saving ? "Saving..." : <><Check size={16} /> {editingId ? "Update Event" : "Add Event"}</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;