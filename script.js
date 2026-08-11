// ============================================================
// Helpers
// ============================================================
function tierColorClass(label) {
  if (!label) return "";
  const n = label.slice(-1); // last char = tier number
  return "tier-" + n;
}

function rankBannerClass(rank) {
  if (rank === 1) return "rank-1";
  if (rank === 2) return "rank-2";
  if (rank === 3) return "rank-3";
  return "rank-other";
}

const CATEGORY_ICONS = {
  trophy:  '<path d="M8 21h8M12 17v4M6 4h12v4a6 6 0 0 1-12 0V4Z"/><path d="M6 6H3v1a4 4 0 0 0 3.5 4M18 6h3v1a4 4 0 0 1-3.5 4"/>',
  swords:  '<path d="m14.5 17.5 3 3L21 17l-3-3"/><path d="M3 21l7.5-7.5"/><path d="M13 4l3 3-9.5 9.5-3-3z"/><path d="m17 3 4 4-2 2-4-4z"/>',
  hexagon: '<path d="M12 2 3 7v10l9 5 9-5V7z"/>',
  heart:   '<path d="M12 21s-7-4.35-9.5-8.5C.5 8.5 3 5 6.5 5 9 5 11 7 12 8c1-1 3-3 5.5-3C21 5 23.5 8.5 21.5 12.5 19 16.65 12 21 12 21Z"/>',
  potion:  '<path d="M9 2h6M10 2v5l-4.5 8A3 3 0 0 0 8.1 20h7.8a3 3 0 0 0 2.6-4.5L14 7V2"/>',
  skull:   '<circle cx="12" cy="11" r="7"/><path d="M9 18v2M15 18v2M9.5 11h.01M14.5 11h.01"/>',
  ring:    '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>',
  sword:   '<path d="m14.5 4.5 5 5L9 20l-4 1 1-4z"/><path d="m14.5 4.5 2-2 3 3-2 2"/>',
  axe:     '<path d="M6 21 17 10a4 4 0 1 0-3-3L3 18l3 3Z"/>',
  mace:    '<circle cx="12" cy="6" r="3"/><path d="M12 9v13"/>',
};

function iconSVG(name) {
  return `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${CATEGORY_ICONS[name] || ""}</svg>`;
}

// ============================================================
// Render category tabs
// ============================================================
function renderTabs() {
  const wrap = document.getElementById("tabs");
  wrap.innerHTML = CATEGORIES.map((cat, i) => `
    <button class="tab ${i === 0 ? "active" : ""}" data-id="${cat.id}">
      ${iconSVG(cat.icon)}
      <span>${cat.label}</span>
    </button>
  `).join("");

  wrap.querySelectorAll(".tab").forEach(btn => {
    btn.addEventListener("click", () => {
      wrap.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
}

// ============================================================
// Render a single tier badge
// ============================================================
function renderBadge(label, index) {
  if (!label) {
    return `<div class="badge badge-empty"></div>`;
  }
  const icon = TIER_ICONS[index % TIER_ICONS.length];
  return `
    <div class="badge ${tierColorClass(label)}">
      <span class="badge-icon">${icon}</span>
      <span class="badge-label">${label}</span>
    </div>
  `;
}

// ============================================================
// Render player rows
// ============================================================
function renderRows() {
  const wrap = document.getElementById("rows");
  wrap.innerHTML = PLAYERS.map(p => `
    <div class="row">
      <div class="col col-rank">
        <div class="rank-banner ${rankBannerClass(p.rank)}">
          <span class="rank-num">${p.rank}.</span>
        </div>
        <img class="avatar" src="https://mc-heads.net/avatar/${encodeURIComponent(p.name)}/64" alt="${p.name}" loading="lazy">
      </div>

      <div class="col col-player">
        <div class="player-name">${p.name}</div>
        <div class="player-title">
          <svg class="title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2 3 7v10l9 5 9-5V7z"/></svg>
          ${p.title} <span class="player-points">(${p.points} points)</span>
        </div>
      </div>

      <div class="col col-region">
        <span class="region-badge region-${p.region}">${p.region}</span>
      </div>

      <div class="col col-tiers">
        ${p.tiers.map((t, i) => renderBadge(t, i)).join("")}
      </div>
    </div>
  `).join("");
}

renderTabs();
renderRows();
