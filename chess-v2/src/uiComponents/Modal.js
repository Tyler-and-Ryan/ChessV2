import { React } from "react";
import "./Modal.css";
import blackBishop from "../visualAssets/blackBishop.svg";
import whiteBishop from "../visualAssets/whiteBishop.svg";
import blackKnight from "../visualAssets/blackKnight.svg";
import whiteKnight from "../visualAssets/whiteKnight.svg";
import blackQueen from "../visualAssets/blackQueen.svg";
import whiteQueen from "../visualAssets/whiteQueen.svg";
import blackRook from "../visualAssets/blackRook.svg";
import whiteRook from "../visualAssets/whiteRook.svg";

const Modal = (props) => {
  return (
    <div className="modal">
      <div className="overlay">
        <div className="modal-content">
          <h3>Select a piece to transform your pawn into</h3>
          {props.player === "White" ? (
            <div className="modal-images">
              <img
                src={whiteBishop}
                alt="White Bishop"
                onClick={props.onImageClick}
              />
              <img
                src={whiteKnight}
                alt="White Knight"
                onClick={props.onImageClick}
              />
              <img
                src={whiteRook}
                alt="White Rook"
                onClick={props.onImageClick}
              />
              <img
                src={whiteQueen}
                alt="White Queen"
                onClick={props.onImageClick}
              />
            </div>
          ) : (
            <div className="modal-images">
              <img
                src={blackBishop}
                alt="Black Bishop"
                onClick={props.onImageClick}
              />
              <img
                src={blackKnight}
                alt="Black Knight"
                onClick={props.onImageClick}
              />
              <img
                src={blackRook}
                alt="Black Rook"
                onClick={props.onImageClick}
              />
              <img
                src={blackQueen}
                alt="Black Queen"
                onClick={props.onImageClick}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
