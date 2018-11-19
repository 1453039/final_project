const mongoose = require('mongoose');
var Schema = mongoose.Schema;
import apartments from './Apartment';
import flats from './Flat';

const FlatSchema = new Schema({
	apartment: {type: Schema.Types.ObjectId, ref: apartments},
	flat: {type: Schema.Types.ObjectId, ref: flats},
	total: Float,
  date: {type: Date, default: Date.now},
  isPaid: {type: Boolean, default: false}
});

module.exports = mongoose.model('flats', FlatSchema);