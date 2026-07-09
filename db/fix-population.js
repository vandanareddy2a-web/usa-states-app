const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'states.db'));
db.pragma('journal_mode = WAL');

// Verified Census Bureau Vintage 2025 estimates (as of July 1, 2025), via
// https://en.wikipedia.org/wiki/List_of_states_and_territories_of_the_United_States_by_population
const POPULATIONS = {
  CA: 39355309, TX: 31709821, FL: 23462518, NY: 20002427, PA: 13059432,
  IL: 12719141, OH: 11900510, GA: 11302748, NC: 11197968, MI: 10127884,
  NJ: 9548215, VA: 8880107, WA: 8001020, AZ: 7623818, TN: 7315076,
  MA: 7154084, IN: 6973333, MO: 6270541, MD: 6265347, CO: 6012561,
  WI: 5972787, MN: 5830405, SC: 5570274, AL: 5193088, LA: 4618189,
  KY: 4606864, OR: 4273586, OK: 4123288, CT: 3688496, UT: 3538904,
  NV: 3282188, IA: 3238387, AR: 3114791, KS: 2977220, MS: 2954160,
  NM: 2125498, ID: 2029733, NE: 2018006, WV: 1766147, HI: 1432820,
  NH: 1415342, ME: 1414874, MT: 1144694, RI: 1114521, DE: 1059952,
  SD: 935094, ND: 799358, AK: 737270, VT: 644663, WY: 588753
};

const update = db.prepare('UPDATE states SET population = ?, updated_at = CURRENT_TIMESTAMP WHERE abbr = ?');

const tx = db.transaction((data) => {
  for (const [abbr, pop] of Object.entries(data)) {
    const result = update.run(pop, abbr);
    if (result.changes === 0) {
      console.warn(`WARNING: no row updated for ${abbr}`);
    }
  }
});

tx(POPULATIONS);

const count = db.prepare('SELECT COUNT(*) as c FROM states').get();
const total = db.prepare('SELECT SUM(population) as p FROM states').get();
console.log(`Updated population for ${Object.keys(POPULATIONS).length} states.`);
console.log(`Total states in DB: ${count.c}`);
console.log(`New total population: ${total.p.toLocaleString('en-US')}`);

db.close();
