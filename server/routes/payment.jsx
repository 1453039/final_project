var express = require('express');
var router = express.Router();
var bills = require('../models/Bill');
var bill_details = require('../models/BillDetail');
var payments = require('../models/Service');
const config = require('../config/stripe');
var stripe = require('stripe')(config.STRIPE_SECRET_KEY);

const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
}

// Handle Check Out
router.post('/stripe/token', (req, res) => {
  stripe.charges.create(req.body, postStripeCharge(res));
})

module.exports = router;
