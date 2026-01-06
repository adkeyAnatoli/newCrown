import { qs, createEl } from "../utils/dom.js";
import { appState } from "../state/app-state.js";
import { navigateToOffer } from "../utils/navigation.js";
import { siteName } from "../utils/url.js";

export function renderTopGames() {
  const mount = qs("#top-games");
  if (!mount) {
    // console.warn("Top Games element not found");
    return;
  }

  if (!Array.isArray(appState.games) || appState.games.length === 0) {
    console.warn("No games data available");
    return;
  }

  mount.classList.add("topGamesSection");
  // const container = createEl("div", { className: "container wrapper" });
  const container = qs('.topGamesWrapper');
  // const h2 = createEl("h2", { className: "title-black", text: "Top Games" });
  const grid = createEl("div", { className: "games" });

  appState.games.slice(0, 12).forEach((game) => {
    const card = createEl("button", { className: "gameCard" });
    card.addEventListener("click", (ev) => {
      ev.preventDefault();
      if (appState.offer)
        navigateToOffer(appState.offer.id, appState.offer.link);
    });
    const img = createEl("img");

    img.src = game.image
      ? `https://api.adkey-seo.com/storage/images/games/${game.image}`
      : "./public/images/game-placeholder.webp";
    img.alt = `${game.name} in ${siteName}`;
    img.title = `${game.name} in ${siteName}`;
    img.loading = 'lazy';
    img.onerror = function () {
      this.src = "./public/images/game-placeholder.webp";
    };

    const info = createEl("div", { className: "gameInfo" });
    const name = createEl("h3", { text: game.name || "Game" });
    const btn = createEl("p", { className: "gameBlock_text" });
    const spanText = createEl("span");
    spanText.textContent = "Play Now";
    const play = createEl("img");
    play.src = "./public/svg/icon-play.svg";
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

  // container.appendChild(h2);
  container.appendChild(grid);

  const allBtn = createEl("button", {
    className: "button-primary topGames_button",
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
