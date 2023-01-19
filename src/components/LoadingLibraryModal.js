import { Col, Image, Modal, Ratio, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const shuffleArray = (array) => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

const LoadingLibraryModal = ({ show }) => {
  const library = useSelector((state) => state.library);
  const { albums, playlists } = library;
  const allItemsRandomOrder = [
    ...albums.map(({ album }) => album),
    ...playlists,
  ]
    .filter((item) => item?.images?.[0]?.url)
    .slice(0, 120);

  shuffleArray(allItemsRandomOrder);
  // .sort((a, b) => 0.5 - Math.random());
  // const state
  return (
    <Modal show={show} fullscreen>
      <Modal.Header>Loading Your Library</Modal.Header>
      <Modal.Body>
        {albums?.length && <p>{`Albums: ${library.albums.length}`}</p>}
        {playlists?.length && <p>{`Albums: ${library.playlists.length}`}</p>}
        <div>
          <Row className={"gx-0 gy-0"}>
            {allItemsRandomOrder.map((item) => (
              <Col xs={1}>
                <Ratio aspectRatio={"1x1"}>
                  <Image fluid src={item.images?.[0]?.url} alt={item.name} />
                </Ratio>
              </Col>
            ))}
          </Row>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoadingLibraryModal;
