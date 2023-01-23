import axios from "axios";
import { refreshToken } from "../reducers/userActions";
import store from "../store";
const baseURL = " https://api.spotify.com/v1/";
const spotifyAxios = axios.create({ baseURL });

spotifyAxios.interceptors.request.use(
  async (config) => {
    const auth = store?.getState()?.user?.auth;
    const currentDate = new Date();

    if (auth?.expires_at < currentDate.getTime()) {
      await store.dispatch(refreshToken());
    }
    if (config?.headers) {
      config.headers["authorization"] = `Bearer ${
        store.getState()?.user?.auth?.access_token
      }`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
const getCurrentUsersProfile = async (access_token) => {
  const response = await spotifyAxios.get(`me`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const getCurrentUsersSavedAlbums = async (limit, offset) => {
  const params = new URLSearchParams({ limit, offset });
  const response = await spotifyAxios.get(`me/albums?${params.toString()}`);
  return response.data;
};
const getCurrentUsersPlaylists = async (limit, offset) => {
  const params = new URLSearchParams({ limit, offset });
  const response = await spotifyAxios.get(`me/playlists?${params.toString()}`);
  return response.data;
};
const createPlaylist = async (name, isPublic, collaborative, description) => {
  const body = {
    name,
    isPublic,
    collaborative,
    description,
  };
  const user_id = store.getState()?.user?.profile?.id;
  const response = await spotifyAxios.post(`users/${user_id}/playlists`, body);
  return response.data;
};
const getAlbumTracks = async (id, limit, offset) => {
  const params = new URLSearchParams({ limit, offset });
  const response = await spotifyAxios.get(
    `albums/${id}/tracks?${params.toString()}`
  );
  return response.data;
};

const addItemsToPlaylist = async (id, position, uris) => {
  const body = { position, uris };
  const response = await spotifyAxios.post(`playlists/${id}/tracks`, body);
  return response.data;
};

const spotifyService = {
  getCurrentUsersProfile,
  getCurrentUsersSavedAlbums,
  getCurrentUsersPlaylists,
  createPlaylist,
  getAlbumTracks,
  addItemsToPlaylist,
};
export default spotifyService;

//the below functions are not associated with a single spotify api route but will make multiple calls to get desired results
export const getAllCurrentUsersSavedAlbums = async (access_token) => {
  const params = new URLSearchParams({ limit: 50, offset: 0 });
  let url = `${baseURL}/me/albums?${params.toString()}`;
  const seturl = (string) => (url = string);
  const albums = [];
  while (url) {
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        albums.push(...response.data.items);
        seturl(response.data.next);
      });
  }
  return albums;
};

export const getAllAlbumTracks = async (album) => {
  const tracks = [...album.tracks.items];
  let hasNext = !!album.tracks.next;
  if (hasNext) {
    console.log(
      `getting all tracks for ${album.name} ${
        hasNext
          ? "it has more than 50 tracks"
          : "it does not have more than 50 tracks"
      }`
    );
  }
  for (let offSet = 50; hasNext; offSet += 50) {
    const data = await getAlbumTracks(album.id, 50, offSet);
    hasNext = !!data.next;
    tracks.push(data.items);
  }
  return tracks;
};
