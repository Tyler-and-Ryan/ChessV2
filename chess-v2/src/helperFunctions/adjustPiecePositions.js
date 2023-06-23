/*
 * This function takes in the current board state (nodes) and
 * returns an altered copy where the piece from the destinationTile
 * is now located on the sourceTile. The destinationTile then becomes
 * empty
 */
const adjustPiecePositions = (nodes, destinationTile, sourceTile) => {
  //TODO: Figure out how to remove pawn from adjacent tile after en passant
  const isPawnMoving =
    sourceTile.altText === "White Pawn" || sourceTile.altText === "Black Pawn";
  let isEnPassant = false;
  const enPassantCaptureX = sourceTile.x; //x value of piece that is being captured by en passant
  let enPassantCaptureY = "z"; //x value of piece that is being captured by en passant
  //white pawn en passant left
  if (
    isPawnMoving &&
    !destinationTile.hasPiece &&
    ((sourceTile.x === 5 && destinationTile.x === 6) ||
      (sourceTile.x === 4 && destinationTile.x === 3))
  ) {
    if (destinationTile.y < sourceTile.y) {
      isEnPassant = true; //white or black pawn en passant left
      enPassantCaptureY = String.fromCharCode(sourceTile.y.charCodeAt(0) - 1);
    } else if (destinationTile.y > sourceTile.y) {
      isEnPassant = true; //white or black pawn en passant right
      enPassantCaptureY = String.fromCharCode(sourceTile.y.charCodeAt(0) + 1);
    }
  }

  return nodes.map((node) => {
    //if destination tile, copy info from source tile and replace at destination
    if (node.x === destinationTile.x && node.y === destinationTile.y) {
      if (!isPawnMoving) {
        //if moving piece is not a pawn, it cannot be eligible for en passant
        return {
          ...node,
          svg: sourceTile.svg,
          altText: sourceTile.altText,
          hasPiece: sourceTile.hasPiece,
          player: sourceTile.player,
          isHighlighted: false,
          isSelected: false,
          justMovedTwice: false,
        };
      }
      return {
        ...node,
        svg: sourceTile.svg,
        altText: sourceTile.altText,
        hasPiece: sourceTile.hasPiece,
        player: sourceTile.player,
        isHighlighted: false,
        isSelected: false,
      };
      //if source tile, reset to default settings, blank tile
    } else if (node.x === sourceTile.x && node.y === sourceTile.y) {
      //only (at most) one pawn can be eligible for capture by En Passant at any given time
      if (sourceTile.x === 4 || sourceTile.x === 5) {
        return {
          ...node,
          svg: {},
          altText: "",
          hasPiece: false,
          player: 2,
          isHighlighted: false,
          isSelected: false,
          justMovedTwice: false,
        };
      }
      return {
        ...node,
        svg: {},
        altText: "",
        hasPiece: false,
        player: 2,
        isHighlighted: false,
        isSelected: false,
      };
    } else if ( //reset tile being captured by en passant
      isEnPassant &&
      node.x === enPassantCaptureX &&
      node.y === enPassantCaptureY
    ) {
      return {
        ...node,
        svg: {},
        altText: "",
        hasPiece: false,
        player: 2,
        isHighlighted: false,
        isSelected: false,
        justMovedTwice: false,
      };
    }
    //if not source or destination tile, stay the same
    //also set justMovedTwice to false for all non destination tiles
    if (node.x === 4 || node.x === 5) {
      return {
        ...node,
        isHighlighted: false,
        isSelected: false,
        justMovedTwice: false,
      };
    }
    return { ...node, isHighlighted: false, isSelected: false };
  });
};

export default adjustPiecePositions;
