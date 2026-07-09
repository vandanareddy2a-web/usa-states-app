const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'states.db'));
db.pragma('journal_mode = WAL');

// Simple cardinal region grouping (North / South / East / West)
const REGIONS = {
  // North (Upper Midwest / Northern Plains / Northern Mountain)
  ND: "North", SD: "North", MN: "North", WI: "North", MI: "North", IA: "North",
  NE: "North", KS: "North", MO: "North", IL: "North", IN: "North", OH: "North",
  WY: "North", MT: "North",
  // West
  WA: "West", OR: "West", CA: "West", NV: "West", ID: "West", UT: "West",
  CO: "West", AZ: "West", NM: "West", AK: "West", HI: "West",
  // South
  TX: "South", OK: "South", AR: "South", LA: "South", MS: "South", AL: "South",
  GA: "South", FL: "South", SC: "South", NC: "South", TN: "South", KY: "South",
  WV: "South", VA: "South",
  // East
  NY: "East", PA: "East", NJ: "East", CT: "East", RI: "East", MA: "East",
  VT: "East", NH: "East", ME: "East", MD: "East", DE: "East"
};

const update = db.prepare('UPDATE states SET region = ? WHERE abbr = ?');

const tx = db.transaction((data) => {
  for (const [abbr, region] of Object.entries(data)) {
    const result = update.run(region, abbr);
    if (result.changes === 0) console.warn(`WARNING: no row updated for ${abbr}`);
  }
});

tx(REGIONS);

const count = db.prepare("SELECT COUNT(*) as c FROM states WHERE region IS NOT NULL").get();
console.log(`Populated region for ${count.c} states.`);

db.close();
