export const isCheck = (nodes, targetNode, edges) => {
  if (edges.length === 0) return false; //edges.length shouldn't be zero
  const targetX = nodes.at(targetNode).x;
  const targetY = nodes.at(targetNode).y;
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
