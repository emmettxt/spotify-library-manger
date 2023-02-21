import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { refreshToken } from "../reducers/userActions";
import DeleteTestPlaylistsButton from "./DeleteTestPlaylistsButton";
import LoadingLibraryModal from "./LoadingLibraryModal";
import LogoutButton from "./LogoutButton";

const HomePage = ({ loadingLibrary }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const library = useSelector((state) => state.library);
  const { auth, profile } = user;
  const handleRefreshToken = (event) => {
    event.preventDefault();
    dispatch(refreshToken());
  };
  const mapObjectToTable = (object) => {
    if (object && typeof object === "object") {
      return (
        <table>
          <tbody>
            {Object.entries(object).map(([key, value]) => (
              <tr>
                <td>{key}</td>
                <td>{mapObjectToTable(value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    return object ? object.toString() : object;
  };
  return auth ? (
    <div>
      <p>refresh_token:{auth.refresh_token}</p>
      <p>access_token:{auth.access_token}</p>

      <button onClick={handleRefreshToken} variant="primary">
        refresh token
      </button>
      <LogoutButton />
      <Link to="/playlist">Create Playlist</Link>
      <DeleteTestPlaylistsButton/>
      <table>
        <tr>
          <td>Albums</td>
          <td>{library.albums.length}</td>
        </tr>
        <tr>
          <td>Playlists</td>
          <td>{library.playlists.length}</td>
        </tr>
      </table>
      {profile ? mapObjectToTable(profile) : null}
      <LoadingLibraryModal show={loadingLibrary} />
      {/* <SavedAlbums auth={auth} /> */}
    </div>
  ) : null;
};

export default HomePage;
