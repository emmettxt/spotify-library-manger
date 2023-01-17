import { useEffect } from "react";
import { Accordion, Card, Col, Row, ToggleButton } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import spotifyService from "../../services/spotify";

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

const AlbumSelectorAccordionItem = ({
  selectedAlbums,
  setSelectedAlbums,
  setLoading,
  albums,
  setAlbums,
}) => {
  const user = useSelector((state) => state.user);
  const { auth } = user;
  useEffect(() => {
    const getAllAlbums = async () => {
      setAlbums([]);
      setLoading(true);
      let hasNext = true;
      for (let offset = 0; hasNext; offset += 50) {
        console.log({ offset });
        const next50 = await spotifyService.getCurrentUsersSavedAlbums(
          auth.access_token,
          50,
          offset
        );
        hasNext = !!next50.next;
        setAlbums((albums) => [...albums, ...next50.items]);
      }
    };

    getAllAlbums().then(() => {
      setLoading(false);
    });
  }, [auth, setAlbums, setLoading]);
  const handleSelectAllAlbums = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (allAlbumsSelected) {
      //removed the albums property of selectedLibraryItems
      setSelectedAlbums({});
    } else {
      const allAlbumsObject = albums.reduce(
        (object, { album }) => ({ ...object, [album.id]: album }),
        {}
      );
      setSelectedAlbums(allAlbumsObject);
    }
  };
  const allAlbumsSelected =
    Object.keys(selectedAlbums).length === albums.length;
  const selectAlbum = (album) => {
    const id = album.id;
    setSelectedAlbums((selectedAlbums) => ({ ...selectedAlbums, [id]: album }));
  };
  const removeAlbum = (album) => {
    const { [album.id]: _, ...rest } = selectedAlbums;
    setSelectedAlbums(rest);
  };
  return (
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
          {albums.map(({ album }) => (
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
  );
};

export default AlbumSelectorAccordionItem;
