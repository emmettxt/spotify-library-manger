import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import AlbumSelectorAccordionItem from "./AlbumSelectorAccordionItem";
import AlbumSelector from "./AlbumSelector/AlbumSelector";
import PlaylistSelector from "./PlaylistSelector/PlaylistSelector";
import SelectedStatus from "./SelectedStatus";
const PlaylistPage = () => {
  const handleCreatePlaylist = (event) => event.preventDefault();
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const name = event.target.name.value;
  //   setLoading({
  //     isLoading: true,
  //     loadingHeader: `Creating Playlist ${name}`,
  //     loadingMessage: null,
  //   });
  //   const newPlaylist = await spotifyService.createPlaylist(
  //     event.target.name.value,
  //     undefined,
  //     undefined,
  //     "Created by Emmet"
  //   );
  //   // console.log({ newPlaylist });
  //   const tracks = await utils.extractTracksFromAlbums(
  //     Object.values(selectedAlbums)
  //   );
  //   setLoading((loading) => ({
  //     ...loading,
  //     loadingMessages: [`${tracks.length}  selected`],
  //   }));
  //   let added = 0;
  //   const setTracksAddedMessage = (added) => {
  //     setLoading((loading) => ({
  //       ...loading,
  //       loadingMessages: [
  //         ...loading.loadingMessages,
  //         `${added} tracks added to playlist`,
  //       ],
  //     }));
  //   };
  //   const appendLoadingMessage = (message) => {
  //     setLoading((loading) => ({
  //       ...loading,
  //       loadingMessages: [...loading.loadingMessages, message],
  //     }));
  //   };

  //   for (let i = 0; i < tracks.length; i += 100) {
  //     try {
  //       const uris = tracks
  //         .slice(i, i + 100)
  //         .map((track) => track.uri)
  //         .filter((uri) => uri && uri !== null);
  //       await spotifyService.addItemsToPlaylist(
  //         newPlaylist.id,
  //         undefined,
  //         uris
  //       );
  //       added += uris.length;
  //       appendLoadingMessage(`${added} tracks added to playlist`);
  //       // setTracksAddedMessage(added);
  //     } catch (error) {
  //       appendLoadingMessage(
  //         `There was an error adding tracks to playlist: ${error?.response?.data?.error?.message}`
  //       );
  //     }
  //   }
  // };
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
  const tabNames = ["Albums", "Playlists", "Other"];
  const [selectedTab, setSelectedTab] = useState(tabNames[0]);
  const handleChangeTab = (event) => {
    event.preventDefault();
    console.log(event.target);
    setSelectedTab(event.target.value);
  };
  return (
    <>
      <form onSubmit={handleCreatePlaylist}>
        <div className="form-control m-3">
          <div className="label">Playlist Name</div>
          <input className="input input-bordered" type={"text"}></input>
        </div>
        <button className="btn m-3" type="submit">
          Create Playlist
        </button>
        <SelectedStatus selectedItems={selectedItems} />
        <div className="m-3">
          <div className="tabs">
            {tabNames.map((tabName, index) => (
              <button
                // className={`tab tab-lifted ${
                //   selectedTab === "albums" ? "tab-active" : ""
                // }`}
                className={`tab tab-lifted data-[selected=true]:tab-active`}
                onClick={handleChangeTab}
                value={tabName}
                data-selected={selectedTab === tabName}
                key={index}
              >
                {tabName}
              </button>
            ))}
          </div>
          <div className="border-base-200 border-2 p-3">
            <AlbumSelector
              selectedAlbums={selectedItems.albums}
              setSelectedAlbums={setSelectedAlbums}
              className={selectedTab === "Albums" ? "" : "hidden"}
            />
            <PlaylistSelector
              selectedPlaylists={selectedItems.playlists}
              setSelectedPlaylists={setSelectedPlaylists}
              className={selectedTab === "Playlists" ? "" : "hidden"}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default PlaylistPage;
