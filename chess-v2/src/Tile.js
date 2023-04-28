import "./Tile.css";

const Tile = (props) => {
  return (
    <div className="Tile">
      {(props.altText !== "") && <img src={props.svg} alt={props.altText} />}
    </div>
  );
};

export default Tile;
