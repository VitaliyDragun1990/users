// import mongoose
const mongoose = require('mongoose');
// import PostSchema
const PostSchema = require('./post');

const Schema = mongoose.Schema;

// define schema for User
const UserSchema = new Schema({
    name: {
        type: String,
        validate: [
            (name) => name.length > 2,                  // validator function
            'Name must be longer than 2 characters.'    // validation message
        ],
        required: [true, 'Name is required.']
    },
    posts: [PostSchema],
    likes: Number,
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'blogPost'
    }]
});

// define virtual property
UserSchema.virtual('postCount').get(function () {
    // this === user object
    return this.posts.length;
});

// add middleware to run before the 'remove' event of user schema
UserSchema.pre('remove', function (next) {
    const BlogPost = mongoose.model('blogPost');        // retrieve model for blogPosts property of user object
    // this === user object

    BlogPost.remove({ _id: { $in: this.blogPosts } })  // remove all BlogPosts if their _ids are in user.blogPosts array
        .then(() => next());        // next() - asynchronous call
});

// create User model
const User = mongoose.model('user', UserSchema);

// export User model
module.exports = User;