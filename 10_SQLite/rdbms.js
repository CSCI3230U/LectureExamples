const express = require('express');
const app = express();

const model = require('./model/model.js');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');





app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
    console.log(`Server listening on port ${app.get('port')}`)
});