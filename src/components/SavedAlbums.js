import { useEffect, useState } from "react";
import { Card, CardGroup, Col, Row } from "react-bootstrap";
import spotifyService from "../services/spotify";
import { LazyLoadImage } from "react-lazy-load-image-component";
const SavedAlbums = ({ auth }) => {
  const [savedAlbums, setSavedAlbums] = useState([]);
  useEffect(() => {
    const getAllAlbums = async () => {
      let hasNext = true;
      let offset = 0;
      while (hasNext) {
        const next50 = await spotifyService.getCurrentUsersSavedAlbums(
          auth.access_token,
          50,
          offset
        );
        offset += 50;
        hasNext = !!next50.next;
        setSavedAlbums((savedAlbums) => [...savedAlbums, ...next50.items]);
      }
    };
    getAllAlbums();
  }, [auth.access_token]);
  //   spotifyService
  //     .getAllCurrentUsersSavedAlbums(auth.access_token, 50, 0)
  //     .then((data) => setSavedAlbums(data));
  // }, [auth]);
  return (
    <Row xs={1} sm={2} md={3} lg={4} xl={5}>
      {savedAlbums.map(({ album }) => (
        <Col>
          <Card>
            <Card.Img
              variant="top"
              src={album.images[0].url}
              loading="lazy"
              as={LazyLoadImage}
            />
            <Card.Body>
              <Card.Title>{album.name}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default SavedAlbums;
