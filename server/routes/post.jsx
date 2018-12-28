var express = require('express');
var router = express.Router();
var posts = require('../models/Post.jsx');
var comments = require('../models/Comment.jsx');

/* GET ALL POST OF AN  APARTMENT*/
router.get('/get-all', function(req, res) {
  posts.find({$and: [{apartment: req.query.apartment}, {type: req.query.type}]}, function (err, posts) {
    if (err) console.log(err);
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
  posts.find({$and: [{author: req.query.id}, {type: req.query.type}]}, function (err, posts) {
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
  post.eventName = req.body.eventName
  post.date = req.body.date
  post.cost = req.body.cost
  post.save(function (err) {
    if (err)
      res.json(err);
    res.json("Create post sucessfully!");
  });
});

/* GET COMMENTS OF A POST */
router.get('/get-comment', function(req, res) {
  comments.find({post: req.query.post}, function(err, comments) {
    if (err) console.log('err', err);
    res.json(comments);
  })
})

/* SAVE COMMENT */
router.post('/insert-comment', function(req, res) {
  var comment = new comments()
  var now = new Date()
  comment.author = req.body.author
  comment.post = req.body.post
  comment.description = req.body.description
  comment.time = now
  comment.save(function (err) {
    if (err)
      console.log(err);
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
