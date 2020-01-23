import INIT from "../init/_init";
const { cellColor, drawRect, clearCanvas, canvas } = INIT;
import { State } from "../types";
export const isState = (state: State) => globalThis.myData.state === state;
export const setState = (state: State) => {
  globalThis.myData.state = state;
};

export const prevOpts = () => {
  const { waitFor, methodIdx } = globalThis.myData;
  return [waitFor, methodIdx];
};

export const WAITFOR = 3; // DEFAULT
export const METHODIDX = 1; // DEFAULT

export const prepareGrid = () => {
  const rows = Math.floor(INIT.canvas.width / 32);
  const cols = Math.floor(INIT.canvas.height / 32);
  if (rows < 10 || cols < 10) {
    alert("Window size is very Small");
  }
  globalThis.myData.data = [];
  for (let row = 0; row < rows; ++row) {
    const row = [];
    for (let col = 0; col < cols; ++col) {
      row.push(1);
    }
    globalThis.myData.data.push(row);
  }
  globalThis.myData.rows = rows;
  globalThis.myData.cols = cols;
};

export const mouseInCanvas = (e: MouseEvent) => {
  const row = Math.floor((e.clientX - canvas.offsetLeft) / 32);
  const col = Math.floor((e.clientY - canvas.offsetTop) / 32);
  // console.log(e.type, e.which, e.button);
  // Left BTN Pressed
  if (e.which === 1) {
    globalThis.myData.data[row][col] = 0;
    const fillStyle = cellColor("wall");
    drawRect(row * 32, col * 32, fillStyle);
  }

  // if (e.type === "click" && e.which === 1) {
  //   globalThis.myData.data[row][col] = 0;
  //   const fillStyle = cellColor("wall");
  //   drawRect(row * 32, col * 32, fillStyle);
  // }

  // Middle BTN Pressed
  if (e.which === 2) {
    globalThis.myData.data[row][col] = 1;
    const fillStyle = cellColor("white");
    drawRect(row * 32, col * 32, fillStyle);
  }
};
