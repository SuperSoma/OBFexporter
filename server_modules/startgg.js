const schema = require('./schema');
const fetch = require('node-fetch');

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
  }

  if (response?.ok) {

  } else {
    console.log(response?.status)
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
      sets(perPage:50) {
        pageInfo {
          total
          totalPages
        }
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
  console.log('sets', pages);
  for (let i=1; i <= pages; i++ ){
    const query = `
    query getSets($slug: String, $i: Int) {
      event(slug: $slug) {
        sets(page: $i, perPage:50) {
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

  const t = bracket.match(/tournament\/[a-zA-Z0-9_\-]+\/event\/[a-zA-Z0-9_\-]+/)[0];
  const info = await getTournamentInfo(t);


  if (info) {
    obf.event.name = info.tournament.name;
    obf.event.date = (new Date(info.startAt * 1000)).toISOString();
    obf.event.gameName = info.videogame.name;
    obf.event.numberEntrants = info.numEntrants;
    obf.event.originURL = "https://start.gg/" + info.slug;
  }
  const entrants = await getEntrants(t, info.entrants.pageInfo.totalPages);
  
  if (entrants) {
    for (let i=0; i < entrants.length; i++) {
      
      obf.entrants.push({
        "entrantID" : entrants[i]['id'],
        "entrantTag" : entrants[i]['name'],
        "initialSeed" : entrants[i]['initialSeedNum'],
        "finalPlacement" : entrants[i]['standing']['placement'],
        "personalInformation" : entrants[i]['participants'].map((p) => {
          return {
            tag : p.gamerTag,
            prefix : p.prefix,
            name : p.user ? p.user.name : "",
            location : p.user ? (p.user.location ? p.user.location.country : "") : ""
          }
        })
      })
    }
  }

  const sets = await getSets(t, info.sets.pageInfo.totalPages);

  const getScore = (displayScore) => {
    if (!displayScore || displayScore == 'DQ'){
      return {
        s1 : null,
        s2 : null
      }
    }

    const scores = displayScore.split(' - ');
    console.log(scores);
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
            "stage" : g.stage ? g.stage.name : ''
          }
        })
      }

      obf.sets.push({
        "setID" : sets[i]['id'],
        "entrant1ID" : sets[i]["slots"][0]['entrant']['id'],
        "entrant2ID" : sets[i]["slots"][1]['entrant']['id'],
        "status" : sets[i]['state'] == 1 ? 'pending' : (sets[i]['state'] == 2 ? 'started' : 'completed'),
        "entrant1Result" : sets[i]['winnerId'] ? (sets[i]['winnerId'] == sets[i]["slots"][0]['entrant']['id'] ? 'win' : (sets[i].displayScore =='DQ' ? 'dq' : 'lose')) : '',
        "entrant2Result" : sets[i]['winnerId'] ? (sets[i]['winnerId'] == sets[i]["slots"][1]['entrant']['id'] ? 'win' : (sets[i].displayScore =='DQ' ? 'dq' : 'lose')) : '',
        "entrant1Score" : score.s1,
        "entrant2Score" : score.s2,
        "setFormat" : "bestOf"+sets[i]['totalGames'],
        "phaseID" : sets[i]['phaseGroup']['phase']['name'],
        "games" : games
      })
    }
  }

  //console.log(obf)

  return obf;
}

module.exports = {
  startGGBracket
}