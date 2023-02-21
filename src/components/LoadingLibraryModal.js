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
  return (
    <div className={`modal modal${show ? "-open" : ""}`}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Loading Your Library</h3>
        {albums?.length && <p>{`Albums: ${library.albums.length}`}</p>}
        {playlists?.length && <p>{`Playlists: ${library.playlists.length}`}</p>}
        <div>
          <div className="grid grid-cols-12 gap-0">
            {allItemsRandomOrder.map((item) => (
              <div key={item.id}>
                <img src={item.images?.slice(-1)?.[0]?.url} alt={item.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingLibraryModal;
