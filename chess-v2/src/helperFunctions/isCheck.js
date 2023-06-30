export const isCheck = (nodes, leftCastleIdx, edges) => {
  const targetX = nodes.at(leftCastleIdx).x;
  const targetY = nodes.at(leftCastleIdx).y;
  edges.forEach((possibleEdge) => {
    if (
      //if the destination location is the same as the target
      possibleEdge.at(1).x === targetX &&
      possibleEdge.at(1).y === targetY
    ) {
      return true;
    }
  });
  return false;
};
