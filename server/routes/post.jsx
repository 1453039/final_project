var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var posts = require('../models/Post.jsx');

/* GET ALL POST */
router.get('/get-all', function(req, res, next) {
  posts.find(function (err, posts) {
    if (err) res.json(err);
    res.json(posts);
  });
});

/* GET SINGLE POST BY ID */
router.get('get-post', function(req, res, next) {
  posts.findById(req.query.id, function (err, post) {
    if (err) res.json(err);
    res.json(post);
  });
});

/* GET ALL POST OF AN USER BY ID */
router.get('/get-post-user', function(req, res, next) {
  posts.find({user: req.query.id}, function (err, posts) {
    if (err) res.json(err);
    res.json(posts);
  });
});

/* SAVE POST */
router.post('/insert', function(req, res, next) {
  var post = new posts()
  var now = new Date().now
  post.apartment = req.body.apartment
  post.user = req.body.user
  post.isAdmin = req.body.isAdmin
  post.time = now
  post.description = req.body.description
  post.numLike = 0
  post.numDislike = 0
  post.linkImg = req.body.linkImg ? req.body.linkImg : ""
  post.linkVideo = req.body.linkVideo ? req.body.linkVideo : ""
  post.type = req.body.type
  post.save(function (err, post) {
    if (err)
      res.send(err);
    res.send("Create post sucessfully!");
  });
});

/* UPDATE POST */
router.put('/:id', function(req, res, next) {
  posts.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE POST */
router.delete('/:id', function(req, res, next) {
  posts.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
