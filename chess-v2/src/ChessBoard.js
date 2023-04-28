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
 * Time Complexity: O(E) where E < N(N - 1)
 */

/*
 * Assumption: Tiles/nodes have already been updated to reflect the 
 *             move that just occurred
 * Goal: to delete all old edges relating to each node involved in the last move, then to 
 *       calculate the new edges for each node
 * generateEdges(startNode, endNode, nodes, E)
 *      1) traverse edges, delete all edges with source at startNode or endNode
 *      2) if startNode has a piece:
 *          a) create list of all possible move locations (in bounds) based on the piece
 *          b) create edges for each of those possible moves
 *          c) add those edges to E
 *      3) if endNode has a piece
 *          a) create list of all possible move locations (in bounds) based on the piece
 *          b) create edges for each of those possible moves
 *          c) add those edges to E
 *          
 *
 *
 */

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
