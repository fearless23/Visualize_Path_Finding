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
  const cb = () => drawRect(row * 32, col * 32, cellColor(type));
  pushTimer(cb, waitFor);
};

const color = (val: number) => {
  if (val === 0) return "wall";
  if (val === 1) return null;
};

export const colorGrid = function(waitFor: number, data: number[][]) {
  const cb = () => {
    for (let row = 0; row < data.length; ++row) {
      for (let col = 0; col < data[row].length; ++col) {
        if (data[row][col] !== 1) {
          drawRect(row * 32, col * 32, "wall");
        }
      }
    }
  };
  pushTimer(cb, waitFor);
};

export const makeLine = function(waitFor: number, row: number, col: number) {
  const cb = () => drawLine(row * 32 + 16, col * 32 + 16);
  pushTimer(cb, waitFor);
};

export const done = function(waitFor: number, name: string) {
  const cb = () => {
    globalThis.myData.state = "done";
    console.log("FINISHED", name);
  };
  pushTimer(cb, waitFor);
};
