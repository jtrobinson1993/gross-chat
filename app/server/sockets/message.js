function connection(socket){

  socket.on('message', message => {
    socket.broadcast.emit('message', message);
  });

}

module.exports = io => {
  io.on('connection', connection.bind(io));
};
