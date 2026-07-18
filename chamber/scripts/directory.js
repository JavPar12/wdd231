/*
  directory.js
  Chamber directory page only. Fetches data/members.json and renders it
  as a grid or a one-column list. Hamburger nav and footer dates are
  handled by the shared scripts/navigation.js and scripts/date.js.
  Author: Luis Pardo — WDD 231
*/

const memberList = document.getElementById("member-list");
const gridButton = document.getElementById("view-grid");
const listButton = document.getElementById("view-list");
const memberCount = document.getElementById("member-count");

// Maps the numeric membership level from members.json to a label
// and a CSS modifier class for the tier badge.
const tierLabels = {
  3: { label: "Gold Member", className: "badge--gold" },
  2: { label: "Silver Member", className: "badge--silver" },
  1: { label: "Member", className: "badge--member" },
};

// Fetches the member directory and triggers the first render.
async function loadMembers() {
  memberList.innerHTML = `<p class="state-message">Loading member directory…</p>`;

  try {
    const response = await fetch("data/members.json");

    if (!response.ok) {
      throw new Error(`Network response was not ok (status ${response.status})`);
    }

    const data = await response.json();
    renderMembers(data.members);
  } catch (error) {
    memberList.innerHTML = `<p class="state-message">Sorry, the member directory could not be loaded right now.</p>`;
    console.error("Failed to load members.json:", error);
  }
}

// Builds one member card per business and injects them into the DOM.
function renderMembers(members) {
  memberList.innerHTML = "";

  members.forEach((member) => {
    const tier = tierLabels[member.membershipLevel] ?? tierLabels[1];

    const card = document.createElement("article");
    card.className = "member-card";

    card.innerHTML = `
      <img class="member-card__logo" src="${member.image}" alt="${member.name} logo" width="60" height="60" loading="lazy">
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

    memberList.appendChild(card);
  });

  memberCount.textContent = `${members.length} member businesses`;
}

// Removes "https://" from a URL for a cleaner on-card display.
function stripProtocol(url) {
  return url.replace(/^https?:\/\//, "");
}

// Toggles between the grid and one-column list layouts, keeping the
// two buttons' aria-pressed state in sync for accessibility.
function setView(view) {
  const isGrid = view === "grid";
  memberList.classList.toggle("layout-list", !isGrid);
  gridButton.setAttribute("aria-pressed", String(isGrid));
  listButton.setAttribute("aria-pressed", String(!isGrid));
}

gridButton.addEventListener("click", () => setView("grid"));
listButton.addEventListener("click", () => setView("list"));

loadMembers();
