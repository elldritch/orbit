'use strict';

// Module dependencies.
var http = require('http')
  , app = require('./app');

// Initialise and return the server.
module.exports = function(callback){
  var server = http.createServer(app);
  server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
    callback(server);
  });
};