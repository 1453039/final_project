var express = require('express');
var router = express.Router();
var services = require('../models/Service')

router.post('/insert', (req, res) => {
  let service = new services();
  service.apartment = req.body.apartment
  service.admin = req.body.admin
  service.name = req.body.name
  service.description = req.body.description
  service.fee = req.body.fee
  service.unit = req.body.unit
  service.img = req.body.img
  service.save((err) => {
    if (err) res.send(err);
    res.send("Add service successfully!");
  })
})

router.get('/get-services', (req, res) => {
  services.find({apartment: req.query.apartment}, (err, services) => {
    if (err) console.log(err);
    res.json(services);
  })
})

router.get('/get-service', (req, res) => {
  services.findOne({_id: req.query.id}, (err, service) => {
    if (err) console.log(err);
    res.json(service);
  })
})

module.exports = router;