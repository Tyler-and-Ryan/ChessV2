import "./Tile.css";

const Tile = (props) => {
  return (
    <div className="Tile" onClick={props.onClick} xlabel={props.x} ylabel={props.y}>
      {(props.altText !== "") && <img src={props.svg} alt={props.altText} xlabel={props.x} ylabel={props.y}/>}
      {props.y === 'a' && <span className="yLabel" xlabel={props.x} ylabel={props.y}>{props.x}</span>}
      {props.x === 1 && <span className="xLabel" xlabel={props.x} ylabel={props.y}>{props.y}</span>}
    </div>
  );
};

export default Tile;
