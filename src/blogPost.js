const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*************** DEFINE BLOGPOST SCHEMA ******************/

const BlogPostSchema = new Schema({
    title: String,
    content: String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
});

/*************** CREATE BLOGPOST MODEL ******************/

const BlogPost = mongoose.model('blogPost', BlogPostSchema);

module.exports = BlogPost;