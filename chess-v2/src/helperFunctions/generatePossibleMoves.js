import { uniqueArray } from "./uniqueArray";
import { rookPossibleMoves } from "./rookPossibleMoves";
import { knightPossibleMoves } from "./knightPossibleMoves";
import { bishopPossibleMoves } from "./bishopPossibleMoves";
import { queenPossibleMoves } from "./queenPossibleMoves";
import { kingPossibleMoves } from "./kingPossibleMoves";
import { whitePawnPossibleMoves } from "./whitePawnPossibleMoves";
import { blackPawnPossibleMoves } from "./blackPawnPossibleMoves";

/* Assumption: Tiles/nodes have already been updated to reflect the
 *             move that just occurred
 * Goal: return new array with all edges - loop through all nodes and add on to edges array iteratively
 */
const generatePossibleMoves = (nodes) => {
  let updatedEdges = [];

  for (let i = 0; i < nodes.length; i++) {
    let possibleMoves = [];
    if (
      nodes.at(i).altText === "White Rook" ||
      nodes.at(i).altText === "Black Rook"
    ) {
      possibleMoves = rookPossibleMoves(nodes.at(i), nodes);
    } else if (
      nodes.at(i).altText === "White Knight" ||
      nodes.at(i).altText === "Black Knight"
    ) {
      possibleMoves = knightPossibleMoves(nodes.at(i), nodes);
    } else if (
      nodes.at(i).altText === "White Bishop" ||
      nodes.at(i).altText === "Black Bishop"
    ) {
      possibleMoves = bishopPossibleMoves(nodes.at(i), nodes);
    } else if (
      nodes.at(i).altText === "White Queen" ||
      nodes.at(i).altText === "Black Queen"
    ) {
      possibleMoves = queenPossibleMoves(nodes.at(i), nodes);
    } else if (
      nodes.at(i).altText === "White King" ||
      nodes.at(i).altText === "Black King"
    ) {
      possibleMoves = kingPossibleMoves(nodes.at(i), nodes);
    } else if (nodes.at(i).altText === "White Pawn") {
      possibleMoves = whitePawnPossibleMoves(nodes.at(i), nodes, false);
    } else if (nodes.at(i).altText === "Black Pawn") {
      possibleMoves = blackPawnPossibleMoves(nodes.at(i), nodes, false);
    }
    possibleMoves.forEach((possibleMove) => {
      updatedEdges.push(possibleMove);
    });
  }

  return uniqueArray(updatedEdges);
};

export default generatePossibleMoves;
