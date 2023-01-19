import spotifyService from "../../services/spotify";

const extractTracksFromAlbums = async (albums) => {
  const allTracks = await albums.reduce(async (tracks, album) => {
    const albumTracks = await getAlbumsTracks(album);
    return [...(await tracks), ...albumTracks];
  }, []);
  return allTracks;
};

const getAlbumsTracks = async (album) => {
  const tracks = album.tracks.items;
  let hasNext = !!album.tracks.next;
  for (let offSet = 50; hasNext; offSet += 50) {
    const data = await spotifyService.getAlbumTracks(album.id, 50, offSet);
    hasNext = !!data.next;
    tracks.push(data.items);
  }
  return tracks;
};

const utils = { extractTracksFromAlbums };
export default utils;
