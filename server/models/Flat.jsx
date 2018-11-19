const mongoose = require('mongoose');
var Schema = mongoose.Schema;
import apartments from './Apartment'

const FlatSchema = new Schema({
  appartment: {type: Schema.Types.ObjectId, ref: apartments},
	block: String
});

module.exports = mongoose.model('flats', FlatSchema);