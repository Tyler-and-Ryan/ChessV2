/*
 * isCheckMate pseudocode
 * isCheckMate(player before their turn starts)
 *      1) iterate through edges, see if any enemies have King as destination // same as isCheck(player)
 *          a) if not, return false
 *          b) if so, test if King has any moves to get out of check by repeating above step
 *             with other destination tiles
 *              i)   if so, return false
 *              ii)  if not, make a list S of all tiles in between King and Attacking piece
 *                   for each attacking piece
 *              iii) if # of attacking pieces > 1, find the intersection of S1 and S2.
 *                   if the intersection of S1 and S2 = {}, return True. if intersection
 *                   of S1 and S2 has elements, make S = intersection of S1 and S2
 *              iv)  iterate through edges, if any friendlies have destination in S, return false.
 *                   if they have no destinations in S, return True
 *
 * Time Complexity: O(E + N) where E < N(N - 1)
 *
 * Returns game status: "whiteWon", "blackWon", "tie", "whiteInCheck", "blackInCheck", "ongoing"
 */

import { kingPossibleMoves } from "./kingPossibleMoves";
import generatePossibleMoves from "./generatePossibleMoves";

//if there are 2 or more attackers, the king must move or checkmate
const checkGameStatus = (nodes, edges) => {
  let attackingWhiteKing = [];
  let attackingBlackKing = [];
  let whiteKingPossibleMoves = [];
  let blackKingPossibleMoves = [];
  let isBlackInCheck = false;
  let isWhiteInCheck = false;
  let blackKing = nodes.filter((node) => {
    return node.altText === "Black King";
  });
  let whiteKing = nodes.filter((node) => {
    return node.altText === "White King";
  });

  for (let i = 0; i < edges.length; i++) {
    if (edges.at(i)[1].x === blackKing.x && edges.at(i)[1].y === blackKing.y) {
      isBlackInCheck = true;
      nodes
        .filter((node) => {
          return node.x === edges.at(i)[0].x && node.y === edges.at(i)[0].y;
        })
        .forEach((node) => attackingBlackKing.push(node));
    } else if (edges.at(i)[1].x === whiteKing.x && edges.at(i)[1].y === whiteKing.y) {
        isWhiteInCheck = true;
      nodes
        .filter((node) => {
          return node.x === edges.at(i)[0].x && node.y === edges.at(i)[0].y;
        })
        .forEach((node) => attackingWhiteKing.push(node));
    }
  }
  if (!isWhiteInCheck && !isBlackInCheck) return "ongoing"; //neither player in check

  const edgesForCheckmate = generatePossibleMoves(nodes, true);
  if (isWhiteInCheck) {
    whiteKingPossibleMoves = kingPossibleMoves(whiteKing, nodes);
    for (let i = 0; i < whiteKingPossibleMoves.length; i++) {
        let isMoveInCheck = false;
        for (let j = 0; j < edgesForCheckmate; j++) {
            if (edgesForCheckmate.at(j)[1].x === whiteKingPossibleMoves[i][1].x && edgesForCheckmate.at(j)[1].y === whiteKingPossibleMoves[i][1].y) {
                isMoveInCheck = true;
                break;
            }
        }
        if (!isMoveInCheck) { //it is only check, not checkmate, if king has somewhere to move
            return "whiteInCheck";
        }
    }
  }
  if (isBlackInCheck) {
    blackKingPossibleMoves = kingPossibleMoves(blackKing, nodes);
    for (let i = 0; i < blackKingPossibleMoves.length; i++) {
        let isMoveInCheck = false;
        for (let j = 0; j < edgesForCheckmate; j++) {
            if (edgesForCheckmate.at(j)[1].x === blackKingPossibleMoves[i][1].x && edgesForCheckmate.at(j)[1].y === blackKingPossibleMoves[i][1].y) {
                isMoveInCheck = true;
                break;
            }
        }
        if (!isMoveInCheck) { //it is only check, not checkmate, if king has somewhere to move
            return "blackInCheck";
        }
    }
  }
  
  //at this point, we know that one of the kings is in check and that king has no move to get out of check. We must
  //see if any of their friendly pieces can block for them, or it is checkmate


};

export default checkGameStatus;
