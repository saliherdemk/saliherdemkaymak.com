const carousel = document.querySelector(".carousel");
const buttonsContainer = document.querySelector(".buttons");
const buttons = Array.from(buttonsContainer.children);

buttons.forEach((button, i) => {
  button.addEventListener("click", () => autoSlide(i));
});

function autoSlide(i) {
  const before = document.querySelector(".active-button");
  if (before) {
    before.classList.remove("active-button");
    before.firstElementChild.setAttribute("fill", "gray");
  }

  const current = buttons[i];
  current?.classList.add("active-button");
  current?.firstElementChild?.setAttribute("fill", "black");

  carousel.scroll({
    left: carousel.children[i].offsetLeft,
    behavior: "smooth",
  });
}

let lastScrollTop = 0;

function handleScroll() {
  const scrollTop = window.scrollY;
  if (scrollTop > lastScrollTop) {
    buttonsContainer.classList.add("hide");
  } else {
    buttonsContainer.classList.remove("hide");
  }
  lastScrollTop = scrollTop;
}

window.addEventListener("scroll", handleScroll);
