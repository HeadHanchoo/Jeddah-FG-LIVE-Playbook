const roster = [
  { name: "Bassam Barak", number: "0", offense: ["Wide receiver"], defense: ["Blitzer", "Coverage"] },
  { name: "Jordan Arnold", number: "3", offense: ["QB 1", "Receiver"], defense: ["Coverage", "Safety"] },
  { name: "Sean McKee", number: "7", offense: ["QB 1", "Receiver"], defense: ["Coverage", "Safety"] },
  {
    name: "Omar Mujahid",
    number: "8",
    offense: ["QB 2", "Slot receiver", "Center"],
    defense: ["Coverage"],
    badge: "Captain",
  },
  { name: "Daniel Relihan", number: "11", offense: ["QB 2", "Receiver"], defense: ["Coverage", "Safety"] },
  { name: "Ali Bahattab", number: "12", offense: ["Wide receiver"], defense: ["Coverage", "Safety"] },
  { name: "Ahmed Emad", number: "33", offense: ["Slot receiver", "Center"], defense: ["Blitzer", "Coverage"] },
  { name: "Aser Nour", number: "91", offense: ["Slot receiver", "Center"], defense: ["Coverage"] },
];

const firebaseConfig = {
  apiKey: "AIzaSyA4tqQU6AfYpSYtYVgpOUAmLS0WfeKeRGU",
  authDomain: "jft-playbook.firebaseapp.com",
  projectId: "jft-playbook",
  storageBucket: "jft-playbook.firebasestorage.app",
  messagingSenderId: "370965370644",
  appId: "1:370965370644:web:0eee5265ac774800a09401",
};

const customPlaysCollection = "customPlays";

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const formationBases = {
  singleBack: [
    ["Q", 128, 110],
    ["C", 92, 110],
    ["X", 92, 48],
    ["Y", 92, 172],
    ["B", 118, 145],
  ],
  spread: [
    ["Q", 128, 110],
    ["C", 92, 110],
    ["X", 92, 35],
    ["Y", 92, 82],
    ["Z", 92, 185],
  ],
  bunch: [
    ["Q", 128, 110],
    ["C", 92, 110],
    ["X", 94, 82],
    ["Y", 114, 102],
    ["Z", 94, 135],
  ],
  trips: [
    ["Q", 128, 110],
    ["C", 92, 110],
    ["X", 92, 42],
    ["Y", 92, 84],
    ["Z", 92, 126],
  ],
  tripsStack: [
    ["Q", 128, 110],
    ["C", 92, 110],
    ["X", 92, 50],
    ["Y", 110, 50],
    ["Z", 92, 150],
  ],
  twins: [
    ["Q", 128, 110],
    ["C", 92, 110],
    ["X", 92, 45],
    ["Y", 92, 82],
    ["Z", 92, 176],
  ],
  twinsStack: [
    ["Q", 128, 110],
    ["C", 92, 110],
    ["X", 92, 48],
    ["Y", 110, 48],
    ["Z", 92, 174],
  ],
  iFormation: [
    ["Q", 128, 110],
    ["C", 92, 110],
    ["X", 92, 45],
    ["Y", 92, 176],
    ["B", 156, 110],
  ],
  doubleBack: [
    ["Q", 128, 110],
    ["C", 92, 110],
    ["L", 152, 78],
    ["R", 152, 142],
    ["X", 92, 45],
  ],
  singleSet: [
    ["Q", 128, 110],
    ["C", 92, 110],
    ["X", 92, 56],
    ["Y", 92, 164],
    ["B", 122, 110],
  ],
  defense: [
    ["R", 142, 110],
    ["M", 205, 110],
    ["C", 242, 56],
    ["S", 286, 110],
    ["C", 242, 164],
  ],
};

const routeSets = {
  formation: {},
  out: { X: [[150, 35], [180, 20]], Y: [[152, 82], [178, 82]], Z: [[155, 185], [180, 198]], C: [[132, 110], [158, 110]] },
  slants: { X: [[160, 35], [215, 86]], Y: [[160, 82], [218, 122]], Z: [[160, 185], [220, 130]], C: [[138, 110], [172, 110]] },
  flood: { X: [[160, 48], [235, 36]], Y: [[150, 172], [202, 132], [250, 132]], B: [[150, 145], [205, 174]], C: [[132, 110], [164, 110]] },
  mesh: { X: [[154, 48], [224, 112]], Y: [[154, 172], [224, 108]], B: [[148, 145], [190, 145]], C: [[132, 110], [165, 110]] },
  cornerPost: { X: [[152, 48], [202, 26], [260, 82]], Y: [[150, 172], [214, 136], [252, 70]], B: [[150, 145], [202, 166]], C: [[132, 110], [160, 110]] },
  verts: { X: [[155, 35], [280, 35]], Y: [[155, 82], [268, 82]], Z: [[155, 185], [280, 185]], C: [[132, 110], [170, 110]] },
  levels: { X: [[152, 35], [215, 35]], Y: [[152, 82], [208, 118]], Z: [[152, 185], [232, 145]], C: [[132, 110], [168, 110]] },
  bunchCross: { X: [[144, 82], [220, 150]], Y: [[150, 102], [230, 72]], Z: [[142, 135], [196, 135]], C: [[132, 110], [160, 110]] },
  bunchWheel: { X: [[142, 82], [180, 62], [260, 62]], Y: [[150, 102], [205, 132]], Z: [[142, 135], [178, 170], [250, 170]], C: [[132, 110], [160, 110]] },
  switch: { X: [[152, 42], [218, 126]], Y: [[152, 84], [218, 48]], Z: [[152, 126], [238, 126]], C: [[132, 110], [166, 110]] },
  stack: { X: [[152, 50], [242, 34]], Y: [[164, 50], [218, 96]], Z: [[152, 150], [222, 150]], C: [[132, 110], [160, 110]] },
  comeback: { X: [[152, 45], [230, 45], [205, 60]], Y: [[152, 82], [210, 82]], Z: [[152, 176], [218, 150]], C: [[132, 110], [162, 110]] },
  wheel: { X: [[152, 45], [198, 76], [266, 76]], Y: [[152, 82], [224, 122]], Z: [[152, 176], [220, 176]], C: [[132, 110], [164, 110]] },
  hbDive: { B: [[160, 145], [230, 145]], Q: [[110, 110], [146, 145]], C: [[120, 110], [152, 110]] },
  crossbuck: { B: [[154, 145], [190, 112], [242, 112]], Q: [[110, 110], [150, 145]], X: [[120, 45], [160, 80]], Y: [[120, 176], [160, 140]] },
  reverse: { Z: [[132, 185], [92, 145], [180, 70], [265, 70]], Q: [[110, 110], [132, 185]], C: [[122, 110], [156, 110]] },
  doubleReverse: { X: [[132, 35], [92, 92], [156, 162]], Z: [[132, 185], [100, 145], [158, 92], [265, 92]], Q: [[110, 110], [132, 185]] },
  option: { Q: [[154, 110], [214, 110], [256, 84]], B: [[156, 145], [222, 160]], X: [[152, 45], [240, 45]], Y: [[152, 176], [235, 176]] },
};

function makePlay(title, group, formation, routes = "formation", note = "Base look") {
  return { title, group, formation, routes: routeSets[routes] || routeSets.formation, note };
}

const playbookSections = [
  {
    title: "Route Tree",
    category: "Routes",
    description: "Core route language for Jeddah receivers.",
    plays: [
      makePlay("Route Tree 0-5", "Route Tree", "spread", "levels", "Hitch, slant, out, post, corner, fly"),
      makePlay("Route Tree 6-9", "Route Tree", "spread", "cornerPost", "Option, stop-go, post-corner, chair"),
    ],
  },
  {
    title: "Single Back",
    category: "Pass Game",
    description: "Balanced set with one back available for run action or late release.",
    plays: [
      makePlay("Single Back Formation", "Single Back", "singleBack", "formation", "Base alignment"),
      makePlay("Single Back Play 1", "Single Back", "singleBack", "flood", "Flood the right sideline"),
      makePlay("Single Back Play 2", "Single Back", "singleBack", "mesh", "Crossing mesh underneath"),
      makePlay("Single Back Play 3", "Single Back", "singleBack", "cornerPost", "High-low shot concept"),
    ],
  },
  {
    title: "Spread",
    category: "Pass Game",
    description: "Wide spacing to create one-on-one matchups.",
    plays: [
      makePlay("Spread Formation", "Spread", "spread", "formation", "Base alignment"),
      makePlay("Spread Play 1", "Spread", "spread", "slants", "Quick inside rhythm"),
      makePlay("Spread Play 2", "Spread", "spread", "levels", "Layered middle read"),
      makePlay("Spread Play 3", "Spread", "spread", "verts", "Vertical stretch"),
    ],
  },
  {
    title: "Bunch",
    category: "Pass Game",
    description: "Compressed releases built for picks, rubs, and quick separation.",
    plays: [
      makePlay("Bunch Formation", "Bunch", "bunch", "formation", "Base alignment"),
      makePlay("Bunch Play 1", "Bunch", "bunch", "bunchCross", "Cross and sit"),
      makePlay("Bunch Play 2", "Bunch", "bunch", "bunchWheel", "Wheel from the cluster"),
      makePlay("Bunch Play 3", "Bunch", "bunch", "mesh", "Fast crossing traffic"),
    ],
  },
  {
    title: "Trips",
    category: "Pass Game",
    description: "Three-receiver surface to stress one side of the defense.",
    plays: [
      makePlay("Trips Formation", "Trips", "trips", "formation", "Base alignment"),
      makePlay("Trips Play 1", "Trips", "trips", "switch", "Switch release"),
      makePlay("Trips Play 2", "Trips", "trips", "levels", "Levels to the trips side"),
      makePlay("Trips Play 3", "Trips", "trips", "verts", "Three verticals"),
    ],
  },
  {
    title: "Trips Stack",
    category: "Pass Game",
    description: "Stacked releases for free access off the line.",
    plays: [
      makePlay("Trips Stack Formation", "Trips Stack", "tripsStack", "formation", "Base alignment"),
      makePlay("Trips Stack Play 1", "Trips Stack", "tripsStack", "stack", "Stack clear-out"),
      makePlay("Trips Stack Play 2", "Trips Stack", "tripsStack", "switch", "Stack switch"),
      makePlay("Trips Stack Play 3", "Trips Stack", "tripsStack", "cornerPost", "Post-corner shot"),
    ],
  },
  {
    title: "Twins",
    category: "Pass Game",
    description: "Two-receiver side with backside isolation.",
    plays: [
      makePlay("Twins Formation", "Twins", "twins", "formation", "Base alignment"),
      makePlay("Twins Play 1", "Twins", "twins", "comeback", "Comeback and dig"),
      makePlay("Twins Play 2", "Twins", "twins", "wheel", "Wheel pressure"),
      makePlay("Twins Play 3", "Twins", "twins", "slants", "Fast slant window"),
    ],
  },
  {
    title: "Twins Stack",
    category: "Pass Game",
    description: "Stacked twins with a backside outlet.",
    plays: [
      makePlay("Twins Stack Formation", "Twins Stack", "twinsStack", "formation", "Base alignment"),
      makePlay("Twins Stack Play 1", "Twins Stack", "twinsStack", "stack", "Free release stack"),
      makePlay("Twins Stack Play 2", "Twins Stack", "twinsStack", "mesh", "Stack mesh"),
      makePlay("Twins Stack Play 3", "Twins Stack", "twinsStack", "levels", "Layered read"),
    ],
  },
  {
    title: "I Formation",
    category: "Pass Game",
    description: "Backfield depth for option looks and play action.",
    plays: [
      makePlay("I Formation", "I Formation", "iFormation", "formation", "Base alignment"),
      makePlay("I Formation Play 1", "I Formation", "iFormation", "flood", "Play-action flood"),
      makePlay("I Formation Play 2", "I Formation", "iFormation", "option", "Run-pass option look"),
      makePlay("I Formation Play 3", "I Formation", "iFormation", "cornerPost", "Backfield shot"),
    ],
  },
  {
    title: "Double Back",
    category: "Pass Game",
    description: "Two-back set for motion, misdirection, and option pressure.",
    plays: [
      makePlay("Double Back Set", "Double Back", "doubleBack", "formation", "Base alignment"),
      makePlay("Double Back Play 1", "Double Back", "doubleBack", "hbDive", "Inside run action"),
      makePlay("Double Back Play 2", "Double Back", "doubleBack", "crossbuck", "Cross action"),
      makePlay("Double Back Play 3", "Double Back", "doubleBack", "option", "Option edge read"),
    ],
  },
  {
    title: "Single Set",
    category: "Pass Game",
    description: "Simple alignment for fast huddle calls.",
    plays: [
      makePlay("Single Set Formation", "Single Set", "singleSet", "formation", "Base alignment"),
      makePlay("Single Set Play 1", "Single Set", "singleSet", "out", "Quick outs"),
      makePlay("Single Set Play 2", "Single Set", "singleSet", "slants", "Slant window"),
      makePlay("Single Set Play 3", "Single Set", "singleSet", "mesh", "Crossing answer"),
    ],
  },
  {
    title: "Run Plays",
    category: "Run Game",
    description: "Misdirection and option calls for the 5v5 run game.",
    plays: [
      makePlay("HB Dive", "Run Plays", "singleBack", "hbDive", "Direct downhill handoff"),
      makePlay("Crossbuck", "Run Plays", "singleBack", "crossbuck", "Crossing backfield action"),
      makePlay("End Around", "Run Plays", "spread", "reverse", "Receiver sweep"),
      makePlay("Reverse", "Run Plays", "spread", "reverse", "Reverse handoff"),
      makePlay("Double Reverse", "Run Plays", "spread", "doubleReverse", "Second exchange"),
      makePlay("Fake Double Reverse", "Run Plays", "spread", "doubleReverse", "Sell second exchange"),
      makePlay("Fake Triple Reverse", "Run Plays", "spread", "doubleReverse", "Layered misdirection"),
      makePlay("HB Option", "Run Plays", "singleBack", "option", "Back has pass-run choice"),
      makePlay("QB Option", "Run Plays", "singleBack", "option", "Quarterback edge read"),
    ],
  },
  {
    title: "Defensive Coverages",
    category: "Defense",
    description: "Clean defensive shells for team communication.",
    plays: [
      makePlay("Man", "Defensive Coverages", "defense", "formation", "Match and rush"),
      makePlay("Cover 1", "Defensive Coverages", "defense", "formation", "One deep safety"),
      makePlay("Cover 2", "Defensive Coverages", "defense", "formation", "Two deep halves"),
      makePlay("Cover 3", "Defensive Coverages", "defense", "formation", "Three deep thirds"),
      makePlay("Cover 4", "Defensive Coverages", "defense", "formation", "Four deep quarters"),
    ],
  },
];

const croppedPlaybookSections = [
  {
    title: "Route Tree",
    category: "Routes",
    description: "Core route language for Jeddah receivers.",
    plays: [
      { page: 3, title: "Route Tree 0-5", group: "Route Tree", note: "Hitch, slant, out, post, corner, fly" },
      { page: 4, title: "Route Tree 6-9", group: "Route Tree", note: "Option, stop-go, post-corner, chair" },
    ],
  },
  {
    title: "Single Back",
    category: "Pass Game",
    description: "Balanced set with one back available for run action or late release.",
    plays: [
      { page: 6, title: "Single Back Formation", group: "Single Back", note: "Base alignment" },
      { page: 7, title: "Single Back Play 1", group: "Single Back", note: "Captain's diagram" },
      { page: 8, title: "Single Back Play 2", group: "Single Back", note: "Captain's diagram" },
      { page: 9, title: "Single Back Play 3", group: "Single Back", note: "Captain's diagram" },
    ],
  },
  {
    title: "Spread",
    category: "Pass Game",
    description: "Wide spacing to create one-on-one matchups.",
    plays: [
      { page: 10, title: "Spread Formation", group: "Spread", note: "Base alignment" },
      { page: 11, title: "Spread Play 1", group: "Spread", note: "Captain's diagram" },
      { page: 12, title: "Spread Play 2", group: "Spread", note: "Captain's diagram" },
      { page: 13, title: "Spread Play 3", group: "Spread", note: "Captain's diagram" },
    ],
  },
  {
    title: "Bunch",
    category: "Pass Game",
    description: "Compressed releases built for picks, rubs, and quick separation.",
    plays: [
      { page: 14, title: "Bunch Formation", group: "Bunch", note: "Base alignment" },
      { page: 15, title: "Bunch Play 1", group: "Bunch", note: "Captain's diagram" },
      { page: 16, title: "Bunch Play 2", group: "Bunch", note: "Captain's diagram" },
      { page: 17, title: "Bunch Play 3", group: "Bunch", note: "Captain's diagram" },
    ],
  },
  {
    title: "Trips",
    category: "Pass Game",
    description: "Three-receiver surface to stress one side of the defense.",
    plays: [
      { page: 18, title: "Trips Formation", group: "Trips", note: "Base alignment" },
      { page: 19, title: "Trips Play 1", group: "Trips", note: "Captain's diagram" },
      { page: 20, title: "Trips Play 2", group: "Trips", note: "Captain's diagram" },
      { page: 21, title: "Trips Play 3", group: "Trips", note: "Captain's diagram" },
    ],
  },
  {
    title: "Trips Stack",
    category: "Pass Game",
    description: "Stacked releases for free access off the line.",
    plays: [
      { page: 22, title: "Trips Stack Formation", group: "Trips Stack", note: "Base alignment" },
      { page: 23, title: "Trips Stack Play 1", group: "Trips Stack", note: "Captain's diagram" },
      { page: 24, title: "Trips Stack Play 2", group: "Trips Stack", note: "Captain's diagram" },
      { page: 25, title: "Trips Stack Play 3", group: "Trips Stack", note: "Captain's diagram" },
    ],
  },
  {
    title: "Twins",
    category: "Pass Game",
    description: "Two-receiver side with backside isolation.",
    plays: [
      { page: 26, title: "Twins Formation", group: "Twins", note: "Base alignment" },
      { page: 27, title: "Twins Play 1", group: "Twins", note: "Captain's diagram" },
      { page: 28, title: "Twins Play 2", group: "Twins", note: "Captain's diagram" },
      { page: 29, title: "Twins Play 3", group: "Twins", note: "Captain's diagram" },
    ],
  },
  {
    title: "Twins Stack",
    category: "Pass Game",
    description: "Stacked twins with a backside outlet.",
    plays: [
      { page: 30, title: "Twins Stack Formation", group: "Twins Stack", note: "Base alignment" },
      { page: 31, title: "Twins Stack Play 1", group: "Twins Stack", note: "Captain's diagram" },
      { page: 32, title: "Twins Stack Play 2", group: "Twins Stack", note: "Captain's diagram" },
      { page: 33, title: "Twins Stack Play 3", group: "Twins Stack", note: "Captain's diagram" },
    ],
  },
  {
    title: "I Formation",
    category: "Pass Game",
    description: "Backfield depth for option looks and play action.",
    plays: [
      { page: 34, title: "I Formation", group: "I Formation", note: "Base alignment" },
      { page: 35, title: "I Formation Play 1", group: "I Formation", note: "Captain's diagram" },
      { page: 36, title: "I Formation Play 2", group: "I Formation", note: "Captain's diagram" },
      { page: 37, title: "I Formation Play 3", group: "I Formation", note: "Captain's diagram" },
    ],
  },
  {
    title: "Double Back",
    category: "Pass Game",
    description: "Two-back set for motion, misdirection, and option pressure.",
    plays: [
      { page: 38, title: "Double Back Set", group: "Double Back", note: "Base alignment" },
      { page: 39, title: "Double Back Play 1", group: "Double Back", note: "Captain's diagram" },
      { page: 40, title: "Double Back Play 2", group: "Double Back", note: "Captain's diagram" },
      { page: 41, title: "Double Back Play 3", group: "Double Back", note: "Captain's diagram" },
    ],
  },
  {
    title: "Single Set",
    category: "Pass Game",
    description: "Simple alignment for fast huddle calls.",
    plays: [
      { page: 42, title: "Single Set Formation", group: "Single Set", note: "Base alignment" },
      { page: 43, title: "Single Set Play 1", group: "Single Set", note: "Captain's diagram" },
      { page: 44, title: "Single Set Play 2", group: "Single Set", note: "Captain's diagram" },
      { page: 45, title: "Single Set Play 3", group: "Single Set", note: "Captain's diagram" },
    ],
  },
  {
    title: "Run Plays",
    category: "Run Game",
    description: "Misdirection and option calls for the 5v5 run game.",
    plays: [
      { page: 47, title: "HB Dive", group: "Run Plays", note: "Captain's diagram" },
      { page: 48, title: "Crossbuck", group: "Run Plays", note: "Captain's diagram" },
      { page: 49, title: "End Around", group: "Run Plays", note: "Captain's diagram" },
      { page: 50, title: "Reverse", group: "Run Plays", note: "Captain's diagram" },
      { page: 51, title: "Double Reverse", group: "Run Plays", note: "Captain's diagram" },
      { page: 52, title: "Fake Double Reverse", group: "Run Plays", note: "Captain's diagram" },
      { page: 53, title: "Fake Triple Reverse", group: "Run Plays", note: "Captain's diagram" },
      { page: 54, title: "HB Option", group: "Run Plays", note: "Pump fake plus run" },
      { page: 55, title: "QB Option", group: "Run Plays", note: "Run-pass option" },
    ],
  },
  {
    title: "Defensive Coverages",
    category: "Defense",
    description: "Clean defensive shells for team communication.",
    plays: [
      { page: 57, title: "Man", group: "Defensive Coverages", note: "Match and rush" },
      { page: 58, title: "Cover 1", group: "Defensive Coverages", note: "One deep safety" },
      { page: 59, title: "Cover 2", group: "Defensive Coverages", note: "Two deep halves" },
      { page: 60, title: "Cover 3", group: "Defensive Coverages", note: "Three deep thirds" },
      { page: 61, title: "Cover 4", group: "Defensive Coverages", note: "Four deep quarters" },
    ],
  },
];

const activePlaybookSections = croppedPlaybookSections;
const categories = ["All", "Pass Game", "Run Game", "Defense", "Routes"];
let activeCategory = "All";

const rosterGrid = document.querySelector("#rosterGrid");
const playGrid = document.querySelector("#playGrid");
const playSearch = document.querySelector("#playSearch");
const playFilters = document.querySelector("#playFilters");
const playModal = document.querySelector("#playModal");
const modalBackdrop = document.querySelector("#modalBackdrop");
const modalClose = document.querySelector("#modalClose");
const modalTitle = document.querySelector("#modalTitle");
const modalGroup = document.querySelector("#modalGroup");
const modalNote = document.querySelector("#modalNote");
const modalDiagram = document.querySelector("#modalDiagram");
const themeToggle = document.querySelector("#themeToggle");
const themeToggleText = document.querySelector("#themeToggleText");
const railThemeToggle = document.querySelector("#railThemeToggle");
const railThemeToggleText = document.querySelector("#railThemeToggleText");

function applyTheme(theme) {
  const selectedTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = selectedTheme;
  localStorage.setItem("jff-theme", selectedTheme);
  const label = selectedTheme === "dark" ? "Light" : "Dark";
  if (themeToggleText) themeToggleText.textContent = label;
  if (railThemeToggleText) railThemeToggleText.textContent = label;
  [themeToggle, railThemeToggle].forEach((button) => {
    if (!button) return;
    button.setAttribute(
      "aria-label",
      selectedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode",
    );
  });
}

function initTheme() {
  const saved = localStorage.getItem("jff-theme");
  const preferred = window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  applyTheme(saved || preferred);
}

function renderRoster() {
  rosterGrid.innerHTML = roster
    .map(
      (player) => `
        <article class="roster-card">
          <div class="roster-number">#${player.number}</div>
          <h3>${player.name}</h3>
          ${player.badge ? `<span class="captain-badge">${player.badge}</span>` : ""}
          <div class="role-groups" aria-label="${player.name} roles">
            <div class="role-group">
              <span class="role-label">Offense</span>
              <div class="role-chips">
                ${player.offense.map((role) => `<span class="role-chip offense">${role}</span>`).join("")}
              </div>
            </div>
            <div class="role-group">
              <span class="role-label">Defense</span>
              <div class="role-chips">
                ${player.defense.map((role) => `<span class="role-chip defense">${role}</span>`).join("")}
              </div>
            </div>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderFilters() {
  playFilters.innerHTML = categories
    .map(
      (category) => `
        <button class="tab ${category === activeCategory ? "active" : ""}" type="button" data-category="${category}">
          ${category}
        </button>
      `,
    )
    .join("");
}

function renderPlaybook() {
  const query = playSearch.value.trim().toLowerCase();
  const filteredSections = activePlaybookSections
    .map((section) => {
      const plays = section.plays.filter((play) => {
        const matchesCategory = activeCategory === "All" || section.category === activeCategory;
        const matchesQuery = [section.title, section.category, play.title, play.note, play.group]
          .join(" ")
          .toLowerCase()
          .includes(query);
        return matchesCategory && matchesQuery;
      });
      return { ...section, plays };
    })
    .filter((section) => section.plays.length > 0);

  playGrid.innerHTML = filteredSections
    .map(
      (section) => `
        <section class="play-chapter" id="${getSectionId(section.title)}" data-spy-section>
          <div class="play-chapter-heading">
            <div>
              <h3>${section.title}</h3>
              <p>${section.description}</p>
            </div>
            <span class="pill">${section.category}</span>
          </div>
          <div class="chapter-grid">
            ${section.plays.map(renderPlayCard).join("")}
          </div>
        </section>
      `,
    )
    .join("");

  bindScrollSpy();
  bindRevealAnimations();
}

function renderPlayCard(play) {
  const playId = getPlayId(play);
  return `
    <article class="play-card play-card-button" data-play-id="${playId}" tabindex="0" role="button" aria-label="Open ${play.title}">
      <figure>${renderPlayDiagram(play)}</figure>
      <div class="play-card-body">
        <h3>${play.title}</h3>
        <p>${play.note}</p>
        <span class="pill">${play.group}</span>
      </div>
    </article>
  `;
}

function getPlayId(play) {
  return [play.group, play.title].join("::").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function getSectionId(title) {
  return `playbook-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

function findPlayById(id) {
  return activePlaybookSections.flatMap((section) => section.plays).find((play) => getPlayId(play) === id);
}

function openPlayModal(play) {
  modalTitle.textContent = play.title;
  modalGroup.textContent = play.group;
  modalNote.textContent = play.note;
  modalDiagram.innerHTML = renderPlayDiagram(play);
  playModal.hidden = false;
  document.body.classList.add("modal-open");
  modalClose.focus();
}

function closePlayModal() {
  playModal.hidden = true;
  document.body.classList.remove("modal-open");
}

function updateRailMarker(activeLink) {
  const rail = document.querySelector(".section-rail");
  if (!rail || !activeLink) return;

  const markerTop = activeLink.offsetTop;

  rail.style.setProperty("--rail-marker-top", `${markerTop}px`);
  rail.style.setProperty("--rail-marker-height", `${activeLink.offsetHeight}px`);
}

let scrollSpyCleanup;

function bindScrollSpy() {
  if (scrollSpyCleanup) scrollSpyCleanup();

  const links = [...document.querySelectorAll("[data-spy-link]")];
  const sections = links
    .map((link) => ({
      link,
      section: document.getElementById(link.dataset.spyLink),
    }))
    .filter((item) => item.section);

  if (!sections.length) return;

  let ticking = false;

  const setActiveSection = () => {
    const scanLine = window.scrollY + window.innerHeight * 0.36;
    const active = sections.reduce((current, item) => {
      if (item.section.offsetTop <= scanLine) return item;
      return current;
    }, sections[0]);

    links.forEach((link) => {
      link.classList.toggle("active", link === active.link);
    });
    updateRailMarker(active.link);
    ticking = false;
  };

  const requestSetActiveSection = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(setActiveSection);
  };

  const handleClicks = [];

  links.forEach((link) => {
    const handleClick = () => {
      links.forEach((item) => item.classList.toggle("active", item === link));
      updateRailMarker(link);
    };
    link.addEventListener("click", handleClick);
    handleClicks.push([link, handleClick]);
  });

  window.addEventListener("scroll", requestSetActiveSection, { passive: true });
  window.addEventListener("resize", requestSetActiveSection);
  scrollSpyCleanup = () => {
    window.removeEventListener("scroll", requestSetActiveSection);
    window.removeEventListener("resize", requestSetActiveSection);
    handleClicks.forEach(([link, handleClick]) => {
      link.removeEventListener("click", handleClick);
    });
    scrollSpyCleanup = null;
  };
  setActiveSection();
}

function renderPlayDiagram(play) {
  if (play.page) {
    const image = `assets/playbook/page-${String(play.page).padStart(2, "0")}.webp`;
    return `<img class="cropped-play-image" src="${image}" alt="${play.title} diagram" loading="lazy" />`;
  }

  const base = formationBases[play.formation] || formationBases.spread;
  const routes = play.routes || {};
  const routeMarkup = Object.entries(routes)
    .map(([id, points]) => {
      const player = base.find((item) => item[0] === id);
      if (!player || points.length === 0) return "";
      const path = [`M ${player[1]} ${player[2]}`, ...points.map((point) => `L ${point[0]} ${point[1]}`)].join(" ");
      return `<path class="mini-route" d="${path}"></path>${points
        .slice(-1)
        .map((point) => `<circle class="mini-route-end" cx="${point[0]}" cy="${point[1]}" r="4"></circle>`)
        .join("")}`;
    })
    .join("");

  const playersMarkup = base
    .map(
      ([label, x, y]) => `
        <g class="mini-player ${play.formation === "defense" ? "defender" : ""}" transform="translate(${x} ${y})">
          <circle r="12"></circle>
          <text>${label}</text>
        </g>
      `,
    )
    .join("");

  return `
    <svg class="mini-field" viewBox="0 0 420 220" role="img" aria-label="${play.title} diagram">
      <rect class="mini-field-bg" width="420" height="220"></rect>
      <rect class="mini-end-zone" x="0" y="0" width="45" height="220"></rect>
      <rect class="mini-end-zone" x="375" y="0" width="45" height="220"></rect>
      <rect class="mini-sideline" x="1" y="1" width="418" height="218" fill="none"></rect>
      ${[45, 105, 165, 225, 285, 345, 375]
        .map((x) => `<line class="mini-yard-line" x1="${x}" y1="0" x2="${x}" y2="220"></line>`)
        .join("")}
      <line class="mini-line-scrimmage" x1="92" y1="0" x2="92" y2="220"></line>
      ${routeMarkup}
      ${playersMarkup}
    </svg>
  `;
}

playFilters.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  renderFilters();
  renderPlaybook();
});

playSearch.addEventListener("input", renderPlaybook);

playGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".play-card-button");
  if (!card) return;
  const play = findPlayById(card.dataset.playId);
  if (play) openPlayModal(play);
});

playGrid.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const card = event.target.closest(".play-card-button");
  if (!card) return;
  event.preventDefault();
  const play = findPlayById(card.dataset.playId);
  if (play) openPlayModal(play);
});

modalBackdrop.addEventListener("click", closePlayModal);
modalClose.addEventListener("click", closePlayModal);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !playModal.hidden) closePlayModal();
});

themeToggle?.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
});

railThemeToggle?.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
});

let revealObserver;

function bindRevealAnimations() {
  const revealItems = [
    ...document.querySelectorAll(".section-heading, .quick-stats > div, .roster-card, .play-chapter, .play-card, .designer-panel, .field-shell"),
  ];

  revealItems.forEach((item) => item.classList.add("reveal-item"));

  if (revealObserver) revealObserver.disconnect();

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        } else {
          entry.target.classList.remove("is-visible");
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
  );

  revealItems.forEach((item, index) => {
    item.style.setProperty("--reveal-delay", `${Math.min(index % 8, 7) * 45}ms`);
    revealObserver.observe(item);
  });
}

function bindEnergyCursor() {
  const cursor = document.querySelector(".energy-cursor");
  if (!cursor) return;

  window.addEventListener("pointermove", (event) => {
    document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
    document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    cursor.classList.add("active");
  });

  window.addEventListener("pointerleave", () => cursor.classList.remove("active"));
}

const svg = document.querySelector("#fieldSvg");
const playerList = document.querySelector("#playerList");
const formationSelect = document.querySelector("#formationSelect");
const playName = document.querySelector("#playName");
const playDescription = document.querySelector("#playDescription");
const playCreator = document.querySelector("#playCreator");
const creatorFilter = document.querySelector("#creatorFilter");
const likePlayer = document.querySelector("#likePlayer");
const savedPlaysList = document.querySelector("#savedPlaysList");
const saveStatus = document.querySelector("#saveStatus");
const savePlay = document.querySelector("#savePlay");
const loadPlay = document.querySelector("#loadPlay");
const undoPoint = document.querySelector("#undoPoint");
const clearRoutes = document.querySelector("#clearRoutes");
const fieldModeButtons = [...document.querySelectorAll("[data-field-mode]")];
const drawMode = document.querySelector("#drawMode");
const basicMode = document.querySelector("#basicMode");
const routeSlider = document.querySelector("#routeSlider");

const DESIGNER_FIELD = {
  width: 300,
  endZone: 100,
  modes: {
    normal: { height: 700, lineOfScrimmage: 500, label: "Normal play", conversion: false },
    one: { height: 260, lineOfScrimmage: 150, label: "1 point conversion", conversion: true },
    two: { height: 320, lineOfScrimmage: 200, label: "2 point conversion", conversion: true },
  },
};

const designerColors = {
  Q: "#ef2f32",
  C: "#2f3330",
  X: "#1b7fc8",
  Y: "#00a84f",
  Z: "#f26722",
  B: "#7a3db8",
};

const basicRoutes = [
  { id: "hitch", name: "Hitch" },
  { id: "slant", name: "Slant" },
  { id: "outLeft", name: "Out L" },
  { id: "outRight", name: "Out R" },
  { id: "post", name: "Post" },
  { id: "cornerLeft", name: "Corner L" },
  { id: "cornerRight", name: "Corner R" },
  { id: "fly", name: "Fly" },
  { id: "dragLeft", name: "Drag L" },
  { id: "dragRight", name: "Drag R" },
  { id: "comeback", name: "Comeback" },
];

const formationOffsets = {
  spread: [
    { id: "Q", label: "Q", x: 150, yOffset: 48 },
    { id: "C", label: "C", x: 150, yOffset: 0 },
    { id: "X", label: "X", x: 58, yOffset: 0 },
    { id: "Y", label: "Y", x: 116, yOffset: 0 },
    { id: "Z", label: "Z", x: 242, yOffset: 0 },
  ],
  bunch: [
    { id: "Q", label: "Q", x: 150, yOffset: 48 },
    { id: "C", label: "C", x: 150, yOffset: 0 },
    { id: "X", label: "X", x: 118, yOffset: 0 },
    { id: "Y", label: "Y", x: 146, yOffset: -26 },
    { id: "Z", label: "Z", x: 182, yOffset: 0 },
  ],
  trips: [
    { id: "Q", label: "Q", x: 150, yOffset: 48 },
    { id: "C", label: "C", x: 150, yOffset: 0 },
    { id: "X", label: "X", x: 58, yOffset: 0 },
    { id: "Y", label: "Y", x: 104, yOffset: 0 },
    { id: "Z", label: "Z", x: 196, yOffset: 0 },
  ],
  twins: [
    { id: "Q", label: "Q", x: 150, yOffset: 48 },
    { id: "C", label: "C", x: 150, yOffset: 0 },
    { id: "X", label: "X", x: 62, yOffset: 0 },
    { id: "Y", label: "Y", x: 108, yOffset: 0 },
    { id: "Z", label: "Z", x: 238, yOffset: 0 },
  ],
};

let designerMode = "normal";
let players = cloneFormation("spread");
let selectedId = "X";
let draggingId = null;
let routeMode = "draw";
let firestoreApi = null;
let savedTeamPlays = [];

function getRosterOption(player) {
  return `${player.name} - #${player.number}`;
}

function renderRosterSelects() {
  const options = roster
    .map((player) => `<option value="${escapeHtml(player.name)}">${escapeHtml(getRosterOption(player))}</option>`)
    .join("");
  if (playCreator) playCreator.innerHTML = options;
  if (likePlayer) likePlayer.innerHTML = options;
  if (creatorFilter) creatorFilter.innerHTML = `<option value="all">All players</option>${options}`;
}

function setSaveStatus(message, tone = "") {
  if (!saveStatus) return;
  saveStatus.textContent = message;
  saveStatus.dataset.tone = tone;
}

function getSelectedRosterPlayer(select = playCreator) {
  return roster.find((player) => player.name === select?.value) || roster[0];
}

function serializeDesignerPlay() {
  const creator = getSelectedRosterPlayer(playCreator);
  return {
    name: playName.value.trim() || "Jeddah Custom Play",
    description: playDescription?.value.trim() || "",
    creatorName: creator.name,
    creatorNumber: creator.number,
    formation: formationSelect.value,
    designerMode,
    players: players.map((player) => ({
      id: player.id,
      label: player.label,
      x: Math.round(player.x),
      y: Math.round(player.y),
      route: player.route.map((point) => ({
        x: Math.round(point.x),
        y: Math.round(point.y),
      })),
    })),
  };
}

function loadDesignerPlay(play) {
  if (!play) return;
  playName.value = play.name || "Jeddah Custom Play";
  if (playDescription) playDescription.value = play.description || "";
  if (playCreator && play.creatorName) playCreator.value = play.creatorName;
  if (play.formation && formationSelect.querySelector(`[value="${play.formation}"]`)) {
    formationSelect.value = play.formation;
  }
  setDesignerMode(play.designerMode || "normal", false);
  players = Array.isArray(play.players) ? play.players : players;
  selectedId = players[0]?.id || "X";
  renderField();
}

function renderSavedTeamPlays() {
  if (!savedPlaysList) return;
  if (!firestoreApi) {
    savedPlaysList.innerHTML = `<p class="empty-state">Connecting to Firebase...</p>`;
    return;
  }
  if (!savedTeamPlays.length) {
    savedPlaysList.innerHTML = `<p class="empty-state">No saved custom plays yet. Build one, add a description, choose your name, and save it online.</p>`;
    return;
  }

  const selectedCreator = creatorFilter?.value || "all";
  const visiblePlays =
    selectedCreator === "all"
      ? savedTeamPlays
      : savedTeamPlays.filter((play) => play.creatorName === selectedCreator);

  if (!visiblePlays.length) {
    savedPlaysList.innerHTML = `<p class="empty-state">No saved plays by ${escapeHtml(selectedCreator)} yet.</p>`;
    return;
  }

  savedPlaysList.innerHTML = visiblePlays
    .map((play, index) => {
      const likes = play.likeCount || Object.keys(play.likes || {}).length || 0;
      const likedNames = Object.keys(play.likes || {});
      return `
        <article class="saved-play-card">
          <div class="saved-play-rank">#${index + 1}</div>
          <div class="saved-play-content">
            <div class="saved-play-topline">
              <h4>${escapeHtml(play.name)}</h4>
              <strong>${likes} ${likes === 1 ? "like" : "likes"}</strong>
            </div>
            <p>${escapeHtml(play.description || "No description yet.")}</p>
            <div class="saved-play-meta">
              <span>By ${escapeHtml(play.creatorName || "Jeddah player")} #${escapeHtml(play.creatorNumber || "")}</span>
              <span>${escapeHtml(play.formation || "custom")} / ${escapeHtml(play.designerMode || "normal")}</span>
            </div>
            <div class="saved-play-actions">
              <button class="button ghost" type="button" data-load-team-play="${escapeHtml(play.id)}">Load play</button>
              <button class="button primary" type="button" data-like-team-play="${escapeHtml(play.id)}">Like as selected player</button>
            </div>
            <small>${likedNames.length ? `Liked by ${escapeHtml(likedNames.join(", "))}` : "No likes yet."}</small>
          </div>
        </article>
      `;
    })
    .join("");
}

async function initFirebasePlaybook() {
  if (!savedPlaysList) return;
  renderSavedTeamPlays();

  try {
    const appModule = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js");
    const firestoreModule = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js");
    const app = appModule.initializeApp(firebaseConfig);
    const db = firestoreModule.getFirestore(app);
    firestoreApi = { db, ...firestoreModule };

    const playsRef = firestoreModule.collection(db, customPlaysCollection);
    const playsQuery = firestoreModule.query(playsRef, firestoreModule.orderBy("likeCount", "desc"));
    firestoreModule.onSnapshot(
      playsQuery,
      (snapshot) => {
        savedTeamPlays = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        renderSavedTeamPlays();
        setSaveStatus("Online playbook connected.", "success");
      },
      (error) => {
        console.error(error);
        setSaveStatus("Firebase connected, but saved plays could not load. Check Firestore rules.", "error");
      },
    );
  } catch (error) {
    console.error(error);
    setSaveStatus("Firebase did not connect. The site still works locally.", "error");
    savedPlaysList.innerHTML = `<p class="empty-state">Firebase did not connect. Check the config and internet connection.</p>`;
  }
}

async function saveOnlinePlay() {
  const payload = serializeDesignerPlay();
  localStorage.setItem("jff-custom-play", JSON.stringify(payload));

  if (!firestoreApi) {
    setSaveStatus("Saved locally. Firebase is still connecting.", "warning");
    return;
  }

  savePlay.disabled = true;
  setSaveStatus("Saving online...", "");
  try {
    await firestoreApi.addDoc(firestoreApi.collection(firestoreApi.db, customPlaysCollection), {
      ...payload,
      likes: {},
      likeCount: 0,
      createdAt: firestoreApi.serverTimestamp(),
    });
    setSaveStatus("Saved online for the team.", "success");
    savePlay.textContent = "Saved online";
    setTimeout(() => {
      savePlay.textContent = "Save online";
    }, 1300);
  } catch (error) {
    console.error(error);
    setSaveStatus("Could not save online. Check Firebase test mode/rules.", "error");
  } finally {
    savePlay.disabled = false;
  }
}

async function likeOnlinePlay(playId) {
  const voter = getSelectedRosterPlayer(likePlayer);
  if (!firestoreApi || !playId || !voter) return;

  const play = savedTeamPlays.find((item) => item.id === playId);
  if (play?.likes?.[voter.name]) {
    setSaveStatus(`${voter.name} already liked this play.`, "warning");
    return;
  }

  try {
    const playRef = firestoreApi.doc(firestoreApi.db, customPlaysCollection, playId);
    await firestoreApi.updateDoc(playRef, {
      [`likes.${voter.name}`]: true,
      likeCount: firestoreApi.increment(1),
    });
    setSaveStatus(`${voter.name} liked the play.`, "success");
  } catch (error) {
    console.error(error);
    setSaveStatus("Could not add like. Check Firebase rules.", "error");
  }
}

function cloneFormation(name) {
  const mode = getDesignerMode();
  return formationOffsets[name].map((player) => ({
    id: player.id,
    label: player.label,
    x: player.x,
    y: mode.lineOfScrimmage + player.yOffset,
    route: [],
  }));
}

function getDesignerMode() {
  return DESIGNER_FIELD.modes[designerMode] || DESIGNER_FIELD.modes.normal;
}

function setDesignerMode(modeName, resetFormation = true) {
  designerMode = DESIGNER_FIELD.modes[modeName] ? modeName : "normal";
  const mode = getDesignerMode();
  svg.setAttribute("viewBox", `0 0 ${DESIGNER_FIELD.width} ${mode.height}`);
  svg.style.aspectRatio = `${DESIGNER_FIELD.width} / ${mode.height}`;
  fieldModeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.fieldMode === designerMode);
  });
  if (resetFormation) {
    players = cloneFormation(formationSelect.value);
    selectedId = "X";
  }
  renderField();
}

function clampDesignerPoint(x, y) {
  const mode = getDesignerMode();
  return {
    x: Math.max(14, Math.min(DESIGNER_FIELD.width - 14, x)),
    y: Math.max(14, Math.min(mode.height - 14, y)),
  };
}

function applyBasicRoute(routeId) {
  const selected = players.find((player) => player.id === selectedId);
  const route = basicRoutes.find((item) => item.id === routeId);
  if (!selected || !route) return;

  selected.route = buildBasicRoute(selected, route.id);
  renderField();
}

function towardMiddleX(player, amount = 64) {
  if (player.x < DESIGNER_FIELD.width / 2) return Math.min(DESIGNER_FIELD.width / 2, player.x + amount);
  if (player.x > DESIGNER_FIELD.width / 2) return Math.max(DESIGNER_FIELD.width / 2, player.x - amount);
  return player.x + amount;
}

function buildBasicRoute(player, routeId) {
  const middleX = DESIGNER_FIELD.width / 2;
  const outLeft = -1;
  const outRight = 1;
  const cornerLeft = -1;
  const cornerRight = 1;
  const make = (points) => points.map(([x, y]) => clampDesignerPoint(x, y));

  switch (routeId) {
    case "hitch":
      return make([
        [player.x, player.y - 74],
        [player.x, player.y - 46],
      ]);
    case "slant":
      return make([
        [player.x, player.y - 18],
        [towardMiddleX(player, 84), player.y - 58],
      ]);
    case "outLeft":
      return make([
        [player.x, player.y - 68],
        [player.x + outLeft * 58, player.y - 68],
      ]);
    case "outRight":
      return make([
        [player.x, player.y - 68],
        [player.x + outRight * 58, player.y - 68],
      ]);
    case "post":
      return make([
        [player.x, player.y - 112],
        [middleX, player.y - 178],
      ]);
    case "cornerLeft":
      return make([
        [player.x, player.y - 112],
        [player.x + cornerLeft * 70, player.y - 172],
      ]);
    case "cornerRight":
      return make([
        [player.x, player.y - 112],
        [player.x + cornerRight * 70, player.y - 172],
      ]);
    case "fly":
      return make([[player.x, player.y - 196]]);
    case "dragLeft":
      return make([
        [player.x, player.y - 18],
        [player.x - 82, player.y - 18],
      ]);
    case "dragRight":
      return make([
        [player.x, player.y - 18],
        [player.x + 82, player.y - 18],
      ]);
    case "comeback":
      return make([
        [player.x, player.y - 132],
        [player.x, player.y - 94],
      ]);
    default:
      return [];
  }
}

function setRouteMode(mode) {
  routeMode = mode === "basic" ? "basic" : "draw";
  drawMode?.classList.toggle("active", routeMode === "draw");
  basicMode?.classList.toggle("active", routeMode === "basic");
  routeSlider?.classList.toggle("active", routeMode === "basic");
}

function svgPoint(event) {
  const point = svg.createSVGPoint();
  const source = event.touches ? event.touches[0] : event;
  point.x = source.clientX;
  point.y = source.clientY;
  const transformed = point.matrixTransform(svg.getScreenCTM().inverse());
  return clampDesignerPoint(transformed.x, transformed.y);
}

function renderField() {
  const lines = [];
  const mode = getDesignerMode();
  const width = DESIGNER_FIELD.width;
  const endZone = DESIGNER_FIELD.endZone;
  const { height, lineOfScrimmage } = mode;
  lines.push(`<defs>${Object.entries(designerColors)
    .map(
      ([id, color]) => `
        <marker id="arrow-${id}" markerWidth="13" markerHeight="13" refX="11" refY="6.5" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M 1 1 L 12 6.5 L 1 12 z" fill="${color}"></path>
        </marker>
      `,
    )
    .join("")}</defs>`);
  lines.push(`<rect class="field-bg" width="${width}" height="${height}" rx="0"></rect>`);
  lines.push(`<rect class="end-zone ${mode.conversion ? "conversion-end-zone" : ""}" x="0" y="0" width="${width}" height="${endZone}"></rect>`);
  if (!mode.conversion) {
    lines.push(`<rect class="end-zone" x="0" y="${height - endZone}" width="${width}" height="${endZone}"></rect>`);
  }
  lines.push(`<rect class="sideline" x="1" y="1" width="${width - 2}" height="${height - 2}" fill="none"></rect>`);

  for (let y = endZone; y <= height - (mode.conversion ? 10 : endZone); y += 50) {
    lines.push(`<line class="yard-line" x1="0" y1="${y}" x2="${width}" y2="${y}"></line>`);
    if (y % 100 === 0) {
      const label = mode.conversion ? (y - endZone) / 10 : Math.min((y - endZone) / 10, (height - endZone - y) / 10);
      const shownLabel = label === 0 ? 10 : label * 10;
      lines.push(`<text class="yard-label side-left" x="26" y="${y + 8}">${shownLabel}</text>`);
      lines.push(`<text class="yard-label side-right" x="${width - 26}" y="${y + 8}">${shownLabel}</text>`);
    }
  }

  for (let y = endZone; y <= height - 10; y += 10) {
    lines.push(`<line class="hash" x1="82" y1="${y}" x2="96" y2="${y}"></line>`);
    lines.push(`<line class="hash" x1="204" y1="${y}" x2="218" y2="${y}"></line>`);
  }
  lines.push(`<line class="line-scrimmage" x1="0" y1="${lineOfScrimmage}" x2="${width}" y2="${lineOfScrimmage}"></line>`);
  if (mode.conversion) {
    lines.push(`<text class="conversion-label" x="${width / 2}" y="54">${mode.label}</text>`);
  }

  players.forEach((player) => {
    if (player.route.length > 0) {
      const path = [`M ${player.x} ${player.y}`, ...player.route.map((p) => `L ${p.x} ${p.y}`)].join(" ");
      const color = designerColors[player.id] || "#17a936";
      lines.push(`<path class="route" d="${path}" style="stroke:${color}; marker-end:url(#arrow-${player.id})"></path>`);
      player.route.slice(0, -1).forEach((p) => {
        lines.push(`<circle class="route-dot" cx="${p.x}" cy="${p.y}" r="5" style="fill:${color}"></circle>`);
      });
    }
  });

  players.forEach((player) => {
    const color = designerColors[player.id] || "#17a936";
    lines.push(`
      <g class="player ${player.id === selectedId ? "selected" : ""}" data-id="${player.id}" transform="translate(${player.x} ${player.y})">
        <circle r="18" style="fill:${color}"></circle>
        <text>${player.label}</text>
      </g>
    `);
  });

  svg.innerHTML = lines.join("");
  renderPlayerList();
}

function renderPlayerList() {
  playerList.innerHTML = players
    .map(
      (player) => `
        <button class="player-button ${player.id === selectedId ? "active" : ""}" type="button" data-id="${player.id}">
          <strong>${player.label}</strong>
          <span>${player.id === "Q" ? "Quarterback" : player.id === "C" ? "Center" : "Receiver"}</span>
        </button>
      `,
    )
    .join("");
  renderRouteSlider();
}

function renderRouteSlider() {
  if (!routeSlider) return;
  routeSlider.innerHTML = basicRoutes
    .map(
      (route) => `
        <button class="route-chip" type="button" data-route-id="${route.id}">
          ${route.name}
        </button>
      `,
    )
    .join("");
}

playerList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-id]");
  if (!button) return;
  selectedId = button.dataset.id;
  renderField();
});

drawMode?.addEventListener("click", () => setRouteMode("draw"));
basicMode?.addEventListener("click", () => setRouteMode("basic"));
routeSlider?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-route-id]");
  if (!button) return;
  setRouteMode("basic");
  applyBasicRoute(button.dataset.routeId);
});

svg.addEventListener("pointerdown", (event) => {
  const playerNode = event.target.closest(".player");
  if (playerNode) {
    draggingId = playerNode.dataset.id;
    selectedId = draggingId;
    svg.setPointerCapture(event.pointerId);
    renderField();
    return;
  }

  const selected = players.find((player) => player.id === selectedId);
  if (selected && routeMode === "draw") {
    selected.route.push(svgPoint(event));
    renderField();
  }
});

svg.addEventListener("pointermove", (event) => {
  if (!draggingId) return;
  const point = svgPoint(event);
  const player = players.find((item) => item.id === draggingId);
  if (!player) return;
  player.x = point.x;
  player.y = point.y;
  renderField();
});

svg.addEventListener("pointerup", () => {
  draggingId = null;
});

formationSelect.addEventListener("change", () => {
  players = cloneFormation(formationSelect.value);
  selectedId = "X";
  renderField();
});

undoPoint.addEventListener("click", () => {
  const selected = players.find((player) => player.id === selectedId);
  if (selected) selected.route.pop();
  renderField();
});

clearRoutes.addEventListener("click", () => {
  players.forEach((player) => {
    player.route = [];
  });
  renderField();
});

fieldModeButtons.forEach((button) => {
  button.addEventListener("click", () => setDesignerMode(button.dataset.fieldMode));
});

savePlay.addEventListener("click", saveOnlinePlay);

loadPlay.addEventListener("click", () => {
  const saved = localStorage.getItem("jff-custom-play");
  if (!saved) return;
  const data = JSON.parse(saved);
  loadDesignerPlay(data);
});

savedPlaysList?.addEventListener("click", (event) => {
  const loadButton = event.target.closest("[data-load-team-play]");
  if (loadButton) {
    const play = savedTeamPlays.find((item) => item.id === loadButton.dataset.loadTeamPlay);
    loadDesignerPlay(play);
    setSaveStatus("Loaded saved team play into the designer.", "success");
    document.querySelector("#designer")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  const likeButton = event.target.closest("[data-like-team-play]");
  if (likeButton) {
    likeOnlinePlay(likeButton.dataset.likeTeamPlay);
  }
});

creatorFilter?.addEventListener("change", renderSavedTeamPlays);

renderRosterSelects();
renderRoster();
renderFilters();
renderPlaybook();
setDesignerMode("normal", false);
initFirebasePlaybook();
initTheme();
bindEnergyCursor();
