var express = require('express');
var router = express.Router();
var chats = require('../models/Chat.jsx');
var users = require('../models/User.jsx')

/* GET LIST CHAT PEOPLE OF A USER */
router.get('/get-list-chat-people', function (req, res) {
  console.log('req.query.id', req.query.id)
  var arr = []
  var userList = []
  var result = []
  chats.find({ to: req.query.id }, async function (err, list) {
    if (err) res.json(err);
    list = list.filter((item, index) => list.indexOf(item) == index)
    for (var i in list) {
      var tmp = {};
      tmp.id = list[i].from;
      arr.push(tmp);
    }
  });
  chats.find({ from: req.query.id }, async function (err, list) {
    console.log('list1', list)
    if (err) res.json(err);
    list = list.filter((item, index) => list.indexOf(item) == index)
    console.log('list2', list)
    for (var i in list) {
      var tmp = {};
      tmp.id = list[i].to;
      arr.push(tmp);
    }
  });
  console.log("arr1", arr)
  arr = arr.filter((item, index) => arr.indexOf(item) == index)
  console.log("arr2", arr)
  for (var i in arr) {
    users.findById(arr[i].id, function (err, user) {
      if (err) res.json(err);
      userList.concat(user);
    })
  }
  console.log("userList", userList)
  for (var i in userList) {
    chats.find({ $or: [{ to: req.query.id, from: userList[i]._id }, { to: userList[i]._id, from: req.query.id }] }, function (err, chats) {
      if (err) res.json(err);
      var tmp = {};
      tmp.userId = userList[i]._id
      tmp.name = userList[i].name
      tmp.avatar = userList[i].avatar
      tmp.lastMessage = chats[chats.length - 1].detail
      tmp.time = chats[chats.length - 1].time
      result.concat(tmp);
    });
  }
  console.log("result", result)
  res.json(result);
})

/* GET ALL CHAT OF A GROUP CHAT */
router.get('/get-all-chat', function (req, res) {
  chats.find({ $or: [{ to: req.query.to, from: req.query.from }, { to: req.query.from, from: req.query.to }] }, function (err, chats) {
    if (err) res.json(err);
    res.json(chats);
  });
});

/* SAVE CHAT */
router.post('/insert', function (req, res) {
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
