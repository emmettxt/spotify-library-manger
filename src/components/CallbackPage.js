import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import spotifyAuth from "../utils/spotifyAuth";
const CallbackPage = ({ setAuth }) => {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  useEffect(() => {
    if (code) {
      spotifyAuth
        .requestAccessToken(code)
        .then((data) => {
          setAuth(data);
          navigate("/");
          localStorage.setItem("Spotify_loggedIn_user", JSON.stringify(data));
        })
        .catch(() => navigate("/"));
    } else {
      navigate("/");
    }
  }, [code, setAuth, navigate]);
};
export default CallbackPage;
