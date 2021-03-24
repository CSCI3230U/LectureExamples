const express = require('express');
let app = express();

const session = require('express-session');
const { v4: uuidv4 } = require('uuid');

// middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.use(session({
    genid: uuidv4,
    resave: false,
    saveUninitialized: false,
    // cookie: {secure: true},
    secret: '3230 examples typing fast need coffee'
}));

// configuration
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// finalware
app.get('/basic', function(request, response) {
    response.render('basic', {
        title: 'Basic Page',
        message: 'This is a basic page'
    });
});

app.get('/login', function(request, response) {
    response.render('login', {
        title: 'Login Page',
        errorMessage: ''
    });
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
    console.log(`Listening on port ${app.get('port')}`);
});