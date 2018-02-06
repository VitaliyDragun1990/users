const mongoose = require('mongoose');
const PostSchema = require('./post');

const Schema = mongoose.Schema;

/*************** DEFINE SCHEMA FOR USER ******************/

const UserSchema = new Schema({
    name: {
        type: String,
        validate: [
            (name) => name.length > 2,                  // validator function
            'Name must be longer than 2 characters.'    // validation message
        ],
        required: [true, 'Name is required.']
    },
    posts: [PostSchema],    // embed, don't have own collection -> subdocument
    likes: Number,
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'blogPost'
    }]
});

/*************** DEFINE VIRTUAL PROPERTIES ON SCHEMA ******************/

UserSchema.virtual('postCount').get(function () {
    // this === user object
    return this.posts.length;
});

/*************** ADD MIDDLEWARE TO SCHEMA ******************/

// call this middleware before user instance will be removed from database
UserSchema.pre('remove', function (next) {
    // retrieve model for blogPosts property of user object
    const BlogPost = mongoose.model('blogPost');

    // remove all BlogPosts if their _ids are in user.blogPosts array
    BlogPost.remove({ _id: { $in: this.blogPosts } })
        .then(() => next());        // next() - continue on middleware chain
});

/*************** CREATE USER MODEL ******************/

const User = mongoose.model('user', UserSchema);

// export User model
module.exports = User;