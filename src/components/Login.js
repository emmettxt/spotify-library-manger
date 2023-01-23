import spotifyAuth from "../utils/spotifyAuth";
const Login = () => {

  const handleClick = async (event) => {
    event.preventDefault();
    await spotifyAuth.requestUserAuthorization();
  };

  return <button onClick={handleClick}>log in to spotify</button>;
};

export default Login;
