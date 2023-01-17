import axios from "axios";
import { refreshToken } from "../reducers/userActions";
import store from "../store";
const baseURL = " https://api.spotify.com/v1/";
const spotifyAxios = axios.create({ baseURL });

spotifyAxios.interceptors.request.use(
  async (config) => {
    console.log("interceptor called", { config });
    const auth = store?.getState()?.user?.auth;
    const currentDate = new Date();
    console.table({
      expires_at: auth.expires_at,
      "currentDate.getTime()": currentDate.getTime(),
      "less than": auth.expires_at < currentDate.getTime(),
    });

    if (auth.expires_at < currentDate.getTime()) {
      console.log("auth expired refreshing");
      await store.dispatch(refreshToken());
      if (config?.headers) {
        console.log("updating headers");
        config.headers["authorization"] = `Bearer ${
          store.getState()?.user?.auth?.access_token
        }`;
      }
    }
    console.log({ config });
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

const getCurrentUsersSavedAlbums = async (access_token, limit, offset) => {
  console.log("getCurrentUsersSavedAlbums", { access_token, limit, offset });
  const params = new URLSearchParams({ limit, offset });
  const response = await spotifyAxios.get(`me/albums?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
const getAllCurrentUsersSavedAlbums = async (access_token) => {
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
const getCurrentUsersPlaylists = async (access_token, limit, offset) => {
  const params = new URLSearchParams({ limit, offset });
  const response = await axios.get(
    `${baseURL}/me/playlists?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

const spotifyService = {
  getCurrentUsersProfile,
  getCurrentUsersSavedAlbums,
  getCurrentUsersPlaylists,
  getAllCurrentUsersSavedAlbums,
};
export default spotifyService;
