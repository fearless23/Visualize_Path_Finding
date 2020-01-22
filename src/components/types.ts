export type Cell =
  | "source"
  | "wall"
  | "target"
  | "visited"
  | "unvisited"
  | "boundary";

export type Opts = {
  // size: number;
  methodNum: number;
  delay: number;
};

export type State = "ready" | "done" | "paused" | "stop" | "busy";