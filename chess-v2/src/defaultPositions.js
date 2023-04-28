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

//the initial positions of all the pieces
const defaultNodes = [
  {
    svg: blackRook,
    altText: "Black Rook",
    x: 8,
    y: "a",
    hasPiece: true,
  },
  {
    svg: blackKnight,
    altText: "Black Knight",
    x: 8,
    y: "b",
    hasPiece: true,
  },
  {
    svg: blackBishop,
    altText: "Black Bishop",
    x: 8,
    y: "c",
    hasPiece: true,
  },
  {
    svg: blackQueen,
    altText: "Black Queen",
    x: 8,
    y: "d",
    hasPiece: true,
  },
  {
    svg: blackKing,
    altText: "Black King",
    x: 8,
    y: "e",
    hasPiece: true,
  },
  {
    svg: blackBishop,
    altText: "Black Bishop",
    x: 8,
    y: "f",
    hasPiece: true,
  },
  {
    svg: blackKnight,
    altText: "Black Knight",
    x: 8,
    y: "g",
    hasPiece: true,
  },
  {
    svg: blackRook,
    altText: "Black Rook",
    x: 8,
    y: "h",
    hasPiece: true,
  },
  {
    svg: blackPawn,
    altText: "Black Pawn",
    x: 7,
    y: "a",
    hasPiece: true,
  },
  {
    svg: blackPawn,
    altText: "Black Pawn",
    x: 7,
    y: "b",
    hasPiece: true,
  },
  {
    svg: blackPawn,
    altText: "Black Pawn",
    x: 7,
    y: "c",
    hasPiece: true,
  },
  {
    svg: blackPawn,
    altText: "Black Pawn",
    x: 7,
    y: "d",
    hasPiece: true,
  },
  {
    svg: blackPawn,
    altText: "Black Pawn",
    x: 7,
    y: "e",
    hasPiece: true,
  },
  {
    svg: blackPawn,
    altText: "Black Pawn",
    x: 7,
    y: "f",
    hasPiece: true,
  },
  {
    svg: blackPawn,
    altText: "Black Pawn",
    x: 7,
    y: "g",
    hasPiece: true,
  },
  {
    svg: blackPawn,
    altText: "Black Pawn",
    x: 7,
    y: "h",
    hasPiece: true,
  },
  {
    svg: {},
    altText: "",
    x: 6,
    y: "a",
    hasPiece: false,
  },
  {
    svg: {},
    altText: "",
    x: 6,
    y: "b",
    hasPiece: false,
  },
  {
    svg: {},
    altText: "",
    x: 6,
    y: "c",
    hasPiece: false,
  },
  {
    svg: {},
    altText: "",
    x: 6,
    y: "d",
    hasPiece: false,
  },
  {
    svg: {},
    altText: "",
    x: 6,
    y: "e",
    hasPiece: false,
  },
  {
    svg: {},
    altText: "",
    x: 6,
    y: "f",
    hasPiece: false,
  },
  {
    svg: {},
    altText: "",
    x: 6,
    y: "g",
    hasPiece: false,
  },
  {
    svg: {},
    altText: "",
    x: 6,
    y: "h",
    hasPiece: false,
  },
  {
    svg: {},
    altText: "",
    x: 5,
    y: "a",
    hasPiece: false,
  },
  {
    svg: {},
    altText: "",
    x: 5,
    y: "b",
    hasPiece: false,
  },
  {
    svg: {},
    altText: "",
    x: 5,
    y: "c",
    hasPiece: false,
  },
  {
    svg: {},
    altText: "",
    x: 5,
    y: "d",
    hasPiece: false,
  },
  {
    svg: {},
    altText: "",
    x: 5,
    y: "e",
    hasPiece: false,
  },
  {
    svg: {},
    altText: "",
    x: 5,
    y: "f",
    hasPiece: false,
  },
  {
    svg: {},
    altText: "",
    x: 5,
    y: "g",
    hasPiece: false,
  },
  {
    svg: {},
    altText: "",
    x: 5,
    y: "h",
    hasPiece: false,
  },
  {
    svg: {},
    altText: "",
    x: 4,
    y: "a",
    hasPiece: false,
  },
  {
    svg: {},
    altText: "",
    x: 4,
    y: "b",
    hasPiece: false,
  },
  {
    svg: {},
    altText: "",
    x: 4,
    y: "c",
    hasPiece: false,
  },
  {
    svg: {},
    altText: "",
    x: 4,
    y: "d",
    hasPiece: false,
  },
  {
    svg: {},
    altText: "",
    x: 4,
    y: "e",
    hasPiece: false,
  },
  {
    svg: {},
    altText: "",
    x: 4,
    y: "f",
    hasPiece: false,
  },
  {
    svg: {},
    altText: "",
    x: 4,
    y: "g",
    hasPiece: false,
  },
  {
    svg: {},
    altText: "",
    x: 4,
    y: "h",
    hasPiece: false,
  },
  {
    svg: {},
    altText: "",
    x: 3,
    y: "a",
    hasPiece: false,
  },
  {
    svg: {},
    altText: "",
    x: 3,
    y: "b",
    hasPiece: false,
  },
  {
    svg: {},
    altText: "",
    x: 3,
    y: "c",
    hasPiece: false,
  },
  {
    svg: {},
    altText: "",
    x: 3,
    y: "d",
    hasPiece: false,
  },
  {
    svg: {},
    altText: "",
    x: 3,
    y: "e",
    hasPiece: false,
  },
  {
    svg: {},
    altText: "",
    x: 3,
    y: "f",
    hasPiece: false,
  },
  {
    svg: {},
    altText: "",
    x: 3,
    y: "g",
    hasPiece: false,
  },
  {
    svg: {},
    altText: "",
    x: 3,
    y: "h",
    hasPiece: false,
  },
  {
    svg: whitePawn,
    altText: "White Pawn",
    x: 2,
    y: "a",
    hasPiece: true,
  },
  {
    svg: whitePawn,
    altText: "White Pawn",
    x: 2,
    y: "b",
    hasPiece: true,
  },
  {
    svg: whitePawn,
    altText: "White Pawn",
    x: 2,
    y: "c",
    hasPiece: true,
  },
  {
    svg: whitePawn,
    altText: "White Pawn",
    x: 2,
    y: "d",
    hasPiece: true,
  },
  {
    svg: whitePawn,
    altText: "White Pawn",
    x: 2,
    y: "e",
    hasPiece: true,
  },
  {
    svg: whitePawn,
    altText: "White Pawn",
    x: 2,
    y: "f",
    hasPiece: true,
  },
  {
    svg: whitePawn,
    altText: "White Pawn",
    x: 2,
    y: "g",
    hasPiece: true,
  },
  {
    svg: whitePawn,
    altText: "White Pawn",
    x: 2,
    y: "h",
    hasPiece: true,
  },
  {
    svg: whiteRook,
    altText: "White Rook",
    x: 1,
    y: "a",
    hasPiece: true,
  },
  {
    svg: whiteKnight,
    altText: "White Knight",
    x: 1,
    y: "b",
    hasPiece: true,
  },
  {
    svg: whiteBishop,
    altText: "White Bishop",
    x: 1,
    y: "c",
    hasPiece: true,
  },
  {
    svg: whiteQueen,
    altText: "White Queen",
    x: 1,
    y: "d",
    hasPiece: true,
  },
  {
    svg: whiteKing,
    altText: "White King",
    x: 1,
    y: "e",
    hasPiece: true,
  },
  {
    svg: whiteBishop,
    altText: "White Bishop",
    x: 1,
    y: "f",
    hasPiece: true,
  },
  {
    svg: whiteKnight,
    altText: "White Knight",
    x: 1,
    y: "g",
    hasPiece: true,
  },
  {
    svg: whiteRook,
    altText: "White Rook",
    x: 1,
    y: "h",
    hasPiece: true,
  },
];
const defaultEdges = [
  {
    source: [1, 'b'],
    target: [1, 'c'],
  },
  {
    source: [1, 'b'],
    target: [1, 'd'],
  },
];

export { defaultNodes, defaultEdges };
