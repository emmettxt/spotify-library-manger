import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logoutUser } from "../reducers/userActions";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const handleClick = async (event) => {
    event.preventDefault();
    await dispatch(logoutUser());
  };
  return <Button onClick={handleClick}>Logout</Button>;
};

export default LogoutButton;
