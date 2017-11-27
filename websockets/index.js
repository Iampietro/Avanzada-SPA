const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;


server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

io.on('connection', (socket) => {
    socket.on('increment', (test) => {
        test++;
        socket.broadcast.emit('increment', test);
    });
    socket.on('comentMade', (coment) => {
    	socket.broadcast.emit('comentMade', coment);
    })
});
