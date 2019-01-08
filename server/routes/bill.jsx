var express = require('express');
var router = express.Router();
const _ = require('lodash');
var bills = require('../models/Bill');
var bill_details = require('../models/BillDetail');
var services = require('../models/Service');
var users = require('../models/User');

// load input validation
const validateAddBillInput = require('../validation/addBill');
const validateBillDetailInput = require('../validation/billDetail');

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

router.post("/bill-detail/insert", (req, res) => {
  const { errors, isValid } = validateBillDetailInput(req.body);
  const { apartment, bill, billDetails } = req.body;
  if (!isValid) {
    return res.send({ success: false, errors: errors });
  }
  billDetails.forEach(billDetail => {
    console.log(billDetail);
    services.find({ apartment: apartment, name: billDetail.serviceName}, (err, service) => {
      if (err) console.log(err);
      let bill_detail = new bill_details()
      bill_detail.service = service._id
      bill_detail.bill = bill
      bill_detail.amount = billDetail.amount
      bill_detail.save(err => {
        if (err) console.log(err);
      })
    })
  });
  res.send({success: true, message: "Add bill detail successfully!"});
})

router.get("/get-bill", (req, res) => {
  bills.findOne({$and: [{ flat: req.query.flatName, month: req.query.month, year: req.query.year }]}, (err, bill) => {
    if (err) console.log(err);
    res.json(bill);
  })
})

router.delete("/delete", (req, res) => {
  bills.remove({ flat: req.query.flatName, month: req.query.month, year: req.query.year }, (err) => {
    if (err) console.log(err);
    res.json("Delete bill successfully!");
  })
})



module.exports = router;