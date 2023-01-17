import { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Card,
  Col,
  Form,
  Modal,
  ModalHeader,
  Row,
  ToggleButton,
} from "react-bootstrap";
import spotifyService from "../../services/spotify";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
const AlbumCard = ({ album, isSelected, removeAlbum, selectAlbum }) => {
  const handleClick = (event) => {
    event.preventDefault();
    if (isSelected) {
      removeAlbum(album);
    } else {
      selectAlbum(album);
    }
  };
  return (
    <Card
      className={"h-100 " + (isSelected ? "text-white bg-success" : null)}
      onClick={handleClick}
      as="button"
    >
      <Card.Img
        variant="top"
        src={album.images[0].url}
        loading="lazy"
        as={LazyLoadImage}
      />
      <Card.Body className="align-middle">
        <Card.Title>{album.name}</Card.Title>
        <Card.Subtitle>
          {album.artists.map((a) => a.name).toString()}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

const PlaylistPage = () => {
  const user = useSelector((state) => state.user);
  const { auth, profile } = user;
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
  const [loading, setLoading] = useState(true);
  const [savedAlbums, setSavedAlbums] = useState([]);
  useEffect(() => {
    const getAllAlbums = async () => {
      console.log("get all albums");

      let hasNext = true;
      for (let offset = 0; hasNext; offset += 50) {
        console.log({ offset });
        const next50 = await spotifyService.getCurrentUsersSavedAlbums(
          auth.access_token,
          50,
          offset
        );
        hasNext = !!next50.next;
        setSavedAlbums((savedAlbums) => [...savedAlbums, ...next50.items]);
      }
    };
    console.log("use ffect");

    getAllAlbums().then(() => {
      console.log("get all albums finished");

      setLoading(false);
    });
  }, [auth]);

  const [selectedAlbums, setSelectedAlbums] = useState({});
  const selectAlbum = (album) => {
    const id = album.id;
    setSelectedAlbums((selectedAlbums) => ({ ...selectedAlbums, [id]: album }));
  };
  const removeAlbum = (album) => {
    const { [album.id]: _, ...rest } = selectedAlbums;
    setSelectedAlbums(rest);
  };
  const handleSelectAllAlbums = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (allAlbumsSelected) {
      setSelectedAlbums({});
    } else {
      const allAlbumsObject = savedAlbums.reduce(
        (object, { album }) => ({ ...object, [album.id]: album }),
        {}
      );
      setSelectedAlbums(allAlbumsObject);
    }
  };
  const allAlbumsSelected =
    Object.keys(selectedAlbums).length === savedAlbums.length;
  return (
    <>
      <Modal show={loading}>
        <Modal.Header>Loading your library</Modal.Header>
        <Modal.Body>{`Albums: ${savedAlbums.length}`}</Modal.Body>
      </Modal>
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
        <Form.Group isInvalid>
          <Form.Label>Include</Form.Label>
          <Accordion>
            <Accordion.Item>
              <Accordion.Header>Albums</Accordion.Header>
              <Accordion.Body>
                <ToggleButton
                  onClick={handleSelectAllAlbums}
                  checked={allAlbumsSelected}
                  variant="outline-secondary"
                  type="radio"
                >
                  Select {allAlbumsSelected ? "None" : "All"}
                </ToggleButton>
                <Row
                  xs={2}
                  sm={3}
                  md={4}
                  lg={5}
                  xl={6}
                  style={{ alignItems: "stretch" }}
                >
                  {savedAlbums.map(({ album }) => (
                    <Col key={album.id}>
                      <AlbumCard
                        album={album}
                        selectAlbum={selectAlbum}
                        removeAlbum={removeAlbum}
                        isSelected={!!selectedAlbums[album.id]}
                      />
                    </Col>
                  ))}
                </Row>
              </Accordion.Body>
            </Accordion.Item>
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
