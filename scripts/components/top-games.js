import { qs, createEl } from "../utils/dom.js";
import { appState } from "../state/app-state.js";
import { navigateToOffer } from "../utils/navigation.js";
import { siteName } from "../utils/url.js";

export function renderTopGames() {
  const mount = qs("#top-games");
  if (!mount) {
    return;
  }

  if (!Array.isArray(appState.games) || appState.games.length === 0) {
    console.warn("No games data available");
    return;
  }

  mount.classList.add("topGamesSection");
  const container = qs(".topGamesWrapper");
  const grid = createEl("div", { className: "games" });

  appState.games.slice(0, 12).forEach((game) => {
    const card = createEl("a", {
      className: "gameCard",
      attrs: { href: `casino/${appState.offer.id}` },
    });
    card.addEventListener("click", (ev) => {
      ev.preventDefault();
      if (appState.offer)
        navigateToOffer(appState.offer.id, appState.offer.link);
    });
    const img = createEl("img");

    img.src = game.image
      ? `https://api.adkey-seo.com/storage/images/games/${game.image}`
      : "/public/images/game-placeholder.webp";
    img.alt = `${game.name} in ${siteName}`;
    img.title = `${game.name} in ${siteName}`;
    img.loading = "lazy";
    img.width = 264;
    img.height = 142;
    img.onerror = function () {
      this.src = "/public/images/game-placeholder.webp";
    };

    const info = createEl("div", { className: "gameInfo" });
    const name = createEl("h3", { text: game.name || "Game" });
    const btn = createEl("p", { className: "gameBlock_text" });
    const spanText = createEl("span");
    spanText.textContent = "Play Now";
    const play = createEl("img");
    play.src = "/public/svg/icon-play.svg";
    play.width = 32;
    play.height = 31;
    play.alt = "Play";
    btn.appendChild(play);
    btn.appendChild(spanText);
    info.appendChild(name);
    info.appendChild(btn);
    card.appendChild(img);
    card.appendChild(info);
    grid.appendChild(card);
  });

  container.appendChild(grid);

  const allBtn = createEl("a", {
    className: "button-primary topGames_button",
    attrs: { href: `casino/${appState.offer.id}` },
  });

  allBtn.textContent = "All Games";
  if (appState.offer) {
    allBtn.addEventListener("click", (ev) => {
      ev.preventDefault();
      navigateToOffer(appState.offer.id, appState.offer.link);
    });
  }

  container.appendChild(allBtn);
  mount.appendChild(container);
}
