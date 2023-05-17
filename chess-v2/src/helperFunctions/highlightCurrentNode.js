/*
 * Highlights only the current node, while deselecting all other nodes
 */
export const highlightCurrentNode = (nodes, x, y) => {
  return nodes.map((node) => {
    if (node.x === x && node.y === y) {
      return {
        svg: node.svg,
        altText: node.altText,
        x: node.x,
        y: node.y,
        hasPiece: node.hasPiece,
        player: node.player,
        isHighlighted: false,
        isSelected: true,
      };
    }
    return {
      svg: node.svg,
      altText: node.altText,
      x: node.x,
      y: node.y,
      hasPiece: node.hasPiece,
      player: node.player,
      isHighlighted: false,
      isSelected: false,
    };
  });
};
