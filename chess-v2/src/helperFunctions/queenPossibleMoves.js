import { bishopPossibleMoves } from "./bishopPossibleMoves";
import { rookPossibleMoves } from "./rookPossibleMoves";

/*
 * param: node - a tile on the board that contains a rook
 *        nodes - the list of all tiles on the board
 *        checkingForKing - consider friendly pieces as possible to be taken. This is useful for seeing which pieces the King can take or not
 * return: an array of objects where each object is an x,y pair that represents all possible legal move
 */
const queenPossibleMoves = (node, nodes, checkingForKing = false) => {
  //queen possible moves are left/right/up/down (like the rook) and
  //upright/upleft/downright/downleft (like the bishop)
  //so queen possible moves is just rook + bishop possible moves
  const possibleMovesPartOne = rookPossibleMoves(node, nodes, checkingForKing);
  const possibleMovesPartTwo = bishopPossibleMoves(node, nodes, checkingForKing);
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
