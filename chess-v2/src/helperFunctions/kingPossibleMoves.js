/*
 * param: node - a tile on the board that contains a rook
 *        nodes - the list of all tiles on the board
 * return: an array of objects where each object is an x,y pair that represents all possible legal move
 */
const kingPossibleMoves = (node, nodes) => {
  //TODO: Add a function call to isCheck before adding possible move
  //look one tile in each direction around the King
  //if tile is in bounds and not within 1 tile of the other King
  //if it does not have a friendly piece, add it to possible moves

  let possibleMoves = [];
  const currNodeIdx = nodes.indexOf(node);
  let otherKing;
  for (let i = 0; i < nodes.length; i++) {
    if (
      nodes.at(i).altText.includes("King") &&
      nodes.at(i).player !== node.player
    ) {
      otherKing = nodes.at(i);
      break;
    }
  }

  //checking up 1
  if (
    node.x + 1 <= 8 &&
    !(
      Math.abs(otherKing.x - (node.x + 1)) <= 1 &&
      Math.abs(otherKing.y.charCodeAt(0) - node.y.charCodeAt(0)) <= 1
    )
  ) {
    //if checked tile does not have a friendly piece, it is a possible move
    if (nodes.at(currNodeIdx - 1 * 8).player !== node.player) {
      possibleMoves.push([
        { x: node.x, y: node.y },
        { x: node.x + 1, y: node.y },
      ]);
    }
  }

  //checking up 1, right 1 position
  if (
    node.x + 1 <= 8 &&
    String.fromCharCode(node.y.charCodeAt(0) + 1) <= "h" &&
    !(
      Math.abs(otherKing.x - (node.x + 1)) <= 1 &&
      Math.abs(otherKing.y.charCodeAt(0) - (node.y.charCodeAt(0) + 1)) <= 1
    )
  ) {
    //if checked tile does not have a friendly piece, it is a possible move
    if (nodes.at(currNodeIdx - 1 * 8 + 1).player !== node.player) {
      possibleMoves.push([
        { x: node.x, y: node.y },
        { x: node.x + 1, y: String.fromCharCode(node.y.charCodeAt(0) + 1) },
      ]);
    }
  }

  //checking right 1 position
  if (
    String.fromCharCode(node.y.charCodeAt(0) + 1) <= "h" &&
    !(
      Math.abs(otherKing.x - node.x) <= 1 &&
      Math.abs(otherKing.y.charCodeAt(0) - (node.y.charCodeAt(0) + 1)) <= 1
    )
  ) {
    //if checked tile does not have a friendly piece, it is a possible move
    if (nodes.at(currNodeIdx + 1).player !== node.player) {
      possibleMoves.push([
        { x: node.x, y: node.y },
        { x: node.x, y: String.fromCharCode(node.y.charCodeAt(0) + 1) },
      ]);
    }
  }

  //checking down 1, right 1 position
  if (
    node.x - 1 >= 1 &&
    String.fromCharCode(node.y.charCodeAt(0) + 1) <= "h" &&
    !(
      Math.abs(otherKing.x - (node.x - 1)) <= 1 &&
      Math.abs(otherKing.y.charCodeAt(0) - (node.y.charCodeAt(0) + 1)) <= 1
    )
  ) {
    //if checked tile does not have a friendly piece, it is a possible move
    if (nodes.at(currNodeIdx + 1 * 8 + 1).player !== node.player) {
      possibleMoves.push([
        { x: node.x, y: node.y },
        { x: node.x - 1, y: String.fromCharCode(node.y.charCodeAt(0) + 1) },
      ]);
    }
  }

  //checking down 1
  if (
    node.x - 1 >= 1 &&
    !(
      Math.abs(otherKing.x - (node.x - 1)) <= 1 &&
      Math.abs(otherKing.y.charCodeAt(0) - node.y.charCodeAt(0)) <= 1
    )
  ) {
    //if checked tile does not have a friendly piece, it is a possible move
    if (nodes.at(currNodeIdx + 1 * 8).player !== node.player) {
      possibleMoves.push([
        { x: node.x, y: node.y },
        { x: node.x - 1, y: node.y },
      ]);
    }
  }

  //checking down 1, left 1 position
  if (
    node.x - 1 >= 1 &&
    String.fromCharCode(node.y.charCodeAt(0) - 1) >= "a" &&
    !(
      Math.abs(otherKing.x - (node.x - 1)) <= 1 &&
      Math.abs(otherKing.y.charCodeAt(0) - (node.y.charCodeAt(0) - 1)) <= 1
    )
  ) {
    //if checked tile does not have a friendly piece, it is a possible move
    if (nodes.at(currNodeIdx + 1 * 8 - 1).player !== node.player) {
      possibleMoves.push([
        { x: node.x, y: node.y },
        { x: node.x - 1, y: String.fromCharCode(node.y.charCodeAt(0) - 1) },
      ]);
    }
  }

  //checking left 1 position
  if (
    String.fromCharCode(node.y.charCodeAt(0) - 1) >= "a" &&
    !(
      Math.abs(otherKing.x - node.x) <= 1 &&
      Math.abs(otherKing.y.charCodeAt(0) - (node.y.charCodeAt(0) - 1)) <= 1
    )
  ) {
    //if checked tile does not have a friendly piece, it is a possible move
    if (nodes.at(currNodeIdx - 1).player !== node.player) {
      possibleMoves.push([
        { x: node.x, y: node.y },
        { x: node.x, y: String.fromCharCode(node.y.charCodeAt(0) - 1) },
      ]);
    }
  }

  //checking up 1, left 1 position
  if (
    node.x + 1 <= 8 &&
    String.fromCharCode(node.y.charCodeAt(0) - 1) >= "a" &&
    !(
      Math.abs(otherKing.x - (node.x + 1)) <= 1 &&
      Math.abs(otherKing.y.charCodeAt(0) - (node.y.charCodeAt(0) - 1)) <= 1
    )
  ) {
    //if checked tile does not have a friendly piece, it is a possible move
    if (nodes.at(currNodeIdx - 1 * 8 - 1).player !== node.player) {
      possibleMoves.push([
        { x: node.x, y: node.y },
        { x: node.x + 1, y: String.fromCharCode(node.y.charCodeAt(0) - 1) },
      ]);
    }
  }

  return possibleMoves;
};

export { kingPossibleMoves };
