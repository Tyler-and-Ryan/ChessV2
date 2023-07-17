import { bishopPossibleMoves } from "./bishopPossibleMoves";

/*
 * Finds all the tiles between attacking piece and the King that is under attack (inclusive of the attacking piece).
 * These tiles represent all the spots a piece friendly to the King could move and stop the King from being in check
 */
const findTilesBetweenPieces = (
  kingUnderAttack,
  attackingPiece,
  nodes,
  edges
) => {
  //pawns and knights must be captured in order to block the king from being in check, so they are the only possible move location
  if (
    attackingPiece.altText === "White Knight" ||
    attackingPiece.altText === "Black Knight" ||
    attackingPiece.altText === "White Pawn" ||
    attackingPiece.altText === "Black Pawn"
  ) {
    return nodes.filter((node) => node === attackingPiece);
  }

  //handle rook
  if (
    attackingPiece.altText === "White Rook" ||
    attackingPiece.altText === "Black Rook"
  ) {
    return nodes.filter((node) => {
      if (attackingPiece.y > kingUnderAttack.y) {
        return (
          node.x === kingUnderAttack.x &&
          node.y <= attackingPiece.y &&
          node.y > kingUnderAttack.y
        );
      } else if (attackingPiece.y < kingUnderAttack.y) {
        return (
          node.x === kingUnderAttack.x &&
          node.y >= attackingPiece.y &&
          node.y < kingUnderAttack.y
        );
      } else if (attackingPiece.x > kingUnderAttack.x) {
        return (
          node.y === kingUnderAttack.y &&
          node.x <= attackingPiece.x &&
          node.x > kingUnderAttack.x
        );
      } else {
        return (
          node.y === kingUnderAttack.y &&
          node.x >= attackingPiece.x &&
          node.x < kingUnderAttack.x
        );
      }
    });
  }

  //handle bishop
  if (
    attackingPiece.altText === "White Bishop" ||
    attackingPiece.altText === "Black Bishop"
  ) {
    if (
      attackingPiece.y > kingUnderAttack.y &&
      attackingPiece.x > kingUnderAttack.x
    ) {
      //find all edges of possible moves
      const possibleEdges = bishopPossibleMoves(attackingPiece, nodes).filter(
        (edge) =>
          edge[1].x > kingUnderAttack.x &&
          edge[1].y > kingUnderAttack.y &&
          edge[1].x <= attackingPiece.x &&
          edge[1].y <= attackingPiece.y
      );
      //add the corresponding nodes to an array and return
      const retVal = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < possibleEdges.length; j++) {
          if (
            possibleEdges.at(j)[1].x === nodes.at(i).x &&
            possibleEdges.at(j)[1].y === nodes.at(i).y
          ) {
            retVal.push(nodes.at(i));
          }
        }
      }
      return retVal;
    } else if (
      attackingPiece.y < kingUnderAttack.y &&
      attackingPiece.x > kingUnderAttack.x
    ) {
      //find all edges of possible moves
      const possibleEdges = bishopPossibleMoves(attackingPiece, nodes).filter(
        (edge) =>
          edge[1].x > kingUnderAttack.x &&
          edge[1].y < kingUnderAttack.y &&
          edge[1].x <= attackingPiece.x &&
          edge[1].y >= attackingPiece.y
      );
      //add the corresponding nodes to an array and return
      const retVal = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < possibleEdges.length; j++) {
          if (
            possibleEdges.at(j)[1].x === nodes.at(i).x &&
            possibleEdges.at(j)[1].y === nodes.at(i).y
          ) {
            retVal.push(nodes.at(i));
          }
        }
      }
      return retVal;
    } else if (
      attackingPiece.y < kingUnderAttack.y &&
      attackingPiece.x < kingUnderAttack.x
    ) {
      //find all edges of possible moves
      const possibleEdges = bishopPossibleMoves(attackingPiece, nodes).filter(
        (edge) =>
          edge[1].x < kingUnderAttack.x &&
          edge[1].y < kingUnderAttack.y &&
          edge[1].x >= attackingPiece.x &&
          edge[1].y >= attackingPiece.y
      );
      //add the corresponding nodes to an array and return
      const retVal = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < possibleEdges.length; j++) {
          if (
            possibleEdges.at(j)[1].x === nodes.at(i).x &&
            possibleEdges.at(j)[1].y === nodes.at(i).y
          ) {
            retVal.push(nodes.at(i));
          }
        }
      }
      return retVal;
    } else {
      //find all edges of possible moves
      const possibleEdges = bishopPossibleMoves(attackingPiece, nodes).filter(
        (edge) =>
          edge[1].x < kingUnderAttack.x &&
          edge[1].y > kingUnderAttack.y &&
          edge[1].x >= attackingPiece.x &&
          edge[1].y <= attackingPiece.y
      );
      //add the corresponding nodes to an array and return
      const retVal = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < possibleEdges.length; j++) {
          if (
            possibleEdges.at(j)[1].x === nodes.at(i).x &&
            possibleEdges.at(j)[1].y === nodes.at(i).y
          ) {
            retVal.push(nodes.at(i));
          }
        }
      }
      return retVal;
    }
  }

  //handle queen
  if (
    attackingPiece.x === kingUnderAttack.x ||
    attackingPiece.y === kingUnderAttack.y
  ) {
    return nodes.filter((node) => {
      if (attackingPiece.y > kingUnderAttack.y) {
        return (
          node.x === kingUnderAttack.x &&
          node.y <= attackingPiece.y &&
          node.y > kingUnderAttack.y
        );
      } else if (attackingPiece.y < kingUnderAttack.y) {
        return (
          node.x === kingUnderAttack.x &&
          node.y >= attackingPiece.y &&
          node.y < kingUnderAttack.y
        );
      } else if (attackingPiece.x > kingUnderAttack.x) {
        return (
          node.y === kingUnderAttack.y &&
          node.x <= attackingPiece.x &&
          node.x > kingUnderAttack.x
        );
      } else {
        return (
          node.y === kingUnderAttack.y &&
          node.x >= attackingPiece.x &&
          node.x < kingUnderAttack.x
        );
      }
    });
  } else if (
    attackingPiece.y > kingUnderAttack.y &&
    attackingPiece.x > kingUnderAttack.x
  ) {
    //find all edges of possible moves
    const possibleEdges = bishopPossibleMoves(attackingPiece, nodes).filter(
      (edge) =>
        edge[1].x > kingUnderAttack.x &&
        edge[1].y > kingUnderAttack.y &&
        edge[1].x <= attackingPiece.x &&
        edge[1].y <= attackingPiece.y
    );
    //add the corresponding nodes to an array and return
    const retVal = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = 0; j < possibleEdges.length; j++) {
        if (
          possibleEdges.at(j)[1].x === nodes.at(i).x &&
          possibleEdges.at(j)[1].y === nodes.at(i).y
        ) {
          retVal.push(nodes.at(i));
        }
      }
    }
    return retVal;
  } else if (
    attackingPiece.y < kingUnderAttack.y &&
    attackingPiece.x > kingUnderAttack.x
  ) {
    //find all edges of possible moves
    const possibleEdges = bishopPossibleMoves(attackingPiece, nodes).filter(
      (edge) =>
        edge[1].x > kingUnderAttack.x &&
        edge[1].y < kingUnderAttack.y &&
        edge[1].x <= attackingPiece.x &&
        edge[1].y >= attackingPiece.y
    );
    //add the corresponding nodes to an array and return
    const retVal = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = 0; j < possibleEdges.length; j++) {
        if (
          possibleEdges.at(j)[1].x === nodes.at(i).x &&
          possibleEdges.at(j)[1].y === nodes.at(i).y
        ) {
          retVal.push(nodes.at(i));
        }
      }
    }
    return retVal;
  } else if (
    attackingPiece.y < kingUnderAttack.y &&
    attackingPiece.x < kingUnderAttack.x
  ) {
    //find all edges of possible moves
    const possibleEdges = bishopPossibleMoves(attackingPiece, nodes).filter(
      (edge) =>
        edge[1].x < kingUnderAttack.x &&
        edge[1].y < kingUnderAttack.y &&
        edge[1].x >= attackingPiece.x &&
        edge[1].y >= attackingPiece.y
    );
    //add the corresponding nodes to an array and return
    const retVal = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = 0; j < possibleEdges.length; j++) {
        if (
          possibleEdges.at(j)[1].x === nodes.at(i).x &&
          possibleEdges.at(j)[1].y === nodes.at(i).y
        ) {
          retVal.push(nodes.at(i));
        }
      }
    }
    return retVal;
  } else {
    //find all edges of possible moves
    const possibleEdges = bishopPossibleMoves(attackingPiece, nodes).filter(
      (edge) =>
        edge[1].x < kingUnderAttack.x &&
        edge[1].y > kingUnderAttack.y &&
        edge[1].x >= attackingPiece.x &&
        edge[1].y <= attackingPiece.y
    );
    //add the corresponding nodes to an array and return
    const retVal = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = 0; j < possibleEdges.length; j++) {
        if (
          possibleEdges.at(j)[1].x === nodes.at(i).x &&
          possibleEdges.at(j)[1].y === nodes.at(i).y
        ) {
          retVal.push(nodes.at(i));
        }
      }
    }
    return retVal;
  }
};

export default findTilesBetweenPieces;
