var express = require('express');
var router = express.Router();
var apartments = require('../models/Apartment');
var users = require('../models/User');
const _ = require('lodash');

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

router.get('/get-apartment', function (req, res) {
  var id = req.query.id_apartment;
  apartments.findById(id, function (err, apartment) {
    if (err)
      console.log("err", err);
    res.json(apartment);
  });
});

router.get('/get-list-apartment', function (req, res) {
  const { errors, isValid } = validateLoginInput(req.query);
  // Check validation
  if (!isValid) {
    return res.send({ value: errors, message: 'fail'});
  }
  var email = req.query.email;
  users.find({ email: { $eq: email } }, function (err, users) {
    if (err)
      console.log(err);
    if (_.isEmpty(users)) {
      errors.email = "User doesn't exist."
      res.send({ value: errors, message: 'fail' });
    }
    else {
      res.send({ value: users, message: 'true'});
    }
  });
});

module.exports = router;
