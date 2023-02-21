import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { emptyLibrary } from "../reducers/libraryReducer";
import { logoutUser } from "../reducers/userActions";

const LogoutButton = ({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = async (event) => {
    event.preventDefault();
    await dispatch(logoutUser());
    await dispatch(emptyLibrary())
    navigate("/login");
  };
  return (
    <button className={className} onClick={handleClick}>
      Logout
    </button>
  );
};

export default LogoutButton;
