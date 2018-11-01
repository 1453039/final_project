const mongoose = require('mongoose');
var Schema = mongoose.Schema;
import User from './User';

const ChatSchema = new Schema({
	from: {type: Schema.Types.ObjectId, ref: User},
	to: {type: Schema.Types.ObjectId, ref: User},
	detail: String,
	time: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Chat', ChatSchema);