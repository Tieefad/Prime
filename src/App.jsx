import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Home from "./home/Home";
import Login from "./login/Login";
import Events from "./components/Events";
import Movies from "./components/Movies";
import Sports from "./components/Sports";
import Concerts from "./components/Concerts";
import Admin from "./admin/Admin";
import Booking from "./pages/Booking";

function App() {
  const [page, setPage] = useState("home");
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleNavigate = (p) => {
    setPage(p);
    window.scrollTo(0, 0);
  };

  if (loading) return (
    <div style={{
      width: "100%", minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: darkMode ? "#0a0f1e" : "#f8fafc",
    }}>
      <div style={{
        width: "40px", height: "40px", borderRadius: "50%",
        border: "3px solid #4facfe", borderTopColor: "transparent",
        animation: "spin 0.8s linear infinite",
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  const eventId = page.startsWith("book-") ? page.replace("book-", "") : null;

  return (
    <div style={{ width: "100%", minHeight: "100vh" }}>
      {page === "home" && (
        <Home darkMode={darkMode} setDarkMode={setDarkMode} onNavigate={handleNavigate} user={user} />
      )}
      {page === "login" && (
        <Login darkMode={darkMode} onBack={() => handleNavigate("home")} onLoginSuccess={(u) => { setUser(u); handleNavigate("home"); }} />
      )}
      {page === "events" && (
        <Events darkMode={darkMode} setDarkMode={setDarkMode} onNavigate={handleNavigate} user={user} />
      )}
      {page === "movies" && (
        <Movies darkMode={darkMode} setDarkMode={setDarkMode} onNavigate={handleNavigate} user={user} />
      )}
      {page === "sports" && (
        <Sports darkMode={darkMode} setDarkMode={setDarkMode} onNavigate={handleNavigate} user={user} />
      )}
      {page === "concerts" && (
        <Concerts darkMode={darkMode} setDarkMode={setDarkMode} onNavigate={handleNavigate} user={user} />
      )}
      {page === "admin" && (
        <Admin darkMode={darkMode} setDarkMode={setDarkMode} onNavigate={handleNavigate} user={user} />
      )}
      {eventId && (
        <Booking darkMode={darkMode} onNavigate={handleNavigate} eventId={eventId} user={user} />
      )}
    </div>
  );
}

export default App;