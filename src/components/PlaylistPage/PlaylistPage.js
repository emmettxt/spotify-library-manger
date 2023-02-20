import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import AlbumSelectorAccordionItem from "./AlbumSelectorAccordionItem";
import AlbumSelector from "./AlbumSelector/AlbumSelector";
import PlaylistSelector from "./PlaylistSelector/PlaylistSelector";
import SelectedStatus from "./SelectedStatus";
const PlaylistPage = () => {
  const navigate = useNavigate();
  const handleCreatePlaylist = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    navigate("/creatingplaylist", { state: { name, selectedItems } });
  };
  const library = useSelector((state) => state.library);

  useEffect(() => {
    const selectedAlbumsInitialState = library.albums.reduce(
      (object, { album }) => ({ ...object, [album.id]: false }),
      {}
    );
    setSelectedAlbums(selectedAlbumsInitialState);
    const selectedPlaylistsInitialState = library.playlists.reduce(
      (object, playlist) => ({ ...object, [playlist.id]: false }),
      {}
    );
    setSelectedPlaylists(selectedPlaylistsInitialState);
  }, [library.albums, library.playlists]);
  const [selectedItems, setSelectedItems] = useState({
    albums: {},
    playlists: {},
  });
  const setSelectedAlbums = (albums) =>
    setSelectedItems((selectedItems) => ({ ...selectedItems, albums }));
  const setSelectedPlaylists = (playlists) =>
    setSelectedItems((selectedItems) => ({ ...selectedItems, playlists }));
  const tabs = [
    {
      name: "Albums",
      element: (className) => (
        <AlbumSelector
          selectedAlbums={selectedItems.albums}
          setSelectedAlbums={setSelectedAlbums}
          className={className}
          color={"primary"}
        />
      ),
      color: "primary",
    },
    {
      name: "Playlists",
      element: (className) => (
        <PlaylistSelector
          selectedPlaylists={selectedItems.playlists}
          setSelectedPlaylists={setSelectedPlaylists}
          className={className}
          color={"secondary"}
        />
      ),
      color: "secondary",
    },
    // { name: "Other", element: () => null, color: "accent" },
  ];
  const [selectedTab, setSelectedTab] = useState(tabs[0].name);
  const handleChangeTab = (event) => {
    event.preventDefault();
    console.log(event.target);
    setSelectedTab(event.target.value);
  };
  return (
    <>
      <article className="prose">
        <h1>Create New Playlist</h1>
      </article>
      <form onSubmit={handleCreatePlaylist}>
        <div className="form-control m-3">
          <input
            className="input input-bordered"
            type={"text"}
            required
            placeholder="Playlist Name"
            name="name"
          ></input>
        </div>
        <div className="flex justify-between min-w-full flex-wrap">
          <SelectedStatus selectedItems={selectedItems} className="" />
          <button className="btn m-3 btn-primary" type="submit">
            Create Playlist
          </button>
        </div>
      </form>
      <div className="mt-3">
        <div className="tabs tabs-boxed">
          {tabs.map(({ name, color }, index) => (
            <button
              className={`tab tab-lg tab-border-none data-[selected=true]:tab-active data-[selected=true]:bg-base-300 data-[selected=true]:text-${color}`}
              onClick={handleChangeTab}
              value={name}
              data-selected={selectedTab === name}
              key={index}
            >
              {name}
            </button>
          ))}
        </div>
        <div className="p-3 bg-base-200">
          {tabs.map(({ element, colorm, name }) =>
            element(selectedTab === name ? "" : "hidden")
          )}
        </div>
      </div>
    </>
  );
};

export default PlaylistPage;
