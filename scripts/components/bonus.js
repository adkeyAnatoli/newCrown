import { qs, createEl } from '../utils/dom.js';
import { navigateToOffer } from '../utils/navigation.js';
import { appState } from '../state/app-state.js';

export function renderBonus() {
  const mount = qs("#bonus");
  if (!mount) return;
  

  const desktop = qs(".bonus-text.desktop");
  desktop.innerHTML = `Exclusive welcome offer of <span>${
    appState.offer?.bonuses?.welcome_bonus || ""
  }</span>`;
  
  const mobile = qs(".bonus-text.mobile");
  mobile.innerHTML = `Exclusive welcome bonus of <span>${
    appState.offer?.bonuses?.welcome_bonus || ""
  }</span>`;
  
  const action = qs('.bonusButton');
  action.textContent = "Claim Bonus";
  action.addEventListener("click", (ev) => {
    ev.preventDefault();
    if (appState.offer) navigateToOffer(appState.offer.id ,appState.offer.link);
  });
  
}
