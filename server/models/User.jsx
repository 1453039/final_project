const mongoose = require('mongoose');
var Schema = mongoose.Schema;
import apartments from './Apartment'
var bcrypt = require('bcrypt-nodejs')

const UserSchema = new Schema({
  email: String,
  apartment: {type: Schema.Types.ObjectId, ref: apartments},
	password: String,
	name: String,
	birthday: Date,
	sex: String,
	room: String,
	isAdmin: Boolean
});

UserSchema.methods.encryptPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('users', UserSchema);