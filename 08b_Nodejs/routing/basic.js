let express = require('express');
let session = require('express-session');
const { v4: uuidv4 } = require('uuid');
let app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(session({
    genid: () => uuidv4(),
    resave: false,
    saveUninitialized: false,
    // cookie: {secure: true},
    secret: 'apollo slackware propositional expectations',
}));

app.get('/', function(request, response) {
    response.send('Welcome to our page!');
});

app.get('/secret', function(request, response) {
    if (request.session.username) {
        response.send('Meet at the place at the correct time');
    } else {
        response.send('Unauthorized access!');
    }
});

app.get('/logout', function(request, response) {
    request.session.username = '';
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

app.get('/ciao/:name/:age', function(request, response) {
    let name = request.params.name;
    let age = request.params.age;
    response.send(`Ciao, ${name}!`);  
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
    if (request.body.username === 'admin' && 
        request.body.password === 'opensesame') {
        
        request.session.username = request.body.username;
        response.send('Login successful');
    } else {
        response.send('Login incorrect');
    }
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
    console.log(`Listening for requests on port ${app.get('port')}.`);
});