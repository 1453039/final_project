var express = require('express');
var router = express.Router();
var users = require('../models/User');
var nodemailer = require('nodemailer');
const creds = require('../config/config');

router.get('/', function (req, res) {
  res.render('index')
});

router.route('/insert')
  .post(function (req, res) {
    var user = new users();
    user.email = req.body.email;
    user.apartment = req.body.id;
    user.password = "";
    user.name = "";
    user.birthday = "";
    user.sex = "";
    user.room = req.body.room;
    user.isAdmin = req.body.isAdmin ? req.body.isAdmin : false;
    user.save(function (err) {
      if (err)
        res.send(err);
      res.send('User successfully added!');
    });
  })

router.route('/send')
  .post(function (req, res) {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secureConnection: false,
      port: 587,
      requiresAuth: true,
      domains: ["gmail.com", "googlemail.com"],
      auth: {
        user: creds.USER, // generated ethereal user
        pass: creds.PASS // generated ethereal password
      }
    });

    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log('Server is ready to take our messages');
      }
    });

    let text = "Your apartment domain is localhost:3000/@" + req.body.id

    let mailOptions = {
      from: creds.USER, // sender address
      to: req.body.email,
      subject: "Welcome to AP Social", // Subject line
      text: text
    };
    
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        res.json({
          msg: 'fail'
        })
      } else {
        res.json({
          msg: 'success'
        })
      }
    })

  })

router.route('/update_password')
  .post(function (req, res) {
    const id = req.body.id
    users.findById(id, function(err, user){
      if(err)
        res.send(err);
      const password = user.encryptPassword(req.body.password);
      users.update({ _id: id }, {password: password}, function (err, result) {
        if (err)
          res.send(err);
        res.send('User password successfully updated!');
      });
    })
  });

router.route('/update_info/:id')
  .post(function (req, res) {
    const doc = {
      name: req.body.name,
      birthday: req.body.birthday,
      sex: req.body.sex
    };
    console.log(doc);
    users.update({ _id: req.params.id }, doc, function (err, result) {
      if (err)
        res.send(err);
      res.send('User info successfully updated!');
    });
  });

router.get('/delete', function (req, res) {
  var id = req.query.id;
  users.find({ _id: id }).remove().exec(function (err, result) {
    if (err)
      res.send(err)
    res.send('User successfully deleted!');
  })
});

router.get('/getAll', function (req, res) {
  users.find({}, function (err, users) {
    if (err)
      res.send(err);
    res.json(users);
  });
});

router.get('/get_user', function (req, res) {
  id = res.query.id;
  users.findById(id, function (err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
});

router.get('/get-resident-of-apartment/:id', function (req, res) {
  var id = req.params.id;
  users.find({ apartment: id }, function (err, users) {
    if (err)
      res.send(err);
    res.json(users);
  });
});

router.post('/save_to_session', function (req, res) {
  const id = req.body.id;
  users.findById(id, function (err, user) {
    if (err)
      res.send(err);
    req.session.user = user;
    res.send("Save user to session successfully!")
  });
});

router.get('/get_user_from_session', function (req, res) {
  console.log("req.session", req.session)
  res.json(req.session.user);
});

module.exports = router;