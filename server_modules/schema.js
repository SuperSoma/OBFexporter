const makeBasicOBF = () => {
  return {
    "version" : "v1.0",
    "event" : {
      "name" : "",
      "date" : "",
      "gameName" : "",
      "ruleset" : "",
      "originURL" : "",
      "numberEntrants" : 0
    },
    "sets" : [],
    "entrants" : []
  }
}

const makeOBFEvent = (name = "", date = "", game = "", numEntrant = 0, origin = "") => {
  return {
    name,
    date,
    gameName : game,
    numberEntrants : numEntrant,
    originURL : origin
  }
}

const makeOBFEntrant = (id = "", name = "", seed = -1, standing = -1, personalInfo = []) => {
  return {
    "entrantID" : String(id),
    "entrantTag" : name,
    "initialSeed" : parseInt(seed),
    "finalPlacement" : parseInt(standing),
    "personalInformation" : personalInfo
  }
}

const makeOBFSet = (id, e1id, e2id, status, e1result, e2result, e1score, e2score, format, phase, games = []) => {
  return {
    "setID" : String(id),
    "entrant1ID" : String(e1id),
    "entrant2ID" : String(e2id),
    "status" : status,
    "entrant1Result" : e1result,
    "entrant2Result" : e2result,
    "entrant1Score" : parseInt(e1score),
    "entrant2Score" : parseInt(e2score),
    "setFormat" : format,
    "phaseID" : phase,
    "games" : games
  }
}

module.exports = {
  makeBasicOBF,
  makeOBFEntrant,
  makeOBFSet,
  makeOBFEvent
}