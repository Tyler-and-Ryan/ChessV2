/*
 * param: node - a tile on the board that contains a rook
 *        nodes - the list of all tiles on the board
 *        checkingForKing - boolean that when true tells the function to add
 *                          diagonal attacks to possible moves even when no enemy
 *                          piece is there. This is used to include moves that would be
 *                          illegal for a King, but not legal for the player with the pawn
 * return: an array of objects where each object is an x,y pair that represents all possible legal move
 */
const blackPawnPossibleMoves = (node, nodes, checkingForKing) => {
  //If pawn.x == 7, then check one tile and two tiles above for possible moves
  //also check up 1 right 1 and up 1 left 1 for moves
  //  (only if enemy pieces are there or if checkingForKing is true)
  //TODO: Implement Pawn Promotion

  const currNodeIdx = nodes.indexOf(node);
  let possibleMoves = [];
  //checking down 1
  if (node.x >= 2 && !nodes.at(currNodeIdx + 8).hasPiece) {
    possibleMoves.push([
      { x: node.x, y: node.y },
      { x: node.x - 1, y: node.y },
    ]);
  }

  //checking down 2
  if (
    node.x === 7 &&
    !nodes.at(currNodeIdx + 8).hasPiece &&
    !nodes.at(currNodeIdx + 16).hasPiece
  ) {
    possibleMoves.push([
      { x: node.x, y: node.y },
      { x: node.x - 2, y: node.y },
    ]);
  }

  //checking down 1 left 1
  if (
    node.x >= 2 &&
    node.y >= "b" &&
    (checkingForKing ||
      (nodes.at(currNodeIdx + 8 - 1).hasPiece &&
        nodes.at(currNodeIdx + 8 - 1).player !==
          nodes.at(currNodeIdx).player) ||
      (node.x === 4 && //checking for en passant
        nodes.at(currNodeIdx - 1).justMovedTwice &&
        !nodes.at(currNodeIdx + 8 - 1).hasPiece))
  ) {
    possibleMoves.push([
      { x: node.x, y: node.y },
      { x: node.x - 1, y: String.fromCharCode(node.y.charCodeAt(0) - 1) },
    ]);
  }

  //checking down 1 right 1
  if (
    node.x >= 2 &&
    node.y <= "g" &&
    (checkingForKing ||
      (nodes.at(currNodeIdx + 8 + 1).hasPiece &&
        nodes.at(currNodeIdx + 8 + 1).player !==
          nodes.at(currNodeIdx).player) ||
      (node.x === 4 && //checking for en passant
        nodes.at(currNodeIdx + 1).justMovedTwice &&
        !nodes.at(currNodeIdx + 8 + 1).hasPiece))
  ) {
    possibleMoves.push([
      { x: node.x, y: node.y },
      { x: node.x - 1, y: String.fromCharCode(node.y.charCodeAt(0) + 1) },
    ]);
  }

  return possibleMoves;
};

export { blackPawnPossibleMoves };
