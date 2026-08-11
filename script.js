const players = [
  { rank: 1, name: "Marlowww", title: "Combat Grandmaster", points: 450, region: "NA", tiers: ["HT1", "HT1", "HT1", "HT1", "HT1", "HT1", "LT1", "LT1"] },
  { rank: 2, name: "ItzRealMe", title: "Combat Master", points: 330, region: "NA", tiers: ["HT3", "HT1", "HT1", "HT1", "HT1", "LT2", "LT2", "LT2"] },
  { rank: 3, name: "coldified", title: "Combat Master", points: 326, region: "EU", tiers: ["LT1", "LT3", "HT1", "HT1", "LT1", "LT1", "LT1", "LT2"] },
  { rank: 4, name: "Swight", title: "Combat Master", points: 290, region: "NA", tiers: ["LT3", "HT1", "HT1", "HT1", "HT2", "LT2", "LT2", "LT2"] },
  { rank: 5, name: "janekv", title: "Combat Master", points: 260, region: "EU", tiers: ["LT3", "HT4", "HT1", "HT1", "HT1", "HT2", "LT2", "LT2"] },
  { rank: 6, name: "BlvckWlf", title: "Combat Ace", points: 226, region: "EU", tiers: ["HT3", "LT3", "LT3", "HT1", "HT1", "HT2", "LT2", "LT2"] },
  { rank: 7, name: "Kylaz", title: "Combat Ace", points: 226, region: "NA", tiers: ["HT3", "LT3", "LT3", "HT1", "HT1", "HT1", "LT2"] },
  { rank: 8, name: "ninorc15", title: "Combat Ace", points: 196, region: "EU", tiers: ["LT2", "HT3", "LT3", "LT1", "LT2", "LT2", "LT2"] },
  { rank: 9, name: "Lurrn", title: "Combat Ace", points: 186, region: "EU", tiers: ["LT3", "LT4", "HT1", "HT1", "HT2", "LT2"] },
  { rank: 10, name: "Arsakha", title: "Combat Ace", points: 177, region: "ME", tiers: ["HT3", "HT3", "HT3", "LT3", "LT3", "LT3", "LT3", "HT1"] }
];

function renderPlayers(data) {
  const tableBody = document.getElementById("player-rows");
  tableBody.innerHTML = "";

  data.forEach(player => {
    const row = document.createElement("tr");
    row.className = "player-row";

    // Tier Badges HTML
    const badgesHtml = player.tiers.map(t => `
      <div class="tier-badge">
        <span class="tier-code ${t.startsWith('LT') ? 'lt' : ''}">${t}</span>
      </div>
    `).join('');

    // Banner color logic
    let rankClass = "rank-badge";
    if (player.rank === 1) rankClass += " rank-1";
    else if (player.rank === 2) rankClass += " rank-2";
    else if (player.rank === 3) rankClass += " rank-3";

    row.innerHTML = `
      <td><span class="${rankClass}">${player.rank}.</span></td>
      <td>
        <div class="player-cell">
          <img class="player-avatar" src="https://mc-heads.net/avatar/${player.name}" alt="${player.name}">
          <div class="player-details">
            <span class="player-name">${player.name}</span>
            <span class="player-subtitle">🛡️ ${player.title} (${player.points} points)</span>
          </div>
        </div>
      </td>
      <td><span class="region-badge region-${player.region}">${player.region}</span></td>
      <td><div class="tier-group">${badgesHtml}</div></td>
    `;

    tableBody.appendChild(row);
  });
}

// Search Filter Functionality
function filterPlayers() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = players.filter(p => p.name.toLowerCase().includes(query));
  renderPlayers(filtered);
}

// Initial render
renderPlayers(players);
