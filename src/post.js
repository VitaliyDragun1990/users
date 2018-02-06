const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*************** DEFINE SCHEMA FOR POST ******************/

const PostSchema = new Schema({
   title: String
});

module.exports = PostSchema;