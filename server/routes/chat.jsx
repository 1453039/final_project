var express = require('express');
var router = express.Router();
var chats = require('../models/Chat.jsx');
var users = require('../models/User.jsx')

/* GET ALL CHAT OF A GROUP CHAT */
router.get('/get-all-chat', function(req, res) {
  chats.find({$or: [{to: req.query.to, from: req.query.from}, {to: req.query.from, from: req.query.to}]}, function (err, chats) {
    if (err) res.json(err);
    res.json(chats);
  });
});

/* SAVE CHAT */
router.post('/insert', function(req, res) {
  var chat = new chats()
  var now = new Date()
  chat.from = req.body.from
  chat.to = req.body.to
  chat.detail = req.body.detail
  chat.time = now
  chat.save(function (err) {
    if (err)
      res.json(err);
    res.json("Create post sucessfully!");
  });
});

module.exports = router;
