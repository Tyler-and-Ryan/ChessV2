import "./Tile.css";

const Tile = (props) => {
  return (
    <div className="Tile">
      {(props.altText !== "") && <img src={props.svg} alt={props.altText} />}
      <span>1</span>
    </div>
  );
};

export default Tile;
