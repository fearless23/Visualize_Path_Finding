import INIT from "../init/_init";
import { initState, changeState } from "./initState";
import { selectMethod } from "../methods/_methods";
import { setState, isState, prevOpts } from "./helpers";

const checkIfFinished = (intvId: number) => {
  if (isState("done") || isState("stop")) {
    setState("ready");
    clearInterval(intvId);
    // MAin dont runs second time...
    initState(...prevOpts());
    INIT.HTMLElements.startEl.addEventListener("click", startBtnHandler);
  }
};

const startBtnHandler = (evt: MouseEvent) => {
  changeState();
  const methodIdx = globalThis.myData.methodIdx;
  selectMethod[methodIdx]();
  const intvId = setInterval(() => checkIfFinished(intvId), 500);
};

export const main = () => {
  //Main runs once...
  // Create GRID...
  INIT.clearCanvas();
  initState();
  INIT.HTMLElements.startEl.addEventListener("click", startBtnHandler);
};
