// Elements
const canvas = <HTMLCanvasElement>document.getElementById("canvas");

const mulOfFac = (n: number, fac: number = 32) => fac * Math.floor(n / fac);
const w = window.innerWidth - 22; // 10px scroll Bar...
const cw = mulOfFac(w);
const ch = mulOfFac(window.innerHeight - 102);

canvas.width = cw;
canvas.height = ch;
canvas.style.margin = `0 ${(w - mulOfFac(w)) / 2}px`;
canvas.style.height = `${ch}px`;
const ctx = canvas.getContext("2d");

export const clearCanvas = () => ctx.clearRect(0, 0, cw, ch);

export const drawRect = (
  x: number,
  y: number,
  fillStyle: string,
  w: number = 32,
  h: number = 32
) => {
  ctx.fillStyle = fillStyle;
  ctx.fillRect(x, y, w, h);
};

export const startLine = (x: number, y: number) => ctx.moveTo(x, y);

export const drawLine = (
  x: number,
  y: number,
  strokeStyle: string = "#FFFF00"
) => {
  ctx.strokeStyle = strokeStyle;
  ctx.lineTo(x, y);
  ctx.stroke();
};
export const drawGrid = function(s: number = 32) {
  ctx.clearRect(0, 0, cw, ch);
  const data = `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"> \
      <defs> \
          <pattern id="smallGrid" width="${s}" height="${s}" patternUnits="userSpaceOnUse"> \
              <path d="M ${s} 0 L 0 0 0 ${s}" fill="none" stroke="gray" stroke-width="0.5" /> \
          </pattern> \
          <pattern id="grid" width="${s * 10}" height="${s *
    10}" patternUnits="userSpaceOnUse"> \
              <rect width="${s * 10}" height="${s *
    10}" fill="url(#smallGrid)" /> \
              <path d="M ${s * 10} 0 L 0 0 0 ${s *
    10}" fill="none" stroke="gray" stroke-width="1" /> \
          </pattern> \
      </defs> \
      <rect width="100%" height="100%" fill="url(#smallGrid)" /> \
  </svg>`;

  const DOMURL: any = window.URL || window.webkitURL || window;

  var img = new Image();
  var svg = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
  var url = DOMURL.createObjectURL(svg);

  img.onload = function() {
    ctx.drawImage(img, 0, 0);
    DOMURL.revokeObjectURL(url);
  };
  img.src = url;
};
