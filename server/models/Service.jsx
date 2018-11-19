const mongoose = require('mongoose');
var Schema = mongoose.Schema;
import apartments from './Apartment';

const ServiceSchema = new Schema({
	apartment: {type: Schema.Types.ObjectId, ref: apartments},
	name: String,
  fee: {type: Number, default: 0},
  type: String
});

module.exports = mongoose.model('services', ServiceSchema);