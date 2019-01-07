const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const _ = require('lodash');
const creds = require('../config/config');

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// Load Model
const users = require('../models/User');

router.route('/insert')
  .post(function (req, res) {
    const { body } = req;
    const { email, flat, isAdmin, id, avatar, cover } = body;
    const { errors, isValid } = validateRegisterInput(body);
    // Check validation
    if (!isValid) {
      return res.json(errors);
    }
    users.find({ email: email }, (err, user) => {
      if (err) console.log("err", err);
      if (!_.isEmpty(user)) {
        errors.email = "Email already exists";
        return res.json(errors);
      } else {
        var user = new users();
        user.email = email.toLowerCase();
        user.apartment = id;
        user.password = "";
        user.name = "User Name";
        user.birthday = "";
        user.sex = "";
        user.avatar = avatar;
        user.cover = cover;
        user.flat = flat;
        user.status = false;
        user.isAdmin = isAdmin;
        user.save(function (err) {
          if (err)
            console.log("err", err);
          res.send({
            success: true,
            message: 'User successfully added!'
          });
        })
      }
    })
  })

router.route('/login')
  .post(function (req, res) {
    const { body } = req;
    const errors = {};
    users.findById(body.id, function (err, user) {
      if (err) console.log(err);
      if (!user.validPassword(req.body.password)) {
        errors.password = "Your password is wrong"
        res.send({ success: false, errors: errors });
      } else {
        res.send({ success: true, message: "Login successfully!" });
      }
    })
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
      text: text,
      html: '<h1 style="text-align:center; font-weight: bold"> WELCOME TO APSOCIAL NETWORK</h1>'
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
    users.findById(id, function (err, user) {
      if (err)
        console.log(err);
      const password = user.encryptPassword(req.body.password);
      users.update({ _id: id }, { password: password }, function (err, result) {
        if (err)
          res.send(err);
        res.send('User password successfully updated!');
      });
    })
  });

router.route('/change_password')
  .post(function (req, res) {
    const id = req.body.id
    users.findById(id, function (err, user) {
      if (err) console.log(err);
      const { errors, isValid } = validateRegisterInput(req.body);
      if (!user.validPassword(req.body.oldPassword)) {
        if (!errors.oldPassword)
          errors.oldPassword = "Your old password is wrong."
        res.send({ success: false, errors: errors });
      } else {
        if (req.body.password == req.body.oldPassword) {
          if (!errors.password)
            errors.password = "New password must be difference with old password."
          res.send({ success: false, errors: errors });
        } else {
          if (_.isEmpty(errors)) {
            const password = user.encryptPassword(req.body.password);
            users.updateOne({ _id: id }, { $set: { password: password } }, function (err, result) {
              if (err)
                console.log(err, result);
              res.send({ success: true, message: 'User password successfully updated!' });
            });
          } else {
            res.send({ success: false, errors: errors });
          }
        }
      }
    })
  })

router.route('/update-info')
  .put(function (req, res) {
    let name = req.body.name
    let birthday = req.body.birthday
    let sex = req.body.sex
    users.updateOne({ _id: req.body.id }, { $set: { name: name, birthday: birthday, sex: sex } }, function (err, result) {
      if (err)
        res.send(err);
      req.session.user.name = name
      req.session.user.birthday = birthday
      req.session.user.sex = sex
      res.json('User info successfully updated!');
    });
  });

router.put('/update-avatar', function (req, res) {
  let avatar = req.body.avatar
  users.updateOne({ _id: req.body.id }, { $set: { avatar: avatar } }, function (err, result) {
    if (err)
      res.send(err);
    req.session.user.avatar = avatar
    res.json('User avatar successfully updated!');
  });
})

router.put('/update-cover', function (req, res) {
  let cover = req.body.cover
  users.updateOne({ _id: req.body.id }, { $set: { cover: cover } }, function (err, result) {
    if (err)
      res.send(err);
    req.session.user.cover = cover
    res.json('User cover successfully updated!');
  });
})

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

router.get('/get-user', function (req, res) {
  let id = req.query.id;
  users.findById(id, function (err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
});

router.get('/get-resident-of-apartment', function (req, res) {
  var id = req.query.id;
  users.find({ apartment: id }, function (err, users) {
    if (err)
      res.send(err);
    users = users.filter(item => JSON.stringify(item._id) != JSON.stringify(req.query.userId));
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
  res.json(req.session.user);
});

router.get('/logout', function (req, res) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err)
        console.log(err);
      res.json("Log out successfully!");
    })
  }
})

router.get('/check-logged-in', function (req, res) {
  if (req.session.user)
    res.json(true);
  else res.json(false);
})

module.exports = router;
