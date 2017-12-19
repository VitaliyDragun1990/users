const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
    let joe, maria, alex, zach;

    beforeEach((done) => {
        // create users object
        alex = new User({name: 'Alex'});
        joe = new User({name: 'Joe'});
        maria = new User({name: 'Maria'});
        zach = new User({name: 'Zach'});
        // save them all to database
        Promise.all([alex.save(), joe.save(), maria.save(), zach.save()])
            .then(() => done());
    });

    it('finds all users with a name of Joe', (done) => {
        User.find({name: 'Joe'})
            .then((users) => {
                assert(users.find((user) => user._id.toString() === joe._id.toString()));
                // assert(users[0]._id.toString() === joe._id.toString());
                done();
            });
    });

    it('finds a user with a particular id', (done) => {
        User.findOne({_id: joe._id})
            .then((user) => {
                assert(user.name === 'Joe');
                done();
            });
    });

    it('can skip and limit the result set', (done) => {
        User.find({})           // find all users in 'users' collection in database
            .sort({name: 1})    // sort all users by 'name' property ascending fashion
            .skip(1)            // skip 1 user in result
            .limit(2)           // limit the result list to 2 users
            .then((users) => {
                assert(users.length === 2);     // make appropriate assertions
                assert(users[0].name === 'Joe');
                assert(users[1].name === 'Maria');
                done();
            });
    });
});