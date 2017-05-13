module.exports = function(server){

  const io = require('socket.io')(server);

  io.on('connection', socket => {

    socket.on('message', message => {
      socket.broadcast.emit('message', message);
    });

  });

};
