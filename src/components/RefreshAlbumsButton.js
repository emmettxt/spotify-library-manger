import { useDispatch } from "react-redux";
import { refreshAlbums } from "../reducers/libraryReducer";

const RefreshAlbumsButton = ({ className }) => {
  const dispatch = useDispatch();
  const handleClick = async (event) => {
    event.preventDefault();
    await dispatch(refreshAlbums());
  };
  return (
    <button className={className} onClick={handleClick}>
      Refresh Albums
    </button>
  );
};

export default RefreshAlbumsButton;
