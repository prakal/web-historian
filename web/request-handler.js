var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  // /  GET serve static
  // /www.google.com GET
  // / POST and some data

  var validURL = archive.isUrlExistant(req.url);



  if (req.method === "GET"){

    if(req.url === '/') {
      res.writeHead(200,httpHelpers.headers);
      httpHelpers.serveAssets(res,archive.paths.siteAssets+'/index.html', function(data) {
        res.end(data);
      });
    } else if (validURL) {
      res.writeHead(200,httpHelpers.headers);
      console.log('we are trying to go to:',archive.paths.archivedSites+req.url);
      httpHelpers.serveAssets(res,archive.paths.archivedSites+req.url, function(data) {
        res.end(data);
      });
    }

  }
  if (archive.isUrlExistant(req.url) === false){
    res.writeHead(404,httpHelpers.headers);
    res.end("You stumbled upon the wrong page.");
  }
  if (archive.isUrlInList(req.url)){
    res.writeHead(200,httpHelpers.headers);
  }
  if (req.method === "POST"){
    res.writeHead(302,httpHelpers.headers);
    var chunks = "";
    req.on('data',function(chunk){
      chunks += chunk;
      var equals = chunks.search(/\=/);
      chunks = chunks.slice(equals+1);
      console.log('chunks',chunks);
      if (archive.isUrlInList(chunks)){
        httpHelpers.serveAssets(res,archive.paths.archivedSites+'/'+chunks, function(data) {
          // console.log('our data is:', data);
          res.end(data);
        });
        //res.end('will be loaded.');
      }
      else{
        archive.addUrlToList(chunks);
        archive.downloadUrls(chunks);
      }
    });

    httpHelpers.serveAssets(res,archive.paths.siteAssets+'/loading.html', function(data) {
      res.end(data);
    });
    // req.on('end',function(){

    // });
  }
  // /...../web/public/index.html

  // req.url

  // res.end(archive.paths.list);
};
