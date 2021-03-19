let express = require('express');
let app = express();

// this is not needed now that body-parser is part of express:
// let bodyParser = require('body-parser');

// serve every file in /public as a static file
app.use(express.static('public'));

// process form data into a dictionary (request.body)
// processLogin?firstName=Randy&lastName=Fortier&email=randy.fortier@ontariotechu.ca
// deprecated version:
// app.use(bodyParser.urlencoded({extended: false}));
// new version (is now part of express):
app.use(express.urlencoded({extended: false}));

// process JSON data into a dictionary (currently unused)
// deprecated version:
// app.use(bodyParser.json());
// new version (is now part of express):
app.use(express.json());

app.get('/', function(request, response) {
    response.send('This is the entry point.');
});

app.get('/hello', function(request, response) {
    response.send(`Hello, ${request.query.name}!`);
});

app.get('/ciao', function(request, response) {
    // no need to do this, this is not a good practice
    response.send('<html><body><div>Ciao!</div></body></html>');
});

app.get('/cats', function(request, response) {
    // not a great idea, since we need to have a URI per file
    response.sendFile(__dirname + '/cats.html');
});

app.get('/processLogin', function(request, response) {
    console.log(request.query);
    response.send(request.query);
}); 

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
    console.log(`Listening on port ${app.get('port')}.`);
});