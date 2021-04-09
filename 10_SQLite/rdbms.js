const express = require('express');
const app = express();

const model = require('./model/model.js');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.get('/chirps', (request, response) => {
    let description = 'A list of chirps';

    if (request.query.description) {
        description = request.query.description;
    }

    model.getAllChirps((chirps) => {
        response.render('view_chirps', {
            title: 'View Chirps',
            description: description,
            chirps: chirps
        });
    });
});

app.post('/deleteChirp', (request, response) => {
    model.deleteChirp(request.body.chirpId, () => {
        response.redirect(`/chirps?description=Chirp+deleted`);
    });
});

app.post('/addChirp', (request, response) => {
    model.addChirp(request.body.sender, request.body.message, () => {
        response.redirect(`/chirps?description=Chirp+inserted`);
    });
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
    console.log(`Server listening on port ${app.get('port')}`)
});