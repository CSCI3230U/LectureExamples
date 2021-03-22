let express = require('express');
let app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.get('/', function(request, response) {
    response.send('Welcome to our page!');
});

app.use('/html', function(request, response, next) {
    console.log('HTML file being generated.');
    next();
});

app.get('/html', function(request, response) {
    // no need to do this, use templates
    response.send('<html><body><div>This is HTML!</div></body></html>');
});

// example URL:  http://localhost:3000/hello?name=Ralph&age=30
app.get('/hello', function(request, response) {
    let name = request.query.name;
    let age = request.query.age;
    response.send(`Hello, ${name}!`);
});

app.get('/cats', function(request, response) {
    // not necessary, these can be served statically (see dogs.html)
    response.sendFile(__dirname + '/cats.html');
});

app.get('/processLogin', function(request, response) {
    console.log(request.query);
    response.send('Login successful');
});

app.post('/processLogin', function(request, response) {
    console.log(request.body);
    response.send('Login successful');
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
    console.log(`Listening for requests on port ${app.get('port')}.`);
});