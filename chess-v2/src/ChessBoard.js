import React, { useState, useContext, useEffect } from "react";
import "./ChessBoard.css";
import Tile from "./Tile.js";
//deprecate defaultEdges once edge generation process is completed and QA'd
import { defaultNodes } from "./data/defaultPositions.js";
import generatePossibleMoves from "./helperFunctions/generatePossibleMoves";
import { whitePawnPossibleMoves } from "./helperFunctions/whitePawnPossibleMoves";
import { blackPawnPossibleMoves } from "./helperFunctions/blackPawnPossibleMoves";
import { bishopPossibleMoves } from "./helperFunctions/bishopPossibleMoves";
import { kingPossibleMoves } from "./helperFunctions/kingPossibleMoves";
import { knightPossibleMoves } from "./helperFunctions/knightPossibleMoves";
import { rookPossibleMoves } from "./helperFunctions/rookPossibleMoves";
import { queenPossibleMoves } from "./helperFunctions/queenPossibleMoves";
import adjustPiecePositions from "./helperFunctions/adjustPiecePositions";
import UserContext from "./store/user-context.js";
import { highlightCurrentNode } from "./helperFunctions/highlightCurrentNode";
import { useChannelStateContext, useChatContext } from "stream-chat-react";

const ChessBoard = (props) => {
  //initialize graph that stores board data
  const [nodes, setNodes] = useState(defaultNodes);
  const [edges, setEdges] = useState(generatePossibleMoves(nodes));
  const [playersJoined, setPlayersJoined] = useState(
    props.channel.state.watcher_count === 2
  );
  const [player, setPlayer] = useState("White");
  const [turn, setTurn] = useState("White");
  const [firstMoveDone, setFirstMoveDone] = useState(false);
  //TODO: put result state in parent component, pass setResult through props to here. 
  //call setResult in the gamewin function when that is implemented
  const [result, setResult] = useState({winner: "none", state: "none"});
  const ctx = useContext(UserContext);
  const { channel } = useChannelStateContext();
  const { client } = useChatContext();

  useEffect(() => {
    //generate all edges again
    //check if someone won or tied
  }, [nodes]);

  useEffect(() => {
    if (channel.state.watcher_count === 1) {
      ctx.swapPlayerColor();
      setPlayer("Black");
    } else {
      setPlayer("White");
    }
  }, [channel.state.watcher_count]);

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

    if (
      (currTile.player === 1 && ctx.playerColor === "White") ||
      (currTile.player === 0 && ctx.playerColor === "Black")
    ) {
      //tile piece belongs to opponent, so select current tile and deselect all others
      const newNodes = highlightCurrentNode(nodes, x, y);
      setNodes(newNodes);
      return;
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
    } else 
    if (currTile.altText === "") {
      //empty tile, so unhighlight all current nodes
      const newNodes = highlightCurrentNode(nodes, x, y);
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

  const movePiece = async (e) => {
    //Alter src, altText, hasPiece, player attributes of the source and destination tile
    //    and iterate through all tiles to make them not highlighted and not selected
    e.preventDefault();
    if (turn === player) {
      //only one node should be selected, filter returns array of size 1
      const sourceTile = nodes.filter((node) => node.isSelected)[0];
      if (!firstMoveDone) {
        if (sourceTile.player === 1) {
          return; //don't let black have first move
        } else {
          setFirstMoveDone(true);
        }
      }
      setTurn(player === "White" ? "Black" : "White");

      //only one node should have the correct coordinates, filter returns array of size 1
      const destinationTile = nodes.filter(
        (node) =>
          node.x === Number(e.target.attributes.xlabel.value) &&
          node.y === e.target.attributes.ylabel.value
      )[0];
      await channel.sendEvent({
        type: "game-move",
        data: {
          sourceTile: sourceTile,
          destinationTile: destinationTile,
          player: player,
        },
      });

      const newNodes = adjustPiecePositions(nodes, destinationTile, sourceTile);
      setNodes(newNodes); //rerender board based on new highlighted states
    }
  };

  //if another user joins (watches) the channel, execute the function
  props.channel.on("user.watching.start", (event) => {
    setPlayersJoined(event.watcher_count === 2);
  });

  //props.channel and channel are the same object, passed to this component different ways
  channel.on((event) => {
    if (event.type === "game-move" && event.user.id !== client.userID) {
      const currentPlayer = event.data.player === "White" ? "Black" : "White";
      setPlayer(currentPlayer);
      if (!firstMoveDone) {
        setFirstMoveDone(true);
      }
      setTurn(currentPlayer);
      const newNodes = adjustPiecePositions(nodes, event.data.destinationTile, event.data.sourceTile);
      setNodes(newNodes); //rerender board based on new highlighted states
    }
  });

  if (!playersJoined) {
    return <div> Waiting for other players to join... </div>;
  }

  return (
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
        : nodes
            .slice()
            .reverse()
            .map((node) => {
              //flips the board if player is controlling black pieces
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
