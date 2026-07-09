const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'states.db'));
db.pragma('journal_mode = WAL');

// Geographic borders (what lies to the N/S/E/W of each state)
const BORDERS = {
  AL: { north: "Tennessee", south: "Florida / Gulf of Mexico", east: "Georgia", west: "Mississippi" },
  AK: { north: "Arctic Ocean", south: "Pacific Ocean / Gulf of Alaska", east: "Yukon & British Columbia, Canada", west: "Bering Sea / Russia" },
  AZ: { north: "Utah", south: "Mexico (Sonora)", east: "New Mexico", west: "California & Nevada" },
  AR: { north: "Missouri", south: "Louisiana", east: "Mississippi & Tennessee", west: "Oklahoma & Texas" },
  CA: { north: "Oregon", south: "Mexico (Baja California)", east: "Nevada & Arizona", west: "Pacific Ocean" },
  CO: { north: "Wyoming & Nebraska", south: "New Mexico & Oklahoma", east: "Kansas & Nebraska", west: "Utah" },
  CT: { north: "Massachusetts", south: "Long Island Sound", east: "Rhode Island", west: "New York" },
  DE: { north: "Pennsylvania", south: "Maryland", east: "Delaware Bay / Atlantic Ocean / New Jersey", west: "Maryland" },
  FL: { north: "Georgia & Alabama", south: "Atlantic Ocean / Straits of Florida", east: "Atlantic Ocean", west: "Gulf of Mexico & Alabama" },
  GA: { north: "Tennessee & North Carolina", south: "Florida", east: "South Carolina & Atlantic Ocean", west: "Alabama" },
  HI: { north: "Pacific Ocean", south: "Pacific Ocean", east: "Pacific Ocean", west: "Pacific Ocean" },
  ID: { north: "British Columbia, Canada", south: "Nevada & Utah", east: "Montana & Wyoming", west: "Oregon & Washington" },
  IL: { north: "Wisconsin", south: "Kentucky", east: "Indiana & Lake Michigan", west: "Iowa & Missouri" },
  IN: { north: "Michigan", south: "Kentucky", east: "Ohio", west: "Illinois" },
  IA: { north: "Minnesota", south: "Missouri", east: "Wisconsin & Illinois", west: "Nebraska & South Dakota" },
  KS: { north: "Nebraska", south: "Oklahoma", east: "Missouri", west: "Colorado" },
  KY: { north: "Ohio, Indiana & Illinois", south: "Tennessee", east: "West Virginia & Virginia", west: "Missouri" },
  LA: { north: "Arkansas", south: "Gulf of Mexico", east: "Mississippi", west: "Texas" },
  ME: { north: "Quebec, Canada", south: "Atlantic Ocean", east: "New Brunswick, Canada & Atlantic Ocean", west: "New Hampshire" },
  MD: { north: "Pennsylvania", south: "Virginia & Washington, D.C.", east: "Delaware & Atlantic Ocean", west: "West Virginia" },
  MA: { north: "New Hampshire & Vermont", south: "Rhode Island & Connecticut", east: "Atlantic Ocean", west: "New York" },
  MI: { north: "Ontario, Canada (via Lake Superior)", south: "Ohio & Indiana", east: "Lake Huron & Ontario, Canada", west: "Wisconsin & Lake Michigan" },
  MN: { north: "Ontario & Manitoba, Canada", south: "Iowa", east: "Wisconsin & Lake Superior", west: "North Dakota & South Dakota" },
  MS: { north: "Tennessee", south: "Louisiana & Gulf of Mexico", east: "Alabama", west: "Louisiana & Arkansas" },
  MO: { north: "Iowa", south: "Arkansas", east: "Illinois, Kentucky & Tennessee", west: "Kansas & Nebraska" },
  MT: { north: "Alberta, Saskatchewan & British Columbia, Canada", south: "Wyoming & Idaho", east: "North Dakota & South Dakota", west: "Idaho" },
  NE: { north: "South Dakota", south: "Kansas & Colorado", east: "Iowa & Missouri", west: "Wyoming & Colorado" },
  NV: { north: "Oregon & Idaho", south: "Arizona & California", east: "Utah & Arizona", west: "California" },
  NH: { north: "Quebec, Canada", south: "Massachusetts", east: "Maine & Atlantic Ocean", west: "Vermont" },
  NJ: { north: "New York", south: "Delaware Bay & Delaware", east: "Atlantic Ocean & New York", west: "Pennsylvania" },
  NM: { north: "Colorado", south: "Mexico (Chihuahua)", east: "Texas & Oklahoma", west: "Arizona" },
  NY: { north: "Ontario & Quebec, Canada", south: "Pennsylvania & New Jersey", east: "Vermont, Massachusetts & Connecticut", west: "Lake Erie & Pennsylvania" },
  NC: { north: "Virginia", south: "South Carolina & Georgia", east: "Atlantic Ocean", west: "Tennessee" },
  ND: { north: "Manitoba & Saskatchewan, Canada", south: "South Dakota", east: "Minnesota", west: "Montana" },
  OH: { north: "Michigan & Lake Erie", south: "Kentucky & West Virginia", east: "Pennsylvania & West Virginia", west: "Indiana" },
  OK: { north: "Kansas", south: "Texas", east: "Arkansas & Missouri", west: "Texas & New Mexico" },
  OR: { north: "Washington", south: "California & Nevada", east: "Idaho", west: "Pacific Ocean" },
  PA: { north: "New York", south: "Maryland, West Virginia & Delaware", east: "New Jersey", west: "Ohio & West Virginia" },
  RI: { north: "Massachusetts", south: "Atlantic Ocean", east: "Massachusetts & Atlantic Ocean", west: "Connecticut" },
  SC: { north: "North Carolina", south: "Georgia & Atlantic Ocean", east: "Atlantic Ocean", west: "Georgia" },
  SD: { north: "North Dakota", south: "Nebraska", east: "Minnesota & Iowa", west: "Wyoming & Montana" },
  TN: { north: "Kentucky & Virginia", south: "Georgia, Alabama & Mississippi", east: "North Carolina", west: "Arkansas & Missouri" },
  TX: { north: "Oklahoma", south: "Mexico & Gulf of Mexico", east: "Louisiana & Arkansas", west: "New Mexico" },
  UT: { north: "Idaho & Wyoming", south: "Arizona", east: "Colorado & Wyoming", west: "Nevada" },
  VT: { north: "Quebec, Canada", south: "Massachusetts", east: "New Hampshire", west: "New York" },
  VA: { north: "Maryland, West Virginia & Washington, D.C.", south: "North Carolina & Tennessee", east: "Atlantic Ocean", west: "Kentucky & West Virginia" },
  WA: { north: "British Columbia, Canada", south: "Oregon", east: "Idaho", west: "Pacific Ocean" },
  WV: { north: "Pennsylvania & Ohio", south: "Virginia & Kentucky", east: "Virginia & Maryland", west: "Ohio & Kentucky" },
  WI: { north: "Lake Superior & Michigan (Upper Peninsula)", south: "Illinois", east: "Lake Michigan", west: "Minnesota & Iowa" },
  WY: { north: "Montana", south: "Colorado & Utah", east: "South Dakota & Nebraska", west: "Idaho & Utah" }
};

const update = db.prepare('UPDATE states SET borders = ? WHERE abbr = ?');

const tx = db.transaction((data) => {
  for (const [abbr, b] of Object.entries(data)) {
    const result = update.run(JSON.stringify(b), abbr);
    if (result.changes === 0) console.warn(`WARNING: no row updated for ${abbr}`);
  }
});

tx(BORDERS);

const count = db.prepare("SELECT COUNT(*) as c FROM states WHERE borders IS NOT NULL").get();
console.log(`Populated borders for ${count.c} states.`);

db.close();
