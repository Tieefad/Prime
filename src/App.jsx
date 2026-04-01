import { useState } from "react";
import Home from "./home/Home";
import Login from "./login/Login";
import Events from "./components/Events";
import Movies from "./components/Movies";
import Sports from "./components/Sports";
import Concerts from "./components/Concerts";

function App() {
  const [page, setPage] = useState("home");
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setPage("home");
  };

  return (
    <div style={{ width: "100%", minHeight: "100vh" }}>
      {page === "home" && (
        <Home
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onGetStarted={() => setPage("login")}
          onNavigate={(p) => setPage(p)}
          user={user}
          onLogout={() => setUser(null)}
        />
      )}
      {page === "login" && (
        <Login
          darkMode={darkMode}
          onBack={() => setPage("home")}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {page === "events" && (
        <Events
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onNavigate={(p) => setPage(p)}
        />
      )}
      {page === "movies" && (
        <Movies
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onNavigate={(p) => setPage(p)}
        />
      )}
      {page === "sports" && (
        <Sports
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onNavigate={(p) => setPage(p)}
        />
      )}
      {page === "concerts" && (
        <Concerts
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onNavigate={(p) => setPage(p)}
        />
      )}
    </div>
  );
}

export default App;