var express = require('express');
var router = express.Router();
var sell_items = require('../models/SellItem');

/* GET ALL SELLING ITEMS OF AN  APARTMENT*/
router.get('/get-all', function(req, res) {
  sell_items.find({apartment: req.query.apartment}, function (err, items) {
    if (err) console.log(err);
    items = items.filter(item => JSON.stringify(item.seller) != JSON.stringify(req.query.userId));
    res.json(items);
  });
});

/* GET SINGLE ITEM BY ID */
router.get('get-item', function(req, res) {
  sell_items.findById(req.query.id, function (err, item) {
    if (err) console.log(err);
    res.json(item);
  });
});

/* GET ALL ITEMS OF AN USER BY ID */
router.get('/get-item-of-user', function(req, res) {
  sell_items.find({seller: req.query.id}, function (err, items) {
    if (err) console.log(err);
    res.json(items);
  });
});

/* SAVE ITEM */
router.post('/insert', function(req, res) {
  var item = new sell_items()
  var now = new Date()
  item.apartment = req.body.apartment
  item.seller = req.body.seller
  item.isAdmin = req.body.isAdmin
  item.time = now
  item.name = req.body.name
  item.description = req.body.description
  item.linkImg = req.body.linkImg ? req.body.linkImg : ""
  item.linkVideo = req.body.linkVideo ? req.body.linkVideo : ""
  item.price = req.body.price
  item.amount = req.body.amount
  item.save(function (err) {
    if (err)
      res.json(err);
    res.json("Create item sucessfully!");
  });
});

/* DELETE ITEM */
router.delete('/delete', function(req, res) {
  sell_items.findByIdAndRemove(req.query.id, function (err) {
    if (err) console.log(err);
    res.json("Delete Item sucessfully!");
  });
});

module.exports = router;
