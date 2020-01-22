import { Cell } from "../types";
const CellColors = {
  source: "#0b6623",
  wall: "#4d5256",
  target: "#44a6c6",
  visited: "#d0d0d0",
  unvisited: "#FFFFFF",
  boundary: "#FF9F00"
};

export const cellColor = (cellType: Cell = "unvisited") => CellColors[cellType];
