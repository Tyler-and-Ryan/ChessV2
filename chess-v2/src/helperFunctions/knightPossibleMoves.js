/*
 * param: node - a tile on the board that contains a knight
 *        nodes - the list of all tiles on the board
 * return: an array of objects where each object is an x,y pair that represents all possible legal move
 */
const knightPossibleMoves = (node, nodes) => {
  //check all 8 possible moves
  //  if tile is in bounds and does not contain friendly piece, add to possibleMoves
  let possibleMoves = [];
  const currNodeIdx = nodes.indexOf(node);
  //checking up 2, left 1 position
  if (node.x + 2 <= 8 && String.fromCharCode(node.y.charCodeAt(0) - 1) >= "a") {
    //if checked tile does not have a friendly piece, it is a possible move
    if (nodes.at(currNodeIdx - 2 * 8 - 1).player !== node.player) {
      possibleMoves.push({
        x: node.x + 2,
        y: String.fromCharCode(node.y.charCodeAt(0) - 1),
      });
    }
  }

  //checking up 2, right 1 position
  if (node.x + 2 <= 8 && String.fromCharCode(node.y.charCodeAt(0) + 1) <= "h") {
    //if checked tile does not have a friendly piece, it is a possible move
    if (nodes.at(currNodeIdx - 2 * 8 + 1).player !== node.player) {
      possibleMoves.push({
        x: node.x + 2,
        y: String.fromCharCode(node.y.charCodeAt(0) + 1),
      });
    }
  }

  //checking up 1, right 2 position
  if (node.x + 1 <= 8 && String.fromCharCode(node.y.charCodeAt(0) + 2) <= "h") {
    //if checked tile does not have a friendly piece, it is a possible move
    if (nodes.at(currNodeIdx - 1 * 8 + 2).player !== node.player) {
      possibleMoves.push({
        x: node.x + 1,
        y: String.fromCharCode(node.y.charCodeAt(0) + 2),
      });
    }
  }

  //checking down 1, right 2 position
  if (node.x - 1 >= 1 && String.fromCharCode(node.y.charCodeAt(0) + 2) <= "h") {
    //if checked tile does not have a friendly piece, it is a possible move
    if (nodes.at(currNodeIdx + 1 * 8 + 2).player !== node.player) {
      possibleMoves.push({
        x: node.x - 1,
        y: String.fromCharCode(node.y.charCodeAt(0) + 2),
      });
    }
  }

  //checking down 2, right 1 position
  if (node.x - 2 >= 1 && String.fromCharCode(node.y.charCodeAt(0) + 1) <= "h") {
    //if checked tile does not have a friendly piece, it is a possible move
    if (nodes.at(currNodeIdx + 2 * 8 + 1).player !== node.player) {
      possibleMoves.push({
        x: node.x - 2,
        y: String.fromCharCode(node.y.charCodeAt(0) + 1),
      });
    }
  }

  //checking down 2, left 1 position
  if (node.x - 2 >= 1 && String.fromCharCode(node.y.charCodeAt(0) - 1) >= "a") {
    //if checked tile does not have a friendly piece, it is a possible move
    if (nodes.at(currNodeIdx + 2 * 8 - 1).player !== node.player) {
      possibleMoves.push({
        x: node.x - 2,
        y: String.fromCharCode(node.y.charCodeAt(0) - 1),
      });
    }
  }

  //checking down 1, left 2 position
  if (node.x - 1 >= 1 && String.fromCharCode(node.y.charCodeAt(0) - 2) >= "a") {
    //if checked tile does not have a friendly piece, it is a possible move
    if (nodes.at(currNodeIdx + 1 * 8 - 2).player !== node.player) {
      possibleMoves.push({
        x: node.x - 1,
        y: String.fromCharCode(node.y.charCodeAt(0) - 2),
      });
    }
  }

  //checking up 1, left 2 position
  if (node.x + 1 <= 8 && String.fromCharCode(node.y.charCodeAt(0) - 2) >= "a") {
    //if checked tile does not have a friendly piece, it is a possible move
    if (nodes.at(currNodeIdx - 1 * 8 - 2).player !== node.player) {
      possibleMoves.push({
        x: node.x + 1,
        y: String.fromCharCode(node.y.charCodeAt(0) - 2),
      });
    }
  }

  return possibleMoves;
};

export { knightPossibleMoves };
