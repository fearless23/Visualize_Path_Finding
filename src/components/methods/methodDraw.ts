import INIT from "../init/_init";
import { Cell } from "../types";
import { pushTimer } from "../init/timers";
const { cellColor, drawRect, clearCanvas, drawLine, startLine } = INIT;

export const clear = clearCanvas;
export const sourcePoint = function(waitFor: number, row: number, col: number) {
  const cb = () => startLine(row * 32 + 16, col * 32 + 16);
  pushTimer(cb, waitFor);
};

export const colorSquare = function(
  waitFor: number,
  row: number,
  col: number,
  type: Cell = "unvisited"
) {
  const fillStyle = cellColor(type);
  const cb = () => drawRect(row * 32, col * 32, fillStyle);
  pushTimer(cb, waitFor);
};

export const makeLine = function(waitFor: number, row: number, col: number) {
  const cb = () => drawLine(row * 32 + 16, col * 32 + 16);
  pushTimer(cb, waitFor);
};

export const done = function(waitFor, name: string) {
  const cb = () => {
    globalThis.myData.state = "done";
    console.log("FINISHED", name);
  };
  pushTimer(cb, waitFor);
};
