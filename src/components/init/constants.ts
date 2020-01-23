import { Cell } from "../types";
const CellColors = {
  source: "rgba(11, 102, 35, 1)",
  wall: "rgba(77, 82, 86, 1)",
  target: "rgba(68, 166, 198, 1)",
  visited: "rgba(208, 208, 208, 0.5)",
  boundary: "rgba(255, 159, 0,0.5)",
  unvisited: "rgba(255, 255, 255, 0.15)",
  white: "rgba(255, 255, 255, 1)"
};

export const cellColor = (cellType: Cell = "unvisited") => CellColors[cellType];
