const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'states.db'));
db.pragma('journal_mode = WAL');

// Current officeholders as of July 2026 (governor, both U.S. senators, capital city mayor)
const LEADERSHIP = [
  {abbr:"AL",governor:"Kay Ivey",senators:["Katie Boyd Britt","Tommy Tuberville"],capital_mayor:"Steven L. Reed"},
  {abbr:"AK",governor:"Mike Dunleavy",senators:["Lisa Murkowski","Dan Sullivan"],capital_mayor:"Beth Weldon"},
  {abbr:"AZ",governor:"Katie Hobbs",senators:["Mark Kelly","Ruben Gallego"],capital_mayor:"Kate Gallego"},
  {abbr:"AR",governor:"Sarah Huckabee Sanders",senators:["John Boozman","Tom Cotton"],capital_mayor:"Frank Scott Jr."},
  {abbr:"CA",governor:"Gavin Newsom",senators:["Alex Padilla","Adam Schiff"],capital_mayor:"Kevin McCarty"},
  {abbr:"CO",governor:"Jared Polis",senators:["Michael Bennet","John Hickenlooper"],capital_mayor:"Mike Johnston"},
  {abbr:"CT",governor:"Ned Lamont",senators:["Richard Blumenthal","Chris Murphy"],capital_mayor:"Arunan Arulampalam"},
  {abbr:"DE",governor:"Matt Meyer",senators:["Chris Coons","Lisa Blunt Rochester"],capital_mayor:"Robin R. Christiansen"},
  {abbr:"FL",governor:"Ron DeSantis",senators:["Rick Scott","Ashley Moody"],capital_mayor:"John Dailey"},
  {abbr:"GA",governor:"Brian Kemp",senators:["Raphael Warnock","Jon Ossoff"],capital_mayor:"Andre Dickens"},
  {abbr:"HI",governor:"Josh Green",senators:["Brian Schatz","Mazie Hirono"],capital_mayor:"Rick Blangiardi"},
  {abbr:"ID",governor:"Brad Little",senators:["Mike Crapo","Jim Risch"],capital_mayor:"Lauren McLean"},
  {abbr:"IL",governor:"JB Pritzker",senators:["Tammy Duckworth","Dick Durbin"],capital_mayor:"Misty Buscher"},
  {abbr:"IN",governor:"Mike Braun",senators:["Todd Young","Jim Banks"],capital_mayor:"Joe Hogsett"},
  {abbr:"IA",governor:"Kim Reynolds",senators:["Chuck Grassley","Joni Ernst"],capital_mayor:"Connie Boesen"},
  {abbr:"KS",governor:"Laura Kelly",senators:["Jerry Moran","Roger Marshall"],capital_mayor:"Spencer Duncan"},
  {abbr:"KY",governor:"Andy Beshear",senators:["Rand Paul","Mitch McConnell"],capital_mayor:"Layne Wilkerson"},
  {abbr:"LA",governor:"Jeff Landry",senators:["John Kennedy","Bill Cassidy"],capital_mayor:"Sid Edwards"},
  {abbr:"ME",governor:"Janet Mills",senators:["Susan Collins","Angus King"],capital_mayor:"Mark O'Brien"},
  {abbr:"MD",governor:"Wes Moore",senators:["Angela Alsobrooks","Chris Van Hollen"],capital_mayor:"Jared Littmann"},
  {abbr:"MA",governor:"Maura Healey",senators:["Elizabeth Warren","Ed Markey"],capital_mayor:"Michelle Wu"},
  {abbr:"MI",governor:"Gretchen Whitmer",senators:["Gary Peters","Elissa Slotkin"],capital_mayor:"Andy Schor"},
  {abbr:"MN",governor:"Tim Walz",senators:["Amy Klobuchar","Tina Smith"],capital_mayor:"Kaohly Her"},
  {abbr:"MS",governor:"Tate Reeves",senators:["Roger Wicker","Cindy Hyde-Smith"],capital_mayor:"John Horhn"},
  {abbr:"MO",governor:"Mike Kehoe",senators:["Josh Hawley","Eric Schmitt"],capital_mayor:"Ron Fitzwater"},
  {abbr:"MT",governor:"Greg Gianforte",senators:["Steve Daines","Tim Sheehy"],capital_mayor:"Emily Dean"},
  {abbr:"NE",governor:"Jim Pillen",senators:["Deb Fischer","Pete Ricketts"],capital_mayor:"Leirion Gaylor Baird"},
  {abbr:"NV",governor:"Joe Lombardo",senators:["Catherine Cortez Masto","Jacky Rosen"],capital_mayor:"Lori Bagwell"},
  {abbr:"NH",governor:"Kelly Ayotte",senators:["Jeanne Shaheen","Maggie Hassan"],capital_mayor:"Byron Champlin"},
  {abbr:"NJ",governor:"Mikie Sherrill",senators:["Cory Booker","Andy Kim"],capital_mayor:"Reed Gusciora"},
  {abbr:"NM",governor:"Michelle Lujan Grisham",senators:["Martin Heinrich","Ben Ray Luján"],capital_mayor:"Michael J. Garcia"},
  {abbr:"NY",governor:"Kathy Hochul",senators:["Chuck Schumer","Kirsten Gillibrand"],capital_mayor:"Dorcey Applyrs"},
  {abbr:"NC",governor:"Josh Stein",senators:["Thom Tillis","Ted Budd"],capital_mayor:"Janet Cowell"},
  {abbr:"ND",governor:"Kelly Armstrong",senators:["John Hoeven","Kevin Cramer"],capital_mayor:"Mike Schmitz"},
  {abbr:"OH",governor:"Mike DeWine",senators:["Jon Husted","Bernie Moreno"],capital_mayor:"Andrew J. Ginther"},
  {abbr:"OK",governor:"Kevin Stitt",senators:["James Lankford","Alan Armstrong"],capital_mayor:"David Holt"},
  {abbr:"OR",governor:"Tina Kotek",senators:["Ron Wyden","Jeff Merkley"],capital_mayor:"Julie Hoy"},
  {abbr:"PA",governor:"Josh Shapiro",senators:["John Fetterman","Dave McCormick"],capital_mayor:"Wanda Williams"},
  {abbr:"RI",governor:"Dan McKee",senators:["Jack Reed","Sheldon Whitehouse"],capital_mayor:"Brett Smiley"},
  {abbr:"SC",governor:"Henry McMaster",senators:["Lindsey Graham","Tim Scott"],capital_mayor:"Daniel Rickenmann"},
  {abbr:"SD",governor:"Larry Rhoden",senators:["John Thune","Mike Rounds"],capital_mayor:"Todd Johnson"},
  {abbr:"TN",governor:"Bill Lee",senators:["Marsha Blackburn","Bill Hagerty"],capital_mayor:"Freddie O'Connell"},
  {abbr:"TX",governor:"Greg Abbott",senators:["John Cornyn","Ted Cruz"],capital_mayor:"Kirk Watson"},
  {abbr:"UT",governor:"Spencer Cox",senators:["Mike Lee","John Curtis"],capital_mayor:"Erin Mendenhall"},
  {abbr:"VT",governor:"Phil Scott",senators:["Bernie Sanders","Peter Welch"],capital_mayor:"Marc Gwinn"},
  {abbr:"VA",governor:"Abigail Spanberger",senators:["Mark Warner","Tim Kaine"],capital_mayor:"Danny Avula"},
  {abbr:"WA",governor:"Bob Ferguson",senators:["Patty Murray","Maria Cantwell"],capital_mayor:"Dontae Payne"},
  {abbr:"WV",governor:"Patrick Morrisey",senators:["Shelley Moore Capito","Jim Justice"],capital_mayor:"Amy Shuler Goodwin"},
  {abbr:"WI",governor:"Tony Evers",senators:["Ron Johnson","Tammy Baldwin"],capital_mayor:"Satya Rhodes-Conway"},
  {abbr:"WY",governor:"Mark Gordon",senators:["John Barrasso","Cynthia Lummis"],capital_mayor:"Patrick Collins"}
];

const update = db.prepare('UPDATE states SET governor = ?, senators = ?, capital_mayor = ?, updated_at = CURRENT_TIMESTAMP WHERE abbr = ?');

const tx = db.transaction((rows) => {
  for (const r of rows) {
    const result = update.run(r.governor, JSON.stringify(r.senators), r.capital_mayor, r.abbr);
    if (result.changes === 0) console.warn(`WARNING: no row updated for ${r.abbr}`);
  }
});

tx(LEADERSHIP);

console.log(`Populated leadership data for ${LEADERSHIP.length} states.`);
const missing = db.prepare("SELECT abbr FROM states WHERE governor IS NULL OR senators IS NULL OR capital_mayor IS NULL").all();
if (missing.length) console.warn('Missing leadership data for:', missing.map(m => m.abbr).join(', '));
else console.log('All 50 states have leadership data.');

db.close();
