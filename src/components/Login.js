import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import spotifyAuth from "../utils/spotifyAuth";
const Login = () => {
  // const navigate = useNavigate();
  // const user = useSelector((state) => state.user);
  // useEffect(() => {
  //   if (user) navigate("/");
  // }, [user, navigate]);

  const handleClick = async (event) => {
    event.preventDefault();
    await spotifyAuth.requestUserAuthorization();
  };

  return <Button onClick={handleClick}>log in to spotify</Button>;
};

export default Login;
