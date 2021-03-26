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

// placeholder data
let usernames = ['admin', 'bsmith'];
function userExists(toFind) {
    for (let i = 0; i < usernames.length; i++) {
        if (usernames[i] === toFind) {
            return true;
        }
    }

    return false;
}

// finalware
app.get('/basic', function(request, response) {
    response.render('basic', {
        title: 'Basic Page',
        message: 'This is a basic page'
    });
});

app.get('/', function(request, response) {
    response.send('Welcome!');
});

app.get('/login', function(request, response) {
    response.render('login', {
        title: 'Login Page',
        errorMessage: ''
    });
});

app.post('/processLogin', function(request, response) {
    let username = request.body.username;
    let password = request.body.password;

    if (userExists(username)) {
        // placeholder for authentication
        request.session.username = username;

        response.render('loginConfirmed', {
            title: 'Login Successful',
            username: username
        });
    } else {
        // failed to login
        response.render('login', {
            title: 'Login Page',
            errorMessage: 'Login incorrect.  Please try again.'
        });
    }
});

app.get('/register', function(request, response) {
    response.render('register', {title: 'Register'});
});
  
app.post('/processRegistration', function(request, response) {
    let username = request.body.username;
    let password = request.body.pwd;
  
    if (userExists(username)) {
      response.render('register', {
          title: 'Register',
          errorMessage: 'Username in use'
      });
    } else {
      usernames.push(username);
  
      request.session.username = username;
  
      response.render('registrationConfirmed', {
          username: username,
          title: 'Welcome aboard!'
      });
    }
});
  
app.get('/logout', function(request, response) {
    request.session.username = '';
    response.redirect('/');
});

app.get('/students', function(request, response) {
    let studentList = [
        {sid: '100000001', firstName: 'Philip', lastName: 'Fry'},
        {sid: '100000002', firstName: 'Taranga', lastName: 'Leela'},
        {sid: '100000003', firstName: 'Bender', lastName: 'Rodriguez'},
    ];
    response.render('studentList', {
        title: 'Class List',
        students: studentList,
        username: request.session.username
    });
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
    console.log(`Listening on port ${app.get('port')}`);
});