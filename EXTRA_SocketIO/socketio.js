const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on('send message', function(data) {
        console.log(data.username + ': ' + data.message);
        io.emit('broadcast message', data);
    });
});

app.set('port', process.env.PORT || 3000);
server.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`);
});
