const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'states.db'));
db.pragma('journal_mode = WAL');

const ATTRACTIONS = {
  AL: ["U.S. Space & Rocket Center (Huntsville)", "Gulf Shores beaches", "Robert Trent Jones Golf Trail"],
  AK: ["Denali National Park", "Glacier Bay National Park", "Kenai Fjords National Park"],
  AZ: ["Grand Canyon National Park", "Sedona red rocks", "Antelope Canyon"],
  AR: ["Hot Springs National Park", "Crystal Bridges Museum of American Art (Bentonville)", "Buffalo National River"],
  CA: ["Yosemite National Park", "Disneyland (Anaheim)", "Golden Gate Bridge (San Francisco)"],
  CO: ["Rocky Mountain National Park", "Garden of the Gods (Colorado Springs)", "Mesa Verde National Park"],
  CT: ["Mystic Seaport", "Yale University campus & art galleries (New Haven)", "Mark Twain House (Hartford)"],
  DE: ["Rehoboth Beach", "Winterthur Museum & Gardens", "Delaware Seashore State Park"],
  FL: ["Walt Disney World (Orlando)", "Everglades National Park", "Miami Beach"],
  GA: ["Savannah Historic District", "Stone Mountain Park", "Georgia Aquarium (Atlanta)"],
  HI: ["Haleakala National Park (Maui)", "Pearl Harbor (Oahu)", "Hawaii Volcanoes National Park (Big Island)"],
  ID: ["Craters of the Moon National Monument", "Sun Valley Resort", "Shoshone Falls"],
  IL: ["Millennium Park & Cloud Gate (Chicago)", "Willis Tower Skydeck (Chicago)", "Art Institute of Chicago"],
  IN: ["Indianapolis Motor Speedway", "Indiana Dunes National Park", "Children's Museum of Indianapolis"],
  IA: ["Field of Dreams Movie Site (Dyersville)", "Amana Colonies", "Iowa State Fair (Des Moines)"],
  KS: ["Cosmosphere (Hutchinson)", "Monument Rocks", "Tallgrass Prairie National Preserve"],
  KY: ["Churchill Downs (Louisville)", "Mammoth Cave National Park", "Kentucky Bourbon Trail"],
  LA: ["French Quarter (New Orleans)", "Garden District (New Orleans)", "Avery Island / Tabasco Factory"],
  ME: ["Acadia National Park", "Old Port (Portland)", "Portland Head Light"],
  MD: ["Inner Harbor (Baltimore)", "Assateague Island National Seashore", "Fort McHenry"],
  MA: ["Freedom Trail (Boston)", "Cape Cod", "Plimoth Patuxet Museums"],
  MI: ["Mackinac Island", "Sleeping Bear Dunes National Lakeshore", "Henry Ford Museum (Dearborn)"],
  MN: ["Mall of America (Bloomington)", "Boundary Waters Canoe Area", "Minnehaha Falls (Minneapolis)"],
  MS: ["Vicksburg National Military Park", "Natchez Trace Parkway", "Gulf Islands National Seashore"],
  MO: ["Gateway Arch (St. Louis)", "Branson entertainment district", "Country Club Plaza (Kansas City)"],
  MT: ["Glacier National Park", "Yellowstone National Park (west entrance)", "Big Sky Resort"],
  NE: ["Chimney Rock National Historic Site", "Henry Doorly Zoo (Omaha)", "Carhenge (Alliance)"],
  NV: ["Las Vegas Strip", "Hoover Dam", "Lake Tahoe"],
  NH: ["White Mountain National Forest", "Mount Washington", "Lake Winnipesaukee"],
  NJ: ["Atlantic City Boardwalk", "Cape May", "Liberty State Park (Jersey City)"],
  NM: ["Carlsbad Caverns National Park", "White Sands National Park", "Taos Pueblo"],
  NY: ["Statue of Liberty & Ellis Island", "Times Square (NYC)", "Niagara Falls"],
  NC: ["Great Smoky Mountains National Park", "Biltmore Estate (Asheville)", "Outer Banks"],
  ND: ["Theodore Roosevelt National Park", "Fargo Air Museum", "International Peace Garden"],
  OH: ["Rock & Roll Hall of Fame (Cleveland)", "Cedar Point (Sandusky)", "Hocking Hills State Park"],
  OK: ["National Cowboy & Western Heritage Museum (OKC)", "Oklahoma City National Memorial", "Talimena Scenic Drive"],
  OR: ["Crater Lake National Park", "Columbia River Gorge", "Multnomah Falls"],
  PA: ["Independence Hall & Liberty Bell (Philadelphia)", "Hersheypark", "Gettysburg National Military Park"],
  RI: ["The Breakers Mansion (Newport)", "Newport Cliff Walk", "Block Island"],
  SC: ["Historic Charleston & Rainbow Row", "Myrtle Beach", "Hilton Head Island"],
  SD: ["Mount Rushmore", "Badlands National Park", "Custer State Park"],
  TN: ["Great Smoky Mountains National Park (Gatlinburg)", "Graceland (Memphis)", "Country Music Hall of Fame (Nashville)"],
  TX: ["The Alamo (San Antonio)", "San Antonio River Walk", "Big Bend National Park"],
  UT: ["Zion National Park", "Bryce Canyon National Park", "Arches National Park"],
  VT: ["Ben & Jerry's Factory (Waterbury)", "Stowe Mountain Resort", "Shelburne Museum"],
  VA: ["Colonial Williamsburg", "Shenandoah National Park", "Virginia Beach oceanfront"],
  WA: ["Space Needle (Seattle)", "Mount Rainier National Park", "Olympic National Park"],
  WV: ["New River Gorge National Park", "Harpers Ferry National Historical Park", "Seneca Rocks"],
  WI: ["Wisconsin Dells", "Door County", "Lambeau Field (Green Bay)"],
  WY: ["Yellowstone National Park", "Grand Teton National Park", "Devils Tower National Monument"]
};

const update = db.prepare('UPDATE states SET attractions = ? WHERE abbr = ?');

const tx = db.transaction((data) => {
  for (const [abbr, list] of Object.entries(data)) {
    const result = update.run(JSON.stringify(list), abbr);
    if (result.changes === 0) console.warn(`WARNING: no row updated for ${abbr}`);
  }
});

tx(ATTRACTIONS);

const count = db.prepare("SELECT COUNT(*) as c FROM states WHERE attractions IS NOT NULL").get();
console.log(`Populated attractions for ${count.c} states.`);

db.close();
