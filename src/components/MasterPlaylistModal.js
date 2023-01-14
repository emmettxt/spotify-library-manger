import { useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";

const MasterPlaylistModal = () => {
  const [open, setopen] = useState(false);
  const handleOpen = () => setopen(true);
  const handleClose = () => {
    setopen(false);
    setValidated(false);
  };

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
  return (
    <>
      <Button onClick={handleOpen}>Create Master Playlist</Button>
      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Master Playlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} validated={validated} noValidate>
            <Form.Group className="mb-3" >
              <Form.Label>Playlist Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
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
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default MasterPlaylistModal;
