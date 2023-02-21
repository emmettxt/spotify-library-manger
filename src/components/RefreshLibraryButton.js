import { useDispatch } from "react-redux";
import { refreshLibrary } from "../reducers/libraryReducer";

const RefreshLibraryButton = ({ className }) => {
  const dispatch = useDispatch();
  const handleClick = async (event) => {
    event.preventDefault();
    await dispatch(refreshLibrary());
  };
  return (
    <button className={className} onClick={handleClick}>
      Refresh Library
    </button>
  );
};

export default RefreshLibraryButton;
