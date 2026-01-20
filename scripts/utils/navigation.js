export function navigateToOffer(id, link) {
  localStorage.setItem("redirectLink", link);
  localStorage.setItem("redirectId", id);

  window.open("/casino.html", "_blank", "noopener,noreferrer");
}

export function setupRedirectIfNeeded() {
  const path = location.pathname;

  const isCasinoPage =
    path.endsWith("casino.html") || path.includes("/casino/");
  if (!isCasinoPage) return;

  try {
    const id = localStorage.getItem("redirectId");
    const link = localStorage.getItem("redirectLink");

    if (id) {
      history.replaceState(null, "", `/casino/${id}`);
    }

    if (link) {
      setTimeout(() => {
        const a = document.createElement("a");
        a.href = link;
        a.rel = "noopener noreferrer";
        a.style.display = "none";

        document.body.appendChild(a);
        a.click();
        a.remove();
      }, 900);
    } else {
      setTimeout(() => {
        window.location.replace("/index.html");
      }, 1000);
    }
  } catch {
    setTimeout(() => {
      window.location.replace("/index.html");
    }, 1000);
  }
}

setupRedirectIfNeeded();
