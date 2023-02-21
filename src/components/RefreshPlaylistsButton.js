import { useDispatch } from "react-redux";
import { refreshPlaylists } from "../reducers/libraryReducer";

const RefreshPlaylistsButton = ({ className }) => {
  const dispatch = useDispatch();
  const handleClick = async (event) => {
    event.preventDefault();
    await dispatch(refreshPlaylists());
  };
  return (
    <button className={className} onClick={handleClick}>
      Refresh Playlists
    </button>
  );
};

export default RefreshPlaylistsButton;
