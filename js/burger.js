export function initBurgerMenu() {
    const burger = document.querySelector(".header__left img");
    const header = document.querySelector(".header");

    burger.addEventListener("click", () => {
        header.classList.toggle("menu-open");
    });
}
