import React, { useState, useContext, useEffect } from "react";
import "./ChessBoard.css";
import Tile from "./Tile.js";
//deprecate defaultEdges once edge generation process is completed and QA'd
import { defaultNodes } from "./defaultPositions.js";
import { uniqueArray } from "./helperFunctions/uniqueArray";
import { whitePawnPossibleMoves } from "./helperFunctions/whitePawnPossibleMoves";
import { blackPawnPossibleMoves } from "./helperFunctions/blackPawnPossibleMoves";
import { bishopPossibleMoves } from "./helperFunctions/bishopPossibleMoves";
import { kingPossibleMoves } from "./helperFunctions/kingPossibleMoves";
import { knightPossibleMoves } from "./helperFunctions/knightPossibleMoves";
import { rookPossibleMoves } from "./helperFunctions/rookPossibleMoves";
import { queenPossibleMoves } from "./helperFunctions/queenPossibleMoves";
import UserContext from "./store/user-context.js";

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
  const ctx = useContext(UserContext);

  const tileOnClick = (e) => {
    if (
      e.target &&
      e.target.classList &&
      e.target.classList[0] === "highlightedDot"
    ) {
      return; //if clicking on highlighted dot, don't also execute this event handler
    }
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
    const sourceTileSVG = sourceTile.svg;
    const sourceTileAltText = sourceTile.altText;
    const sourceTileHasPiece = sourceTile.hasPiece;
    const sourceTilePlayer = sourceTile.player;
    const newNodes = nodes.map((node) => {
      //if destination tile, copy info from source tile and replace at destination
      if (node.x === destinationTile.x && node.y === destinationTile.y) {
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

    //newNodes is correct here
    setNodes(newNodes); //rerender board based on new highlighted states
  };

  return (
    //TODO: export logic to multiple files
    <div
      className={
        ctx.playerColor === "White"
          ? "ChessBoardContainerWhitePlayer"
          : "ChessBoardContainerBlackPlayer"
      }
    >
      {ctx.playerColor === "White"
        ? nodes.map((node) => {
            return (
              <Tile
                justifyLabel={ctx.playerColor} //adjusts the axis labels based on which player is playing
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
          })
        : nodes.slice().reverse().map((node) => { //flips the board if player is controlling black pieces
            return (
              <Tile
                justifyLabel={ctx.playerColor} //adjusts the axis labels based on which player is playing
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
    </div>
  );
};

export default ChessBoard;
