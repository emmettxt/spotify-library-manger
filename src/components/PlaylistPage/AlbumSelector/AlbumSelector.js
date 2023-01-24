import { useState } from "react";
import { useSelector } from "react-redux";
import CardButton from "../../Common/CardButton";
import Search from "./Search";
import SelectAll from "./SelectAll";

const AlbumSelector = ({
  selectedAlbums,
  setSelectedAlbums,
  className,
  color,
}) => {
  const albums = useSelector((state) => state.library)?.albums;
  const handleSelectAllAlbums = () => {
    const newSelectedAlbums = {};
    Object.keys(selectedAlbums).forEach(
      (albumId) => (newSelectedAlbums[albumId] = !allAlbumsSelected)
    );
    console.log({ newSelectedAlbums });
    setSelectedAlbums(newSelectedAlbums);
  };
  const allAlbumsSelected =
    Object.values(selectedAlbums).filter((a) => !a).length === 0;
  const selectAlbum = (album) => {
    const isSelected = selectedAlbums[album.id];
    setSelectedAlbums({ ...selectedAlbums, [album.id]: !isSelected });
  };
  const [filter, setFilter] = useState("");
  const filteredAlbums = albums.filter(
    ({ album }) =>
      filter.length === 0 ||
      album.artists.some((artist) =>
        artist.name.toLowerCase().includes(filter.toLowerCase())
      ) ||
      album.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <div className={className}>
      <SelectAll checked={allAlbumsSelected} onChange={handleSelectAllAlbums} />
      <Search value={filter} setValue={setFilter} />
      <div className="grid  2xl:grid-cols-8 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-3 mt-3">
        {filteredAlbums.map(({ album }) => (
          <CardButton
            key={album.id}
            cardBody={`${album.name} - ${album.artists[0].name}`}
            imgURL={album.images[0].url}
            onClick={() => selectAlbum(album)}
            isSelected={selectedAlbums[album.id]}
            selectedColor={color}
          />
        ))}
      </div>
    </div>
  );
};

export default AlbumSelector;
