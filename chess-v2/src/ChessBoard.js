import React, { useState, useEffect } from "react";
import "./ChessBoard.css";
import Tile from "./Tile.js";
//deprecate defaultEdges once edge generation process is completed and QA'd
import { defaultNodes } from "./defaultPositions.js";
import { uniqueArray } from "./helperFunctions/uniqueArray";
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
 * param: node - a tile on the board that contains a rook
 *        nodes - the list of all tiles on the board
 *        checkingForKing - boolean that when true tells the function to add
 *                          diagonal attacks to possible moves even when no enemy
 *                          piece is there. This is used to include moves that would be
 *                          illegal for a King, but not legal for the player with the pawn
 * return: an array of objects where each object is an x,y pair that represents all possible legal move
 */
const blackPawnPossibleMoves = (node, nodes, checkingForKing) => {
  //If pawn.x == 7, then check one tile and two tiles above for possible moves
  //also check up 1 right 1 and up 1 left 1 for moves
  //  (only if enemy pieces are there or if checkingForKing is true)
  //TODO: Implement En Passant
  //TODO: Implement Pawn Promotion

  const currNodeIdx = nodes.indexOf(node);
  let possibleMoves = [];
  //checking down 1
  if (node.x >= 2 && !nodes.at(currNodeIdx + 8).hasPiece) {
    possibleMoves.push({ x: node.x - 1, y: node.y });
  }

  //checking down 2
  if (
    node.x === 7 &&
    !nodes.at(currNodeIdx + 8).hasPiece &&
    !nodes.at(currNodeIdx + 16).hasPiece
  ) {
    possibleMoves.push({ x: node.x - 2, y: node.y });
  }

  //checking down 1 left 1
  if (
    node.x >= 2 &&
    node.y >= "b" &&
    (checkingForKing || nodes.at(currNodeIdx + 8 - 1).hasPiece)
  ) {
    possibleMoves.push({
      x: node.x - 1,
      y: String.fromCharCode(node.y.charCodeAt(0) - 1),
    });
  }

  //checking down 1 right 1
  if (
    node.x >= 7 &&
    node.y <= "g" &&
    (checkingForKing || nodes.at(currNodeIdx + 8 + 1).hasPiece)
  ) {
    possibleMoves.push({
      x: node.x - 1,
      y: String.fromCharCode(node.y.charCodeAt(0) + 1),
    });
  }

  return possibleMoves;
};

/*
 * param: node - a tile on the board that contains a rook
 *        nodes - the list of all tiles on the board
 *        checkingForKing - boolean that when true tells the function to add
 *                          diagonal attacks to possible moves even when no enemy
 *                          piece is there. This is used to include moves that would be
 *                          illegal for a King, but not legal for the player with the pawn
 * return: an array of objects where each object is an x,y pair that represents all possible legal move
 */
const whitePawnPossibleMoves = (node, nodes, checkingForKing) => {
  //If pawn.x == 2, then check one tile and two tiles above for possible moves
  //also check up 1 right 1 and up 1 left 1 for moves
  //  (only if enemy pieces are there or if checkingForKing is true)
  //TODO: Implement En Passant
  //TODO: Implement Pawn Promotion

  const currNodeIdx = nodes.indexOf(node);
  let possibleMoves = [];
  //checking up 1
  if (node.x <= 7 && !nodes.at(currNodeIdx - 8).hasPiece) {
    possibleMoves.push({ x: node.x + 1, y: node.y });
  }

  //checking up 2
  if (
    node.x === 2 &&
    !nodes.at(currNodeIdx - 8).hasPiece &&
    !nodes.at(currNodeIdx - 16).hasPiece
  ) {
    possibleMoves.push({ x: node.x + 2, y: node.y });
  }

  //checking up 1 left 1
  if (
    node.x <= 7 &&
    node.y >= "b" &&
    (checkingForKing || nodes.at(currNodeIdx - 8 - 1).hasPiece)
  ) {
    possibleMoves.push({
      x: node.x + 1,
      y: String.fromCharCode(node.y.charCodeAt(0) - 1),
    });
  }

  //checking up 1 right 1
  if (
    node.x <= 7 &&
    node.y <= "g" &&
    (checkingForKing || nodes.at(currNodeIdx - 8 + 1).hasPiece)
  ) {
    possibleMoves.push({
      x: node.x + 1,
      y: String.fromCharCode(node.y.charCodeAt(0) + 1),
    });
  }

  return possibleMoves;
};

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
      possibleMoves.push({ x: node.x + 1, y: node.y });
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
      possibleMoves.push({
        x: node.x + 1,
        y: String.fromCharCode(node.y.charCodeAt(0) + 1),
      });
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
      possibleMoves.push({
        x: node.x,
        y: String.fromCharCode(node.y.charCodeAt(0) + 1),
      });
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
      possibleMoves.push({
        x: node.x - 1,
        y: String.fromCharCode(node.y.charCodeAt(0) + 1),
      });
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
      possibleMoves.push({ x: node.x - 1, y: node.y });
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
      possibleMoves.push({
        x: node.x - 1,
        y: String.fromCharCode(node.y.charCodeAt(0) - 1),
      });
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
      possibleMoves.push({
        x: node.x,
        y: String.fromCharCode(node.y.charCodeAt(0) - 1),
      });
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
      possibleMoves.push({
        x: node.x + 1,
        y: String.fromCharCode(node.y.charCodeAt(0) - 1),
      });
    }
  }

  return possibleMoves;
};

/*
 * param: node - a tile on the board that contains a rook
 *        nodes - the list of all tiles on the board
 * return: an array of objects where each object is an x,y pair that represents all possible legal move
 */
const bishopPossibleMoves = (node, nodes) => {
  //look in each diagonal (upright, upleft, downright, downleft) until the edge of the board or a friendly/enemy tile is reached
  //while looking in each direction, add empty tiles to the possible moves list
  //if the edge of the board is found, do not include moves out of bounds, break out of the loop
  //if friendly unit is found, do not include that as a possible move, break out of the loop
  //if enemy unit is found, include that as a possible move, break out of the loop

  let possibleMoves = [];
  let bishopPlayer = node.player;
  let startTileIdx = nodes.indexOf(node);
  let currTileIdx = startTileIdx;
  currTileIdx = currTileIdx - 8 + 1; //looking upright one tile
  while (currTileIdx >= 0 && currTileIdx < nodes.length) {
    //looking upright
    let checkTile = nodes.at(currTileIdx);
    if (checkTile.hasPiece) {
      if (bishopPlayer !== checkTile.player) {
        possibleMoves.push({ x: checkTile.x, y: checkTile.y }); //enemy piece in the way, add to possibleMoves then break;
      }
      break; //friendly piece in the way, don't add to possibleMoves
    }
    possibleMoves.push({ x: checkTile.x, y: checkTile.y });
    currTileIdx = currTileIdx - 8 + 1; //looking upright one tile
  }
  currTileIdx = startTileIdx;
  currTileIdx = currTileIdx - 8 - 1; //looking upleft one tile
  while (currTileIdx >= 0 && currTileIdx < nodes.length) {
    //looking upleft
    let checkTile = nodes.at(currTileIdx);
    if (checkTile.hasPiece) {
      if (bishopPlayer !== checkTile.player) {
        possibleMoves.push({ x: checkTile.x, y: checkTile.y }); //enemy piece in the way, add to possibleMoves then break;
      }
      break; //friendly piece in the way, don't add to possibleMoves
    }
    possibleMoves.push({ x: checkTile.x, y: checkTile.y });
    currTileIdx = currTileIdx - 8 - 1; //looking upleft one tile
  }
  currTileIdx = startTileIdx;
  currTileIdx = currTileIdx + 8 + 1; //looking downright one tile
  while (currTileIdx >= 0 && currTileIdx < nodes.length) {
    //looking downright
    let checkTile = nodes.at(currTileIdx);
    if (checkTile.hasPiece) {
      if (bishopPlayer !== checkTile.player) {
        possibleMoves.push({ x: checkTile.x, y: checkTile.y }); //enemy piece in the way, add to possibleMoves then break;
      }
      break; //friendly piece in the way, don't add to possibleMoves
    }
    possibleMoves.push({ x: checkTile.x, y: checkTile.y });
    currTileIdx = currTileIdx + 8 + 1; //looking downright one tile
  }
  currTileIdx = startTileIdx;
  currTileIdx = currTileIdx + 8 - 1; //looking downleft one tile
  while (currTileIdx >= 0 && currTileIdx < nodes.length) {
    //looking downleft
    let checkTile = nodes.at(currTileIdx);
    if (checkTile.hasPiece) {
      if (bishopPlayer !== checkTile.player) {
        possibleMoves.push({ x: checkTile.x, y: checkTile.y }); //enemy piece in the way, add to possibleMoves then break;
      }
      break; //friendly piece in the way, don't add to possibleMoves
    }
    possibleMoves.push({ x: checkTile.x, y: checkTile.y });
    currTileIdx = currTileIdx + 8 - 1; //looking downleft one tile
  }

  return possibleMoves;
};

/*
 * param: node - a tile on the board that contains a knight
 *        nodes - the list of all tiles on the board
 * return: an array of objects where each object is an x,y pair that represents all possible legal move
 */
const knightPossibleMoves = (node, nodes) => {
  //check all 8 possible moves
  //  if tile is in bounds and does not contain friendly piece, add to possibleMoves
  let possibleMoves = [];
  const currNodeIdx = nodes.indexOf(node);
  //checking up 2, left 1 position
  if (node.x + 2 <= 8 && String.fromCharCode(node.y.charCodeAt(0) - 1) >= "a") {
    //if checked tile does not have a friendly piece, it is a possible move
    if (nodes.at(currNodeIdx - 2 * 8 - 1).player !== node.player) {
      possibleMoves.push({
        x: node.x + 2,
        y: String.fromCharCode(node.y.charCodeAt(0) - 1),
      });
    }
  }

  //checking up 2, right 1 position
  if (node.x + 2 <= 8 && String.fromCharCode(node.y.charCodeAt(0) + 1) <= "h") {
    //if checked tile does not have a friendly piece, it is a possible move
    if (nodes.at(currNodeIdx - 2 * 8 + 1).player !== node.player) {
      possibleMoves.push({
        x: node.x + 2,
        y: String.fromCharCode(node.y.charCodeAt(0) + 1),
      });
    }
  }

  //checking up 1, right 2 position
  if (node.x + 1 <= 8 && String.fromCharCode(node.y.charCodeAt(0) + 2) <= "h") {
    //if checked tile does not have a friendly piece, it is a possible move
    if (nodes.at(currNodeIdx - 1 * 8 + 2).player !== node.player) {
      possibleMoves.push({
        x: node.x + 1,
        y: String.fromCharCode(node.y.charCodeAt(0) + 2),
      });
    }
  }

  //checking down 1, right 2 position
  if (node.x - 1 >= 1 && String.fromCharCode(node.y.charCodeAt(0) + 2) <= "h") {
    //if checked tile does not have a friendly piece, it is a possible move
    if (nodes.at(currNodeIdx + 1 * 8 + 2).player !== node.player) {
      possibleMoves.push({
        x: node.x - 1,
        y: String.fromCharCode(node.y.charCodeAt(0) + 2),
      });
    }
  }

  //checking down 2, right 1 position
  if (node.x - 2 >= 1 && String.fromCharCode(node.y.charCodeAt(0) + 1) <= "h") {
    //if checked tile does not have a friendly piece, it is a possible move
    if (nodes.at(currNodeIdx + 2 * 8 + 1).player !== node.player) {
      possibleMoves.push({
        x: node.x - 2,
        y: String.fromCharCode(node.y.charCodeAt(0) + 1),
      });
    }
  }

  //checking down 2, left 1 position
  if (node.x - 2 >= 1 && String.fromCharCode(node.y.charCodeAt(0) - 1) >= "a") {
    //if checked tile does not have a friendly piece, it is a possible move
    if (nodes.at(currNodeIdx + 2 * 8 - 1).player !== node.player) {
      possibleMoves.push({
        x: node.x - 2,
        y: String.fromCharCode(node.y.charCodeAt(0) - 1),
      });
    }
  }

  //checking down 1, left 2 position
  if (node.x - 1 >= 1 && String.fromCharCode(node.y.charCodeAt(0) - 2) >= "a") {
    //if checked tile does not have a friendly piece, it is a possible move
    if (nodes.at(currNodeIdx + 1 * 8 - 2).player !== node.player) {
      possibleMoves.push({
        x: node.x - 1,
        y: String.fromCharCode(node.y.charCodeAt(0) - 2),
      });
    }
  }

  //checking up 1, left 2 position
  if (node.x + 1 <= 8 && String.fromCharCode(node.y.charCodeAt(0) - 2) >= "a") {
    //if checked tile does not have a friendly piece, it is a possible move
    if (nodes.at(currNodeIdx - 1 * 8 - 2).player !== node.player) {
      possibleMoves.push({
        x: node.x + 1,
        y: String.fromCharCode(node.y.charCodeAt(0) - 2),
      });
    }
  }

  return possibleMoves;
};

/*
 * param: node - a tile on the board that contains a rook
 *        nodes - the list of all tiles on the board
 * return: an array of objects where each object is an x,y pair that represents all possible legal move
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
  while (currTileIdx >= 0 && currTileIdx < nodes.length) {
    //looking upwards vertical
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
  while (currTileIdx >= 0 && currTileIdx < nodes.length) {
    //looking downwards vertical
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
  while (
    currTileIdx >= 0 &&
    currTileIdx < nodes.length &&
    startTile.x === nodes.at(currTileIdx).x
  ) {
    //looking right horizontal
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
  while (
    currTileIdx >= 0 &&
    currTileIdx < nodes.length &&
    startTile.x === nodes.at(currTileIdx).x
  ) {
    //looking left horizontal
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
};

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

/* Assumption: Tiles/nodes have already been updated to reflect the
 *             move that just occurred
 * Goal: return new array with all edges - loop through all nodes and add on to edges array iteratively
 */
const generateEdges = (nodes) => {
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

const ChessBoard = () => {
  //initialize graph that stores board data
  const [nodes, setNodes] = useState(defaultNodes);
  const [edges, setEdges] = useState(generateEdges(nodes));

  const movePiece = (e) => {
    //Alter src, altText, hasPiece, player attributes of the source and destination tile
    //    and iterate through all tiles to make them not highlighted and not selected

    e.preventDefault();
    //only one node should be selected, filter returns array of size 1
    const sourceTile = nodes.filter((node) => node.isSelected)[0];
    //only one node should have the correct coordinates, filter returns array of size 1
    const destinationTile = nodes.filter(
      (node) =>
        node.x === Number(e.target.attributes.xlabel.value) &&
        node.y === e.target.attributes.ylabel.value
    )[0];
    console.log(
      "sourceTile.x: " + sourceTile.x + ", sourceTile.y: " + sourceTile.y
    );
    console.log(
      "destinationTile.x: " +
        destinationTile.x +
        ", destinationTile.y: " +
        destinationTile.y
    );
    const sourceTileSVG = sourceTile.svg;
    const sourceTileAltText = sourceTile.altText;
    const sourceTileHasPiece = sourceTile.hasPiece;
    const sourceTilePlayer = sourceTile.player;
    const newNodes = nodes.map((node) => {
      //if destination tile, copy info from source tile and replace at destination
      if (node.x === destinationTile.x && node.y === destinationTile.y) {
        console.log("destination getting replaced");
        return {
          svg: sourceTileSVG,
          altText: sourceTileAltText,
          x: node.x,
          y: node.y,
          hasPiece: sourceTileHasPiece,
          player: sourceTilePlayer,
          isHighlighted: false,
          isSelected: false,
        };
        //if source tile, reset to default settings, blank tile
      } else if (node.x === sourceTile.x && node.y === sourceTile.y) {
        console.log("source getting replaced");
        return {
          svg: {},
          altText: "",
          x: node.x,
          y: node.y,
          hasPiece: false,
          player: 2,
          isHighlighted: false,
          isSelected: false,
        };
      }
      //if not source or destination tile, stay the same
      return {
        svg: node.svg,
        altText: node.altText,
        x: node.x,
        y: node.y,
        hasPiece: node.hasPiece,
        player: node.player,
        isHighlighted: false,
        isSelected: false,
      };
    });
    console.log("Before State Update");
    for (let i = 0; i < nodes.length; i++) {
      console.log(
        nodes[i].altText + " at (" + nodes[i].x + ", " + nodes[i].y + ")"
      );
    }
    //newNodes is correct here
    setNodes(newNodes); //rerender board based on new highlighted states
    //testing
    console.log("After State Update");
    for (let i = 0; i < nodes.length; i++) {
      console.log(
        nodes[i].altText + " at (" + nodes[i].x + ", " + nodes[i].y + ")"
      );
    }
  };

  const tileOnClick = (e) => {
    e.preventDefault();
    //alter nodes and give the correct ones a 'highlight' property
    let x;
    let y;
    //clicking on empty tile, img tag, or x/y axis label
    x = Number(e.target.attributes.xlabel.value);
    y = e.target.attributes.ylabel.value;
    let currTile;
    for (let i = 0; i < nodes.length; i++) {
      if (nodes.at(i).x === x && nodes.at(i).y === y) {
        currTile = nodes.at(i);
      }
    }
    //get all possible moves for the specific tile
    let possibleMoves = [];
    if (
      currTile.altText === "White Rook" ||
      currTile.altText === "Black Rook"
    ) {
      possibleMoves = rookPossibleMoves(currTile, nodes);
    } else if (
      currTile.altText === "White Knight" ||
      currTile.altText === "Black Knight"
    ) {
      possibleMoves = knightPossibleMoves(currTile, nodes);
    } else if (
      currTile.altText === "White Bishop" ||
      currTile.altText === "Black Bishop"
    ) {
      possibleMoves = bishopPossibleMoves(currTile, nodes);
    } else if (
      currTile.altText === "White Queen" ||
      currTile.altText === "Black Queen"
    ) {
      possibleMoves = queenPossibleMoves(currTile, nodes);
    } else if (
      currTile.altText === "White King" ||
      currTile.altText === "Black King"
    ) {
      possibleMoves = kingPossibleMoves(currTile, nodes);
    } else if (currTile.altText === "White Pawn") {
      possibleMoves = whitePawnPossibleMoves(currTile, nodes, false);
    } else if (currTile.altText === "Black Pawn") {
      possibleMoves = blackPawnPossibleMoves(currTile, nodes, false);
    } else {
      //empty tile, so unhighlight all current nodes
      const newNodes = nodes.map((node) => {
        if (node.x === x && node.y === y) {
          return {
            svg: node.svg,
            altText: node.altText,
            x: node.x,
            y: node.y,
            hasPiece: node.hasPiece,
            player: node.player,
            isHighlighted: false,
            isSelected: true,
          };
        }
        return {
          svg: node.svg,
          altText: node.altText,
          x: node.x,
          y: node.y,
          hasPiece: node.hasPiece,
          player: node.player,
          isHighlighted: false,
          isSelected: false,
        };
      });
      setNodes(newNodes);
      return;
    }

    const newNodes = nodes.map((node) => {
      //check if current node location is in the possibleMoves array
      for (let k = 0; k < possibleMoves.length; k++) {
        //if it is, return the same node but with isHighlighted = true
        if (node.x === possibleMoves[k].x && node.y === possibleMoves[k].y) {
          return {
            svg: node.svg,
            altText: node.altText,
            x: node.x,
            y: node.y,
            hasPiece: node.hasPiece,
            player: node.player,
            isHighlighted: true,
            isSelected: false,
          };
        }
      }
      //if not, return isHighlighted = false;
      if (x === node.x && y === node.y) {
        return {
          svg: node.svg,
          altText: node.altText,
          x: node.x,
          y: node.y,
          hasPiece: node.hasPiece,
          player: node.player,
          isHighlighted: false,
          isSelected: true,
        };
      }
      return {
        svg: node.svg,
        altText: node.altText,
        x: node.x,
        y: node.y,
        hasPiece: node.hasPiece,
        player: node.player,
        isHighlighted: false,
        isSelected: false,
      };
    });

    setNodes(newNodes); //rerender board based on new highlighted states
  };

  let renderContent = nodes.map((node) => {
    return (
      <Tile
        isHighlighted={node.isHighlighted}
        isSelected={node.isSelected}
        movePiece={movePiece}
        tileOnClick={tileOnClick}
        svg={node.svg}
        altText={node.altText}
        x={node.x}
        y={node.y}
        hasPiece={node.hasPiece}
        key={Math.random()}
      />
    );
  });
  // useEffect(() => {
  //   console.log("Use Effect Render Content Update");
  //   renderContent = nodes.map((node) => {
  //     console.log("UseEffect: " + node.altText + " at (" + node.x + ", " + node.y + ")");
  //     return (
  //       <Tile
  //         isHighlighted={node.isHighlighted}
  //         isSelected={node.isSelected}
  //         movePiece={movePiece}
  //         tileOnClick={tileOnClick}
  //         svg={node.svg}
  //         altText={node.altText}
  //         x={node.x}
  //         y={node.y}
  //         hasPiece={node.hasPiece}
  //         key={Math.random()}
  //       />
  //     );
  //   });
  // }, [nodes])

  return (
    //TODO: export logic to multiple files
    <div className="ChessBoardContainer">
      {nodes.map((node) => {
        return (
          <Tile
            isHighlighted={node.isHighlighted}
            isSelected={node.isSelected}
            movePiece={movePiece}
            tileOnClick={tileOnClick}
            svg={node.svg}
            altText={node.altText}
            x={node.x}
            y={node.y}
            hasPiece={node.hasPiece}
            key={Math.random()}
          />
        );
      })}
      <div>
        {edges.map((edge) => {
          return (
            <p key={Math.random()}>
              x: {edge.x}, y: {edge.y}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default ChessBoard;
