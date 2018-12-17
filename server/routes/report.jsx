var express = require('express');
var router = express.Router();
var reports = require('../models/Report.jsx');

/* GET LIST REPORTS OF AN APARTMENT */
router.get('/get-list-report', function(req, res) {
  reports.find({apartment: req.query.apartment}, function(err, reports) {
    if (err) console.log(err);
    res.json(reports);
  })
})

/* SAVE REPORT */
router.post('/insert', function(req, res) {
  var report = new reports()
  var now = new Date()
  report.apartment = req.body.apartment
  report.author = req.body.author
  report.detail = req.body.detail
  report.date = now
  report.save(function(err) {
    if (err) console.log(err)
    res.json("Sending report sucessfully!");
  })
})

module.exports = router;