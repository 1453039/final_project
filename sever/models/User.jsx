const mongoose = require('mongoose');
var Schema = mongoose.Schema;
import Apartment from './Apartment'

const UserSchema = new Schema({
  email: String,
  apartment: {type: Schema.Types.ObjectId, ref: Apartment},
	pass: String,
	name: String,
	birthday: Date,
	sex: {type: String, enum: ['Male', 'Female']},
	room: String,
	isAdmin: Boolean
});

module.exports = mongoose.model('User', UserSchema);