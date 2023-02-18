import { LazyLoadImage } from "react-lazy-load-image-component";

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
      className={`${className} card card-compact h-full btn btn-block p-0 ${
        isSelected ? `btn btn-primary btn-${selectedColor}` : ""
      }`}
      onClick={handleClick}
    >
      <figure>
        <LazyLoadImage src={imgURL} loading="lazy" />
      </figure>
      <div className="card-body card normal-case break-words max-w-full ">{cardBody}</div>
    </button>
  );
};

export default CardButton;
