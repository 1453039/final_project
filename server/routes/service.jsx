var express = require('express');
var router = express.Router();
var services = require('../models/Service')

router.post('/insert', (req, res) => {
  let service = new services();
  service.apartment = req.body.apartment
  service.name = req.body.name
  service.description = req.body.description
  service.fee = req.body.fee
  service.unit = req.body.unit
  service.save((err) => {
    if (err) res.send(err);
    res.send("Add service successfully!");
  })
})

module.exports = router;