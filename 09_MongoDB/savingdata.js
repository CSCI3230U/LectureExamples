const express = require('express');
let app = express();

const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const model = require('./model/model.js');

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
    reloadStudentData(request, response);
});

function reloadStudentData(request, response) {
    model.Student.find().then(function(studentList) {
        response.render('studentList', {
            title: 'Class List',
            students: studentList,
            username: request.session.username
        });
    });
}

app.post('/addOrUpdateStudent', function(request, response) {
    let studentData = {
        sid: request.body.sid,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        gpa: request.body.gpa,
    };
    model.Student.find({sid: request.body.sid}).then(function(studentList) {
        if (studentList.length > 0) {
            // there is already a student with that sid
            model.Student.updateOne(
                {sid: request.body.sid},
                studentData,
                function(error, numAffected) {
                    if (error || numAffected != 1) {
                        console.error('Unable to update student:', error);
                        reloadStudentData(request, response);
                    } else {
                        reloadStudentData(request, response);
                    }
                }
                );
        } else {
            // there is no student with that sid
            let newStudent = new model.Student(studentData);
            newStudent.save(function(error) {
                if (error) {
                    console.error('Unable to add student:', error);
                } else {
                    console.log('Student added');
                    reloadStudentData(request, response);
                }
            });
        }
    });

});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
    console.log(`Listening on port ${app.get('port')}`);
});