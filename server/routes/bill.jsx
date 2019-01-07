var express = require('express');
var router = express.Router();
const _ = require('lodash');
var bills = require('../models/Bill');
var bill_details = require('../models/BillDetail');
var users = require('../models/User');

// load input validation
const validateAddBillInput = require('../validation/addBill');

router.post("/insert", (req, res) => {
  users.find({ flat: req.body.flatName }, (err, result) => {
    if (err) console.log(err);
    const { errors, isValid } = validateAddBillInput(req.body);
    // Check validation
    if (!isValid) {
      return res.send({ success: false, errors: errors });
    }
    if (_.isEmpty(result)) {
      errors.flatName = "The flat is not exist";
      res.send({ success: false, errors: errors });
    } else {
      bills.find({ $and: [{ flat: req.body.flatName, month: req.body.month, year: req.body.year }] }, (err, result) => {
        if (err) console.log(err);
        if (!_.isEmpty(result)) {
          errors.bill = "This bill was exist"
          res.send({ success: false, errors: errors });
        } else {
          let bill = new bills();
          bill.apartment = req.body.apartment
          bill.flat = req.body.flatName
          bill.month = req.body.month
          bill.year = req.body.year
          bill.total = 0
          bill.date = ''
          bill.isPaid = false
          bill.save(err => {
            if (err) console.log(err);
            res.send({ success: true, message: "Add bill successfully!" });
          })
        }
      })
    }
  })
})

router.get("/get-bill", (req, res) => {
  bills.find({ flat: req.query.flatName })
})

module.exports = router;