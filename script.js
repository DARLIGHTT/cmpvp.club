// Sample player data array
const players = [
  { rank: 1, name: "Marlowww", region: "NA", tiers: ["HT1", "HT1", "HT1", "LT1"] },
  { rank: 2, name: "ItzRealMe", region: "NA", tiers: ["HT3", "HT1", "HT1", "LT2"] },
  { rank: 3, name: "coldified", region: "EU", tiers: ["LT1", "LT3", "HT1", "LT1"] },
  { rank: 4, name: "Swight", region: "NA", tiers: ["LT3", "HT1", "HT2", "LT2"] },
  { rank: 5, name: "janekv", region: "EU", tiers: ["LT3", "HT4", "HT1", "HT1"] }
];

const tableBody = document.getElementById("player-rows");

players.forEach(player => {
  const row = document.createElement("tr");
  row.className = "player-row";

  // Generate tier badges HTML
  const badgesHtml = player.tiers.map(t => `<span class="badge ${t.includes('1') ? 'gold' : ''}">${t}</span>`).join('');

  row.innerHTML = `
    <td class="rank">#${player.rank}</td>
    <td>
      <div class="player-info">
        <img class="avatar" src="https://mc-heads.net/avatar/${player.name}" alt="${player.name}">
        <span class="player-name">${player.name}</span>
      </div>
    </td>
    <td><span class="region-tag ${player.region}">${player.region}</span></td>
    <td><div class="tier-badges">${badgesHtml}</div></td>
  `;

  tableBody.appendChild(row);
});
