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
import adjustPiecePositions from "./adjustPiecePositions";
import generatePossibleMoves from "./generatePossibleMoves";
import { isCheck } from "./isCheck";

const checkGameStatus = (nodes, edges, edgesForKing) => { //TODO: figure out Tie criteria and implement a check for that
  let attackingWhiteKing = [];
  let attackingBlackKing = [];
  let whiteKingPossibleMoves = [];
  let blackKingPossibleMoves = [];
  let isBlackInCheck = false;
  let isWhiteInCheck = false;
  let blackKing = nodes.filter((node) => {
    return node.altText === "Black King";
  });
  blackKing = blackKing[0];
  let whiteKing = nodes.filter((node) => {
    return node.altText === "White King";
  });
  whiteKing = whiteKing[0];

  //check if either king is currently in check
  //if so, add all pieces attacking the king in an array
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
  console.log("blackKing: [" + blackKing.x + ", " + blackKing.y + "]");
  console.log("whiteKing: [" + whiteKing.x + ", " + whiteKing.y + "]");
  if (!isWhiteInCheck && !isBlackInCheck) return "ongoing"; //neither player in check

  //check if white king can move out of check. If so, then the king is simply in check
  if (isWhiteInCheck) {
    whiteKingPossibleMoves = kingPossibleMoves(whiteKing, nodes, edges);
    console.log("checkGameStatus - whiteKingPossibleMoves.length: " + whiteKingPossibleMoves.length);
    for (let i = 0; i < whiteKingPossibleMoves.length; i++) {
        //make a shallow copy of board state (nodes)
        let futureNodes = nodes.slice(0);
        //adjust king from current position to possible move position
        futureNodes = adjustPiecePositions(futureNodes, futureNodes.at((8 - whiteKingPossibleMoves[i][1].x) * 8 + whiteKingPossibleMoves[i][1].y.charCodeAt(0) - 97), futureNodes.at((8 - whiteKing.x) * 8 + whiteKing.y.charCodeAt(0) - 97));
        futureNodes.forEach((node) => {
          if (node.hasPiece) {
            console.log("futureNodes - " + node.altText + " [" + node.x + ", " + node.y + "]");
          }
          
        });
        //generate new edges based on shallow copy board state
        const futureEdges = generatePossibleMoves(futureNodes, edges);
        futureEdges.forEach((edge) => {
          console.log("futureEdges - [" + edge[0].x + ", " + edge[0].y + "] -> [" + edge[1].x + ", " + edge[1].y + "]");
        });
        //do isCheck to see if the new king position on shallow copy board is in check
        console.log("king [" + whiteKingPossibleMoves[i][0].x + ", " + whiteKingPossibleMoves[i][0].y + "] -> [" + whiteKingPossibleMoves[i][1].x + ", " + whiteKingPossibleMoves[i][1].y + "]");
        const isPossibleMoveInCheck = isCheck(futureNodes, (8 - whiteKingPossibleMoves[i][1].x) * 8 + whiteKingPossibleMoves[i][1].y.charCodeAt(0) - 97, futureEdges);
        //if not, return "whiteInCheck" because there is a possible move to get out of check
        console.log("checkGameStatus - isPossibleMoveInCheck: " + isPossibleMoveInCheck);
        if (!isPossibleMoveInCheck) return "whiteInCheck";
    }
  }

  //check if black king can move out of check. If so, then the king is simply in check
  if (isBlackInCheck) {
    blackKingPossibleMoves = kingPossibleMoves(blackKing, nodes, edges);
    for (let i = 0; i < blackKingPossibleMoves.length; i++) {
        //make a shallow copy of board state (nodes)
        let futureNodes = nodes.slice(0);
        //adjust king from current position to possible move position
        futureNodes = adjustPiecePositions(futureNodes, futureNodes.at((8 - blackKingPossibleMoves[i][1].x) * 8 + blackKingPossibleMoves[i][1].y.charCodeAt(0) - 97), futureNodes.at((8 - blackKing.x) * 8 + blackKing.y.charCodeAt(0) - 97));
        //generate new edges based on shallow copy board state
        const futureEdges = generatePossibleMoves(futureNodes, edges);
        //do isCheck to see if the new king position on shallow copy board is in check
        const isPossibleMoveInCheck = isCheck(futureNodes, (8 - blackKingPossibleMoves[i][1].x) * 8 + blackKingPossibleMoves[i][1].y.charCodeAt(0) - 97, futureEdges);
          //if not, return "whiteInCheck" because there is a possible move to get out of check
        if (!isPossibleMoveInCheck) return "blackInCheck";
    }
  }

  //if there are 2 or more attackers, the king must move or checkmate
  if (attackingBlackKing.length > 1) {
    if (isBlackInCheck) return "whiteWon";
    else if (isWhiteInCheck) return "blackWon";
  }
  
  
  //    iterate through each of the edges
  //      if the edge is from a friendly piece
  //        make a shallow copy of the board state
  //        move the friendly piece to that spot on the board
  //        evaluate if king is still in check
  //        if king is not is check, return whiteInCheck or blackInCheck
  //      if still running after loop, return blackWon or whiteWon

  //at this point, we know that one of the kings is in check and that king has no move to get out of check. We must
  //see if any of their friendly pieces can block for them, or it is checkmate
  const playerInCheck = isWhiteInCheck ? 0 : 1;

  for (let i = 0; i < edges.length; i++) {
    //if the edge is from a friendly piece and not the king itself
    if (nodes.at(((8 - edges.at(i)[0].x) * 8) + edges.at(i)[0].y.charCodeAt(0) - 97).player === playerInCheck && !(edges.at(i)[0].x === blackKing.x && edges.at(i)[0].y === blackKing.y) && !(edges.at(i)[0].x === whiteKing.x && edges.at(i)[0].y === whiteKing.y)) {
      //make a shallow copy of the board state
      let futureNodes = nodes.slice(0);
      //move the friendly piece to that spot on the board
      futureNodes = adjustPiecePositions(futureNodes, futureNodes.at((8 - edges.at(i)[1].x) * 8 + edges.at(i)[1].y.charCodeAt(0) - 97), futureNodes.at((8 - edges.at(i)[0].x) * 8 + edges.at(i)[0].y.charCodeAt(0) - 97));
      //generate new edges based on shallow copy board state
      const futureEdges = generatePossibleMoves(futureNodes, edges);
      //evaluate if king is still in check
      let isFutureKingInCheck;
      if (isBlackInCheck) {
        isFutureKingInCheck = isCheck(futureNodes, (8 - blackKing.x) * 8 + blackKing.y.charCodeAt(0) - 97, futureEdges)
      } else {
        isFutureKingInCheck = isCheck(futureNodes, (8 - whiteKing.x) * 8 + whiteKing.y.charCodeAt(0) - 97, futureEdges)
      }
      //if king is not is check, return whiteInCheck or blackInCheck because there is a piece that can block the check
      if (!isFutureKingInCheck) {
        console.log("checkGameStatus - isFutureKingInCheck: " + isFutureKingInCheck);
        if (isBlackInCheck) return "blackInCheck";
        else return "whiteInCheck";
      }
    }
  }
  //if still running after loop, return blackWon or whiteWon
  //if no friendly piece can block, then the attacking piece player has won - checkmate
  if (playerInCheck === 0) return "blackWon";
  else return "whiteWon";
};

export default checkGameStatus;
