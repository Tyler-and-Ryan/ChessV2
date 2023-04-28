import React, { useState } from "react";
import "./ChessBoard.css";
import Tile from "./Tile.js";
import { defaultEdges, defaultNodes } from "./defaultPositions.js"

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
 */

/* Assumption: Tiles/nodes have already been updated to reflect the 
 *             move that just occurred
 * Goal: return new array with all edges - loop through all nodes and add on to edges array iteratively
 */
const generateEdges = (nodes) => {
  let updatedEdges = [];

  nodes.forEach((node) => {
    let possibleMoves = [];
    if (node.altText === "White Rook" || node.altText === "Black Rook") {
      possibleMoves = rookPossibleMoves(node.x, node.y); //TODO: implement this function (returns array of edge objects)
    } else if (node.altText === "White Knight" || node.altText === "Black Knight") {
      possibleMoves = knightPossibleMoves(node.x, node.y); //TODO: implement this function (returns array of edge objects)
    } else if (node.altText === "White Bishop" || node.altText === "Black Bishop") {
      possibleMoves = bishopPossibleMoves(node.x, node.y); //TODO: implement this function (returns array of edge objects)
    } else if (node.altText === "White Queen" || node.altText === "Black Queen") {
      possibleMoves = queenPossibleMoves(node.x, node.y); //TODO: implement this function (returns array of edge objects)
    } else if (node.altText === "White King" || node.altText === "Black King") {
      possibleMoves = kingPossibleMoves(node.x, node.y); //TODO: implement this function (returns array of edge objects)
    } else if (node.altText === "White Pawn") {
      possibleMoves = whitePawnPossibleMoves(node.x, node.y); //TODO: implement this function (returns array of edge objects)
    } else if (node.altText === "Black Pawn") {
      possibleMoves = blackPawnPossibleMoves(node.x, node.y) //TODO: implement this function (returns array of edge objects)
    }
    possibleMoves.forEach((possibleMove) => {
      updatedEdges.push(possibleMove);
    });
  });

  return updatedEdges;
}

const ChessBoard = () => {
  const [nodes, setNodes] = useState(defaultNodes);

  return (
    <div>
      <div className="ChessBoardContainer">
        {nodes.map((node) => {
            return <Tile svg={node.svg} altText={node.altText} 
                        x={node.x} y={node.y} hasPiece={node.hasPiece} />;
        })}
      </div>
    </div>
  );
};

export default ChessBoard;
