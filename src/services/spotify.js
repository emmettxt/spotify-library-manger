import axios from "axios";

const baseUrl = " https://api.spotify.com/v1";

const getCurrentUsersProfile = async (access_token) => {
  const response = await axios.get(`${baseUrl}/me`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const getCurrentUsersSavedAlbums = async (access_token, limit, offset) => {
  const params = new URLSearchParams({ limit, offset });
  const response = await axios.get(
    `${baseUrl}/me/albums?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
const getAllCurrentUsersSavedAlbums = async (access_token) => {
  const params = new URLSearchParams({ limit: 50, offset: 0 });
  let url = `${baseUrl}/me/albums?${params.toString()}`;
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
  return albums
};
const getCurrentUsersPlaylists = async (access_token, limit, offset) => {
  const params = new URLSearchParams({ limit, offset });
  const response = await axios.get(
    `${baseUrl}/me/playlists?${params.toString()}`,
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
