const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
    let joe, blogPost, comment;

    beforeEach((done) => {
        // instantiate instances of our models
        joe = new User({name: 'Joe'});
        blogPost = new BlogPost({title: 'JS is Great', content: 'Yep it really is'});
        comment = new Comment({content: 'Congrats on great post'});

        // make appropriate binding between them
        joe.blogPosts.push(blogPost);      // add blogPost reference to user instance
        blogPost.comments.push(comment);  // add comment reference to blogPost instance
        comment.user = joe;               // add user reference to comment instance

        // save all instances to database
        Promise.all([joe.save(), blogPost.save(), comment.save()])
            .then(() => done());
    });

    it('saves a relation between a user and a blogPost', (done) => {
        User.findOne({name: 'Joe'})
            .populate('blogPosts') // query for populate blogPost property with blogPost objects
            .then((user) => {
                assert(user.blogPosts[0].title === 'JS is Great');
                done();
            });
    });

    it('saves a full relation graph', (done) => {
        User.findOne({name: 'Joe'})     // get the specific user from the database
            .populate({
                path: 'blogPosts',       // attempt to load blogPosts property of user object
                populate: {
                    path: 'comments',    // attempt to load comments property of each blogPost object in user object
                    model: 'comment',
                    populate: {
                        path: 'user',   // attempt to load user property of each comment object in blogPost object
                        model: 'user'
                    }
                }
            })
            .then((user) => {
                assert(user.name === 'Joe');
                assert(user.blogPosts[0].title = 'JS is Great');
                assert(user.blogPosts[0].comments[0].content = 'Congrats on great post');
                assert(user.blogPosts[0].comments[0].user.name === 'Joe');

                done();
            })
    });
});