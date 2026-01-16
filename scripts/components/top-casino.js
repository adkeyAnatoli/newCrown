import { qs, createEl } from "../utils/dom.js";
import { appState } from "../state/app-state.js";
import { navigateToOffer } from "../utils/navigation.js";
import { siteName } from "../utils/url.js";

export function renderTopCasino() {
  const mount = qs("#top-casino");
  if (!mount) {
    // console.warn("Top Casino element not found");
    return;
  }

  if (
    !appState.website ||
    !appState.website.offers ||
    appState.website.offers.length === 0
  ) {
    console.warn("No casino data available");
    return;
  }

  mount.innerHTML = "";

  const country = appState.website?.website?.country_name || "UK";
  const h2 = createEl("h2", {
    className: "title-black topCasinoSection_title",
    text: `Top Casinos ${country}`,
  });

  const grid = createEl("div", { className: "cards" });

  function renderCards(visibleCount) {
    grid.innerHTML = "";

    appState.website.offers.slice(0, visibleCount).forEach((offer) => {
      const card = createEl("div", { className: "cardCasino" });
      const img = createEl("img");

      img.src = `https://api.adkey-seo.com/storage/images/offers/${offer.logo}`;
      img.alt = `${offer.name} in ${siteName}`;
      img.title = `${offer.name} in ${siteName}`;
      img.width = 190;
      img.height = 76;
      img.loading = "lazy";
      img.decoding = "async";
      img.fetchPriority = "low";
      img.onerror = function () {
        this.src = "/public/images/casino-placeholder.webp";
      };

      const h3 = createEl("h3", { text: offer.name });
      const h4 = createEl("p", { className: "welcome", text: "Welcome bonus" });
      const p = createEl("p", {
        className: "offer",
        text:
          offer.bonuses && offer.bonuses.welcome_bonus
            ? offer.bonuses.welcome_bonus
            : "",
      });

      const btn = createEl("button", { className: "button-secondary" });
      btn.textContent = "Claim Bonus";
      btn.addEventListener("click", (ev) => {
        ev.preventDefault();
        navigateToOffer(offer.id, offer.link);
      });

      card.appendChild(img);
      card.appendChild(h3);
      card.appendChild(h4);
      card.appendChild(p);
      card.appendChild(btn);
      grid.appendChild(card);
    });
  }

  let visibleCount = 8;
  renderCards(visibleCount);

  let allBtn = null;
  if (appState.website.offers.length > 8) {
    allBtn = createEl("button", {
      className: "button-primary topCasinoSection_button",
    });
    allBtn.textContent = "All casino";

    allBtn.addEventListener("click", (ev) => {
      ev.preventDefault();
      visibleCount = appState.website.offers.length;
      renderCards(visibleCount);
      if (allBtn && allBtn.parentNode) {
        allBtn.parentNode.removeChild(allBtn);
      }
    });
  }

  mount.appendChild(h2);
  mount.appendChild(grid);
  if (allBtn) {
    mount.appendChild(allBtn);
  }
}
