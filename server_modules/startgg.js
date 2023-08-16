const schema = require('./schema');
const fetch = require('node-fetch');

const characters = [
  { "id": 0, "value": "none", "label": "none" },
	{ "id": 1, "value": "bowser", "label": "Bowser" },
	{ "id": 2, "value": "captainfalcon", "label": "Captain Falcon" },
	{ "id": 3, "value": "donkeykong", "label": "Donkey Kong" },
	{ "id": 4, "value": "drmario", "label": "Dr. Mario" },
	{ "id": 5, "value": "falco", "label": "Falco" },
	{ "id": 6, "value": "fox", "label": "Fox" },
	{ "id": 7, "value": "ganondorf", "label": "Ganondorf" },
	{ "id": 8, "value": "iceclimbers", "label": "Ice Climbers" },
	{ "id": 9, "value": "jigglypuff", "label": "Jigglypuff" },
	{ "id": 10, "value": "kirby", "label": "Kirby" },
	{ "id": 11, "value": "link", "label": "Link" },
	{ "id": 12, "value": "luigi", "label": "Luigi" },
	{ "id": 13, "value": "mario", "label": "Mario" },
	{ "id": 14, "value": "marth", "label": "Marth" },
	{ "id": 15, "value": "mewtwo", "label": "Mewtwo" },
	{ "id": 16, "value": "mrgameandwatch", "label": "Mr. Game & Watch" },
	{ "id": 17, "value": "ness", "label": "Ness" },
	{ "id": 18, "value": "peach", "label": "Peach" },
	{ "id": 19, "value": "pichu", "label": "Pichu" },
	{ "id": 20, "value": "pikachu", "label": "Pikachu" },
	{ "id": 21, "value": "roy", "label": "Roy" },
	{ "id": 22, "value": "samus", "label": "Samus" },
	{ "id": 23, "value": "sheik", "label": "Sheik" },
	{ "id": 24, "value": "yoshi", "label": "Yoshi" },
	{ "id": 25, "value": "younglink", "label": "Young Link" },
	{ "id": 26, "value": "zelda", "label": "Zelda" },
  {
    "id" : 0,
    "value" : "none",
    "label" : "none"
  },
    {
    "id": 1271,
    "value": "bayonetta",
    "label": "Bayonetta"
  }, {
    "id": 1272,
    "value": "bowserjr",
    "label": "Bowser Jr"
  }, {
    "id": 1273,
    "value": "bowser",
    "label": "Bowser"
  }, {
    "id": 1274,
    "value": "captainfalcon",
    "label": "Captain Falcon"
  }, {
    "id": 1275,
    "value": "cloud",
    "label": "Cloud"
  }, {
    "id": 1276,
    "value": "corrin",
    "label": "Corrin"
  }, {
    "id": 1277,
    "value": "daisy",
    "label": "Daisy"
  }, {
    "id": 1278,
    "value": "darkpit",
    "label": "Dark Pit"
  }, {
    "id": 1279,
    "value": "diddykong",
    "label": "Diddy Kong"
  }, {
    "id": 1280,
    "value": "donkeykong",
    "label": "Donkey Kong"
  }, {
    "id": 1282,
    "value": "drmario",
    "label": "Dr. Mario"
  }, {
    "id": 1283,
    "value": "duckhunt",
    "label": "Duck Hunt"
  }, {
    "id": 1285,
    "value": "falco",
    "label": "Falco"
  }, {
    "id": 1286,
    "value": "fox",
    "label": "Fox"
  }, {
    "id": 1287,
    "value": "ganondorf",
    "label": "Ganondorf"
  }, {
    "id": 1289,
    "value": "greninja",
    "label": "Greninja"
  }, {
    "id": 1290,
    "value": "iceclimbers",
    "label": "Ice Climbers"
  }, {
    "id": 1291,
    "value": "ike",
    "label": "Ike"
  }, {
    "id": 1292,
    "value": "inkling",
    "label": "Inkling"
  }, {
    "id": 1293,
    "value": "jigglypuff",
    "label": "Jigglypuff"
  }, {
    "id": 1294,
    "value": "kingdedede",
    "label": "King Dedede"
  }, {
    "id": 1295,
    "value": "kirby",
    "label": "Kirby"
  }, {
    "id": 1296,
    "value": "link",
    "label": "Link"
  }, {
    "id": 1297,
    "value": "littlemac",
    "label": "Little Mac"
  }, {
    "id": 1298,
    "value": "lucario",
    "label": "Lucario"
  }, {
    "id": 1299,
    "value": "lucas",
    "label": "Lucas"
  }, {
    "id": 1300,
    "value": "lucina",
    "label": "Lucina"
  }, {
    "id": 1301,
    "value": "luigi",
    "label": "Luigi"
  }, {
    "id": 1302,
    "value": "mario",
    "label": "Mario"
  }, {
    "id": 1304,
    "value": "marth",
    "label": "Marth"
  }, {
    "id": 1305,
    "value": "megaman",
    "label": "Mega Man"
  }, {
    "id": 1307,
    "value": "metaknight",
    "label": "Meta Knight"
  }, {
    "id": 1310,
    "value": "mewtwo",
    "label": "Mewtwo"
  }, {
    "id": 1311,
    "value": "miibrawler",
    "label": "Mii Brawler"
  }, {
    "id": 1313,
    "value": "ness",
    "label": "Ness"
  }, {
    "id": 1314,
    "value": "olimar",
    "label": "Olimar"
  }, {
    "id": 1315,
    "value": "pacman",
    "label": "Pac-Man"
  }, {
    "id": 1316,
    "value": "palutena",
    "label": "Palutena"
  }, {
    "id": 1317,
    "value": "peach",
    "label": "Peach"
  }, {
    "id": 1318,
    "value": "pichu",
    "label": "Pichu"
  }, {
    "id": 1319,
    "value": "pikachu",
    "label": "Pikachu"
  }, {
    "id": 1320,
    "value": "pit",
    "label": "Pit"
  }, {
    "id": 1321,
    "value": "pokemontrainer",
    "label": "Pokemon Trainer"
  }, {
    "id": 1322,
    "value": "ridley",
    "label": "Ridley"
  }, {
    "id": 1323,
    "value": "rob",
    "label": "R.O.B"
  }, {
    "id": 1324,
    "value": "robin",
    "label": "Robin"
  }, {
    "id": 1325,
    "value": "rosalina",
    "label": "Rosalina"
  }, {
    "id": 1326,
    "value": "roy",
    "label": "Roy"
  }, {
    "id": 1327,
    "value": "ryu",
    "label": "Ryu"
  }, {
    "id": 1328,
    "value": "samus",
    "label": "Samus"
  }, {
    "id": 1329,
    "value": "sheik",
    "label": "Sheik"
  }, {
    "id": 1330,
    "value": "shulk",
    "label": "Shulk"
  }, {
    "id": 1331,
    "value": "snake",
    "label": "Snake"
  }, {
    "id": 1332,
    "value": "sonic",
    "label": "Sonic"
  }, {
    "id": 1333,
    "value": "toonlink",
    "label": "Toon Link"
  }, {
    "id": 1334,
    "value": "villager",
    "label": "Villager"
  }, {
    "id": 1335,
    "value": "wario",
    "label": "Wario"
  }, {
    "id": 1336,
    "value": "wiifittrainer",
    "label": "Wii Fit Trainer"
  }, {
    "id": 1337,
    "value": "wolf",
    "label": "Wolf"
  }, {
    "id": 1338,
    "value": "yoshi",
    "label": "Yoshi"
  }, {
    "id": 1339,
    "value": "younglink",
    "label": "Young Link"
  }, {
    "id": 1340,
    "value": "zelda",
    "label": "Zelda"
  }, {
    "id": 1341,
    "value": "zerosuitsamus",
    "label": "Zero Suit Samus"
  }, {
    "id": 1405,
    "value": "mrgameandwatch",
    "label": "Mr. Game _ Watch"
  }, {
    "id": 1406,
    "value": "incineroar",
    "label": "Incineroar"
  }, {
    "id": 1407,
    "value": "kingkrool",
    "label": "King K. Rool"
  }, {
    "id": 1408,
    "value": "darksamus",
    "label": "Dark Samus"
  }, {
    "id": 1409,
    "value": "chrom",
    "label": "Chrom"
  }, {
    "id": 1410,
    "value": "ken",
    "label": "Ken"
  }, {
    "id": 1411,
    "value": "simon",
    "label": "Simon"
  }, {
    "id": 1412,
    "value": "richter",
    "label": "Richter"
  }, {
    "id": 1413,
    "value": "isabelle",
    "label": "Isabelle"
  }, {
    "id": 1414,
    "value": "miiswordfighter",
    "label": "Mii Swordfighter"
  }, {
    "id": 1415,
    "value": "miigunner",
    "label": "Mii Gunner"
  }, {
    "id": 1441,
    "value": "piranhaplant",
    "label": "Piranha Plant"
  }, {
    "id": 1453,
    "value": "joker",
    "label": "Joker"
  }, {
    "id": 1526,
    "value": "hero",
    "label": "Hero"
  }, {
    "id": 1530,
    "value": "banjokazooie",
    "label": "Banjo kazooie"
  }, {
    "id": 1532,
    "value": "terry",
    "label": "Terry"
  }, {
    "id": 1539,
    "value": "byleth",
    "label": "Byleth"
  }, {
    "id": 1746,
    "value": "random",
    "label": "Random"
  }, {
    "id": 1747,
    "value": "minmin",
    "label": "Min Min"
  }, {
    "id": 1766,
    "value": "steve",
    "label": "Steve"
  }, {
    "id": 1777,
    "value": "sephiroth",
    "label": "Sephiroth"
  }, {
    "id": 1795,
    "value": "pyra",
    "label": "Pyra"
  }, {
    "id": 1846,
    "value": "kazuya",
    "label": "Kazuya"
  },{
    "id" : 1897,
    "value": "sora",
    "label": "Sora"
  }
]

async function postData(url = "", apiKey = "", data = {}) {
  // Default options are marked with *
  let response;
  try {
    response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${apiKey}`
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
  }
  catch(e) {
    console.log(e);
    return null;
  }
}

const getTournamentInfo = async (event) => {

  const query = `
  query getInfo($slug:String) {
    event(slug:$slug) {
      id
      numEntrants
      startAt
      slug
      tournament {
        name
      }
      videogame{
        displayName
        name
      }
      entrants(query:{
        perPage: 100
      }) {
        pageInfo {
          total
          totalPages
        }
      }
      sets(perPage:25) {
        pageInfo {
          total
          totalPages
        }
      }
      phases {
        id
        name
        bracketType
      }
    }
  }
`;

  const operationName = 'getInfo';

  const variables = {
    'slug' : event
  }

  try {
    const data = await postData(process.env.STARTGG_API, process.env.STARTGG_KEY, {
      query, operationName, variables
    });

    if (data.data.event)
      return data.data.event;

    return null;
  }
  catch (e) {
    console.error(e);
    return null;
  }

}

const getEntrants = async (event, pages) => {
  let entrants = [];
  for (let i=1;i <= pages; i++) {
    const query = `
    query getEntrants($slug:String, $i:Int) {
      event(slug:$slug) {
        entrants(query:{
          page : $i,
          perPage: 100
        }) {
          pageInfo {
            total
            totalPages
            page
          }
          nodes {
            id
            name
            initialSeedNum
            standing {
              placement
            }
            participants {
              gamerTag
              prefix
              user {
                name
                location {
                  country
                }
              }
            }
          }
        }
      }
    }
    `;

    const operationName = 'getEntrants';

    const variables = {
      'slug' : event,
      'i' : i
    }

    try {
      const data = await postData(process.env.STARTGG_API, process.env.STARTGG_KEY, {
        query, operationName, variables
      });
  
      if (data.data.event && data.data.event.entrants)
        entrants = entrants.concat(data.data.event.entrants.nodes);

      //console.log(entrants.length);
    }
    catch (e) {
      //console.error(e);
      return [];
    }
  }

  return entrants;
}

const getSets = async (event, pages) => {
  let sets = [];
  //console.log('sets', pages);
  for (let i=1; i <= pages; i++ ){
    const query = `
    query getSets($slug: String, $i: Int) {
      event(slug: $slug) {
        sets(page: $i, perPage:25) {
          pageInfo {
            total
            totalPages
            page
          }
          nodes {
            id
            identifier
            displayScore
            winnerId
            state
            totalGames
            fullRoundText
            games {
              winnerId
              orderNum
              selections {
                selectionValue
                entrant {
                  id
                }
              }
              stage {
                name
              }
            }
            phaseGroup {
              id
              phase {
                id
                name
              }
            }
            slots {
              prereqType
              prereqId
              entrant {
                id
              }
            }
          }
        }
      }
    }
    `;

    const operationName = 'getSets';

    const variables = {
      'slug' : event,
      'i' : i
    }

    try {
      const data = await postData(process.env.STARTGG_API, process.env.STARTGG_KEY, {
        query, operationName, variables
      });

      //console.log(data);
  
      if (data.data.event && data.data.event.sets)
        sets = sets.concat(data.data.event.sets.nodes);

      
    }
    catch (e) {
      console.error(e);
      return null;
    }
  }

  return sets;
}

const startGGBracket = async (bracket) => {
  let obf = schema.makeBasicOBF();

  if (!bracket.match(/tournament\/[a-zA-Z0-9_\-]+\/event\/[a-zA-Z0-9_\-]+/))
    return obf;

  const t = bracket.match(/tournament\/[a-zA-Z0-9_\-]+\/event\/[a-zA-Z0-9_\-]+/)[0];
  const info = await getTournamentInfo(t);

  const addZero = (num) => num < 10 ? "0"+String(num) : String(num);
  if (info) {
    const d = new Date(info.startAt * 1000);
    obf.event.name = info.tournament.name;
    obf.event.date = `${d.getFullYear()}-${addZero(d.getMonth()+1)}-${addZero(d.getDate())}`;
    obf.event.gameName = info.videogame.name;
    obf.event.numberEntrants = parseInt(info.numEntrants);
    obf.event.originURL = "https://start.gg/" + info.slug;
    obf.event.phases = info.phases.map((phase) => {
      return {
        "phaseID" : phase.name,
        "phaseStructure" : phase.bracketType
      }
    })
  }
  const entrants = await getEntrants(t, info.entrants.pageInfo.totalPages);

  
  
  if (entrants) {
    for (let i=0; i < entrants.length; i++) {
      
      obf.entrants.push({
        "entrantID" : String(entrants[i]['id']),
        "entrantTag" : entrants[i]['name'],
        "initialSeed" : parseInt(entrants[i]['initialSeedNum']),
        "finalPlacement" : entrants[i]['standing'] ? parseInt(entrants[i]['standing']['placement']) : 0,
        "personalInformation" : entrants[i]['participants'].map((p) => {
          return {
            tag : p.gamerTag,
            prefix : p.prefix ? p.prefix : "",
            name : p.user ? (p.user.name ? p.user.name : "") : "",
            country : p.user ? (p.user.location ? (p.user.location.country ? p.user.location.country : "") : "") : ""
          }
        })
      })
    }
  }

  const sets = await getSets(t, info.sets.pageInfo.totalPages);

  const getScore = (displayScore) => {
    if (!displayScore || displayScore == 'DQ'){
      return {
        s1 : 0,
        s2 : 0
      }
    }

    const scores = displayScore.split(' - ');
    
    const s1 = scores[0].charAt(scores[0].length - 1);
    const s2 = scores[1].charAt(scores[1].length - 1);
    
    return {
      s1, s2
    }
  }

  if (sets) {
    for (let i=0; i < sets.length; i++) {
      const score = getScore(sets[i].displayScore);

      let games = []

      if (sets[i]['games']) {
        games = sets[i]['games'].map((g) => {
          return {
            "entrant1Result" : g.winnerId == sets[i]["slots"][0]['entrant']['id'] ? 'win' : 'lose',
            "entrant2Result" : g.winnerId == sets[i]["slots"][1]['entrant']['id'] ? 'win' : 'lose',
            "stage" : g.stage ? g.stage.name : '',
            "gameNumber" : g.orderNum
          }
        })
      }

      obf.sets.push({
        "setID" : String(sets[i]['id']),
        "entrant1ID" : String(sets[i]["slots"][0]['entrant']['id']),
        "entrant2ID" : String(sets[i]["slots"][1]['entrant']['id']),
        "status" : sets[i]['state'] == 1 ? 'pending' : (sets[i]['state'] == 2 ? 'started' : 'completed'),
        "entrant1Result" : sets[i]['winnerId'] ? (sets[i]['winnerId'] == sets[i]["slots"][0]['entrant']['id'] ? 'win' : (sets[i].displayScore =='DQ' ? 'dq' : 'lose')) : '',
        "entrant2Result" : sets[i]['winnerId'] ? (sets[i]['winnerId'] == sets[i]["slots"][1]['entrant']['id'] ? 'win' : (sets[i].displayScore =='DQ' ? 'dq' : 'lose')) : '',
        "entrant1Score" : parseInt(score.s1),
        "entrant2Score" : parseInt(score.s2),
        "setFormat" : "bestOf"+sets[i]['totalGames'],
        "phaseID" : sets[i]['phaseGroup']['phase']['name'],
        "roundID" : sets[i]['fullRoundText'],
        "entrant1PrevSetID" : sets[i]["slots"][0]['prereqType'] == 'set' ? sets[i]["slots"][0]['prereqId'] : null,
        "entrant2PrevSetID" : sets[i]["slots"][1]['prereqType'] == 'set' ? sets[i]["slots"][1]['prereqId'] : null,
        "games" : games
      })
    }

    for (let i=0; i < obf.sets.length; i++) {
      let s = obf.sets[i];
      //let nextSet = obf.sets.findIndex((v) => v.setID == s.entrant1PrevSetID);
      if (!s.entrant1PrevSetID) {
        delete s.entrant1PrevSetID;
      } else {
        let nextSet = obf.sets.findIndex((v) => v.setID == s.entrant1PrevSetID);
        //console.log(nextSet);

        if (nextSet != -1) {
          const e1id = s.entrant1ID;

          if (e1id == obf.sets[nextSet].entrant1ID) {
            obf.sets[nextSet].entrant1NextSetID = s.setID;
          } else {
            obf.sets[nextSet].entrant2NextSetID = s.setID;
          }
        }
      }

      if (!s.entrant2PrevSetID) {
        delete s.entrant2PrevSetID;
      } else {
        let nextSet = obf.sets.findIndex((v) => v.setID == s.entrant2PrevSetID);
        if (nextSet != -1) {
          const e1id = s.entrant2ID;
          console.log(s.entrant2PrevSetID, obf.sets[nextSet].setID);

          if (e1id == obf.sets[nextSet].entrant1ID) {
            obf.sets[nextSet].entrant1NextSetID = s.setID;
          } else {
            obf.sets[nextSet].entrant2NextSetID = s.setID;
          }
        }
      }
    }
  }

  //console.log(obf)

  return obf;
}

module.exports = {
  startGGBracket
}