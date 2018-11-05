var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('index')
});

router.get('/info', function (req, res) {
  res.render('index')
});

router.get('/timepline', function (req, res) {
  res.render('index')
});

router.get('/newfeed', function (req, res) {
  res.render('index')
});

router.get('/member', function (req, res) {
  res.render('index')
});

router.get('/changepassword', function (req, res) {
  res.render('index')
});

router.get('/friend', function (req, res) {
  res.render('index')
});

module.exports = router;
