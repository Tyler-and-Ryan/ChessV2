import React from 'react'
import './ChessBoard.css'
import Tile from './Tile.js'
import blackKing from './visualAssets/blackKing.svg'
import whiteKing from './visualAssets/whiteKing.svg'
import blackBishop from './visualAssets/blackBishop.svg'
import whiteBishop from './visualAssets/whiteBishop.svg'
import blackKnight from './visualAssets/blackKnight.svg'
import whiteKnight from './visualAssets/whiteKnight.svg'
import blackPawn from './visualAssets/blackPawn.svg'
import whitePawn from './visualAssets/whitePawn.svg'
import blackQueen from './visualAssets/blackQueen.svg'
import whiteQueen from './visualAssets/whiteQueen.svg'
import blackRook from './visualAssets/blackRook.svg'
import whiteRook from './visualAssets/whiteRook.svg'


const ChessBoard = () => {
    return (
        <div className="ChessBoardContainer">
            <Tile svg={blackRook} altText="Black Rook"/>
            <Tile svg={blackKnight} altText="Black Knight"/>
            <Tile svg={blackBishop} altText="Black Bishop"/>
            <Tile svg={blackQueen} altText="Black Queen"/>
            <Tile svg={blackKing} altText="Black King"/>
            <Tile svg={blackBishop} altText="Black Bishop"/>
            <Tile svg={blackKnight} altText="Black Knight"/>
            <Tile svg={blackRook} altText="Black Rook"/>
            <Tile svg={blackPawn} altText="Black Pawn"/>
            <Tile svg={blackPawn} altText="Black Pawn"/>
            <Tile svg={blackPawn} altText="Black Pawn"/>
            <Tile svg={blackPawn} altText="Black Pawn"/>
            <Tile svg={blackPawn} altText="Black Pawn"/>
            <Tile svg={blackPawn} altText="Black Pawn"/>
            <Tile svg={blackPawn} altText="Black Pawn"/>
            <Tile svg={blackPawn} altText="Black Pawn"/>
            <Tile svg={{}} altText=""/>
            <Tile svg={{}} altText=""/>
            <Tile svg={{}} altText=""/>
            <Tile svg={{}} altText=""/>
            <Tile svg={{}} altText=""/>
            <Tile svg={{}} altText=""/>
            <Tile svg={{}} altText=""/>
            <Tile svg={{}} altText=""/>
            <Tile svg={{}} altText=""/>
            <Tile svg={{}} altText=""/>
            <Tile svg={{}} altText=""/>
            <Tile svg={{}} altText=""/>
            <Tile svg={{}} altText=""/>
            <Tile svg={{}} altText=""/>
            <Tile svg={{}} altText=""/>
            <Tile svg={{}} altText=""/>
            <Tile svg={{}} altText=""/>
            <Tile svg={{}} altText=""/>
            <Tile svg={{}} altText=""/>
            <Tile svg={{}} altText=""/>
            <Tile svg={{}} altText=""/>
            <Tile svg={{}} altText=""/>
            <Tile svg={{}} altText=""/>
            <Tile svg={{}} altText=""/>
            <Tile svg={{}} altText=""/>
            <Tile svg={{}} altText=""/>
            <Tile svg={{}} altText=""/>
            <Tile svg={{}} altText=""/>
            <Tile svg={{}} altText=""/>
            <Tile svg={{}} altText=""/>
            <Tile svg={{}} altText=""/>
            <Tile svg={{}} altText=""/>
            <Tile svg={whitePawn} altText="White Pawn"/>
            <Tile svg={whitePawn} altText="White Pawn"/>
            <Tile svg={whitePawn} altText="White Pawn"/>
            <Tile svg={whitePawn} altText="White Pawn"/>
            <Tile svg={whitePawn} altText="White Pawn"/>
            <Tile svg={whitePawn} altText="White Pawn"/>
            <Tile svg={whitePawn} altText="White Pawn"/>
            <Tile svg={whitePawn} altText="White Pawn"/>
            <Tile svg={whiteRook} altText="White Rook"/>
            <Tile svg={whiteKnight} altText="White Knight"/>
            <Tile svg={whiteBishop} altText="White Bishop"/>
            <Tile svg={whiteQueen} altText="White Queen"/>
            <Tile svg={whiteKing} altText="White King"/>
            <Tile svg={whiteBishop} altText="White Bishop"/>
            <Tile svg={whiteKnight} altText="White Knight"/>
            <Tile svg={whiteRook} altText="White Rook"/>
        </div>
    );
}

export default ChessBoard;