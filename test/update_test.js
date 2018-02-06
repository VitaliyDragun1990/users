const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({name: 'Joe', likes: 0});
        joe.save()
            .then(() => done());
    });

    function assertName(operation, done) {  // take promise and done callback
        operation
            .then(() => {
                User.find({}).then((users) => {         // find all users in database
                    assert(users.length === 1);         // must be only one user
                    assert(users[0].name === 'Alex');   // user name must be 'Alex'
                    done();                             // proceed to next test
                })
            });
    }

    it('instance type using set n save', (done) => {
        joe.set('name', 'Alex');  // change property 'name' value to 'Alex'
        assertName(joe.save(), done);

    });

    it('A model instance can update', (done) => {
        assertName(joe.update({name: 'Alex'}), done);    // update instance property called 'name'
    });

    it('A model class can update', (done) => {
        assertName(
            User.update({name: 'Joe'}, {name: 'Alex'}),
            done);
    });

    it('A model class can update one record', (done) => {
        assertName(
            User.findOneAndUpdate({name: 'Joe'}, {name: 'Alex'}),
            done);
    });

    it('A model class can find a record with an Id and update', (done) => {
        assertName(
            User.findByIdAndUpdate(joe._id, {name: 'Alex'}),
            done);
    });

    it('A user can have their likes incremented by 10', (done) => {
        User.update({name: 'Joe'}, {$inc: {likes: 10}})   // find user with name 'Joe' and increment his likes
            .then(() => User.findOne({name: 'Joe'}))           // property by 10
            .then((user) => {
                assert(user.likes === 10);
                done();
            });
    });
});