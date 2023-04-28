import React from "react";
import "./ChessBoard.css";
import Tile from "./Tile.js";
import blackKing from "./visualAssets/blackKing.svg";
import whiteKing from "./visualAssets/whiteKing.svg";
import blackBishop from "./visualAssets/blackBishop.svg";
import whiteBishop from "./visualAssets/whiteBishop.svg";
import blackKnight from "./visualAssets/blackKnight.svg";
import whiteKnight from "./visualAssets/whiteKnight.svg";
import blackPawn from "./visualAssets/blackPawn.svg";
import whitePawn from "./visualAssets/whitePawn.svg";
import blackQueen from "./visualAssets/blackQueen.svg";
import whiteQueen from "./visualAssets/whiteQueen.svg";
import blackRook from "./visualAssets/blackRook.svg";
import whiteRook from "./visualAssets/whiteRook.svg";

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
 *
 *
 */

const ChessBoard = () => {
  return (
    <div>
      {/* <div className="boardLabel">
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
      </div> */}
      <div className="ChessBoardContainer">
        {/* <div>
            <p>8</p>
        </div> */}
        <Tile svg={blackRook} altText="Black Rook" x={8} y='a' />
        <Tile svg={blackKnight} altText="Black Knight" x={8} y='b' />
        <Tile svg={blackBishop} altText="Black Bishop" x={8} y='c' />
        <Tile svg={blackQueen} altText="Black Queen" x={8} y='d' />
        <Tile svg={blackKing} altText="Black King" x={8} y='e' />
        <Tile svg={blackBishop} altText="Black Bishop" x={8} y='f' />
        <Tile svg={blackKnight} altText="Black Knight" x={8} y='g' />
        <Tile svg={blackRook} altText="Black Rook" x={8} y='h' />
        {/* <div>
            <p>7</p>
        </div> */}
        <Tile svg={blackPawn} altText="Black Pawn" x={7} y='a' />
        <Tile svg={blackPawn} altText="Black Pawn" x={7} y='b' />
        <Tile svg={blackPawn} altText="Black Pawn" x={7} y='c' />
        <Tile svg={blackPawn} altText="Black Pawn" x={7} y='d' />
        <Tile svg={blackPawn} altText="Black Pawn" x={7} y='e' />
        <Tile svg={blackPawn} altText="Black Pawn" x={7} y='f' />
        <Tile svg={blackPawn} altText="Black Pawn" x={7} y='g' />
        <Tile svg={blackPawn} altText="Black Pawn" x={7} y='h' />
        {/* <div>
            <p>6</p>
        </div> */}
        <Tile svg={{}} altText="" x={6} y='a' />
        <Tile svg={{}} altText="" x={6} y='b' />
        <Tile svg={{}} altText="" x={6} y='c' />
        <Tile svg={{}} altText="" x={6} y='d' />
        <Tile svg={{}} altText="" x={6} y='e' />
        <Tile svg={{}} altText="" x={6} y='f' />
        <Tile svg={{}} altText="" x={6} y='g' />
        <Tile svg={{}} altText="" x={6} y='h' />
        {/* <div>
            <p>5</p>
        </div> */}
        <Tile svg={{}} altText="" x={5} y='a' />
        <Tile svg={{}} altText="" x={5} y='b' />
        <Tile svg={{}} altText="" x={5} y='c' />
        <Tile svg={{}} altText="" x={5} y='d' />
        <Tile svg={{}} altText="" x={5} y='e' />
        <Tile svg={{}} altText="" x={5} y='f' />
        <Tile svg={{}} altText="" x={5} y='g' />
        <Tile svg={{}} altText="" x={5} y='h' />
        {/* <div>
            <p>4</p>
        </div> */}
        <Tile svg={{}} altText="" x={4} y='a' />
        <Tile svg={{}} altText="" x={4} y='b' />
        <Tile svg={{}} altText="" x={4} y='c' />
        <Tile svg={{}} altText="" x={4} y='d' />
        <Tile svg={{}} altText="" x={4} y='e' />
        <Tile svg={{}} altText="" x={4} y='f' />
        <Tile svg={{}} altText="" x={4} y='g' />
        <Tile svg={{}} altText="" x={4} y='h' />
        {/* <div>
            <p>3</p>
        </div> */}
        <Tile svg={{}} altText="" x={3} y='a' />
        <Tile svg={{}} altText="" x={3} y='b' />
        <Tile svg={{}} altText="" x={3} y='c' />
        <Tile svg={{}} altText="" x={3} y='d' />
        <Tile svg={{}} altText="" x={3} y='e' />
        <Tile svg={{}} altText="" x={3} y='f' />
        <Tile svg={{}} altText="" x={3} y='g' />
        <Tile svg={{}} altText="" x={3} y='h' />
        {/* <div>
            <p>2</p>
        </div> */}
        <Tile svg={whitePawn} altText="White Pawn" x={2} y='a' />
        <Tile svg={whitePawn} altText="White Pawn" x={2} y='b' />
        <Tile svg={whitePawn} altText="White Pawn" x={2} y='c' />
        <Tile svg={whitePawn} altText="White Pawn" x={2} y='d' />
        <Tile svg={whitePawn} altText="White Pawn" x={2} y='e' />
        <Tile svg={whitePawn} altText="White Pawn" x={2} y='f' />
        <Tile svg={whitePawn} altText="White Pawn" x={2} y='g' />
        <Tile svg={whitePawn} altText="White Pawn" x={2} y='h' />
        {/* <div>
            <p>1</p>
        </div> */}
        <Tile svg={whiteRook} altText="White Rook" x={1}  y='a' />
        <Tile svg={whiteKnight} altText="White Knight" x={1} y='b' />
        <Tile svg={whiteBishop} altText="White Bishop" x={1} y='c' />
        <Tile svg={whiteQueen} altText="White Queen" x={1} y='d' />
        <Tile svg={whiteKing} altText="White King" x={1} y='e' />
        <Tile svg={whiteBishop} altText="White Bishop" x={1} y='f' />
        <Tile svg={whiteKnight} altText="White Knight" x={1} y='g' />
        <Tile svg={whiteRook} altText="White Rook" x={1} y='h' />
        {/* <div />
        <div>
            <p>a</p>
        </div>
        <div>
            <p>b</p>
        </div>
        <div>
            <p>c</p>
        </div>
        <div>
            <p>d</p>
        </div>
        <div>
            <p>e</p>
        </div>
        <div>
            <p>f</p>
        </div>
        <div>
            <p>g</p>
        </div>
        <div>
            <p>h</p>
        </div> */}
      </div>
    </div>
  );
};

export default ChessBoard;
