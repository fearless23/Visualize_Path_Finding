import INIT from "../init/_init";
import { setState, isState, WAITFOR, METHODIDX } from "./helpers";
const {
  startEl,
  stopEl,
  resumeEl,
  pauseEl,
  methodEl,
  speedEl
} = INIT.HTMLElements;

export const initState = (
  prevWaitFor: number = WAITFOR,
  prevMethodIdx: number = METHODIDX
) => {
  // WAIT TILL END OF INITSTATE...
  startEl.innerText = "WAIT";
  startEl.disabled = true;
  // Assuming Prev timeouts and other are cleared...
  const waitFor = prevWaitFor;
  const methodIdx = prevMethodIdx;
  globalThis.myTimers = [];
  globalThis.myData = { state: "ready", waitFor, methodIdx };
  // Initialize Button and Controls

  methodEl.disabled = false;
  speedEl.disabled = false;
  stopEl.classList.remove("active");
  stopEl.removeEventListener("click", () => {});
  pauseEl.classList.remove("active");
  pauseEl.removeEventListener("click", () => {});
  resumeEl.classList.remove("active");
  resumeEl.removeEventListener("click", () => {});

  methodEl.selectedIndex = methodIdx;
  speedEl.valueAsNumber = 101 - waitFor;

  speedEl.addEventListener("change", _ => {
    if (isState("ready"))
      globalThis.myData.waitFor = 101 - speedEl.valueAsNumber;
  });

  methodEl.addEventListener("change", () => {
    if (isState("ready")) globalThis.myData.methodIdx = methodEl.selectedIndex;
  });

  // Now Our Start Button or RUN Button is ready
  startEl.innerText = "RUN";
  startEl.disabled = false;
};

export const changeState = () => {
  // When we click Start Button...
  INIT.clearCanvas();
  INIT.drawGrid();
  // After Run Button Clicked...
  globalThis.myData.state = "busy";
  // START BTN DISABLED
  startEl.innerText = "RUNNING";
  startEl.disabled = true;
  startEl.removeEventListener("click", _ => null);
  // and also method selection and speed
  methodEl.removeEventListener("change", _ => null);
  methodEl.disabled = true;
  speedEl.removeEventListener("change", _ => null);
  speedEl.disabled = true;

  // stop and pause are active, resume is inactive...
  stopEl.classList.add("active");
  pauseEl.classList.add("active");
  resumeEl.classList.remove("active");

  stopEl.addEventListener("click", () => {
    stopEl.classList.remove("active");
    setState("stop");
    INIT.runTimerOp("clear");
  });

  pauseEl.addEventListener("click", () => {
    if (globalThis.myData.state === "busy") {
      setState("paused");
      pauseEl.classList.remove("active");
      startEl.innerText = "PAUSED";
      INIT.runTimerOp("pause");
      resumeEl.classList.add("active");
    }
  });

  resumeEl.addEventListener("click", () => {
    if (globalThis.myData.state === "paused") {
      setState("busy");
      resumeEl.classList.remove("active");
      startEl.innerText = "RUNNING";
      INIT.runTimerOp("resume");
      pauseEl.classList.add("active");
    }
  });
};
