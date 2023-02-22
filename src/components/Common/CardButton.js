import { LazyLoadImage } from "react-lazy-load-image-component";
import { ReactComponent as PlaceHolder } from "../../assets/record-vinyl-solid.svg";
import RecordBackground from "./RecordBackground";

const CardButton = ({
  cardBody,
  imgURL,
  onClick,
  isSelected,
  className,
  selectedColor = "primary",
}) => {
  const handleClick = (event) => {
    event.preventDefault();
    onClick();
  };
  return (
    <button
      className={`${className} card card-compact h-full btn btn-block p-0 overflow-hidden ${
        isSelected ? `btn btn-primary btn-${selectedColor}` : ""
      }`}
      onClick={handleClick}
    >
      <figure className="aspect-square w-full">
        <RecordBackground className="aspect-square w-full">
          <LazyLoadImage
            src={imgURL}
            loading="lazy"
            placeholder={<PlaceHolder />}
            className=""
          />
        </RecordBackground>
      </figure>
      <div className="card-body card normal-case break-words max-w-full ">
        {cardBody}
      </div>
    </button>
  );
};

export default CardButton;
