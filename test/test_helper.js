// import mongoose
const mongoose = require('mongoose');

// define promise instead of mongoose's deprecated one
mongoose.Promise = global.Promise;

// callback before all tests start
before((done) => {
// open connection to db
    mongoose.connect('mongodb://localhost/users_test', { useMongoClient: true });
// check if connection is success
    mongoose.connection
        .once('open', () => { done(); })
        .on('error', (error) => {
            console.warn('Warning', error);
        });
});

// callback method before each test - drop all collections in database
beforeEach((done) => {
    const  { users, comments, blogposts } = mongoose.connection.collections;
    users.drop(() => {
        comments.drop(() => {
            blogposts.drop(() => {
                done();
            });
        });
    });
    // const collections = mongoose.connection.collections;
    // let promises = [];
    // for (let collection in collections) {
    //    promises.push(collections[collection].drop());
    // }
    // Promise.all(promises).then(() => done());
});

// callback after all tests end
after('close db connection', () => {
    mongoose.disconnect();
});
