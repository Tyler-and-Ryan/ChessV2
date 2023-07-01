export const isCheck = (nodes, targetNode, edges) => {
  if (edges.length === 0) return false; //edges.length shouldn't be zero
  const targetX = nodes.at(targetNode).x;
  const targetY = nodes.at(targetNode).y;
  console.log("edges: " + JSON.stringify(edges));
  // console.log(`targetNode[${targetX}, ${targetY}], # of edges: ${edges.length}`);
  edges.forEach((possibleEdge) => {
    // console.log(`possibleEdge[${possibleEdge.at(1).x}, ${possibleEdge.at(1).y}]`);
    if (
      //if the destination location is the same as the target
      possibleEdge.at(1).x === targetX &&
      possibleEdge.at(1).y === targetY
    ) {
      console.log("TARGETNODE IS UNDER ATTACK");
      return true;
    }
  });
  return false;
};
