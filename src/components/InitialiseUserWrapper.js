import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { initializeUser } from "../reducers/userActions";

const InitializeUserWrapper = ({ children }) => {
  const [isCallback, setIsCallback] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setIsCallback(location.pathname === "/callback");
  }, [location.pathname]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isCallback) {
      dispatch(initializeUser()).then((user) => {
        if (JSON.stringify(user) === "{}") {
          navigate("/login");
        }
      });
    }
  }, [isCallback, dispatch]); //eslint-disable-line react-hooks/exhaustive-deps
  return <>{children}</>;
};
export default InitializeUserWrapper;
