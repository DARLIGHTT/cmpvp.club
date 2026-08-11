const players = [
  { rank: 1, name: "Marlowww", title: "Combat Grandmaster (450 points)", region: "NA", tiers: ["HT1","HT1","HT1","HT1","HT1","HT1","LT1","LT1"] },
  { rank: 2, name: "ItzRealMe", title: "Combat Master (330 points)", region: "NA", tiers: ["HT3","HT1","HT1","HT1","HT1","LT2","LT2","LT2"] },
  { rank: 3, name: "coldified", title: "Combat Master (326 points)", region: "EU", tiers: ["LT1","LT3","HT1","HT1","LT1","LT1","LT1","LT2"] },
  { rank: 4, name: "Swight", title: "Combat Master (290 points)", region: "NA", tiers: ["LT3","HT1","HT1","HT1","HT2","LT2","LT2","LT2"] },
  { rank: 5, name: "janekv", title: "Combat Master (260 points)", region: "EU", tiers: ["LT3","HT4","HT1","HT1","HT1","HT2","LT2","LT2"] },
  { rank: 6, name: "BlvckWlf", title: "Combat Ace (226 points)", region: "EU", tiers: ["HT3","LT3","LT3","HT1","HT1","HT2","LT2","LT2"] },
  { rank: 7, name: "Kylaz", title: "Combat Ace (226 points)", region: "NA", tiers: ["HT3","LT3","LT3","HT1","HT1","HT1","LT2"] },
  { rank: 8, name: "ninorc15", title: "Combat Ace (196 points)", region: "EU", tiers: ["LT2","HT3","LT3","LT1","LT2","LT2","LT2"] },
  { rank: 9, name: "Lurrn", title: "Combat Ace (186 points)", region: "EU", tiers: ["LT3","LT4","HT1","HT1","HT2","LT2"] },
  { rank: 10, name: "Arsakha", title: "Combat Ace (177 points)", region: "ME", tiers: ["HT3","HT3","HT3","LT3","LT3","LT3","LT3","HT1"] }
];

function renderTable(data) {
  const tbody = document.getElementById("player-rows");
  tbody.innerHTML = "";

  data.forEach(p => {
    const row = document.createElement("tr");
    row.className = "player-row";

    let rankClass = "rank-box";
    if (p.rank === 1) rankClass += " rank-1";
    if (p.rank === 2) rankClass += " rank-2";
    if (p.rank === 3) rankClass += " rank-3";

    const badges = p.tiers.map(t => `<span class="badge ${t.startsWith('LT') ? 'lt' : ''}">${t}</span>`).join('');

    row.innerHTML = `
      <td><span class="${rankClass}">${p.rank}.</span></td>
      <td>
        <div class="profile">
          <img class="avatar" src="https://mc-heads.net/avatar/${p.name}" alt="${p.name}">
          <div class="name-box">
            <span class="p-name">${p.name}</span>
            <span class="p-title">${p.title}</span>
          </div>
        </div>
      </td>
      <td><span class="tag ${p.region}">${p.region}</span></td>
      <td><div class="badge-container">${badges}</div></td>
    `;
    tbody.appendChild(row);
  });
}

function filterPlayers() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = players.filter(p => p.name.toLowerCase().includes(query));
  renderTable(filtered);
}

renderTable(players);
