import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeUser, loginUser } from "../reducers/userActions";
const CallbackPage = () => {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const dispatch = useDispatch();
  useEffect(() => {
    if (code) {
      dispatch(loginUser(code))
        .then(() => {
          dispatch(initializeUser());
          navigate("/");
        })
        .catch(() => navigate("/"));
    } else {
      navigate("/");
    }
  }, [code, dispatch, navigate]);
};
export default CallbackPage;
