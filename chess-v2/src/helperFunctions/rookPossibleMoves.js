/*
 * param: node - a tile on the board that contains a rook
 *        nodes - the list of all tiles on the board
 *        checkingForKing - consider friendly pieces as possible to be taken. This is useful for seeing which pieces the King can take or not
 * return: an array of objects where each object is an x,y pair that represents all possible legal move
 */
const rookPossibleMoves = (node, nodes, checkingForKing) => {
  //look in each direction (up, right, down, left) until the edge of the board or a friendly/enemy tile is reached
  //while looking in each direction, add empty tiles to the possible moves list
  //if the edge of the board is found, do not include moves out of bounds, break out of the loop
  //if friendly unit is found, do not include that as a possible move, break out of the loop
  //if enemy unit is found, include that as a possible move, break out of the loop

  let possibleMoves = [];
  let rookPlayer = node.player;
  let startTileIdx = nodes.indexOf(node);
  let startTile = nodes.at(startTileIdx);
  let currTileIdx = startTileIdx;
  currTileIdx -= 8; //looking at tile one row above
  while (currTileIdx >= 0 && currTileIdx < nodes.length) {
    //looking upwards vertical
    let checkTile = nodes.at(currTileIdx);
    if (checkTile.hasPiece) {
      //enemy piece in the way, add to possibleMoves then break
      //also add if it is a friendly piece and checkingForKing
      if (rookPlayer !== checkTile.player || checkingForKing) {
        possibleMoves.push([
          { x: startTile.x, y: startTile.y },
          { x: checkTile.x, y: checkTile.y },
        ]);
      }
      break; //friendly piece in the way, don't add to possibleMoves
    }
    possibleMoves.push([
      { x: startTile.x, y: startTile.y },
      { x: checkTile.x, y: checkTile.y },
    ]);
    currTileIdx -= 8; //looking at tile one row above
  }
  currTileIdx = startTileIdx;
  currTileIdx += 8; //looking at tile one row above
  while (currTileIdx >= 0 && currTileIdx < nodes.length) {
    //looking downwards vertical
    let checkTile = nodes.at(currTileIdx);
    if (checkTile.hasPiece) {
      //enemy piece in the way, add to possibleMoves then break
      //also add if it is a friendly piece and checkingForKing
      if (rookPlayer !== checkTile.player || checkingForKing) {
        possibleMoves.push([
          { x: startTile.x, y: startTile.y },
          { x: checkTile.x, y: checkTile.y },
        ]);
      }
      break; //friendly piece in the way, don't add to possibleMoves
    }
    possibleMoves.push([
      { x: startTile.x, y: startTile.y },
      { x: checkTile.x, y: checkTile.y },
    ]);
    currTileIdx += 8; //looking at tile one row above
  }
  currTileIdx = startTileIdx;
  currTileIdx++; //looking at tile one row above
  while (
    currTileIdx >= 0 &&
    currTileIdx < nodes.length &&
    startTile.x === nodes.at(currTileIdx).x
  ) {
    //looking right horizontal
    let checkTile = nodes.at(currTileIdx);
    if (checkTile.hasPiece) {
      //enemy piece in the way, add to possibleMoves then break
      //also add if it is a friendly piece and checkingForKing
      if (rookPlayer !== checkTile.player || checkingForKing) {
        possibleMoves.push([
          { x: startTile.x, y: startTile.y },
          { x: checkTile.x, y: checkTile.y },
        ]);
      }
      break; //friendly piece in the way, don't add to possibleMoves
    }
    possibleMoves.push([
      { x: startTile.x, y: startTile.y },
      { x: checkTile.x, y: checkTile.y },
    ]);
    currTileIdx++; //looking at tile one row above
  }
  currTileIdx = startTileIdx;
  currTileIdx--; //looking at tile one row above
  while (
    currTileIdx >= 0 &&
    currTileIdx < nodes.length &&
    startTile.x === nodes.at(currTileIdx).x
  ) {
    //looking left horizontal
    let checkTile = nodes.at(currTileIdx);
    if (checkTile.hasPiece) {
      //enemy piece in the way, add to possibleMoves then break
      //also add if it is a friendly piece and checkingForKing
      if (rookPlayer !== checkTile.player || checkingForKing) {
        possibleMoves.push([
          { x: startTile.x, y: startTile.y },
          { x: checkTile.x, y: checkTile.y },
        ]);
      }
      break; //friendly piece in the way, don't add to possibleMoves
    }
    possibleMoves.push([
      { x: startTile.x, y: startTile.y },
      { x: checkTile.x, y: checkTile.y },
    ]);
    currTileIdx--; //looking at tile one row above
  }

  return possibleMoves;
};

export { rookPossibleMoves };
