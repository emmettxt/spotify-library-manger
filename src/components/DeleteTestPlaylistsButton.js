import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshPlaylists } from "../reducers/libraryReducer";
import spotifyService from "../services/spotify";

const DeleteTestPlaylistsButton = () => {
  const { playlists } = useSelector((state) => state.library);
  const testPlaylists = playlists.filter((p) => p.name === "test");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleClick = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (
      window.confirm(
        "are you sure you want to delete " +
          testPlaylists.length +
          "playlists, of a total of " +
          playlists.length +
          "playlists?"
      )
    ) {
      const promises = [];
      testPlaylists.forEach((playlist) => {
        promises.push(spotifyService.unfollowPlaylist(playlist.id));
      });
      await Promise.all(promises);
    }
    await dispatch(refreshPlaylists())
    setIsLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      className={`btn btn-warning ${isLoading ? "btn-disabled loading" : ""}`}
    >
      Delete Test Playlists {testPlaylists.length}
    </button>
  );
};

export default DeleteTestPlaylistsButton;
