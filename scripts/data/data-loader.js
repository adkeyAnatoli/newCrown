import { SITE_ID } from '../config/config.js';
import { appState } from '../state/app-state.js';

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

export async function loadData() {
  if (!SITE_ID || SITE_ID === "YOUR_SITE_ID_HERE") {
    setupMockData();
    return;
  }
  
  try {
    const website = await fetchJson(
      `https://api.adkey-seo.com/api/website/get-website/${SITE_ID}`
    );
    appState.website = website;
    appState.offer = website?.offers?.[0] || null;
    const type = website?.website?.type;
    if (type) {
      try {
        appState.games = await fetchJson(
          `https://api.adkey-seo.com/api/website/get-games/${type}`
        );
      } catch (e) {
        console.warn("Failed to load games:", e);
        appState.games = [];
      }
    }
    
    
  } catch (e) {
    console.error("Data load failed, using mock data", e);
    setupMockData();
  }
}

function setupMockData() {
  appState.website = {
    website: { 
      type: "casino",
      country_name: "UK"
    },
    offers: [
      {
        id: 1,
        name: "",
        link: "",
        logo: "coral-logo.png",
        bonuses: {
          welcome_bonus: "£50 Bonus + 20 Free Spins",
          rate: "4.5/5",
          free_spins: 20,
          amount: "£50",
          wager: "35x"
        },
        wager: "35x",
        bonus_code: "WELCOME50"
      }
    ]
  };
  
  appState.offer = appState.website.offers[0];
  appState.games = [
    { id: 1, name: "Starburst", image: "starburst.jpg" },
    { id: 2, name: "Book of Dead", image: "book-of-dead.jpg" },
    { id: 3, name: "Gonzo's Quest", image: "gonzos-quest.jpg" },
    { id: 4, name: "Mega Moolah", image: "mega-moolah.jpg" }
  ];
  
  appState.payments = [
    { 
      name: "Visa", 
      image: "visa.png", 
      type: "Credit Card", 
      country: "Worldwide", 
      commission: "0%", 
      processing_time: "Instant", 
      min_dep: "£5" 
    }
  ];
  
  appState.providers = [
    { id: 1, name: "NetEnt" },
    { id: 2, name: "Playtech" },
    { id: 3, name: "Microgaming" },
    { id: 4, name: "Evolution Gaming" }
  ];
}
