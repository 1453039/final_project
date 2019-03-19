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

router.post("/init-bill", (req, res) => {
  users.find({$and: [{ apartment: req.body.apartment, isAdmin: false }]}, (err, users) => {
    let flats = []
    users.forEach(user => {
      flats.push(user.flat);
    })
    flats = [... new Set(flats)]
    flats.forEach(flat => {
      let bill = new bills();
      bill.apartment = req.body.apartment
      bill.flat = flat
      bill.month = req.body.month
      bill.year = req.body.year
      bill.total = 0
      bill.date = ''
      bill.isPaid = false
      bill.isExported = false
      bill.save(err => {
        if (err) console.log(err);
      })
    })
    res.json('Init bill sucessfully!');
  })
})

router.post("/bill-detail/insert", (req, res) => {
  const { errors, isValid } = validateBillDetailInput(req.body);
  const { apartment, bill, billDetails } = req.body;
  if (!isValid) {
    return res.send({ success: false, errors: errors });
  }
  billDetails.forEach(billDetail => {
    services.findOne({$and: [{ apartment: apartment, name: billDetail.serviceName}]}, (err, service) => {
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

router.put("/update-bill", (req, res) => {
  bills.updateOne({ _id: req.body.id }, { $set: { total: req.body.total }}, (err) => {
    if (err) console.log(err);
    res.send("Bill updated successfully!");
  })
})

router.put("/export-bill", (req, res) => {
  bills.updateOne({ _id: req.body.id }, { $set: { isExported: req.body.export }}, (err) => {
    if (err) console.log(err);
    res.send("Bill updated successfully!");
  })
})

router.put("/update-paid-bill", (req, res) => {
  let bill = req.body.bill
  bills.updateOne({ _id: bill._id}, bill, (err) => {
    if (err) console.log(err);
    res.json('Payment Successful');
  })
})

router.get("/get-list", (req, res) => {
  bills.find({$and: [{ apartment: req.query.apartment, month: req.query.month, year: req.query.year }]}, (err, bills) => {
    if (err) console.log(err);
    res.json(bills);
  })
})

router.get("/get-bill", (req, res) => {
  bills.findOne({$and: [{ flat: req.query.flatName, month: req.query.month, year: req.query.year }]}, (err, bill) => {
    if (err) console.log(err);
    res.json(bill);
  })
})

router.get("/get-bill-detail", (req, res) => {
  bill_details.find({ bill: req.query.bill }, (err, bill_details) => {
    if (err) console.log(err);
    res.json(bill_details);
  })
})

router.delete("/delete", (req, res) => {
  bills.remove({ flat: req.query.flatName, month: req.query.month, year: req.query.year }, (err) => {
    if (err) console.log(err);
    res.json("Delete bill successfully!");
  })
})

router.delete("/delete-bill-details", (req, res) => {
  bill_details.remove({ bill: req.query.bill }, (err) => {
    if (err) console.log(err);
    res.json("Clear bill details successfully!");
  })
})

router.get("/search", (req, res) => {
  bills.find({$and: [{flat:{$regex:".*"+req.query.search+".*",$options: 'i'}}, {apartment: req.query.id}, {month: req.query.month}, {year: req.query.year}]}, (err, bills) => {
    if (err)
      console.log(err);
    res.json(bills);
  })
})

module.exports = router;