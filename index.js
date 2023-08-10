require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const startgg = require('./server_modules/startgg');
const challonge = require('./server_modules/challonge');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json({limit: '100mb'}));

app.use('/', express.static(path.join(__dirname, 'public')))

app.post('/obf', async (req, res) => {
  console.log(req.body.bracket.search('start.gg') != -1);
  let obf;
  if (req.body.bracket.search('start.gg') != -1){
    obf = await startgg.startGGBracket(req.body.bracket);

  } else if (req.body.bracket.search('challonge.com') != -1) {
    obf = await challonge.getTournamentInfo(req.body.bracket)
  } else {
    obf = {}
  }
  res.json(obf);
})

app.listen(process.env.PORT, () => {
  console.log("LISTENING ON PORT:", process.env.port);
});

//startgg.startGGBracket("tournament/new-england-smash-invitational/event/ultimate-singles");

//startgg.startGGBracket("https://www.start.gg/tournament/get-on-my-level-2023-canadian-fighting-game-championships/event/super-smash-bros-melee-singles");