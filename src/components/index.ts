import INIT from "./init/_init";
const { handleMenuBtn } = INIT;
import { main } from "./controls/main";

document.addEventListener("DOMContentLoaded", () => {
  handleMenuBtn();
  main()
});
