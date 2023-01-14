import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import spotifyService from "../services/spotify";
import spotifyAuth from "../utils/spotifyAuth";
import MasterPlaylistModal from "./MasterPlaylistModal";
import SavedAlbums from "./SavedAlbums";

const HomePage = ({ auth, setAuth }) => {
  const navigate = useNavigate();
  const [currentUsersProfile, setCurrentUsersProfile] = useState(null);
  useEffect(() => {
    auth && spotifyService
      .getCurrentUsersProfile(auth.access_token)
      .then((currentUsersProfile) =>
        setCurrentUsersProfile(currentUsersProfile)
      );
  }, [auth, navigate]);
  const handleRefreshToken = async (event) => {
    event.preventDefault();
    spotifyAuth.refreshToken(auth.refresh_token).then((auth) => setAuth(auth));
  };
  const mapObjectToTable = (object) => {
    if (object && typeof object === "object") {
      return (
        <Table bordered>
          <tbody>
            {Object.entries(object).map(([key, value]) => (
              <tr>
                <td>{key}</td>
                <td>{mapObjectToTable(value)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    }
    return object ? object.toString() : object;
  };
  return auth ? (
    <div>
      <p>refresh_token:{auth.refresh_token}</p>
      <p>access_token:{auth.access_token}</p>
      <Button onClick={handleRefreshToken} variant="primary">
        refresh token
      </Button>
      <Link to='/playlist'>Create Playlist</Link>
      <MasterPlaylistModal />
      {currentUsersProfile ? mapObjectToTable(currentUsersProfile) : null}
      <SavedAlbums auth={auth} />
    </div>
  ) : null;
};

export default HomePage;
