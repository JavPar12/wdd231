/*
  spotlights.js
  Loads data/members.json, keeps only Gold (3) and Silver (2) members,
  picks 2-3 of them at random, and renders spotlight cards.
  A different random set appears on every page load.
  Author: Luis Pardo — WDD 231
*/

const spotlightsGrid = document.querySelector("#spotlights-grid");

const TIER_LABELS = {
  3: { label: "Gold Member", className: "badge--gold" },
  2: { label: "Silver Member", className: "badge--silver" },
};

async function loadSpotlights() {
  spotlightsGrid.innerHTML = `<p class="state-message">Loading spotlights…</p>`;

  try {
    const response = await fetch("data/members.json");

    if (!response.ok) {
      throw new Error(`Network response was not ok (status ${response.status})`);
    }

    const data = await response.json();
    const eligible = data.members.filter((member) => member.membershipLevel >= 2);
    const chosen = pickRandom(eligible, 3);

    renderSpotlights(chosen);
  } catch (error) {
    spotlightsGrid.innerHTML = `<p class="state-message">Spotlights could not be loaded right now.</p>`;
    console.error("Failed to load spotlights:", error);
  }
}

// Fisher-Yates shuffle, then returns up to `count` items from the array.
function pickRandom(array, count) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy.slice(0, count);
}

function renderSpotlights(members) {
  spotlightsGrid.innerHTML = "";

  members.forEach((member) => {
    const tier = TIER_LABELS[member.membershipLevel];

    const card = document.createElement("article");
    card.className = "member-card";

    card.innerHTML = `
      <img class="member-card__logo" src="${member.image}" alt="${member.name} logo" width="64" height="64" loading="lazy">
      <div class="member-card__body">
        <div class="member-card__top">
          <div>
            <h3>${member.name}</h3>
            <p class="member-card__category">${member.category}</p>
          </div>
          <span class="badge ${tier.className}">${tier.label}</span>
        </div>
        <div class="member-card__meta">
          <span>${member.address}</span>
          <span>${member.phone}</span>
          <a href="${member.website}" target="_blank" rel="noopener">${member.website.replace(/^https?:\/\//, "")}</a>
        </div>
      </div>
    `;

    spotlightsGrid.appendChild(card);
  });
}

loadSpotlights();
