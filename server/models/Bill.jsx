const mongoose = require('mongoose');
var Schema = mongoose.Schema;
import apartments from './Apartment';

const BillSchema = new Schema({
  apartment: {type: Schema.Types.ObjectId, ref: apartments},
  flat: String,
  month: {type: Number, min: 0, max: 11},
  total: Number,
  date: {type: Date, default: Date.now},
  isPaid: {type: Boolean, default: false}
});

module.exports = mongoose.model('bills', BillSchema);