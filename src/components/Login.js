import Button from "react-bootstrap/Button";
import spotifyAuth from "../utils/spotifyAuth";
const Login = () => {
  const handleClick = async (event) => {
    event.preventDefault();
    await spotifyAuth.requestUserAuthorization();
  };
  return <Button onClick={handleClick}>log in to spotify</Button>;
};

export default Login;
