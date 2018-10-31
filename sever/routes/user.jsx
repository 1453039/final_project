var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('../models/User');

router.get('/', function (req, res) {
  res.render('index')
});

router.route('/insert')
  .post(function (req, res) {
    var user = new User();
    user.email = req.body.email;
    user.apartment = "";
    user.password = "";
    user.name = "";
    user.birthday = "";
    user.sex = "";
    user.room = req.body.room;
    user.isAdmin = req.body.isAdmin;
    User.save(function (err) {
      if (err)
        res.send(err);
      res.send('User successfully added!');
    });
  })

router.route('/update_password/:id')
  .post(function (req, res) {
    const password = req.body.password;
    User.update({ _id: req.params.id }, password, function (err, result) {
      if (err)
        res.send(err);
      res.send('User password successfully updated!');
    });
  });

router.route('/update_info/:id')
  .post(function (req, res) {
    const doc = {
      name: req.body.name,
      birthday: req.body.birthday,
      sex = req.body.sex
    };
    console.log(doc);
    User.update({ _id: req.params.id }, doc, function (err, result) {
      if (err)
        res.send(err);
      res.send('User info successfully updated!');
    });
  });

router.get('/delete', function (req, res) {
  var id = req.query.id;
  User.find({ _id: id }).remove().exec(function (err, result) {
    if (err)
      res.send(err)
    res.send('User successfully deleted!');
  })
});

router.get('/get-resident-of-apartment/:id', function (req, res) {
  var id = req.params.id;
  User.find({ apartment: id }, function (err, users) {
    if (err)
      res.send(err);
    res.json(users);
  });
});
module.exports = router;
