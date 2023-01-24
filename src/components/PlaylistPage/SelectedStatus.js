import { useSelector } from "react-redux";

const SelectedStatus = ({ selectedItems }) => {
  const selectedAlbums = selectedItems.albums;
  const selectedPlaylists = selectedItems.playlists;

  const albumCount = Object.entries(selectedItems.albums).filter(
    ([_, value]) => value
  ).length;
  const playlistCount = Object.entries(selectedItems.playlists).filter(
    ([_, value]) => value
  ).length;
  const { albums, playlists } = useSelector((state) => state.library);
  const albumTrackCount = albums
    .filter(({ album }) => selectedAlbums[album.id])
    .reduce((a, b) => a + b.album.tracks.length, 0);

  const playlistTrackCount = playlists
    .filter((playlist) => selectedPlaylists[playlist.id])
    .reduce((a, b) => a + b.tracks.total, 0);
  console.log(playlistCount);
  return (
    <div className="m-3">
      <div className="stats shadow bg-neutral">
        <div className="stat">
          <div className="stat-title">Albums</div>
          <div className="stat-value text-primary">{albumCount}</div>
          <div className="stat-desc">{`Tracks: ${albumTrackCount}`}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Playlists</div>
          <div className="stat-value text-secondary">{playlistCount}</div>
          <div className="stat-desc">{`Tracks: ${playlistTrackCount}`}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Total Tracks</div>
          <div className="stat-value text-accent">
            {playlistTrackCount + albumTrackCount}
          </div>
        </div>
      </div>
      {playlistTrackCount + albumTrackCount > 10000 && (
        <div className="alert alert-warning mt-3">
          <span>
            Spotify has a track limit of 10K per playlist. This will be split
            over mulitple playlists
          </span>
        </div>
      )}
    </div>
  );
};

export default SelectedStatus;
