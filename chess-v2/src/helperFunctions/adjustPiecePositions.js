/*
 * This function takes in the current board state (nodes) and
 * returns an altered copy where the piece from the destinationTile
 * is now located on the sourceTile. The destinationTile then becomes
 * empty
 */
const adjustPiecePositions = (nodes, destinationTile, sourceTile) => {
  return nodes.map((node) => {
    //if destination tile, copy info from source tile and replace at destination
    if (node.x === destinationTile.x && node.y === destinationTile.y) {
      return {
        svg: sourceTile.svg,
        altText: sourceTile.altText,
        x: node.x,
        y: node.y,
        hasPiece: sourceTile.hasPiece,
        player: sourceTile.player,
        isHighlighted: false,
        isSelected: false,
      };
      //if source tile, reset to default settings, blank tile
    } else if (node.x === sourceTile.x && node.y === sourceTile.y) {
      return {
        svg: {},
        altText: "",
        x: node.x,
        y: node.y,
        hasPiece: false,
        player: 2,
        isHighlighted: false,
        isSelected: false,
      };
    }
    //if not source or destination tile, stay the same
    return {
      svg: node.svg,
      altText: node.altText,
      x: node.x,
      y: node.y,
      hasPiece: node.hasPiece,
      player: node.player,
      isHighlighted: false,
      isSelected: false,
    };
  });
};

export default adjustPiecePositions;
