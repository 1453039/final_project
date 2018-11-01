const mongoose = require('mongoose');
var Schema = mongoose.Schema;
import Apartment from './Apartment';
import User from './User';

const ReportSchema = new Schema({
  apartment: {type: Schema.Types.ObjectId, ref: Apartment},
	author: {type: Schema.Types.ObjectId, ref: User},
  detail: String,
	date: String
});

module.exports = mongoose.model('Report', ReportSchema);