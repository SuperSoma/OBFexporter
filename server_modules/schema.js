const makeBasicOBF = () => {
  return {
    "version" : "v0.2",
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
    "entrantID" : id,
    "entrantTag" : name,
    "initialSeed" : seed,
    "finalPlacement" : standing,
    "personalInformation" : personalInfo
  }
}

const makeOBFSet = (id, e1id, e2id, status, e1result, e2result, e1score, e2score, format, phase, games = []) => {
  return {
    "setID" : id,
    "entrant1ID" : e1id,
    "entrant2ID" : e2id,
    "status" : status,
    "entrant1Result" : e1result,
    "entrant2Result" : e2result,
    "entrant1Score" : e1score,
    "entrant2Score" : e2score,
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