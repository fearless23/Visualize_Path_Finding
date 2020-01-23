import ASTAR from "./aStarLib";
const { Graph, aStarSearch } = ASTAR;
import {
  colorSquare,
  done,
  sourcePoint,
  makeLine,
  colorGrid
} from "../methodDraw";

export const aStarPathFind = () => {
  const { data, waitFor, rows, cols } = globalThis.myData;
  let totalWaitFor = waitFor;
  colorGrid(totalWaitFor, data);
  colorSquare(totalWaitFor, 0, 0, "source");
  colorSquare(totalWaitFor, rows - 1, cols - 1, "target");
  sourcePoint(totalWaitFor, 0, 0);

  const graph = new Graph(data, { diagonal: false });
  const start = graph.grid[0][0];
  const end = graph.grid[rows - 1][cols - 1];
  totalWaitFor += waitFor;
  const x = aStarSearch(graph, start, end, totalWaitFor, {
    closest: false,
    heuristic: null
  });
  totalWaitFor = x.waitFor + waitFor;
  for (let val of x.result) {
    makeLine(totalWaitFor, val.x, val.y);
  }
  totalWaitFor += waitFor;
  done(totalWaitFor, "Sample");
};
