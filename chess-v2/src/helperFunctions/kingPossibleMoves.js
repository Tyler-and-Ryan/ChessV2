import { isCheck } from './isCheck.js';
import adjustPiecePositions from './adjustPiecePositions.js';
import generatePossibleMovesWithoutKing from './generatePossibleMovesWithoutKing.js';

/*
 * param: node - a tile on the board that contains a rook
 *        nodes - the list of all tiles on the board
 * return: an array of objects where each object is an x,y pair that represents all possible legal move
 */
const kingPossibleMoves = (node, nodes, edges = null) => {
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
    ) &&
    edges 
    // &&
    // !isCheck(nodes, currNodeIdx - 1 * 8, edges)
  ) {
    //make a shallow copy of board state (nodes)
    let futureNodes = nodes.slice(0);
    //adjust king from current position to possible move position
    futureNodes = adjustPiecePositions(futureNodes, futureNodes.at(currNodeIdx - 1 * 8), futureNodes.at(currNodeIdx));
    //generate new edges based on shallow copy board state
    const futureEdges = generatePossibleMovesWithoutKing(futureNodes, edges);
    //do isCheck to see if the new king position on shallow copy board is in check
    const isPossibleMoveInCheck = isCheck(futureNodes, currNodeIdx - 1 * 8, futureEdges);
    //if checked tile does not have a friendly piece, it is a possible move
    if (!isPossibleMoveInCheck && nodes.at(currNodeIdx - 1 * 8).player !== node.player) {
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
    ) && 
    edges 
    // &&
    // !isCheck(nodes, currNodeIdx - 1 * 8 + 1, edges)
  ) {
    //make a shallow copy of board state (nodes)
    let futureNodes = nodes.slice(0);
    //adjust king from current position to possible move position
    futureNodes = adjustPiecePositions(futureNodes, futureNodes.at(currNodeIdx - 1 * 8 + 1), futureNodes.at(currNodeIdx));
    //generate new edges based on shallow copy board state
    const futureEdges = generatePossibleMovesWithoutKing(futureNodes, edges);
    //do isCheck to see if the new king position on shallow copy board is in check
    const isPossibleMoveInCheck = isCheck(futureNodes, currNodeIdx - 1 * 8 + 1, futureEdges);
    //if checked tile does not have a friendly piece, it is a possible move
    if (!isPossibleMoveInCheck && nodes.at(currNodeIdx - 1 * 8 + 1).player !== node.player) {
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
    ) &&
    edges 
    // &&
    // !isCheck(nodes, currNodeIdx + 1, edges)
  ) {
    //make a shallow copy of board state (nodes)
    let futureNodes = nodes.slice(0);
    //adjust king from current position to possible move position
    futureNodes = adjustPiecePositions(futureNodes, futureNodes.at(currNodeIdx + 1), futureNodes.at(currNodeIdx));
    //generate new edges based on shallow copy board state
    const futureEdges = generatePossibleMovesWithoutKing(futureNodes, edges);
    //do isCheck to see if the new king position on shallow copy board is in check
    const isPossibleMoveInCheck = isCheck(futureNodes, currNodeIdx + 1, futureEdges);
    //if checked tile does not have a friendly piece, it is a possible move
    if (!isPossibleMoveInCheck && nodes.at(currNodeIdx + 1).player !== node.player) {
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
    ) &&
    edges 
    // &&
    // !isCheck(nodes, currNodeIdx + 1 * 8 + 1, edges)
  ) {
    //make a shallow copy of board state (nodes)
    let futureNodes = nodes.slice(0);
    //adjust king from current position to possible move position
    futureNodes = adjustPiecePositions(futureNodes, futureNodes.at(currNodeIdx + 1 * 8 + 1), futureNodes.at(currNodeIdx));
    //generate new edges based on shallow copy board state
    const futureEdges = generatePossibleMovesWithoutKing(futureNodes, edges);
    //do isCheck to see if the new king position on shallow copy board is in check
    const isPossibleMoveInCheck = isCheck(futureNodes, currNodeIdx + 1 * 8 + 1, futureEdges);
    //if checked tile does not have a friendly piece, it is a possible move
    if (!isPossibleMoveInCheck && nodes.at(currNodeIdx + 1 * 8 + 1).player !== node.player) {
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
    ) &&
    edges 
    // &&
    // !isCheck(nodes, currNodeIdx + 1 * 8, edges)
  ) {
    //make a shallow copy of board state (nodes)
    let futureNodes = nodes.slice(0);
    //adjust king from current position to possible move position
    futureNodes = adjustPiecePositions(futureNodes, futureNodes.at(currNodeIdx + 1 * 8), futureNodes.at(currNodeIdx));
    //generate new edges based on shallow copy board state
    const futureEdges = generatePossibleMovesWithoutKing(futureNodes, edges);
    //do isCheck to see if the new king position on shallow copy board is in check
    const isPossibleMoveInCheck = isCheck(futureNodes, currNodeIdx + 1 * 8, futureEdges);
    //if checked tile does not have a friendly piece, it is a possible move
    if (!isPossibleMoveInCheck && nodes.at(currNodeIdx + 1 * 8).player !== node.player) {
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
    ) &&
    edges 
    // &&
    // !isCheck(nodes, currNodeIdx + 1 * 8 - 1, edges)
  ) {
    //make a shallow copy of board state (nodes)
    let futureNodes = nodes.slice(0);
    //adjust king from current position to possible move position
    futureNodes = adjustPiecePositions(futureNodes, futureNodes.at(currNodeIdx + 1 * 8 - 1), futureNodes.at(currNodeIdx));
    //generate new edges based on shallow copy board state
    const futureEdges = generatePossibleMovesWithoutKing(futureNodes, edges);
    //do isCheck to see if the new king position on shallow copy board is in check
    const isPossibleMoveInCheck = isCheck(futureNodes, currNodeIdx + 1 * 8 - 1, futureEdges);
    //if checked tile does not have a friendly piece, it is a possible move
    if (!isPossibleMoveInCheck && nodes.at(currNodeIdx + 1 * 8 - 1).player !== node.player) {
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
    ) &&
    edges 
    // &&
    // !isCheck(nodes, currNodeIdx - 1, edges)
  ) {
    //make a shallow copy of board state (nodes)
    let futureNodes = nodes.slice(0);
    //adjust king from current position to possible move position
    futureNodes = adjustPiecePositions(futureNodes, futureNodes.at(currNodeIdx - 1), futureNodes.at(currNodeIdx));
    //generate new edges based on shallow copy board state
    const futureEdges = generatePossibleMovesWithoutKing(futureNodes, edges);
    //do isCheck to see if the new king position on shallow copy board is in check
    const isPossibleMoveInCheck = isCheck(futureNodes, currNodeIdx - 1, futureEdges);
    //if checked tile does not have a friendly piece, it is a possible move
    if (!isPossibleMoveInCheck && nodes.at(currNodeIdx - 1).player !== node.player) {
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
    ) &&
    edges 
    // &&
    // !isCheck(nodes, currNodeIdx - 1 * 8 - 1, edges)
  ) {
    //make a shallow copy of board state (nodes)
    let futureNodes = nodes.slice(0);
    //adjust king from current position to possible move position
    futureNodes = adjustPiecePositions(futureNodes, futureNodes.at(currNodeIdx - 1 * 8 - 1), futureNodes.at(currNodeIdx));
    //generate new edges based on shallow copy board state
    const futureEdges = generatePossibleMovesWithoutKing(futureNodes, edges);
    //do isCheck to see if the new king position on shallow copy board is in check
    const isPossibleMoveInCheck = isCheck(futureNodes, currNodeIdx - 1 * 8 - 1, futureEdges);
    //if checked tile does not have a friendly piece, it is a possible move
    if (!isPossibleMoveInCheck && nodes.at(currNodeIdx - 1 * 8 - 1).player !== node.player) {
      possibleMoves.push([
        { x: node.x, y: node.y },
        { x: node.x + 1, y: String.fromCharCode(node.y.charCodeAt(0) - 1) },
      ]);
    }
  }

  const leftCastleIdx = nodes.at(currNodeIdx).player === 1 ? 0 : 56;
  const rightCastleIdx = nodes.at(currNodeIdx).player === 1 ? 7 : 63;
  let isPossibleLeftOneMoveInCheck
  let isPossibleLeftTwoMoveInCheck;
  let isPossibleLeftThreeMoveInCheck
  let isPossibleLeftFourMoveInCheck;

  //make a shallow copy of board state (nodes)
  let futureNodes = nodes.slice(0);
  //adjust king from current position to possible move position
  futureNodes = adjustPiecePositions(futureNodes, futureNodes.at(leftCastleIdx + 1), futureNodes.at(currNodeIdx));
  //generate new edges based on shallow copy board state
  let futureEdges = generatePossibleMovesWithoutKing(futureNodes, edges);
  //do isCheck to see if the new king position on shallow copy board is in check
  isPossibleLeftOneMoveInCheck = isCheck(futureNodes, leftCastleIdx + 1, futureEdges);
  //if checked tile does not have a friendly piece, it is a possible move
  if (!isPossibleLeftOneMoveInCheck) { //if left castle + 1 is not under attack (check)
    //make a shallow copy of board state (nodes)
    let futureNodes = nodes.slice(0);
    //adjust king from current position to possible move position
    futureNodes = adjustPiecePositions(futureNodes, futureNodes.at(leftCastleIdx + 2), futureNodes.at(currNodeIdx));
    //generate new edges based on shallow copy board state
    let futureEdges = generatePossibleMovesWithoutKing(futureNodes, edges);
    //do isCheck to see if the new king position on shallow copy board is in check
    isPossibleLeftTwoMoveInCheck = isCheck(futureNodes, leftCastleIdx + 2, futureEdges);
    //if checked tile does not have a friendly piece, it is a possible move
  }
  if (!isPossibleLeftTwoMoveInCheck) { //if left castle + 2 is not under attack (check)
    //make a shallow copy of board state (nodes)
    let futureNodes = nodes.slice(0);
    //adjust king from current position to possible move position
    futureNodes = adjustPiecePositions(futureNodes, futureNodes.at(leftCastleIdx + 3), futureNodes.at(currNodeIdx));
    //generate new edges based on shallow copy board state
    let futureEdges = generatePossibleMovesWithoutKing(futureNodes, edges);
    //do isCheck to see if the new king position on shallow copy board is in check
    isPossibleLeftThreeMoveInCheck = isCheck(futureNodes, leftCastleIdx + 3, futureEdges);
    //if checked tile does not have a friendly piece, it is a possible move
  }
  if (!isPossibleLeftThreeMoveInCheck) { //if left castle + 3 is not under attack (check)
    //make a shallow copy of board state (nodes)
    let futureNodes = nodes.slice(0);
    //adjust king from current position to possible move position
    futureNodes = adjustPiecePositions(futureNodes, futureNodes.at(leftCastleIdx + 4), futureNodes.at(currNodeIdx));
    //generate new edges based on shallow copy board state
    let futureEdges = generatePossibleMovesWithoutKing(futureNodes, edges);
    //do isCheck to see if the new king position on shallow copy board is in check
    isPossibleLeftFourMoveInCheck = isCheck(futureNodes, leftCastleIdx + 4, futureEdges); //if king is not under attack (check)
    //if checked tile does not have a friendly piece, it is a possible move
  }

  //checking for castling opportunity with left rook
  if (
    //if left castle has not moved
    !nodes.at(leftCastleIdx).hasKingMoved &&
    //if left castle + 1 does not have a piece
    !nodes.at(leftCastleIdx + 1).hasPiece &&
    edges &&
    //if left castle + 2 does not have a piece
    !nodes.at(leftCastleIdx + 2).hasPiece &&
    //if left castle + 3 does not have a piece
    !nodes.at(leftCastleIdx + 3).hasPiece &&
    //if king has not moved
    !nodes.at(leftCastleIdx + 4).hasKingMoved &&
    //if tiles in between king (inclusive) and rook (exclusive) are not under attack
    !isPossibleLeftOneMoveInCheck &&
    !isPossibleLeftTwoMoveInCheck &&
    !isPossibleLeftThreeMoveInCheck &&
    !isPossibleLeftFourMoveInCheck
  ) {
    //add space two to the left of the king as possible move
    possibleMoves.push([
      { x: node.x, y: node.y },
      { x: node.x, y: String.fromCharCode(node.y.charCodeAt(0) - 2) },
    ]);
  }


  let isPossibleRightOneMoveInCheck
  let isPossibleRightTwoMoveInCheck;
  let isPossibleRightThreeMoveInCheck

  //make a shallow copy of board state (nodes)
  futureNodes = nodes.slice(0);
  //adjust king from current position to possible move position
  futureNodes = adjustPiecePositions(futureNodes, futureNodes.at(rightCastleIdx - 1), futureNodes.at(currNodeIdx));
  //generate new edges based on shallow copy board state
  futureEdges = generatePossibleMovesWithoutKing(futureNodes, edges);
  //do isCheck to see if the new king position on shallow copy board is in check
  isPossibleRightOneMoveInCheck = isCheck(futureNodes, rightCastleIdx - 1, futureEdges);
  //if checked tile does not have a friendly piece, it is a possible move
  if (!isPossibleRightOneMoveInCheck) { //if right castle - 2 is not under attack (check)
    //make a shallow copy of board state (nodes)
    let futureNodes = nodes.slice(0);
    //adjust king from current position to possible move position
    futureNodes = adjustPiecePositions(futureNodes, futureNodes.at(rightCastleIdx - 2), futureNodes.at(currNodeIdx));
    //generate new edges based on shallow copy board state
    let futureEdges = generatePossibleMovesWithoutKing(futureNodes, edges);
    //do isCheck to see if the new king position on shallow copy board is in check
    isPossibleRightTwoMoveInCheck = isCheck(futureNodes, rightCastleIdx - 2, futureEdges);
    //if checked tile does not have a friendly piece, it is a possible move
  }
  if (!isPossibleRightTwoMoveInCheck) { //if king is not under attack (check)
    //make a shallow copy of board state (nodes)
    let futureNodes = nodes.slice(0);
    //adjust king from current position to possible move position
    futureNodes = adjustPiecePositions(futureNodes, futureNodes.at(rightCastleIdx - 3), futureNodes.at(currNodeIdx));
    //generate new edges based on shallow copy board state
    let futureEdges = generatePossibleMovesWithoutKing(futureNodes, edges);
    //do isCheck to see if the new king position on shallow copy board is in check
    isPossibleRightThreeMoveInCheck = isCheck(futureNodes, rightCastleIdx - 3, futureEdges);
    //if checked tile does not have a friendly piece, it is a possible move
  }

   //checking for castling opportunity with right rook
   if (
    //if right castle has not moved
    !nodes.at(rightCastleIdx).hasKingMoved &&
    //if right castle - 1 does not have a piece
    !nodes.at(rightCastleIdx - 1).hasPiece &&
    edges &&
    //if right castle - 2 does not have a piece
    !nodes.at(rightCastleIdx - 2).hasPiece &&
    //if king has not moved
    !nodes.at(rightCastleIdx - 3).hasKingMoved &&
    !isPossibleRightOneMoveInCheck &&
    !isPossibleRightTwoMoveInCheck &&
    !isPossibleRightThreeMoveInCheck
    
  ) {
    //add space two to the right of the king as possible move 
    possibleMoves.push([
      { x: node.x, y: node.y },
      { x: node.x, y: String.fromCharCode(node.y.charCodeAt(0) + 2) },
    ]);
  }

  return possibleMoves;
};

export { kingPossibleMoves };
