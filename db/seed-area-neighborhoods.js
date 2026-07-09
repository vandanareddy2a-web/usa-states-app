const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'states.db'));
db.pragma('journal_mode = WAL');

const DATA = [
  {abbr:"AL",area_sq_mi:50645,neighborhoods:["Mountain Brook (Birmingham)","Vestavia Hills (Birmingham)","Avondale (Birmingham)","Hoover (Birmingham)","Hampton Cove (Huntsville)","Spring Hill (Mobile)"]},
  {abbr:"AK",area_sq_mi:570641,neighborhoods:["Turnagain (Anchorage)","Hillside (Anchorage)","South Anchorage (Anchorage)","Rabbit Creek (Anchorage)","Goldstream Valley (Fairbanks)","Douglas (Juneau)"]},
  {abbr:"AZ",area_sq_mi:113594,neighborhoods:["Arcadia (Phoenix)","Camelback Corridor (Phoenix)","Ahwatukee Foothills (Phoenix)","DC Ranch (Scottsdale)","Old Town (Scottsdale)","Maple-Ash (Tempe)"]},
  {abbr:"AR",area_sq_mi:52035,neighborhoods:["The Heights (Little Rock)","Hillcrest (Little Rock)","SoMa (Little Rock)","Downtown (Fayetteville)","Crystal Bridges Area (Bentonville)","Kent Acres (Dover)"]},
  {abbr:"CA",area_sq_mi:155779,neighborhoods:["Pacific Palisades (Los Angeles)","Pacific Heights (San Francisco)","Mission District (San Francisco)","La Jolla (San Diego)","Carmel Valley (San Diego)","East Sacramento (Sacramento)"]},
  {abbr:"CO",area_sq_mi:103642,neighborhoods:["Cherry Creek (Denver)","Washington Park (Denver)","LoDo (Denver)","Briargate (Colorado Springs)","Flying Horse (Colorado Springs)","Gunbarrel (Boulder)"]},
  {abbr:"CT",area_sq_mi:4842,neighborhoods:["Belle Haven (Greenwich)","Cos Cob (Greenwich)","West End (Hartford)","Downtown (Westport)","East Rock (New Haven)","Parkville (Hartford)"]},
  {abbr:"DE",area_sq_mi:1949,neighborhoods:["Westover Hills (Wilmington)","Greenville (Wilmington)","Kent Acres (Dover)","Downtown (Middletown)","Historic District (New Castle)","Downtown (Newark)"]},
  {abbr:"FL",area_sq_mi:53625,neighborhoods:["Coconut Grove (Miami)","Coral Gables (Miami)","Brickell (Miami)","Harbour Island (Tampa)","Hyde Park (Tampa)","Winter Garden (Orlando)"]},
  {abbr:"GA",area_sq_mi:57513,neighborhoods:["Buckhead (Atlanta)","Inman Park (Atlanta)","Midtown (Atlanta)","Alpharetta (Atlanta)","Historic District (Savannah)","Five Points (Athens)"]},
  {abbr:"HI",area_sq_mi:6423,neighborhoods:["Kahala (Honolulu)","Diamond Head (Honolulu)","Kailua (Oahu)","Wailea (Maui)","Kohala Coast (Big Island)","Princeville (Kauai)"]},
  {abbr:"ID",area_sq_mi:82643,neighborhoods:["North End (Boise)","East End (Boise)","Harrison Boulevard (Boise)","Ketchum (Sun Valley)","Coeur d'Alene Lake District (Coeur d'Alene)","Eagle (Eagle)"]},
  {abbr:"IL",area_sq_mi:55519,neighborhoods:["Gold Coast (Chicago)","Lincoln Park (Chicago)","Wicker Park (Chicago)","Hyde Park (Chicago)","Naperville (Naperville)","Downtown (Naperville)"]},
  {abbr:"IN",area_sq_mi:35826,neighborhoods:["Meridian-Kessler (Indianapolis)","Broad Ripple (Indianapolis)","Fountain Square (Indianapolis)","Carmel (Carmel)","Old Northside (Indianapolis)","West Lakes (Fort Wayne)"]},
  {abbr:"IA",area_sq_mi:55857,neighborhoods:["Beaverdale (Des Moines)","Historic East Village (Des Moines)","West Des Moines (West Des Moines)","Sherman Hill (Des Moines)","Cedar Rapids Northwest (Cedar Rapids)","Coralville (Iowa City)"]},
  {abbr:"KS",area_sq_mi:81759,neighborhoods:["Prairie Village (Kansas City metro)","Mission Hills (Kansas City metro)","Leawood (Kansas City metro)","College Hill (Wichita)","Overland Park (Kansas City metro)","Old Town (Wichita)"]},
  {abbr:"KY",area_sq_mi:39486,neighborhoods:["Highlands (Louisville)","St. Matthews (Louisville)","Old Louisville (Louisville)","Chevy Chase (Lexington)","Crescent Hill (Louisville)","Ashland Park (Lexington)"]},
  {abbr:"LA",area_sq_mi:43204,neighborhoods:["Garden District (New Orleans)","French Quarter (New Orleans)","Uptown (New Orleans)","Southdowns (Baton Rouge)","Broadmoor (New Orleans)","Old Metairie (Metairie)"]},
  {abbr:"ME",area_sq_mi:30843,neighborhoods:["West End (Portland)","Old Port (Portland)","Bar Harbor (Bar Harbor)","Falmouth Foreside (Falmouth)","Munjoy Hill (Portland)","Kennebunkport (Kennebunkport)"]},
  {abbr:"MD",area_sq_mi:9707,neighborhoods:["Roland Park (Baltimore)","Federal Hill (Baltimore)","Bethesda (Bethesda)","Chevy Chase (Chevy Chase)","Historic Annapolis (Annapolis)","Canton (Baltimore)"]},
  {abbr:"MA",area_sq_mi:7800,neighborhoods:["Beacon Hill (Boston)","South End (Boston)","Baldwin (Cambridge)","Wellington-Harrington (Cambridge)","Canal District (Worcester)","Forest Park (Springfield)"]},
  {abbr:"MI",area_sq_mi:56539,neighborhoods:["Indian Village (Detroit)","Palmer Woods (Detroit)","East Grand Rapids (Grand Rapids)","Eastown (Grand Rapids)","Heritage Hill (Grand Rapids)","Downtown Ann Arbor (Ann Arbor)"]},
  {abbr:"MN",area_sq_mi:79627,neighborhoods:["Linden Hills (Minneapolis)","Lynnhurst (Minneapolis)","Fulton (Minneapolis)","Macalester-Groveland (St. Paul)","Summit Hill (St. Paul)","Mendota Heights (Twin Cities)"]},
  {abbr:"MS",area_sq_mi:46923,neighborhoods:["Belhaven (Jackson)","Fondren (Jackson)","West Gulfport (Gulfport)","Bayou View (Gulfport)","Northwest Biloxi (Biloxi)","Woolmarket (Biloxi)"]},
  {abbr:"MO",area_sq_mi:68742,neighborhoods:["Country Club Plaza (Kansas City)","River Market (Kansas City)","Waldo (Kansas City)","Central West End (St. Louis)","Clayton (St. Louis)","Rountree (Springfield)"]},
  {abbr:"MT",area_sq_mi:145546,neighborhoods:["West End (Billings)","Rehberg Ranch (Billings)","Midtown (Billings)","Rattlesnake (Missoula)","University District (Missoula)","Downtown Bozeman (Bozeman)"]},
  {abbr:"NE",area_sq_mi:76824,neighborhoods:["Dundee (Omaha)","Aksarben (Omaha)","Field Club (Omaha)","Haymarket (Lincoln)","Near South (Lincoln)","College View (Lincoln)"]},
  {abbr:"NV",area_sq_mi:109781,neighborhoods:["Summerlin (Las Vegas)","Southern Highlands (Las Vegas)","Anthem (Henderson)","Green Valley Ranch (Henderson)","MacDonald Highlands (Henderson)","Caughlin Ranch (Reno)"]},
  {abbr:"NH",area_sq_mi:8953,neighborhoods:["North End (Manchester)","Downtown Portsmouth (Portsmouth)","West End (Concord)","North End (Concord)","Downtown Nashua (Nashua)"]},
  {abbr:"NJ",area_sq_mi:7354,neighborhoods:["Ironbound (Newark)","Forest Hill (Newark)","Downtown (Jersey City)","Van Vorst Park (Jersey City)","Waterfront (Hoboken)","Downtown Princeton (Princeton)"]},
  {abbr:"NM",area_sq_mi:121298,neighborhoods:["Nob Hill (Albuquerque)","Sandia Heights (Albuquerque)","Canyon Road (Santa Fe)","Eastside (Santa Fe)","Mesilla (Las Cruces)","Downtown Rio Rancho (Rio Rancho)"]},
  {abbr:"NY",area_sq_mi:47126,neighborhoods:["Tribeca (New York City)","Park Slope (Brooklyn)","Chelsea (New York City)","Elmwood Village (Buffalo)","Park Avenue (Rochester)","Eastwood (Syracuse)"]},
  {abbr:"NC",area_sq_mi:48618,neighborhoods:["Myers Park (Charlotte)","Dilworth (Charlotte)","Five Points (Raleigh)","Southern Village (Chapel Hill)","Irving Park (Greensboro)","Downtown Asheville (Asheville)"]},
  {abbr:"ND",area_sq_mi:69001,neighborhoods:["Downtown Fargo (Fargo)","South Fargo (Fargo)","Riverside (Bismarck)","Simle Heights (Bismarck)","Rosewood (Grand Forks)","Southridge (Minot)"]},
  {abbr:"OH",area_sq_mi:40861,neighborhoods:["German Village (Columbus)","Short North (Columbus)","Hyde Park (Cincinnati)","Ohio City (Cleveland)","Tremont (Cleveland)","Oakwood (Dayton)"]},
  {abbr:"OK",area_sq_mi:68595,neighborhoods:["Nichols Hills (Oklahoma City)","Midtown (Oklahoma City)","Utica Square (Tulsa)","Brookside (Tulsa)","Downtown Norman (Norman)","Historic Broken Arrow (Broken Arrow)"]},
  {abbr:"OR",area_sq_mi:95988,neighborhoods:["Pearl District (Portland)","Alameda (Portland)","South Waterfront (Portland)","College Hill (Eugene)","South Hills (Bend)","South Salem (Salem)"]},
  {abbr:"PA",area_sq_mi:44743,neighborhoods:["Rittenhouse Square (Philadelphia)","Society Hill (Philadelphia)","Shadyside (Pittsburgh)","Squirrel Hill (Pittsburgh)","Hershey Heights (Hershey)","Downtown Lancaster (Lancaster)"]},
  {abbr:"RI",area_sq_mi:1034,neighborhoods:["Federal Hill (Providence)","College Hill (Providence)","The Point (Newport)","Wayland Square (Providence)","Rumford (East Providence)","Downtown Westerly (Westerly)"]},
  {abbr:"SC",area_sq_mi:30061,neighborhoods:["South of Broad (Charleston)","Shandon (Columbia)","North Main (Greenville)","Old Village (Mount Pleasant)","Forest Acres (Columbia)","Hilton Head Plantation (Hilton Head Island)"]},
  {abbr:"SD",area_sq_mi:75811,neighborhoods:["McKennan Park (Sioux Falls)","All Saints (Sioux Falls)","Uptown (Sioux Falls)","West Boulevard Historic District (Rapid City)","Canyon Lake (Rapid City)","Downtown Aberdeen (Aberdeen)"]},
  {abbr:"TN",area_sq_mi:41235,neighborhoods:["Belle Meade (Nashville)","East Nashville (Nashville)","Germantown (Nashville)","Sequoyah Hills (Knoxville)","Chickasaw Gardens (Memphis)","North Shore (Chattanooga)"]},
  {abbr:"TX",area_sq_mi:261232,neighborhoods:["River Oaks (Houston)","Highland Park (Dallas)","Alamo Heights (San Antonio)","Tarrytown (Austin)","West University Place (Houston)","Terrell Hills (San Antonio)"]},
  {abbr:"UT",area_sq_mi:82170,neighborhoods:["Federal Heights (Salt Lake City)","The Avenues (Salt Lake City)","Sugar House (Salt Lake City)","Edgemont (Provo)","Foothill (Ogden)","Green Valley (St. George)"]},
  {abbr:"VT",area_sq_mi:9217,neighborhoods:["Hill Section (Burlington)","South End (Burlington)","Downtown Montpelier (Montpelier)","Historic Downtown (Middlebury)","Depot Street (Stowe)","Downtown Woodstock (Woodstock)"]},
  {abbr:"VA",area_sq_mi:39490,neighborhoods:["Ghent (Norfolk)","The Fan District (Richmond)","Old Town (Alexandria)","Del Ray (Alexandria)","Colonial Place (Norfolk)","Grandin Village (Roanoke)"]},
  {abbr:"WA",area_sq_mi:66456,neighborhoods:["Capitol Hill (Seattle)","Queen Anne (Seattle)","Fremont (Seattle)","Rockwood (Spokane)","Proctor District (Tacoma)","Fairhaven (Bellingham)"]},
  {abbr:"WV",area_sq_mi:24038,neighborhoods:["South Hills (Charleston)","Edgewood (Charleston)","South Park (Huntington)","Suncrest (Morgantown)","Woodsdale (Wheeling)","Vienna (Parkersburg)"]},
  {abbr:"WI",area_sq_mi:54158,neighborhoods:["Historic Third Ward (Milwaukee)","Bay View (Milwaukee)","East Side (Madison)","Maple Bluff (Madison)","Astor Historic District (Green Bay)","Downtown Eau Claire (Eau Claire)"]},
  {abbr:"WY",area_sq_mi:97093,neighborhoods:["Downtown Cheyenne (Cheyenne)","Rainsage Park (Cheyenne)","Old Town Jackson (Jackson)","Downtown Casper (Casper)","Historic Downtown (Sheridan)","University Neighborhood (Laramie)"]}
];

const update = db.prepare('UPDATE states SET area_sq_mi = ?, neighborhoods = ?, updated_at = CURRENT_TIMESTAMP WHERE abbr = ?');

const tx = db.transaction((rows) => {
  for (const r of rows) {
    const result = update.run(r.area_sq_mi, JSON.stringify(r.neighborhoods), r.abbr);
    if (result.changes === 0) console.warn(`WARNING: no row updated for ${r.abbr}`);
  }
});

tx(DATA);

console.log(`Updated area + neighborhoods for ${DATA.length} states.`);
const missing = db.prepare("SELECT abbr FROM states WHERE area_sq_mi IS NULL").all();
if (missing.length) console.warn('Missing area for:', missing.map(m => m.abbr).join(', '));
else console.log('All 50 states have area data.');

db.close();
