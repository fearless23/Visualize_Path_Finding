import INIT from "../init/_init";
import { initState, changeState } from "./initState";
import { selectMethod } from "../methods/_methods";
import { setState, isState, prevOpts } from "./helpers";

const checkIfFinished = (intvId: number) => {
  if (isState("done") || isState("stop")) {
    clearInterval(intvId);
    setState("ready");
    initState(...prevOpts());
    INIT.HTMLElements.startEl.addEventListener("click", startBtnHandler);
  }
};

const startBtnHandler = (evt: MouseEvent) => {
  changeState();
  const methodIdx = globalThis.myData.methodIdx;
  // const delay = globalThis.myData.opts.delay;
  selectMethod[methodIdx]();
  const intvId = setInterval(() => checkIfFinished(intvId), 500);
};

export const main = () => {
  initState();
  INIT.HTMLElements.startEl.addEventListener("click", startBtnHandler);
};
