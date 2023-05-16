import "./Tile.css";

const Tile = (props) => {
  const isHighlighted = props.isHighlighted;
  const isSelected = props.isSelected;
  return (
    <div className={isHighlighted ? "highlightedTile" : (isSelected ? "selectedTile" : "Tile")} onClick={props.tileOnClick} xlabel={props.x} ylabel={props.y}>
      {(props.altText !== "") && <img src={props.svg} alt={props.altText} xlabel={props.x} ylabel={props.y}/>}
      {isHighlighted && <div className="highlightedDot" onClick={props.movePiece} xlabel={props.x} ylabel={props.y}/>}
      {props.y === 'a' && <span className={props.justifyLabel === "White" ? "yLabelWhitePlayer" : "yLabelBlackPlayer"} xlabel={props.x} ylabel={props.y}>{props.x}</span>}
      {props.x === 1 && <span className={props.justifyLabel === "White" ? "xLabelWhitePlayer" : "xLabelBlackPlayer"} xlabel={props.x} ylabel={props.y}>{props.y}</span>}
    </div>
  );
};

export default Tile;
