const schema = require('./schema');
const fetch = require('node-fetch');

async function getData(url = "") {
  // Default options are marked with *
  let response;
  try {
    response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "same-origin", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    return await response.json(); // parses JSON response into native JavaScript objects
  }
  catch(e) {
    console.log(e);
    return null;
  }
}

const getTournamentInfo = async (event) => {
  let obf = schema.makeBasicOBF();

  //The way the Challonge API works is that if an event is under a subdomain, you need to do {SUBDOMAIN}-{EVENTNAME} to request the JSON
  //In a way it makes sense but it makes getting the event from the URL far more annoying that startgg
  const eventName = event.match(/([^\/]*)\/*$/)[1];
  const subDomain = event.match(/(?:http[s]*\:\/\/)*(.*?)\.(?=[^\/]*\..{2,5})/i); //I need to learn regex because this extracts the subdomain
  let name;
  if (subDomain) {
    const sub = subDomain[1];
    name = `${sub}-${eventName}`;
  } else {
    name = eventName;
  }

  const queryString = `${name}.json?api_key=${process.env.CHALLONGE_KEY}&include_participants=1&include_matches=1`
  const eventData = await getData(`${process.env.CHALLONGE_API}tournaments/${queryString}`);

  if (eventData.errors)
    return eventData.errors;

  const t = eventData.tournament;

  obf.event = schema.makeOBFEvent(t.name, t.started_at, t.game_name, t.participants_count, t.full_challonge_url);

  const participants = eventData.tournament.participants;

  obf.entrants = participants.map( p => schema.makeOBFEntrant(p.participant.id, p.participant.name, p.participant.seed, p.participant.final_rank));

  const sets = eventData.tournament.matches;
  
  //console.log(sets[0]);

  const statusCheck = (s) => {
    if (s == 'open')
      return 'started';

    if (s == 'complete')
      return "completed";

    return s;
  }

  const checkWinner = (wid, pid) => {
    if (!wid)
      return "";

    return wid == pid ? "win" : "lose";
  }

  const scores = (score, player, set) => {
    if (!score)
      return "n/a";

    if (player == 0) { //p1
      return score.match(/[\-]?[0-9]/gi)[0];
    }

    if (set)
      console.log(set);

    //need to find more elegant solution to get player 2 score
    if (player == 1) { //p2
      
      if (score.charAt(0) == '-') {
        const scoreSplit = score.split('-');
        if (scoreSplit.length == 4) {
          return '-' + scoreSplit[3];
        } else {
          return scoreSplit[2];
        }
        
      } else {
        const scoreSplit = score.split('-');
        if (scoreSplit.length == 3) {
          return '-' + scoreSplit[2];
        } else {
          return scoreSplit[1];
        }
      }
    }

    return "theoretically shouldn't get here";
  }

  obf.sets = sets.map((s) => schema.makeOBFSet(s.match.id, s.match.player1_id, s.match.player2_id, statusCheck(s.match.state), checkWinner(s.match.winner_id, s.match.player1_id), 
  checkWinner(s.match.winner_id, s.match.player2_id), scores(s.match.scores_csv, 0), scores(s.match.scores_csv, 1, s.match), "", "", []))
  
  
  if (!eventData)
    return obf;

  return obf;
}

module.exports = {
  getTournamentInfo
}