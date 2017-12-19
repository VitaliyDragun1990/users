// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/users_test', { useMongoClient: true });
// mongoose.Promise = global.Promise;
//
// const Schema = mongoose.Schema;
//
// const UserSchema = new Schema({
//     name: String
// });
//
// const User = mongoose.model('User', UserSchema);
//
// module.exports = User;
//
// var User = mongoose.model('User', { name: String });
//
// var joe = new User({ name: 'Joe' });
// joe.save(function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('Hi there!');
//     }
// });