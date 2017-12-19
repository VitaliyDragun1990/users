const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {

    it('saves a user', (done) => {
        // create a new User
        const joe = new User({name: 'Joe'});

        // save user in db - create a new record
        joe.save()
            .then(() => {
                // Has joe has been saved successfully?
               assert(!joe.isNew);
               done();
            });
    });
});