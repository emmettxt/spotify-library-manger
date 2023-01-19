import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { refreshToken, updateAuth } from "../reducers/userActions";
import spotifyService from "../services/spotify";
import spotifyAuth from "../utils/spotifyAuth";
import LoadingLibraryModal from "./LoadingLibraryModal";
import LogoutButton from "./LogoutButton";
import MasterPlaylistModal from "./MasterPlaylistModal";
import SavedAlbums from "./SavedAlbums";

const HomePage = ({ loadingLibrary }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const library = useSelector((state) => state.library);
  const { auth, profile } = user;
  const handleRefreshToken = (event) => {
    event.preventDefault();
    dispatch(refreshToken());
  };
  // useEffect(() => {
  //   if (JSON.stringify(user) === "{}") {
  //     navigate("/login");
  //   }
  // }, [user, navigate]);
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
      <LogoutButton />
      <Link to="/playlist">Create Playlist</Link>
      <MasterPlaylistModal />
      <Table>
        <tr>
          <td>Albums</td>
          <td>{library.albums.length}</td>
        </tr>
        <tr>
          <td>Playlists</td>
          <td>{library.playlists.length}</td>
        </tr>
      </Table>
      {profile ? mapObjectToTable(profile) : null}
      <LoadingLibraryModal show={loadingLibrary} />
      {/* <SavedAlbums auth={auth} /> */}
    </div>
  ) : (null)
};

export default HomePage;
