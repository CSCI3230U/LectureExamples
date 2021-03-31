const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/university', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function(error) {
    if (error) {
        console.error('Unable to connect: ', error);
    } else {
        console.log('Connected to MongoDB');
    }
});
mongoose.set('useCreateIndex', true);

let Schema = mongoose.Schema;
let userSchema = new Schema({
    username: String,
    email: String,
    hashPassword: String
}, {
    collection: 'users'
});

let studentSchema = new Schema({
    sid: String,
    firstName: String,
    lastName: String,
    gpa: Number
}, {
    collection: 'students'
});

module.exports.User = mongoose.model('user', userSchema);
module.exports.Student = mongoose.model('student', studentSchema);
