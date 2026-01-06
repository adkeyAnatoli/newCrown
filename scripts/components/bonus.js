import { qs, createEl } from "../utils/dom.js";
import { navigateToOffer } from "../utils/navigation.js";
import { appState } from "../state/app-state.js";

export function renderBonus() {
  const mount = qs("#bonus");
  if (!mount) return;

  const desktop = qs(".bonus-text.desktop span");
  desktop.innerHTML = `${appState.offer?.bonuses?.welcome_bonus || ""}`;

  const mobile = qs(".bonus-text.mobile span");
  mobile.innerHTML = `${appState.offer?.bonuses?.welcome_bonus || ""}`;

  const action = qs(".bonusButton");
  action.addEventListener("click", (ev) => {
    ev.preventDefault();
    if (appState.offer) navigateToOffer(appState.offer.id, appState.offer.link);
  });
}
