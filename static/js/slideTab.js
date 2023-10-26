const carousel = document.querySelector(".carousel");
const buttons = document.querySelector(".buttons").children;

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", () => {
    autoSlide(i);
  });
}

let isDragStart = false;
let prevPageX;
let prevScrollLeft;
let positionDiff;

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", () => {
  isDragStart = false;
});
carousel.addEventListener("touchend", dragStop);

function dragging(e) {
  if (!isDragStart) return;
  e.preventDefault();
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
}

function dragStart(e) {
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
}

function dragStop() {
  isDragStart = false;
  autoSlide();
}

function autoSlide(i = -1) {
  let index = i;
  let a = carousel.clientWidth;
  let x = carousel.scrollLeft;

  if (i == -1) {
    if (x < a / 2) {
      index = 0;
    } else {
      index = ~~((x - a / 2) / a) + 1;
    }
  }
  const before = document.querySelector(".active-button");
  if (before) {
    before.classList.remove("active-button");
    before.firstElementChild.setAttribute("fill", "gray");
  }

  const current = buttons[index];
  current?.classList.add("active-button");
  current?.firstElementChild.setAttribute("fill", "black");

  carousel.scroll({
    left: carousel.children[index].offsetLeft,
    behavior: "smooth",
  });
}
