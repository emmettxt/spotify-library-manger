import { useState } from "react";
import { Accordion, Button, Form, Modal } from "react-bootstrap";
import AlbumSelectorAccordionItem from "./AlbumSelectorAccordionItem";

const PlaylistPage = () => {
  
  const [playlistName, setPlaylistName] = useState("");
  const handlePlaylistNameChange = async (event) => {
    setPlaylistName(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const [loading, setLoading] = useState(true);

  const [selectedAlbums, setSelectedAlbums] = useState({});
  const [albums, setAlbums] = useState([]);
  // const [playlists, setPlaylists] = useState([]);
  return (
    <>
      <Modal show={loading}>
        <Modal.Header>Loading your library</Modal.Header>
        <Modal.Body>{`Albums: ${albums.length}`}</Modal.Body>
      </Modal>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Playlist Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            required
            value={playlistName}
            onChange={handlePlaylistNameChange}
            isInvalid
          />
        </Form.Group>
        <Form.Group isInvalid>
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
