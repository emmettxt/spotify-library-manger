import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import CallbackPage from "./components/CallbackPage";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import PlaylistPage from "./components/PlaylistPage/PlaylistPage.js";
import { initializeUser } from "./reducers/userActions";
import { useDispatch, useSelector } from "react-redux";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const userLoggedIn = JSON.stringify(user) !== "{}";
  console.log({ userLoggedIn });
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
    if (location.pathname !== "/redirect/") {
      console.log("dispatch initialize user");
      dispatch(initializeUser());
    }

    // .then((user) => {
    //   if (JSON.stringify(user) === "{}") {
    //     console.log('navigating to log in')
    //     navigate("/login")};
    // });
  }, []);
  return (
    <Container>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/redirect" element={<CallbackPage />}></Route>
        <Route path="/playlist" element={<PlaylistPage />} />
      </Routes>
    </Container>
  );
}

export default App;
