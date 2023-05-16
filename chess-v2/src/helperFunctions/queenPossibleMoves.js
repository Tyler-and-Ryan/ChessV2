import { bishopPossibleMoves } from "./bishopPossibleMoves";
import { rookPossibleMoves } from "./rookPossibleMoves";

/*
 * param: node - a tile on the board that contains a rook
 *        nodes - the list of all tiles on the board
 * return: an array of objects where each object is an x,y pair that represents all possible legal move
 */
const queenPossibleMoves = (node, nodes) => {
  //queen possible moves are left/right/up/down (like the rook) and
  //upright/upleft/downright/downleft (like the bishop)
  //so queen possible moves is just rook + bishop possible moves
  let possibleMovesPartOne = rookPossibleMoves(node, nodes);
  let possibleMovesPartTwo = bishopPossibleMoves(node, nodes);
  let totalPossibleMoves;
  if (possibleMovesPartOne.length > 0 && possibleMovesPartTwo.length > 0) {
    totalPossibleMoves = [...possibleMovesPartOne, ...possibleMovesPartTwo];
  } else if (possibleMovesPartOne.length > 0) {
    totalPossibleMoves = possibleMovesPartOne;
  } else {
    totalPossibleMoves = possibleMovesPartTwo;
  }

  return totalPossibleMoves;
};

export { queenPossibleMoves };
