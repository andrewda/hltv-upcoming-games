# hltv-upcoming-games
View the teams, maps, and predictions of an upcoming game on HLTV.

## Installation
`npm install hltv-upcoming-games`

## Usage
```js
var hltv = require('hltv-upcoming-games');

hltv.getUpcoming(function(gamesAttr) {
  for (var matchid in gamesAttr.games) {
    console.log(gamesAttr.games[matchid]);
  }
});
```

## Methods
### getUpcoming(callback)
Gets the upcoming games listed HLTV.

Callback contains the gameAttr object.

### getOdds(link, callback)
Callback contains an object with team1's HLTV odds and team2's HLTV odds. (TODO: EGB.com odds)
