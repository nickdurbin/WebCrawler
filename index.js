// node.js web scraper
const rp = require('request-promise');
const cherio = require('cherio');
const Table = require('cli-table');

let users = [];

const options = {
  url: ''
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

}