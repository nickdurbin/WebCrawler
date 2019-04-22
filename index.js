// node.js web scraper
const rp = require('request-promise');
const cheerio = require('cheerio');
const Table = require('cli-table');

let users = [];
let table = new Table({
  head: ['username', '', 'challenges'],
  colWidths: [15, 5, 10],
})

const options = {
  url: ``,
  json: true
}

rp(options)
  .then((data) => {
    let userData = [];
    for (let user of data.directory_items) {
      userData.push({name: user.user.username, likes_received: user.likes_received});
    }
    process.stdout.write('loading');
    getChallenges(userData);
  })
  .catch((err) => {
    console.log(err);
  });

function getChallenges(userData) {
  var i = 0;
  function next() {
    if (i < userData.length) {
      var options = {
        url: `,` + userData[i].name,
        transform: body => cheerio.load(body)
      }
      rp(options)
        .then(function ($) {
          process.stdout.write(`.`);
          const fccAccount = $('').length == 0;
          const challengesPassed = fccAccount ? $('tbody tr').length : 'unknown';
          table.push([userData[i].name, userData[i].likes_received, challengesPassed]);
          ++i;
          return next();
        })
    } else {
        printData();
    }
  }
  return next();
};

function printData() {
  console.log("");
  console.log(table.toString());
};