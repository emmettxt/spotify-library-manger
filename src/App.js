import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Route, Routes, useNavigate } from "react-router-dom";
import CallbackPage from "./components/CallbackPage";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import PlaylistPage from "./components/PlaylistPage/PlaylistPage.js";
function App() {
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const SavedUser = JSON.parse(localStorage.getItem("Spotify_loggedIn_user"));
    if (SavedUser) {
      setAuth(SavedUser);
    } else {
      navigate("login");
    }
  }, [navigate]);
  return (
    <Container>
      <Routes>
        <Route path="/" element={<HomePage auth={auth} setAuth={setAuth} />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/redirect"
          element={<CallbackPage setAuth={setAuth} />}
        ></Route>
        <Route path="/playlist" element={<PlaylistPage auth={auth} />} />
      </Routes>
    </Container>
  );
}

export default App;
