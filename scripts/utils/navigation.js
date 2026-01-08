export function navigateToOffer(id, link) {
  localStorage.setItem("redirectLink", link);
  localStorage.setItem("redirectId", id);

  window.open("/casino.html", "_blank", "noopener");
}

export function setupRedirectIfNeeded() {
  const path = location.pathname;

  const isCasinoPage = path.endsWith("casino.html") || path.includes("/casino/");
  if (!isCasinoPage) return;

  try {
    const id = localStorage.getItem("redirectId");
    const link = localStorage.getItem("redirectLink");

    if (id) {
      history.replaceState(null, "", `/casino/${id}`);
    }

    if (link) {
      setTimeout(() => {
        window.location.replace(link);
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
