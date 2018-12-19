const mongoose = require('mongoose');
var Schema = mongoose.Schema;
import apartments from './Apartment'
import users from './User'

const SellItemSchema = new Schema({
	apartment: {type: Schema.Types.ObjectId, ref: apartments},
  seller: {type: Schema.Types.ObjectId, ref: users},
  isAdmin: Boolean,
  name: String,
	time: {type: Date, default: Date.now},
	description: String,
	linkImg: String,
	linkVideo: String,
  price: {type: Number, default: 0},
  amount: {type: Number, default: 0}
});

module.exports = mongoose.model('sell_items', SellItemSchema);