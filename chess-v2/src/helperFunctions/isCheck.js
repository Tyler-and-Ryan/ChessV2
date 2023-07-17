export const isCheck = (nodes, targetNodeIdx, edges) => {
  const targetX = nodes.at(targetNodeIdx).x;
  const targetY = nodes.at(targetNodeIdx).y;
  const targetPlayer = nodes.at(targetNodeIdx).player;
  for (let i = 0; i < edges.length; i++) {
    let edgeSourcePlayer;
    for (let j = 0; j < nodes.length; j++) {
      if (nodes.at(j).x === edges[i][0].x && nodes.at(j).y === edges[i][0].y) {
        edgeSourcePlayer = nodes.at(j).player;
      }
    }
    if (
      //if the destination location is the same as the target
      edges[i][1].x === targetX &&
      edges[i][1].y === targetY 
      &&
      edgeSourcePlayer !== targetPlayer //prevent friendly fire
    ) {
      return true;
    }
  }
  return false;
};
