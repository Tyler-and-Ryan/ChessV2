import "./Tile.css";

const Tile = (props) => {
  return (
    <div className="Tile">
      {(props.altText !== "") && <img src={props.svg} alt={props.altText} />}
      {props.y === 'a' && <span className="yLabel">{props.x}</span>}
      {props.x === 1 && <span className="xLabel">{props.y}</span>}
    </div>
  );
};

export default Tile;
