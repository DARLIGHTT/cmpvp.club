const API_BASE = "https://mctiers.com/api/v2";

// Gamemodes mapped to CDN icons with working fallbacks
const GAMEMODES = [
  { slug: "vanilla", name: "Vanilla", icon: "https://mctiers.com/assets/vanilla-e765507b.png" },
  { slug: "uhc",     name: "UHC",     icon: "https://mctiers.com/assets/uhc-f72be2cb.png" },
  { slug: "pot",     name: "Pot",     icon: "https://mctiers.com/assets/pot-334a17bd.png" },
  { slug: "nethop",  name: "NethOP",  icon: "https://mctiers.com/assets/nethop-7d045d6a.png" },
  { slug: "smp",     name: "SMP",     icon: "https://mctiers.com/assets/smp-9b2f32a2.png" },
  { slug: "sword",   name: "Sword",   icon: "https://mctiers.com/assets/sword-8647e3a9.png" },
  { slug: "axe",     name: "Axe",     icon: "https://mctiers.com/assets/axe-c3cbbfbd.png" }
];

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

// Fetch live overall rankings directly from MCTiers API v2
async function fetchLiveLeaderboard() {
  try {
    const response = await fetch(`${API_BASE}/mode/overall?count=25`);
    const players = await response.json();
    renderLiveRows(players);
  } catch (error) {
    console.error("Error fetching live MCTiers data:", error);
  }
}

function renderLiveRows(players) {
  const wrap = document.getElementById("rows");
  if (!wrap) return;

  wrap.innerHTML = players.map((p, index) => {
    const rank = index + 1;
    const title = getTitle(p.points);

    // Build tier badges dynamically from API rankings
    const tierBadgesHtml = GAMEMODES.map(mode => {
      const r = p.rankings ? p.rankings[mode.slug] : null;
      if (!r) return `<div class="badge badge-empty"></div>`;

      // pos 0 = High Tier (HT), pos 1 = Low Tier (LT)
      const posPrefix = r.pos === 0 ? "HT" : "LT";
      const label = `${posPrefix}${r.tier}`;
      const tierNumClass = `tier-${r.tier}`;

      return `
        <div class="badge ${tierNumClass}">
          <img src="${mode.icon}" class="badge-img-icon" alt="${mode.name}" onerror="this.style.display='none'">
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
            <svg class="title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2 3 7v10l9 5 9-5V7z"/></svg>
            ${title} <span class="player-points">(${p.points} points)</span>
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

fetchLiveLeaderboard();
