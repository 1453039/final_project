var express = require('express');
var router = express.Router();
var chats = require('../models/Chat.jsx');
var _ = require('lodash');

/* GET LIST CHAT PEOPLE OF A USER */
router.get('/get-list-user-id', function (req, res) {
  var arr = []
  function getListUserId(type, callback) {
    if (type == "to") {
      chats.find({ to: req.query.id }, function (err, list) {
        if (err) console.log(err);
        for (var i in list) {
          arr.push(JSON.stringify(list[i].from));
        }
        if (arr) callback(null, arr)
        else callback(true, null);
      });
    } else if (type == "from") {
      chats.find({ from: req.query.id }, function (err, list) {
        if (err) console.log(err);
        for (var i in list) {
          arr.push(JSON.stringify(list[i].to));
        }
        if (arr) callback(null, arr)
        else callback(true, null);
      });
    }
  }

  getListUserId("from", (error, list) => {
    if (!error) {
      arr.concat(list);
      getListUserId("to", (error, list) => {
        if (!error) {
          arr.concat(list);
          const distinct = [...new Set(arr)].reverse()
          for (var i in distinct) {
            distinct[i] = JSON.parse(distinct[i])
          }
          res.json(distinct);
        }
      })
    }
  })
})

router.get('/get-last-message', function (req, res) {
  chats.find({ $or: [{ to: req.query.from, from: req.query.to }, { to: req.query.to, from: req.query.from }] }, function (err, chats) {
    if (err) console.log(err);
    chats = chats.sort(function (a, b) {
      return new Date(a.time) - new Date(b.time);
    })
    var tmp = {};
    tmp.lastMessage = chats[chats.length - 1].detail
    tmp.lastImg = chats[chats.length - 1].linkImg
    tmp.time = chats[chats.length - 1].time
    res.json(tmp);
  });
})

/* GET ALL CHAT OF A GROUP CHAT */
router.get('/get-all-chat', function (req, res) {
  chats.find({ $or: [{ to: req.query.to, from: req.query.from }, { to: req.query.from, from: req.query.to }] }, function (err, chats) {
    if (err) res.json(err);
    res.json(chats);
  });
});

module.exports = router;
