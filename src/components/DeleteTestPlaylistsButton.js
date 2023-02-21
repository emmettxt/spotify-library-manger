import { useSelector } from "react-redux";
import spotifyService from "../services/spotify";

const DeleteTestPlaylistsButton = () => {
  const { playlists } = useSelector((state) => state.library);
  const testPlaylists = playlists.filter((p) => p.name === "test");
  const handleClick = (event) => {
    event.preventDefault();

    if (
      window.confirm(
        "are you sure you want to delete " +
          testPlaylists.length +
          "playlists, of a total of " +
          playlists.length +
          "playlists?"
      )
    ) {
      testPlaylists.forEach((playlist) => {
        spotifyService.unfollowPlaylist(playlist.id);
      });
    }
  };

  return (
    <button onClick={handleClick} className='btn btn-warning'>
      Delete Test Playlists {testPlaylists.length}
    </button>
  );
};

export default DeleteTestPlaylistsButton;
