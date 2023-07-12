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
  const [edges, setEdges] = useState(generatePossibleMoves(defaultNodes, []));
  const [edgesForKing, setEdgesForKing] = useState(
    generatePossibleMoves(defaultNodes, [], true)
  );
  const [playersJoined, setPlayersJoined] = useState(
    props.channel.state.watcher_count === 2
  );
  const [player, setPlayer] = useState("White");
  const [turn, setTurn] = useState("White");
  const [firstMoveDone, setFirstMoveDone] = useState(false);
  //TODO: put result state in parent component, pass setResult through props to here.
  //call setResult in the gamewin function when that is implemented
  const [result, setResult] = useState({ winner: "none", state: "none" });
  const ctx = useContext(UserContext);
  const { channel } = useChannelStateContext();
  const { client } = useChatContext();

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
      possibleMoves = kingPossibleMoves(currTile, nodes, edgesForKing);
    } else if (currTile.altText === "White Pawn") {
      possibleMoves = whitePawnPossibleMoves(currTile, nodes, false);
    } else if (currTile.altText === "Black Pawn") {
      possibleMoves = blackPawnPossibleMoves(currTile, nodes, false);
    } else if (currTile.altText === "") {
      //empty tile, so unhighlight all current nodes
      const newNodes = highlightCurrentNode(nodes, x, y);
      setNodes(newNodes);
      return;
    }

    const newNodes = nodes.map((node) => {
      //check if current node location is in the possibleMoves array
      for (let k = 0; k < possibleMoves.length; k++) {
        //if it is, return the same node but with isHighlighted = true
        if (
          node.x === possibleMoves[k][1].x &&
          node.y === possibleMoves[k][1].y
        ) {
          return { ...node, isHighlighted: true, isSelected: false };
        }
      }
      //if not, return isHighlighted = false;
      if (x === node.x && y === node.y) {
        return { ...node, isHighlighted: false, isSelected: true };
      }
      return { ...node, isHighlighted: false, isSelected: false };
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
          props.showPopUp(0); //player tried to move when it wasn't their turn
          setTimeout(() => {
            props.closePopUp();
          }, 3400);
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

      //check for possibility of En Passant, mark the tile if so
      if (
        (sourceTile.altText === "White Pawn" &&
          sourceTile.x === 2 &&
          destinationTile.x === 4) ||
        (sourceTile.altText === "Black Pawn" &&
          sourceTile.x === 7 &&
          destinationTile.x === 5)
      ) {
        destinationTile.justMovedTwice = true;
      }
      let newNodes = adjustPiecePositions(nodes, destinationTile, sourceTile);

      //check if pawn promotion should be prompted
      if ((sourceTile.altText === "White Pawn" && destinationTile.x === 8) || (sourceTile.altText === "Black Pawn" && destinationTile.x === 1)) {
        //trigger a pop up prompt for the user to select which piece they want
        //change the sourceTile according to what the user chooses 
        //The sourceTile will then be moved to the destination tile by the following "game-move" event
        
    }

      //check for possibility of a castle
      //if king is moving two tiles, you know castling is occuring,
      //so move the rook here
      let sourceTileCastle = -1;
      let destinationTileCastle = -1;
      if (sourceTile.altText === "Black King") {
        if (
          Math.abs(sourceTile.y.charCodeAt(0) - destinationTile.y.charCodeAt(0)) >
          1
        ) {
          if (sourceTile.y > destinationTile.y) {
            //black castling left
            newNodes.at(0).hasKingMoved = true;
            sourceTileCastle = newNodes.at(0);
            destinationTileCastle = newNodes.at(3);
            newNodes = adjustPiecePositions(
              newNodes,
              newNodes.at(3),
              newNodes.at(0)
            );
            
          } else if (sourceTile.y < destinationTile.y) {
            //black castling right
            newNodes.at(7).hasKingMoved = true;
            sourceTileCastle = newNodes.at(7);
            destinationTileCastle = newNodes.at(5);
            newNodes = adjustPiecePositions(
              newNodes,
              newNodes.at(5),
              newNodes.at(7)
            );
          }
        }
      } else if (sourceTile.altText === "White King") {
        if (
          Math.abs(sourceTile.y.charCodeAt(0) - destinationTile.y.charCodeAt(0)) >
          1
        ) {
          if (sourceTile.y > destinationTile.y) {
            //white castling left
            newNodes.at(56).hasKingMoved = true;
            sourceTileCastle = newNodes.at(56);
            destinationTileCastle = newNodes.at(59);
            newNodes = adjustPiecePositions(
              newNodes,
              newNodes.at(59),
              newNodes.at(56)
            );
          } else if (sourceTile.y < destinationTile.y) {
            //white castling right
            newNodes.at(63).hasKingMoved = true;
            sourceTileCastle = newNodes.at(63);
            destinationTileCastle = newNodes.at(61);
            newNodes = adjustPiecePositions(
              newNodes,
              newNodes.at(61),
              newNodes.at(63)
            );
          }
        }
      }

      await channel.sendEvent({
        type: "game-move",
        data: {
          sourceTile: sourceTile,
          destinationTile: destinationTile,
          player: player,
          sourceTileCastle: sourceTileCastle,
          destinationTileCastle: destinationTileCastle,
        },
      });

      setNodes(() => {return newNodes});
      setEdges(() => {return generatePossibleMoves(newNodes, edgesForKing)});
      setEdgesForKing(() => {return generatePossibleMoves(newNodes, edgesForKing, true)});


      
    } else {
      props.showPopUp(0); //player tried to move when it wasn't their turn
      setTimeout(() => {
        props.closePopUp();
      }, 3400);
      return;
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
      let newNodes = nodes;
      //moves the rook if other player just performed a castle
      if (event.data.sourceTileCastle !== -1 && event.data.destinationTileCastle !== -1) {
        newNodes = adjustPiecePositions(
          newNodes,
          event.data.destinationTileCastle,
          event.data.sourceTileCastle
        );
      }
      newNodes = adjustPiecePositions(
        newNodes,
        event.data.destinationTile,
        event.data.sourceTile
      );

      //check for possibility of En Passant, mark the tile if so
      if (
        (event.data.sourceTile.altText === "White Pawn" &&
          event.data.sourceTile.x === 2 &&
          event.data.destinationTile.x === 4) ||
        (event.data.sourceTile.altText === "Black Pawn" &&
          event.data.sourceTile.x === 7 &&
          event.data.destinationTile.x === 5)
      ) {
        newNodes = newNodes.map((node) => {
          if (
            node.x === event.data.destinationTile.x &&
            node.y === event.data.destinationTile.y
          ) {
            return {
              ...node,
              justMovedTwice: true,
            };
          } else {
            return node;
          }
        });
      }

      //check for possibility of a castle
      //if king is moving two tiles, you know castling is occuring,
      //so move the rook here
      // if (event.data.sourceTile.altText === "Black King") {
      //   if (
      //     (Math.abs(event.data.sourceTile.y.charCodeAt(0) - event.data.destinationTile.y.charCodeAt(0))) >
      //     1
      //   ) {
      //     if (event.data.sourceTile.y > event.data.destinationTile.y) {
      //       console.log("black castling left");
      //       //black castling left
      //       newNodes.at(0).hasKingMoved = true;
      //       newNodes = adjustPiecePositions(
      //         newNodes,
      //         newNodes.at(3),
      //         newNodes.at(0)
      //       );
      //     } else if (event.data.sourceTile.y < event.data.destinationTile.y) {
      //       console.log("black castling right");
      //       //black castling right
      //       newNodes.at(7).hasKingMoved = true;
      //       newNodes = adjustPiecePositions(
      //         newNodes,
      //         newNodes.at(5),
      //         newNodes.at(7)
      //       );
      //     }
      //   }
      // } else if (event.data.sourceTile.altText === "White King") {
      //   if (
      //     (Math.abs(event.data.sourceTile.y.charCodeAt(0) - event.data.destinationTile.y.charCodeAt(0))) >
      //     1
      //   ) {
      //     if (event.data.sourceTile.y > event.data.destinationTile.y) {
      //       console.log("white castling left");
      //       //white castling left
      //       newNodes.at(56).hasKingMoved = true;
      //       newNodes = adjustPiecePositions(
      //         newNodes,
      //         newNodes.at(59),
      //         newNodes.at(56)
      //       );
      //     } else if (event.data.sourceTile.y < event.data.destinationTile.y) {
      //       console.log("white castling right");
      //       //white castling right
      //       newNodes.at(63).hasKingMoved = true;
      //       newNodes = adjustPiecePositions(
      //         newNodes,
      //         newNodes.at(61),
      //         newNodes.at(63)
      //       );
      //     }
      //   }
      // }

      setNodes(() => {return newNodes}); //rerender board based on new highlighted states
      console.log("Tile [7, a]: " + JSON.stringify(newNodes.at(8)));
      setEdges(() => {return generatePossibleMoves(newNodes, edgesForKing)});
      setEdgesForKing(() => {return generatePossibleMoves(newNodes, edgesForKing, true)});
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
