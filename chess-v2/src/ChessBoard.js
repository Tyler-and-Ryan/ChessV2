import React, { useState } from "react";
import "./ChessBoard.css";
import Tile from "./Tile.js";
//deprecate defaultEdges once edge generation process is completed and QA'd
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

/* 
 * param: node - a tile on the board that contains a knight
 *        nodes - the list of all tiles on the board
 * return: an array of objects where each object is an x,y pair that represents a possible legal move
 */
const knightPossibleMoves = (node, nodes) => {
  //check all 8 possible moves
  //  if tile is in bounds and does not contain friendly piece, add to possibleMoves

}

/*
 * param: node - a tile on the board that contains a rook
 *        nodes - the list of all tiles on the board
 * return: an array of objects where each object is an x,y pair that represents a possible legal move 
 */
const rookPossibleMoves = (node, nodes) => {
  //look in each direction (up, right, down, left) until the edge of the board or a friendly/enemy tile is reached
  //while looking in each direction, add empty tiles to the possible moves list
  //if the edge of the board is found, do not include moves out of bounds, break out of the loop
  //if friendly unit is found, do not include that as a possible move, break out of the loop
  //if enemy unit is found, include that as a possible move, break out of the loop
  let possibleMoves = [];
  let rookPlayer = node.player;
  let startTileIdx = nodes.indexOf(node);
  let startTile = nodes.at(startTileIdx);
  let currTileIdx = startTileIdx;
  currTileIdx -= 8; //looking at tile one row above
  while (currTileIdx >= 0 && currTileIdx < nodes.length) { //looking upwards vertical
    let checkTile = nodes.at(currTileIdx);
    if (checkTile.hasPiece) {
      if (rookPlayer !== checkTile.player) {
        possibleMoves.push({ x: checkTile.x, y: checkTile.y }); //enemy piece in the way, add to possibleMoves then break;
      }
      break; //friendly piece in the way, don't add to possibleMoves
    }
    possibleMoves.push({ x: checkTile.x, y: checkTile.y });
    currTileIdx -= 8; //looking at tile one row above
  }
  currTileIdx = startTileIdx;
  currTileIdx += 8; //looking at tile one row above
  while (currTileIdx >= 0 && currTileIdx < nodes.length) { //looking downwards vertical
    let checkTile = nodes.at(currTileIdx);
    if (checkTile.hasPiece) {
      if (rookPlayer !== checkTile.player) {
        possibleMoves.push({ x: checkTile.x, y: checkTile.y }); //enemy piece in the way, add to possibleMoves then break;
      }
      break; //friendly piece in the way, don't add to possibleMoves
    }
    possibleMoves.push({ x: checkTile.x, y: checkTile.y });
    currTileIdx += 8; //looking at tile one row above
  }
  currTileIdx = startTileIdx;
  currTileIdx++; //looking at tile one row above
  while (currTileIdx >= 0 && currTileIdx < nodes.length && startTile.x === nodes.at(currTileIdx).x) { //looking right horizontal
    let checkTile = nodes.at(currTileIdx);
    if (checkTile.hasPiece) {
      if (rookPlayer !== checkTile.player) {
        possibleMoves.push({ x: checkTile.x, y: checkTile.y }); //enemy piece in the way, add to possibleMoves then break;
      }
      break; //friendly piece in the way, don't add to possibleMoves
    }
    possibleMoves.push({ x: checkTile.x, y: checkTile.y });
    currTileIdx++; //looking at tile one row above
  }
  currTileIdx = startTileIdx;
  currTileIdx--; //looking at tile one row above
  while (currTileIdx >= 0 && currTileIdx < nodes.length && startTile.x === nodes.at(currTileIdx).x) { //looking left horizontal
    let checkTile = nodes.at(currTileIdx);
    if (checkTile.hasPiece) {
      if (rookPlayer !== checkTile.player) {
        possibleMoves.push({ x: checkTile.x, y: checkTile.y }); //enemy piece in the way, add to possibleMoves then break;
      }
      break; //friendly piece in the way, don't add to possibleMoves
    }
    possibleMoves.push({ x: checkTile.x, y: checkTile.y });
    currTileIdx--; //looking at tile one row above
  }

  return possibleMoves;

}

/* Assumption: Tiles/nodes have already been updated to reflect the 
 *             move that just occurred
 * Goal: return new array with all edges - loop through all nodes and add on to edges array iteratively
 */
const generateEdges = (nodes) => {
  let updatedEdges = [];

  for (let i = 0; i < nodes.length; i++) {
    let possibleMoves = [];
    if (nodes.at(i).altText === "White Rook" || nodes.at(i).altText === "Black Rook") {
      possibleMoves = rookPossibleMoves(nodes.at(i), nodes); //TODO: implement this function (returns array of edge objects)
    } else if (nodes.at(i).altText === "White Knight" || nodes.at(i).altText === "Black Knight") {
      //possibleMoves = knightPossibleMoves(nodes.at(i), nodes); //TODO: implement this function (returns array of edge objects)
    } else if (nodes.at(i).altText === "White Bishop" || nodes.at(i).altText === "Black Bishop") {
      //possibleMoves = bishopPossibleMoves(nodes.at(i), nodes); //TODO: implement this function (returns array of edge objects)
    } else if (nodes.at(i).altText === "White Queen" || nodes.at(i).altText === "Black Queen") {
      //possibleMoves = queenPossibleMoves(nodes.at(i), nodes); //TODO: implement this function (returns array of edge objects)
    } else if (nodes.at(i).altText === "White King" || nodes.at(i).altText === "Black King") {
      //possibleMoves = kingPossibleMoves(nodes.at(i), nodes); //TODO: implement this function (returns array of edge objects)
    } else if (nodes.at(i).altText === "White Pawn") {
      //possibleMoves = whitePawnPossibleMoves(nodes.at(i), nodes); //TODO: implement this function (returns array of edge objects)
    } else if (nodes.at(i).altText === "Black Pawn") {
      //possibleMoves = blackPawnPossibleMoves(nodes.at(i), nodes) //TODO: implement this function (returns array of edge objects)
    }
    possibleMoves.forEach((possibleMove) => {
      updatedEdges.push(possibleMove);
    });
  }

  return updatedEdges;
}

const ChessBoard = () => {
  //initialize graph that stores board data
  const [nodes, setNodes] = useState(defaultNodes);
  const [edges, setEdges] = useState(generateEdges(nodes));
  let updatedEdges = generateEdges(nodes);

  return (
    <div className="ChessBoardContainer">
      {nodes.map((node) => { //TODO: add onClick event to each tile, at first print out edges from that tile, next make it select the Tile
        return <Tile svg={node.svg} altText={node.altText}
          x={node.x} y={node.y} hasPiece={node.hasPiece} key={Math.random()} />;
      })}
    </div>
  );
};

export default ChessBoard;
