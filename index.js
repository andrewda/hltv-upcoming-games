var request = require("request");
var parseString = require("xml2js").parseString;
var cheerio = require("cheerio");

var upcomingGames = {
  _HLTV_URL: "http://www.hltv.org/hltv.rss.php?pri=15"
};

upcomingGames.getUpcoming = function(callback) {
  var gamesAttr = {};
  request({ uri: upcomingGames._HLTV_URL }, function(error, response, body) {
    parseString(body, function(err, result) {
      if (err) {
        throw err;
      }
      
      gamesAttr = {
        "upcomingTotal": result.rss.channel[0].item.length,
        "games": {}
      };
      
      for (var i = 0; i < gamesAttr.upcomingTotal; i++) {
        var matchObj = {
          team1 : result.rss.channel[0].item[i].title[0].split(" vs ")[0],
          team2 : result.rss.channel[0].item[i].title[0].split(" vs ")[1],
          title : result.rss.channel[0].item[i].title[0],
          link  : result.rss.channel[0].item[i].link[0],
          event : result.rss.channel[0].item[i].description[0],
          date  : result.rss.channel[0].item[i].pubDate[0]
        };
        
        gamesAttr.games[matchObj.link.match(/\/match\/([0-9]+)/, "")[1]] = matchObj;
      }
      
      callback(gamesAttr);
    });
  });
};

upcomingGames.getOdds = function(link, callback) {
  request(link, function (error, response, html) {
    if (!error && response.statusCode === 200) {
      var $ = cheerio.load(html);
      
      var percent; 
      if ($("#voteteam1results").html() !== null && $("#voteteam2results").html() !== null) {
        percent = {
          "team1": $("#voteteam1results").html().replace("%", "").trim(),
          "team2": $("#voteteam2results").html().replace("%", "").trim()
        };
        
        callback(percent);
      } else {
        percent = {
          "team1": null,
          "team2": null
        };
        
        callback(percent);
      }
    }
  });
};

module.exports = upcomingGames;
