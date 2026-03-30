import { useState } from "react";
import Home from "./home/Home";
import Login from "./login/Login";

function App() {
  const [page, setPage] = useState("home");
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
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
    </>
  );
}

export default App;