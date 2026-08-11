// ============================================================
// Category tabs shown under the header
// ============================================================
const CATEGORIES = [
  { id: "overall", label: "Overall", icon: "trophy" },
  { id: "ltms",    label: "LTMs",    icon: "wand" },
  { id: "vanilla", label: "Vanilla", icon: "hexagon" },
  { id: "uhc",     label: "UHC",     icon: "heart" },
  { id: "pot",     label: "Pot",     icon: "flask" },
  { id: "nethop",  label: "NethOP",  icon: "disc" },
  { id: "smp",     label: "SMP",     icon: "target" },
  { id: "sword",   label: "Sword",   icon: "pen1" },
  { id: "axe",     label: "Axe",     icon: "pen2" },
  { id: "mace",    label: "Mace",    icon: "pin" },
];

// ============================================================
// Icon glyphs used inside tier badges (fixed column order,
// matches the reference: vial, skull, crystal ball, crossed
// swords, shield, bow, heart, potion bottle)
// ============================================================
const TIER_ICONS = ["🧪", "💀", "🔮", "⚔️", "🛡️", "🏹", "❤️", "🧴"];

// ============================================================
// Player rankings — Overall board
// tiers: array of tier labels in the order they are displayed.
// A value of null renders an empty / unranked slot.
// ============================================================
const PLAYERS = [
  {
    rank: 1,
    name: "Marlowww",
    region: "NA",
    title: "Combat Grandmaster",
    points: 450,
    tiers: ["HT1", "HT1", "HT1", "HT1", "HT1", "HT1", "LT1", "LT1"],
  },
  {
    rank: 2,
    name: "ItzRealMe",
    region: "NA",
    title: "Combat Master",
    points: 330,
    tiers: ["HT3", "HT1", "HT1", "HT1", "HT1", "LT2", "LT2", "LT2"],
  },
  {
    rank: 3,
    name: "coldified",
    region: "EU",
    title: "Combat Master",
    points: 326,
    tiers: ["LT1", "LT3", "HT1", "HT1", "LT1", "LT1", "LT1", "LT2"],
  },
  {
    rank: 4,
    name: "Swight",
    region: "NA",
    title: "Combat Master",
    points: 290,
    tiers: ["LT3", "HT1", "HT1", "HT1", "HT2", "LT2", "LT2", "LT2"],
  },
  {
    rank: 5,
    name: "janekv",
    region: "EU",
    title: "Combat Master",
    points: 260,
    tiers: ["LT3", "HT4", "HT1", "HT1", "HT1", "LT2", "LT2", "LT2"],
  },
  {
    rank: 6,
    name: "BlvckWlf",
    region: "EU",
    title: "Combat Ace",
    points: 226,
    tiers: ["HT3", "LT3", "LT3", "HT1", "HT1", "HT2", "HT2", "LT2"],
  },
  {
    rank: 6,
    name: "Kylaz",
    region: "NA",
    title: "Combat Ace",
    points: 226,
    tiers: ["HT3", "LT3", "LT3", "HT1", "HT1", "HT1", "LT2", null],
  },
  {
    rank: 8,
    name: "ninorc15",
    region: "EU",
    title: "Combat Ace",
    points: 196,
    tiers: ["LT2", "HT3", "LT3", "LT1", "LT2", "LT2", "LT2", "LT2"],
  },
  {
    rank: 9,
    name: "Lurrn",
    region: "EU",
    title: "Combat Ace",
    points: 186,
    tiers: ["LT3", "LT4", "HT1", "HT1", "HT2", "LT2", null, null],
  },
  {
    rank: 10,
    name: "Arsakha",
    region: "ME",
    title: "Combat Ace",
    points: 177,
    tiers: ["HT3", "HT3", "HT3", "LT3", "LT3", "LT3", "LT3", "HT1"],
  },
  {
    rank: 10,
    name: "yMiau",
    region: "EU",
    title: "Combat Ace",
    points: 177,
    tiers: ["HT3", "LT3", "HT3", "LT3", "LT3", "HT1", "LT1", "HT2"],
  },
];
