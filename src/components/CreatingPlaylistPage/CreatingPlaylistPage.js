import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getAllPlaylistItems } from "../../services/spotify";

const CreatingPlaylistPage = () => {
  const {
    state: { name, selectedItems },
  } = useLocation();
  const { albums, playlists } = useSelector((state) => state.library);
  const selectedAlbums = albums.filter(
    ({ album }) => selectedItems.albums[album.id]
  );

  const selectedPlaylists = playlists.filter(
    (playlist) => selectedItems.playlists?.[playlist.id]
  );
  const albumsTracks = selectedAlbums.reduce(
    (tracks, { album }) => [
      ...tracks,
      ...album.tracks.map((track) => ({ ...track, album })),
    ],
    []
  );
  console.log({ selectedAlbums, selectedPlaylists, albumsTracks });
  const [playlistsTracks, setPlaylistsTracks] = useState(albumsTracks);

  useEffect(() => {
    selectedPlaylists.forEach(async (playlist) => {
      const playlistItems = await getAllPlaylistItems(playlist.id, "");
      setPlaylistsTracks((playlistTracks) => [
        ...playlistTracks,
        ...playlistItems.map(({ track }) => track),
      ]);
    });
  }, []);

  return (
    <div className="prose">
      <h1>
        Creating playlist <span className="text-primary">{name}</span>
      </h1>
      <table className="table">
        <tbody>
          <tr>
            <td>Tracks in selected albums</td>
            <td>{albumsTracks.length}</td>
          </tr>
        </tbody>
      </table>

      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Artists</th>
            <th>Album</th>
          </tr>
        </thead>
        <tbody>
          {playlistsTracks.map((track , index) => (
            <tr className="hover:text-primary">
              <th>{index}</th>
              <th className={index % 2 === 0 ? "hover:text-primary" : ""}>{track.name}</th>
              <th>{track.artists[0].name}</th>
              <th>{track.album.name}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreatingPlaylistPage;
