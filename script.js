const API_BASE = "https://mctiers.com/api/v2";

// Gamemodes mapped to your SVG URLs
const GAMEMODES = [
  { slug: "vanilla", name: "Vanilla", icon: "https://trtiers.club/site/tier_icons/vanilla.svg" },
  { slug: "uhc",     name: "UHC",     icon: "https://trtiers.club/site/tier_icons/uhc.svg" },
  { slug: "pot",     name: "Pot",     icon: "https://trtiers.club/site/tier_icons/smp.svg" },
  { slug: "nethop",  name: "NethOP",  icon: "https://trtiers.club/site/tier_icons/nethop.svg" },
  { slug: "smp",     name: "SMP",     icon: "https://trtiers.club/site/tier_icons/mace.svg" },
  { slug: "sword",   name: "Sword",   icon: "https://trtiers.club/site/tier_icons/sword.svg" },
  { slug: "axe",     name: "Axe",     icon: "https://trtiers.club/site/tier_icons/axe.svg" }
];

let globalPlayersData = [];

function getTitle(points) {
  if (points >= 400) return "Combat Grandmaster";
  if (points >= 250) return "Combat Master";
  if (points >= 150) return "Combat Ace";
  return "Combat Specialist";
}

function rankBannerClass(rank) {
  if (rank === 1) return "rank-1";
  if (rank === 2) return "rank-2";
  if (rank === 3) return "rank-3";
  return "rank-other";
}

function renderTabs() {
  const wrap = document.getElementById("tabs");
  if (!wrap) return;

  const categories = [
    { label: "Overall", icon: "https://trtiers.club/site/tier_icons/overall.svg" },
    ...GAMEMODES
  ];

  wrap.innerHTML = categories.map((cat, i) => `
    <button class="tab ${i === 0 ? "active" : ""}">
      <img src="${cat.icon}" class="tab-img-icon" alt="${cat.name || cat.label}">
      <span>${cat.name || cat.label}</span>
    </button>
  `).join("");
}

async function fetchLiveLeaderboard() {
  try {
    const response = await fetch(`${API_BASE}/mode/overall?count=25`);
    globalPlayersData = await response.json();
    renderLiveRows(globalPlayersData);
  } catch (error) {
    console.error("Error fetching MCTiers API:", error);
  }
}

function renderLiveRows(players) {
  const wrap = document.getElementById("rows");
  if (!wrap) return;

  wrap.innerHTML = players.map((p, index) => {
    const rank = index + 1;
    const title = getTitle(p.points);

    const tierBadgesHtml = GAMEMODES.map(mode => {
      const r = p.rankings ? p.rankings[mode.slug] : null;
      if (!r) return `<div class="badge badge-empty"></div>`;

      const posPrefix = r.pos === 0 ? "HT" : "LT";
      const label = `${posPrefix}${r.tier}`;
      const tierNumClass = `tier-${r.tier}`;

      return `
        <div class="badge ${tierNumClass}">
          <img src="${mode.icon}" class="badge-img-icon" alt="${mode.name}">
          <span class="badge-label">${label}</span>
        </div>
      `;
    }).join("");

    return `
      <div class="row">
        <div class="col col-rank">
          <div class="rank-card ${rankBannerClass(rank)}">
            <span class="rank-num">${rank}.</span>
            <img class="avatar" src="https://mc-heads.net/avatar/${encodeURIComponent(p.name)}/64" alt="${p.name}" loading="lazy">
          </div>
        </div>

        <div class="col col-player">
          <div class="player-name">${p.name}</div>
          <div class="player-title">
            🛡️ ${title} <span class="player-points">(${p.points} points)</span>
          </div>
        </div>

        <div class="col col-region">
          <span class="region-badge region-${p.region || 'NA'}">${p.region || 'NA'}</span>
        </div>

        <div class="col col-tiers">
          ${tierBadgesHtml}
        </div>
      </div>
    `;
  }).join("");
}

function filterPlayers() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = globalPlayersData.filter(p => p.name.toLowerCase().includes(query));
  renderLiveRows(filtered);
}

renderTabs();
fetchLiveLeaderboard();
