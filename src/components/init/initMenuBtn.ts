// Elements
const menuBtn = <HTMLAnchorElement>document.getElementById("menuBtn");
// Menu Button Control
export const handleMenuBtn = () => {
  menuBtn.addEventListener("click", () => {
    const target = menuBtn.dataset.target;
    const $target = document.getElementById(target);
    menuBtn.classList.toggle("is-active");
    $target.classList.toggle("is-active");
  });
};
