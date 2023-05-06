import "./Tile.css";

const Tile = (props) => {
  const isHighlighted = props.isHighlighted;
  return (
    <div className={isHighlighted ? "highlightedTile" : "Tile"} onClick={props.tileOnClick} xlabel={props.x} ylabel={props.y}>
      {(props.altText !== "") && <img src={props.svg} alt={props.altText} xlabel={props.x} ylabel={props.y}/>}
      {isHighlighted && <div className="highlightedDot" onClick={props.movePiece} xlabel={props.x} ylabel={props.y}/>}
      {props.y === 'a' && <span className="yLabel" xlabel={props.x} ylabel={props.y}>{props.x}</span>}
      {props.x === 1 && <span className="xLabel" xlabel={props.x} ylabel={props.y}>{props.y}</span>}
    </div>
  );
};

export default Tile;
