import { createSlice } from "@reduxjs/toolkit";
import spotifyService from "../services/spotify";
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
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});
export const initializeLibrary = () => {
  return async (dispatch) => {
    //gets albums and adds them to store
    const getAlbums = async () => {
      console.log("getting albums");
      let hasNext = true;
      for (let offset = 0; hasNext; offset += 50) {
        console.log({ offset });

        const next50 = await spotifyService.getCurrentUsersSavedAlbums(
          50,
          offset
        );
        hasNext = !!next50.next;
        await dispatch(addAlbums(next50.items));
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

    //this will run both in parallel
    await Promise.all([getAlbums(), getPlaylists()]);
    
    dispatch(setIsLoading(false));
  };
};

export const {
  setAlbums,
  addAlbums,
  setPlaylists,
  addPlaylists,
  clearLibrary,
  setIsLoading,
} = librarySlice.actions;

export default librarySlice.reducer;
