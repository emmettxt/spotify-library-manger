import { useSelector } from "react-redux";
import CardButton from "../../Common/CardButton";

const PlaylistSelector = ({
  selectedPlaylists,
  setSelectedPlaylists,
  className,
}) => {
  const playlists = useSelector((state) => state.library?.playlists);
  const toggleSelectPlaylist = (playlist) => {
    const isSelected = selectedPlaylists[playlist.id];
    setSelectedPlaylists({ ...selectedPlaylists, [playlist.id]: !isSelected });
  };
  return (
    <div className={className}>
      <div className="grid  2xl:grid-cols-8 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-3 mt-3">
        {playlists.map((playlist) => (
          <CardButton
            key={playlist.id}
            cardBody={`${playlist.name}`}
            imgURL={playlist.images[0]?.url}
            onClick={() => toggleSelectPlaylist(playlist)}
            isSelected={selectedPlaylists[playlist.id]}
          />
        ))}
      </div>
    </div>
  );
};

export default PlaylistSelector;
