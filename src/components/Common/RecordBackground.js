import PlaceHolderSVG from "../../assets/record-vinyl-solid.svg";

const RecordBackground = ({ className, children }) => (
  <div className={className + " relative"}>
    <div
      className={"bg-neutral-content"}
      style={{
        width: "100%",
        position: "absolute",
        aspectRatio: 1,
        maskImage: `url(${PlaceHolderSVG})`,
        maskMode: "alpha",
        WebkitMaskImage: `url(${PlaceHolderSVG})`,
        zIndex: 1,
      }}
    ></div>
    <div className="z-10 absolute	inset-0 w-full">{children}</div>
  </div>
);
export default RecordBackground;
