/*
  directory.js
  Loads member data from data/members.json and renders it as either a
  grid of cards or a one-column list. Also handles the mobile nav toggle
  and the auto-generated footer dates.
  Author: Luis Pardo — WDD 231
*/

const MEMBER_LIST = document.querySelector("#member-list");
const GRID_BUTTON = document.querySelector("#view-grid");
const LIST_BUTTON = document.querySelector("#view-list");
const MEMBER_COUNT = document.querySelector("#member-count");

// Maps the numeric membership level from the JSON to a display label
// and a CSS modifier class for the tier badge.
const TIER_LABELS = {
  3: { label: "Gold Member", className: "badge--gold" },
  2: { label: "Silver Member", className: "badge--silver" },
  1: { label: "Member", className: "badge--member" },
};

// Fetches the member directory and kicks off the initial render.
async function loadMembers() {
  MEMBER_LIST.innerHTML = `<p class="state-message">Loading member directory…</p>`;

  try {
    const response = await fetch("data/members.json");

    if (!response.ok) {
      throw new Error(`Network response was not ok (status ${response.status})`);
    }

    const data = await response.json();
    renderMembers(data.members);
  } catch (error) {
    MEMBER_LIST.innerHTML = `<p class="state-message">Sorry, the member directory could not be loaded right now.</p>`;
    console.error("Failed to load members.json:", error);
  }
}

// Builds one <article> card per member and injects them into the DOM.
function renderMembers(members) {
  MEMBER_LIST.innerHTML = "";

  members.forEach((member) => {
    const tier = TIER_LABELS[member.membershipLevel] ?? TIER_LABELS[1];

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
        <p class="member-card__tagline">${member.tagline}</p>
        <div class="member-card__meta">
          <span>${member.address}</span>
          <span>${member.phone}</span>
          <a href="${member.website}" target="_blank" rel="noopener">${stripProtocol(member.website)}</a>
        </div>
      </div>
    `;

    MEMBER_LIST.appendChild(card);
  });

  MEMBER_COUNT.textContent = `${members.length} member businesses`;
}

// Removes "https://" from a URL for a cleaner on-card display.
function stripProtocol(url) {
  return url.replace(/^https?:\/\//, "");
}

// Toggles between the grid and one-column list layouts, and keeps the
// two buttons' aria-pressed state in sync for accessibility.
function setView(view) {
  const isGrid = view === "grid";
  MEMBER_LIST.classList.toggle("layout-list", !isGrid);
  GRID_BUTTON.setAttribute("aria-pressed", String(isGrid));
  LIST_BUTTON.setAttribute("aria-pressed", String(!isGrid));
}

GRID_BUTTON.addEventListener("click", () => setView("grid"));
LIST_BUTTON.addEventListener("click", () => setView("list"));

// Mobile navigation toggle: expands/collapses the nav list under the header.
const navToggle = document.querySelector("#nav-toggle");
const primaryNav = document.querySelector("#primary-nav");

navToggle.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Auto-generated footer info: current year and this document's last
// modification date, both pulled straight from the browser.
document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = document.lastModified;

loadMembers();
