const mongoose = require('mongoose');
var Schema = mongoose.Schema;
import apartments from './Apartment';

const FlatSchema = new Schema({
	apartment: {type: Schema.Types.ObjectId, ref: apartments},
	flat: String,
	total: Float,
  date: {type: Date, default: Date.now},
  isPaid: {type: Boolean, default: false}
});

module.exports = mongoose.model('flats', FlatSchema);