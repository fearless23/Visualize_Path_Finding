import ASTAR from "./aStarLib";
const { Graph, astar } = ASTAR;
import { colorSquare, done, sourcePoint, makeLine } from "./methodDraw";

const color = (val: number) => {
  if (val === 0) return "wall";
  if (val === 1) return "unvisited";
};

export const aStarSearch = () => {
  const data = [
    [1, 1, 1, 1],
    [0, 1, 1, 0],
    [0, 0, 1, 1]
  ];
  for (let i = 0; i < data.length; ++i) {
    for (let j = 0; j < data[i].length; ++j) {
      colorSquare(100, i, j, color(data[i][j]));
    }
  }
  colorSquare(100, 0, 0, "source");
  colorSquare(100, 1, 2, "target");
  const graph = new Graph(data, { diagonal: true });

  const start = graph.grid[0][0];
  const end = graph.grid[1][2];
  const result = astar.search(graph, start, end, null);
  console.log("DONE");
  sourcePoint(104, 0, 0);
  for (let val of result) {
    makeLine(200, val.x, val.y);
  }
  done(2900, "Sample");
};
