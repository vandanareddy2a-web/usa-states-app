const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'states.db'));
db.pragma('journal_mode = WAL');

// Stable Wikimedia Commons "Special:FilePath" URLs (redirect directly to the image bytes)
const FLAG_FILES = {
  AL: "Flag_of_Alabama.svg", AK: "Flag_of_Alaska.svg", AZ: "Flag_of_Arizona.svg", AR: "Flag_of_Arkansas.svg",
  CA: "Flag_of_California.svg", CO: "Flag_of_Colorado.svg", CT: "Flag_of_Connecticut.svg", DE: "Flag_of_Delaware.svg",
  FL: "Flag_of_Florida.svg", GA: "Flag_of_Georgia_(U.S._state).svg", HI: "Flag_of_Hawaii.svg", ID: "Flag_of_Idaho.svg",
  IL: "Flag_of_Illinois.svg", IN: "Flag_of_Indiana.svg", IA: "Flag_of_Iowa.svg", KS: "Flag_of_Kansas.svg",
  KY: "Flag_of_Kentucky.svg", LA: "Flag_of_Louisiana.svg", ME: "Flag_of_Maine.svg", MD: "Flag_of_Maryland.svg",
  MA: "Flag_of_Massachusetts.svg", MI: "Flag_of_Michigan.svg", MN: "Flag_of_Minnesota.svg", MS: "Flag_of_Mississippi.svg",
  MO: "Flag_of_Missouri.svg", MT: "Flag_of_Montana.svg", NE: "Flag_of_Nebraska.svg", NV: "Flag_of_Nevada.svg",
  NH: "Flag_of_New_Hampshire.svg", NJ: "Flag_of_New_Jersey.svg", NM: "Flag_of_New_Mexico.svg", NY: "Flag_of_New_York.svg",
  NC: "Flag_of_North_Carolina.svg", ND: "Flag_of_North_Dakota.svg", OH: "Flag_of_Ohio.svg", OK: "Flag_of_Oklahoma.svg",
  OR: "Flag_of_Oregon.svg", PA: "Flag_of_Pennsylvania.svg", RI: "Flag_of_Rhode_Island.svg", SC: "Flag_of_South_Carolina.svg",
  SD: "Flag_of_South_Dakota.svg", TN: "Flag_of_Tennessee.svg", TX: "Flag_of_Texas.svg", UT: "Flag_of_Utah.svg",
  VT: "Flag_of_Vermont.svg", VA: "Flag_of_Virginia.svg", WA: "Flag_of_Washington.svg", WV: "Flag_of_West_Virginia.svg",
  WI: "Flag_of_Wisconsin.svg", WY: "Flag_of_Wyoming.svg"
};

const update = db.prepare('UPDATE states SET flag_url = ? WHERE abbr = ?');

const tx = db.transaction((data) => {
  for (const [abbr, file] of Object.entries(data)) {
    const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${file}`;
    const result = update.run(url, abbr);
    if (result.changes === 0) console.warn(`WARNING: no row updated for ${abbr}`);
  }
});

tx(FLAG_FILES);

const count = db.prepare("SELECT COUNT(*) as c FROM states WHERE flag_url IS NOT NULL").get();
console.log(`Populated flag_url for ${count.c} states.`);

db.close();
