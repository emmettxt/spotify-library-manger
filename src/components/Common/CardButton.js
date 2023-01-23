import { LazyLoadImage } from "react-lazy-load-image-component";

const CardButton = ({ cardBody, imgURL, onClick, isSelected, className }) => {
  const handleClick = (event) => {
    event.preventDefault();
    onClick();
  };
  return (
    <button
      className={`${className} card card-compact h-full btn btn-block p-0 ${
        isSelected ? "btn-primary" : ""
      }`}
      onClick={handleClick}
    >
      <figure>
        <LazyLoadImage src={imgURL} loading="lazy" />
      </figure>
      <div className="card-body card normal-case" >
        {cardBody}
      </div>
    </button>
  );
};

export default CardButton;
