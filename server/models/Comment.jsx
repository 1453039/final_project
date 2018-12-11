const mongoose = require('mongoose');
var Schema = mongoose.Schema;
import users from './User';
import posts from './Post';

const CommentSchema = new Schema({
	author: {type: Schema.Types.ObjectId, ref: users},
	post: {type: Schema.Types.ObjectId, ref: posts},
	description: String,
	time: {type: Date, default: Date.now}
});

module.exports = mongoose.model('comments', CommentSchema);