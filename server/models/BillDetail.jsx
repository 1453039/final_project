const mongoose = require('mongoose');
var Schema = mongoose.Schema;
import services from './Service'
import users from './User'
import bills from './Bill'

const SellItemSchema = new Schema({
  service: {type: Schema.Types.ObjectID, ref: services},
  seller: {type: Schema.Types.ObjectID, ref: users},
  bill: {type: Schema.Types.ObjectID, ref: bills},
  amount: {type: Number, default: 0}
});

module.exports = mongoose.model('sell_items', SellItemSchema);