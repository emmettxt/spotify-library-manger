import { useState } from "react";
import { Accordion, Button, Form, Modal } from "react-bootstrap";
import spotifyService from "../../services/spotify";
import AlbumSelectorAccordionItem from "./AlbumSelectorAccordionItem";
import utils from "./util";

const PlaylistPage = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    setLoading({
      isLoading: true,
      loadingHeader: `Creating Playlist ${name}`,
      loadingMessage: null,
    });
    const newPlaylist = await spotifyService.createPlaylist(
      event.target.name.value,
      undefined,
      undefined,
      "Created by Emmet"
    );
    // console.log({ newPlaylist });
    const tracks = await utils.extractTracksFromAlbums(
      Object.values(selectedAlbums)
    );
    setLoading((loading) => ({
      ...loading,
      loadingMessages: [`${tracks.length}  selected`],
    }));
    let added = 0;
    const setTracksAddedMessage = (added) => {
      setLoading((loading) => ({
        ...loading,
        loadingMessages: [
          ...loading.loadingMessages,
          `${added} tracks added to playlist`,
        ],
      }));
    };
    const appendLoadingMessage = (message) => {
      setLoading((loading) => ({
        ...loading,
        loadingMessages: [...loading.loadingMessages, message],
      }));
    };

    for (let i = 0; i < tracks.length; i += 100) {
      try {
        const uris = tracks
          .slice(i, i + 100)
          .map((track) => track.uri)
          .filter((uri) => uri && uri !== null);
        await spotifyService.addItemsToPlaylist(
          newPlaylist.id,
          undefined,
          uris
        );
        added += uris.length;
        appendLoadingMessage(`${added} tracks added to playlist`);
        // setTracksAddedMessage(added);
      } catch (error) {
        appendLoadingMessage(
          `There was an error adding tracks to playlist: ${error?.response?.data?.error?.message}`
        );
      }
    }
  };
  const [loading, setLoading] = useState({
    isLoading: false,
    loadingHeader: null,
    loadingMessages: [],
  });

  const [selectedAlbums, setSelectedAlbums] = useState({});
  const [albums, setAlbums] = useState([]);
  return (
    <>
      <Modal show={loading.isLoading}>
        <Modal.Header>{loading.loadingHeader}</Modal.Header>
        <Modal.Body>
          {loading?.loadingMessages?.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </Modal.Body>
      </Modal>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Playlist Name</Form.Label>
          <Form.Control name="name" type="text" required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Include</Form.Label>
          <Accordion>
            <AlbumSelectorAccordionItem
              {...{
                selectedAlbums,
                setSelectedAlbums,
                setLoading,
                albums,
                setAlbums,
              }}
            />
          </Accordion>
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Playlist
        </Button>
      </Form>
    </>
  );
};

export default PlaylistPage;
