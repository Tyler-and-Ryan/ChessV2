/*
 * param: node - a tile on the board that contains a rook
 *        nodes - the list of all tiles on the board
 * return: an array of objects where each object is an x,y pair that represents all possible legal move
 */
const bishopPossibleMoves = (node, nodes) => {
  //look in each diagonal (upright, upleft, downright, downleft) until the edge of the board or a friendly/enemy tile is reached
  //while looking in each direction, add empty tiles to the possible moves list
  //if the edge of the board is found, do not include moves out of bounds, break out of the loop
  //if friendly unit is found, do not include that as a possible move, break out of the loop
  //if enemy unit is found, include that as a possible move, break out of the loop

  let possibleMoves = [];
  let bishopPlayer = node.player;
  let startTileIdx = nodes.indexOf(node);
  let currTileIdx = startTileIdx;
  currTileIdx = currTileIdx - 8 + 1; //looking upright one tile
  let rightBorder = startTileIdx % 8;
  while (currTileIdx >= 0 && currTileIdx < nodes.length) {
    if (rightBorder === 7) {
      //if piece is at edge of map, don't look further
      break;
    }
    rightBorder++;
    //looking upright
    let checkTile = nodes.at(currTileIdx);
    if (checkTile.hasPiece) {
      if (bishopPlayer !== checkTile.player) {
        possibleMoves.push([
          { x: node.x, y: node.y },
          { x: checkTile.x, y: checkTile.y },
        ]); //enemy piece in the way, add to possibleMoves then break;
      }
      break; //friendly piece in the way, don't add to possibleMoves
    }
    possibleMoves.push([
      { x: node.x, y: node.y },
      { x: checkTile.x, y: checkTile.y },
    ]);
    currTileIdx = currTileIdx - 8 + 1; //looking upright one tile
  }
  currTileIdx = startTileIdx;
  currTileIdx = currTileIdx - 8 - 1; //looking upleft one tile
  let leftBorder = startTileIdx % 8;
  while (currTileIdx >= 0 && currTileIdx < nodes.length) {
    if (leftBorder === 0) {
      //if piece is at edge of map, don't look further
      break;
    }
    leftBorder--;
    //looking upleft
    let checkTile = nodes.at(currTileIdx);
    if (checkTile.hasPiece) {
      if (bishopPlayer !== checkTile.player) {
        possibleMoves.push([
          { x: node.x, y: node.y },
          { x: checkTile.x, y: checkTile.y },
        ]); //enemy piece in the way, add to possibleMoves then break;
      }
      break; //friendly piece in the way, don't add to possibleMoves
    }
    possibleMoves.push([
      { x: node.x, y: node.y },
      { x: checkTile.x, y: checkTile.y },
    ]);
    currTileIdx = currTileIdx - 8 - 1; //looking upleft one tile
  }
  currTileIdx = startTileIdx;
  currTileIdx = currTileIdx + 8 + 1; //looking downright one tile
  rightBorder = startTileIdx % 8;
  while (currTileIdx >= 0 && currTileIdx < nodes.length) {
    if (rightBorder === 7) {
      //if piece is at edge of map, don't look further
      break;
    }
    rightBorder++;
    //looking downright
    let checkTile = nodes.at(currTileIdx);
    if (checkTile.hasPiece) {
      if (bishopPlayer !== checkTile.player) {
        possibleMoves.push([
          { x: node.x, y: node.y },
          { x: checkTile.x, y: checkTile.y },
        ]); //enemy piece in the way, add to possibleMoves then break;
      }
      break; //friendly piece in the way, don't add to possibleMoves
    }
    possibleMoves.push([
      { x: node.x, y: node.y },
      { x: checkTile.x, y: checkTile.y },
    ]);
    currTileIdx = currTileIdx + 8 + 1; //looking downright one tile
  }
  currTileIdx = startTileIdx;
  currTileIdx = currTileIdx + 8 - 1; //looking downleft one tile
  leftBorder = startTileIdx % 8;
  while (currTileIdx >= 0 && currTileIdx < nodes.length) {
    if (leftBorder === 0) {
      //if piece is at edge of map, don't look further
      break;
    }
    leftBorder--;
    //looking downleft
    let checkTile = nodes.at(currTileIdx);
    if (checkTile.hasPiece) {
      if (bishopPlayer !== checkTile.player) {
        possibleMoves.push([
          { x: node.x, y: node.y },
          { x: checkTile.x, y: checkTile.y },
        ]); //enemy piece in the way, add to possibleMoves then break;
      }
      break; //friendly piece in the way, don't add to possibleMoves
    }
    possibleMoves.push([
      { x: node.x, y: node.y },
      { x: checkTile.x, y: checkTile.y },
    ]);
    currTileIdx = currTileIdx + 8 - 1; //looking downleft one tile
  }

  return possibleMoves;
};

export { bishopPossibleMoves };
