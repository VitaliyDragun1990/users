const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
    let joe, blogPost;

    beforeEach((done) => {
        // instantiate instances of our models
        joe = new User({name: 'Joe'});
        blogPost = new BlogPost({title: 'JS is Great', content: 'Yep it really is'});

        // make appropriate binding between them
        joe.blogPosts.push(blogPost);      // add blogPost reference to user instance

        // save all instances to database
        Promise.all([joe.save(), blogPost.save()])
            .then(() => done());
    });

    it('users clean up dangling blogposts on remove', (done) => {
        joe.remove()                        // remove specific user from database
            .then(() => BlogPost.count())   // find numbers of BlogPost instances in database
            .then((count) => {              // make sure that in equals 0 (we removed them with our middleware hook)
                assert(count === 0);
                done();
            })
    });
});