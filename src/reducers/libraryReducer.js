import { createSlice } from "@reduxjs/toolkit";
import localforage from "localforage";
import spotifyService, { getAllAlbumTracks } from "../services/spotify";
import store from "../store";
const initialState = { albums: [], playlists: [], isLoading: false };
const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    setAlbums(state, action) {
      state.albums = action.payload;
    },
    addAlbums(state, action) {
      state.albums.push(...action.payload);
    },
    setPlaylists(state, action) {
      state.playlists = action.payload;
    },
    addPlaylists(state, action) {
      state.playlists.push(...action.payload);
    },
    clearLibrary() {
      return initialState;
    },
    setLibrary(state, action) {
      return action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const emptyLibrary = () => {
  return async (dispatch) => {
    await localforage.removeItem("spotify-library");
    await dispatch(clearLibrary());
  };
};

export const refreshLibrary = () => {
  return async (dispatch) => {
    await dispatch(emptyLibrary());
    await dispatch(initializeLibrary());
  };
};

export const initializeLibrary = () => {
  return async (dispatch) => {
    /**
     * Function that will replace the 'tracks' entry of each object in the input array with an array of all of that albums tracks.
     * Will only need to do an API call if an album has more than 50 tracks
     *
     * @param {Array} albums list of album objects
     */
    const includeAllAlbumsTracks = async (albums) => {
      const albumsWithTracks = [];
      for (let album of albums) {
        const tracks = await getAllAlbumTracks(album.album);
        albumsWithTracks.push({ ...album, album: { ...album.album, tracks } });
      }
      return albumsWithTracks;
    };

    //gets albums and adds them to store
    const getAlbums = async () => {
      console.log("getting albums");
      let hasNext = true;
      for (let offset = 0; hasNext; offset += 50) {
        const next50 = await spotifyService.getCurrentUsersSavedAlbums(
          50,
          offset
        );
        hasNext = !!next50.next;
        const next50WithTracks = await includeAllAlbumsTracks(next50.items);
        await dispatch(addAlbums(next50WithTracks));
      }
    };
    //gets playlists and adds them to store
    const getPlaylists = async () => {
      console.log("getting playlists");

      let hasNext = true;
      for (let offset = 0; hasNext; offset += 50) {
        console.log({ offset });
        const next50 = await spotifyService.getCurrentUsersPlaylists(
          50,
          offset
        );
        hasNext = !!next50.next;
        await dispatch(addPlaylists(next50.items));
      }
    };
    dispatch(setIsLoading(true));

    //check if library is saved localy
    const localforageLibrary = await localforage.getItem("spotify-library");
    if (localforageLibrary) {
      console.log(localforageLibrary);
      dispatch(setLibrary(localforageLibrary));
    } else {
      //this will run both in parallel
      await Promise.all([getAlbums(), getPlaylists()]);

      await localforage.setItem("spotify-library", store.getState().library);
    }

    dispatch(setIsLoading(false));
  };
};

export const {
  setAlbums,
  addAlbums,
  setPlaylists,
  addPlaylists,
  clearLibrary,
  setLibrary,
  setIsLoading,
} = librarySlice.actions;

export default librarySlice.reducer;
