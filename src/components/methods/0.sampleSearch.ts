//...
import { colorSquare, done } from "./methodDraw";

//...
export const sampleSearch = () => {
  colorSquare(100,1,1,"boundary")
  colorSquare(200,2,2,"source")
  colorSquare(300,3,3,"target")
  colorSquare(400,4,4,"unvisited")
  colorSquare(500,5,5,"visited")
  colorSquare(600,6,6,"wall")
  colorSquare(700,7,7,"wall")
  colorSquare(2500,8,8,"wall")
  done(2900,"Sample")
};
