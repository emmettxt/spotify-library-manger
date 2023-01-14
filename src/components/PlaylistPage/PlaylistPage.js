import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const PlaylistPage = ({ auth }) => {
  const [playlistName, setPlaylistName] = useState("");
  const handlePlaylistNameChange = async (event) => {
    setPlaylistName(event.target.value);
  };
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!event.target.name.value) {
      event.target.name.isValid = false;
      setValidated(true);
      return;
    }
  };
  return(
  <Form onSubmit={handleSubmit} validated={validated}>
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
    <Form.Group isInValid hasValidation>
      <Form.Check isInValid label="playlists" name="playlists" />
      <Form.Check label="Saved Albums" name="albums" />
    </Form.Group>
    <Button variant="primary" type="submit">
      Create Playlist
    </Button>
  </Form>);
};

export default PlaylistPage;
