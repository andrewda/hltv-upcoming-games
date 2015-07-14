var request = require("request");
var parseString = require('xml2js').parseString;

module.exports.getUpcoming = function(fn) {
  var gamesAttr = {};
  request({
    uri: "http://www.hltv.org/hltv.rss.php?pri=15"
  }, function(error, response, body) {
    parseString(body, function(err, result) {
      if (err) {
        console.log(err);
      }
      
      gamesAttr = {
        'upcomingTotal': result.rss.channel[0].item.length,
        'games': []
      };
      for (var i = 0; i < gamesAttr.upcomingTotal; i++) {
        gamesAttr.games.push(result.rss.channel[0].item[i]);
      }
      fn(gamesAttr);
    });
  });
};
