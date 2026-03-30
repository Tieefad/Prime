import { useState } from "react";
import Home from "./home/Home";
import Login from "./login/Login";

function App() {
  const [page, setPage] = useState("home");
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div style={{ width: "100%", minHeight: "100vh" }}>
      {page === "home" && (
        <Home
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onGetStarted={() => setPage("login")}
        />
      )}
      {page === "login" && (
        <Login
          darkMode={darkMode}
          onBack={() => setPage("home")}
        />
      )}
    </div>
  );
}

export default App;