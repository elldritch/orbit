'use strict';

// Module dependencies.
var io = require('socket.io');

// Expose Enrouten hook.
module.exports = function(app){
  io = io.listen(app);

  // Configure socket listeners.
  io.sockets.on('connection', function(socket){
    console.log('A socket connected!');

    socket.emit('event', {message: 'hello, socket!'});

    socket.on('another event', function(data){
      console.log('The sockets gave us', data, '!');
    });
  });
};