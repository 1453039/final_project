const mongoose = require('mongoose');
var Schema = mongoose.Schema;
import apartments from './Apartment';
import flats from './Flat'

const UserSchema = new Schema({
  email: String,
	apartment: {type: Schema.Types.ObjectId, ref: apartments},
	flat: {type: Schema.Types.ObjectId, ref: flats},
	pass: String,
	name: String,
	birthday: Date,
	sex: String,
	avatar: String,
	flat: String,
	status: {type: Boolean, default: false},
	isAdmin: {type: Boolean, default: false},
});

module.exports = mongoose.model('users', UserSchema);