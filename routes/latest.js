let cheerio = require('cheerio');
let axios = require('axios');
// require('../public/js/site.js')
const express = require('express');
const router = express.Router();
let app = express();
var fs = require('fs');
var latestTweets = require('latest-tweets')
var scrapeTwitter = require('scrape-twitter')

let stats = {};

scrapeRealtor();

let aspTweets = [];
let trumpTweets = [];

latestTweets('NYCASP', function (err, tweets) {
  aspTweets = tweets
})

latestTweets('realDonaldTrump', function (err, tweets) {
  trumpTweets = tweets
  // console.log(trumpTweets.length)
})

// /latest page
router
.get('/latest', function (req, res, next) {
  res.render('latest', 
  { 
    title: 'Latest',
    data : stats,
    asp : aspTweets[0],
    trump : trumpTweets
  });
})



async function scrapeRealtor() {
  const html = await axios.get('https://ncov2019.live/data');
  const $ = await cheerio.load(html.data);
  let data = [];

  $('p').each((i, elem) => {
    data.push({
      info: $(elem).text()
    })
  });

  for(let i = 0; i < data.length; i++){
    if(data[i].info.trim() === "Total Confirmed Cases"){
      stats["totalConfirmed"] = data[i-1].info.trim();
    }
    if(data[i].info.trim() === "Total Deceased"){
      stats["totalDeceased"] = data[i-1].info.trim();
    }
    if(data[i].info.trim() === "Total Tested"){
      stats["totalTested"] = data[i-1].info.trim();
    }
    if(data[i].info.trim() === "Total Recovered"){
      stats["totalRecovered"] = data[i-1].info.trim();
    }
  }

  // console.log(stats);
}
// const listener = server.listen(process.env.PORT, function() {
//   console.log('Your app is listening on port ' + listener.address().port);
// });


module.exports = router;


