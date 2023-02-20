import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import spotifyService, {
  addTracksToPlaylist,
  getAllPlaylistItems,
  getAllPlaylistItemsAsync,
} from "../../services/spotify";
import { shuffleArray } from "../../utils/utils";

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
  const [playlistsTracks, setPlaylistsTracks] = useState(albumsTracks);

  useEffect(() => {
    selectedPlaylists.forEach(async (playlist) => {
      // const playlistItems = await getAllPlaylistItems(playlist.id, "");
      const playlistItems = await getAllPlaylistItemsAsync(playlist, "");
      setPlaylistsTracks((playlistTracks) => [
        ...playlistTracks,
        ...playlistItems.map(({ track }) => track),
      ]);
    });

    const shuffeledTracks = [...playlistsTracks];
    shuffleArray(shuffeledTracks);
    setPlaylistsTracks(shuffeledTracks);
    for (let offset = 0; offset < shuffeledTracks.length; offset += 10000) {
      const partName =
        shuffeledTracks.length <= 10000
          ? name
          : `${name} (part ${1 + offset / 10000})`;
      spotifyService
        .createPlaylist(partName)
        .then((newPlaylist) =>
          addTracksToPlaylist(
            shuffeledTracks.slice(offset, offset + 10000),
            newPlaylist.id
          )
        );
    }
  }, []);

  return (
    <div className="min-w-full">
      <h1>
        Creating playlist <span className="text-primary">{name}</span>
      </h1>
      <div className="stats shadow bg-neutral">
        <div className="stat">
          <div className="stat-title text-neutral-content">
            Tracks in selected albums
          </div>
          <div className="stat-value text-primary">{albumsTracks.length}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Tracks in selected playlists</div>
          <div className="stat-value">
            {playlistsTracks.length - albumsTracks.length}
          </div>
        </div>
      </div>

      {playlistsTracks.map((track, index) => (
        <div className="grid grid-cols-12 bg-neutral border-neutral-focus border-2 hover:bg-neutral-focus rounded-md hover:scale-y-95 ">
          <>
            <span className="col-span-1 m-auto">{index + 1}</span>
            <figure className="col-span-1">
              {track.album?.images?.slice(-1)?.[0]?.url && (
                <LazyLoadImage
                  src={track.album?.images?.slice(-1)?.[0]?.url}
                  alt={track.album?.name}
                  className=""
                />
              )}
            </figure>
            <span className="col-span-4 my-auto">{track.name}</span>
            <span className="col-span-3 my-auto">
              {track.artists?.[0].name}
            </span>

            <span className="col-span-3 my-auto">{track.album.name}</span>
          </>
        </div>
      ))}
    </div>
  );
};

export default CreatingPlaylistPage;
