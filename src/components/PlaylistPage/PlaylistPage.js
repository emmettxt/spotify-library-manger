import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllPlaylistItemsAsync } from "../../services/spotify";
import AlbumSelector from "./AlbumSelector/AlbumSelector";
import PlaylistSelector from "./PlaylistSelector/PlaylistSelector";
import SelectedStatus from "./SelectedStatus";
const PlaylistPage = () => {
  const navigate = useNavigate();
  const handleCreatePlaylist = async (event) => {
    event.preventDefault();
    setLoadingCreatePlaylist(true);
    const name = event.target.name.value;

    const selectedTracks = [];
    //get tracks from selected playlist and add to selectedTracks array
    const selectedPlaylists = library.playlists.filter(
      (playlist) => selectedItems.playlists?.[playlist.id]
    );
    for (let playlist of selectedPlaylists) {
      const playlistItems = await getAllPlaylistItemsAsync(playlist, "");
      selectedTracks.push(...playlistItems.map(({ track }) => track));
    }
    //get tracks from selected playlist and add to selectedTracks array
    const selectedAlbums = library.albums.filter(
      ({ album }) => selectedItems.albums[album.id]
    );
    const albumsTracks = selectedAlbums.reduce(
      (tracks, { album }) => [
        ...tracks,
        ...album.tracks.map((track) => ({ ...track, album })),
      ],
      []
    );
    selectedTracks.push(...albumsTracks);

    setLoadingCreatePlaylist(false);
    navigate("/creatingplaylist", {
      state: { name, selectedItems, selectedTracks },
    });
  };
  const [loadingCreatePlaylist, setLoadingCreatePlaylist] = useState(false);
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
  const steps = ["Items to Include", "Items to Exclude", "Ordering"];
  const [currentStep, setCurrentStep] = useState(0);
  const handleStepClick = (stepNumber) => setCurrentStep(stepNumber);
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
          <button
            className={`btn m-3 btn-primary ${
              loadingCreatePlaylist ? "btn-disabled loading" : ""
            } ${currentStep === steps.length - 1 ? "" : "hidden"}`}
            type="submit"
          >
            Create Playlist
          </button>
          <button
            className={`btn m-3 ${
              loadingCreatePlaylist ? "btn-disabled loading" : ""
            } ${currentStep === steps.length - 1 ? "hidden" : ""}`}
            type="button"
            onClick={() => setCurrentStep((currentStep) => currentStep + 1)}
          >
            next
          </button>
        </div>
      </form>
      <ul className="steps w-full">
        {steps.map((stepName, index) => (
          <li
            className={`step cursor-pointer ${
              currentStep >= index ? "step-primary" : "hover:step-secondary"
            }`}
            key={index}
            onClick={() => handleStepClick(index)}
          >
            {stepName}
          </li>
        ))}
      </ul>
      <div className={`mt-3 ${currentStep === 0 ? "" : "hidden"}`}>
        <div className="tabs w-full flex justify-center">
          {tabs.map(({ name, color }, index) => (
            <button
              className={`tab tab-lg tab-bordered data-[selected=true]:tab-active`}
              onClick={handleChangeTab}
              value={name}
              data-selected={selectedTab === name}
              key={index}
            >
              {name}
            </button>
          ))}
        </div>
        <div className="p-3 bg-neutral">
          {tabs.map(({ element, colorm, name }) =>
            element(selectedTab === name ? "" : "hidden")
          )}
        </div>
      </div>
    </>
  );
};

export default PlaylistPage;
