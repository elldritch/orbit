'use strict';

// Module dependencies.
var http = require('http')
  , app = require('./app');

// Initialise and return the server.
module.exports = function(callback){
  var server = http.createServer(app);

  // Want to use Sockets.IO? You could do it this way:
  // var initialise_sockets = require('./lib/sockets');
  // initialise_sockets(server);

  server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
    callback(server);
  });
};
