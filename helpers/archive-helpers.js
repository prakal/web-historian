var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(){
  var file = fs.readFileSync(this.paths.list,"utf8");
  var dataArray = file.split('\n');
  return dataArray;
};

exports.isUrlInList = function(lookingFor){
  var dataArray = this.readListOfUrls();
  // console.log('looking for:'+lookingFor+' getting: '+dataArray);
  for (var i = 0; i < dataArray.length; i++){
    if (dataArray[i] === lookingFor){
      return true;
    }
  }
};

exports.isUrlExistant = function(userInput){
  // console.log('userInput',userInput,(/\./.test(userInput) || userInput === "/"));
  // looking for a dot, or
  return (/\./.test(userInput) || userInput === "/");
};

exports.addUrlToList = function(data){
  // console.log('is path working',this.paths.list);
  fs.appendFile(this.paths.list,data+"\n",function(err){
    if (err){
      throw err;
    }
    // console.log('data has been successfully written.');
  });
};

exports.isURLArchived = function(){
};

exports.downloadUrls = function(url){
  // eventually, you'll have some code here that uses the code in `archive-helpers.js`
  // to actually download the urls you want to download.
  var httpRequest = require('http-request');
  // get html
  var that = this;
  var markup = "";
  httpRequest.get(url, function (err, res) {
    if (err) {
      console.error(err);
      return;
    }
    // console.log(res.code, res.headers, res.buffer.toString());
    markup = res.buffer.toString();
    // save new file to sites folder with html inside it
    that.saveUrls(markup,url);
  });
};

exports.saveUrls = function(markup,url){
  fs.writeFile(this.paths.archivedSites+'/'+url, markup, function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
  });
};
