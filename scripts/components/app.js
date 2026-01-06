import { qs, createEl } from "../utils/dom.js";
import { appState } from "../state/app-state.js";
import { navigateToOffer } from "../utils/navigation.js";

export function renderApp() {
  const mount = qs("#app");
  if (!mount) {
    // console.warn("App element not found");
    return;
  }

  const allButtons = document.querySelectorAll(".appButton");
  allButtons.forEach((button) => {
    button.addEventListener("click", (ev) => {
      ev.preventDefault();
      if (appState.offer)
        navigateToOffer(appState.offer.id, appState.offer.link);
    });
  });
}
