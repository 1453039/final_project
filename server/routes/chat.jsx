var express = require('express');
var router = express.Router();
var chats = require('../models/Chat.jsx');
var users = require('../models/User')

/* GET ALL CHAT OF A GROUP CHAT */
router.get('/get-all-chat', function(req, res) {
  chats.find({to: req.query.to, from: req.query.from}, function (err, posts) {
    if (err) res.json(err);
    res.json(posts);
  });
});

/* GET SINGLE POST BY ID */
router.get('get-post', function(req, res) {
  posts.findById(req.query.id, function (err, post) {
    if (err) res.json(err);
    res.json(post);
  });
});

/* GET ALL POST OF AN USER BY ID */
router.get('/get-post-user', function(req, res) {
  posts.find({author: req.query.id}, function (err, posts) {
    if (err) res.json(err);
    res.json(posts);
  });
});

/* SAVE POST */
router.post('/insert', function(req, res) {
  var post = new posts()
  var now = new Date()
  post.apartment = req.body.apartment
  post.author = req.body.author
  post.isAdmin = req.body.isAdmin
  post.time = now
  post.description = req.body.description
  post.like = []
  post.dislike = []
  post.linkImg = req.body.linkImg ? req.body.linkImg : ""
  post.linkVideo = req.body.linkVideo ? req.body.linkVideo : ""
  post.type = req.body.type
  post.cost = 0
  post.save(function (err) {
    if (err)
      res.json(err);
    res.json("Create post sucessfully!");
  });
});

/* UPDATE POST LiKE*/
router.put('/update-like', function(req, res) {
  console.log("req.query", req.query)
  posts.findByIdAndUpdate(req.query.id, {numLike: req.query.numLike}, function (err) {
    if (err) res.send(err);
    res.send("Update post like sucessfully!");
  });
});

/* UPDATE POST LIKE AND DISLIKE*/
router.put('/update-reaction', function(req, res) {
  posts.updateOne({_id: req.body.id},{$set: {like: req.body.like, dislike: req.body.dislike}}, function (err) {
    if (err) res.send(err);
    res.json("Update post reaction sucessfully!");
  });
});

/* DELETE POST */
router.delete('/:id', function(req, res) {
  posts.findByIdAndRemove(req.params.id, req.body, function (err) {
    if (err) res.send(err);
    res.json("Delete Post sucessfully!");
  });
});

module.exports = router;
