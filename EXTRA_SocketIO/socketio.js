/* CSCI 3230U - Socket.io */

let express = require('express');
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', function(socket) {
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
http.listen(app.get('port'), function() {
	console.log('Server listening on port ' + app.get('port'));
});
