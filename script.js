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

// Lucide-style line icons, hand-matched to the reference screenshots
const CATEGORY_ICONS = {
  trophy:   '<path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M7 5H4a1 1 0 0 0-1 1v1a4 4 0 0 0 4 4"/><path d="M17 5h3a1 1 0 0 1 1 1v1a4 4 0 0 1-4 4"/>',
  wand:     '<path d="m5 19 13-13"/><path d="M13 4h.01"/><path d="M19 10h.01"/><path d="M17 4.5 18 6l1.5 1"/><path d="M4 15l-.5-1.5L2 13"/><path d="M8 4v2M7 5H9"/>',
  hexagon:  '<path d="M12 2 3.5 7v10L12 22l8.5-5V7Z"/>',
  heart:    '<path d="M12 20s-6.5-4.1-9-8.1C1.2 8.6 3 5 6.4 5c1.9 0 3.5 1.1 4.6 2.7C12.1 6.1 13.7 5 15.6 5 19 5 20.8 8.6 19 11.9c-2.5 4-7 8.1-7 8.1Z"/>',
  flask:    '<path d="M9 2h6"/><path d="M10 2v6.2L4.8 17a2.5 2.5 0 0 0 2.1 3.9h10.2a2.5 2.5 0 0 0 2.1-3.9L14 8.2V2"/><path d="M8 15h8"/>',
  disc:     '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/>',
  target:   '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>',
  pen1:     '<path d="m18 4 2 2-11 11-3 1 1-3Z"/><path d="M15 7l2 2"/>',
  pen2:     '<path d="m19 5 0 0a2.5 2.5 0 0 1 0 3.5L8.5 19 4 20l1-4.5L15.5 5a2.5 2.5 0 0 1 3.5 0Z"/>',
  pin:      '<path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.3"/>',
  home:     '<path d="m3 10.5 9-7.5 9 7.5"/><path d="M5 9.5V21h14V9.5"/>',
  infinity: '<path d="M18.2 8.6a4.9 4.9 0 0 0-6.2 0L12 8.7l-.1-.1a4.9 4.9 0 1 0 0 6.9l.1-.1.1.1a4.9 4.9 0 1 0 6.1-6.9Z"/>',
  file:     '<path d="M6 2h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z"/><path d="M15 2v5h5"/>',
};

function iconSVG(name, cls) {
  return `<svg class="${cls || "nav-icon"}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${CATEGORY_ICONS[name] || ""}</svg>`;
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
        <div class="rank-card ${rankBannerClass(p.rank)}">
          <span class="rank-num">${p.rank}.</span>
          <img class="avatar" src="https://mc-heads.net/avatar/${encodeURIComponent(p.name)}/64" alt="${p.name}" loading="lazy">
        </div>
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
