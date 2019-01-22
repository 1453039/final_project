const mongoose = require('mongoose');
var Schema = mongoose.Schema;
import apartments from './Apartment';
import users from './User';

const ServiceSchema = new Schema({
	apartment: {type: Schema.Types.ObjectId, ref: apartments},
  admin: {type: Schema.Types.ObjectId, ref: users},
  name: String,
  description: String,
  fee: {type: Number, default: 0},
  unit: String,
  img: String
});

module.exports = mongoose.model('services', ServiceSchema);