// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
var archive = require('../helpers/archive-helpers');
var fs = require('fs');

// iterates thru the list in sites.txt
var list = fs.readFileSync(archive.paths.list,'utf8');
var listArray = list.split('\n');
// console.log('list is',list);
for (var i = 0; i < listArray.length; i++){
  // calls downloadUrls in archive-helpers to update the html in memory
  archive.downloadUrls(listArray[i]);
}

// run this using cron
// crontab -e
// */1 * * * * /Users/HR10/.nvm/v0.10.25/bin/node /Users/HR10/2015-03-web-historian/workers/htmlfetcher.js
// crontab -l to view cron jobs
