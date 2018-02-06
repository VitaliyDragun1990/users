const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*************** DEFINE COMMENT SCHEMA ******************/

const CommentSchema = new Schema({
    content: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

/*************** DEFINE COMMENT MODEL ******************/

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;