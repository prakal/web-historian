var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === "GET"){
    res.writeHead(200,httpHelpers.headers);
    httpHelpers.serveAssets(res,archive.paths.siteAssets+'/index.html', function(data) {
      res.end(data)
    });
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
      console.log(chunks);
      archive.addUrlToList(chunks);
    });
    res.end("will be redirected");
    // req.on('end',function(){

    // });
  }
  // /...../web/public/index.html

  // req.url

  // res.end(archive.paths.list);
};
