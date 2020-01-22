import INIT from "./init/_init";
const { handleMenuBtn, drawGrid } = INIT;
import { main } from "./controls/main";

document.addEventListener("DOMContentLoaded", () => {
  handleMenuBtn();
  main()
});
