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
