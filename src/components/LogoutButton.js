import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../reducers/userActions";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = async (event) => {
    event.preventDefault();
    await dispatch(logoutUser());
    navigate("/login");
  };
  return <Button onClick={handleClick}>Logout</Button>;
};

export default LogoutButton;
