const mongoose = require('mongoose');
var Schema = mongoose.Schema;
import services from './Service'
import users from './User'
import bills from './Bill'

const BillDetailSchema = new Schema({
  service: {type: Schema.Types.ObjectId, ref: services},
  seller: {type: Schema.Types.ObjectId, ref: users},
  bill: {type: Schema.Types.ObjectId, ref: bills},
  amount: {type: Number, default: 0}
});

module.exports = mongoose.model('bill_details', BillDetailSchema);