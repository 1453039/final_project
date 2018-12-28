var express = require('express');
var router = express.Router();
var bills = require('../models/Bill');
var bill_details = require('../models/BillDetail');
const config = require('../config/config');

module.exports = router;
