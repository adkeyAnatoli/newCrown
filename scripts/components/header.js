import { qs, createEl } from "../utils/dom.js";
import { navigateToOffer } from "../utils/navigation.js";
import { appState } from "../state/app-state.js";

export function renderHeader() {
  const header = qs("#site-header");
  const offer = appState.offer;
  const buttonAll = document.querySelectorAll(".scroll");

  buttonAll.forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  });

  const burger = qs(".hamburger");
  if (burger) {
    burger.addEventListener("click", (ev) => {
      ev.preventDefault();
      burger.classList.toggle("open");
      const ulBlock = header.querySelector(".ulBlock");
      if (ulBlock) {
        ulBlock.classList.toggle("open");
      }
    });
  }

  if (offer) {
    const play = header.querySelector(".register");
    if (play) {
      play.addEventListener("click", (ev) => {
        ev.preventDefault();
        if (appState.offer)
          navigateToOffer(appState.offer.id, appState.offer.link);
      });
    }
  }

  const copyrightElement = document.querySelector(".copyrightRight");
  if (copyrightElement) {
    copyrightElement.textContent = copyrightElement.textContent.replace(
      "2025",
      new Date().getFullYear()
    );
  }
  const select = document.getElementById("select");
  const path = window.location.pathname;

  if (path.startsWith("/en-au")) {
    select.value = "/en-au/";
  } else {
    select.value = "/";
  }

  select.addEventListener("change", () => {
    window.location.href = select.value;
  });
}
