const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const _ = require('lodash');
const creds = require('../config/config');
const Email = require('email-templates');

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// Load Model
const users = require('../models/User');
const posts = require('../models/Post');
const reports = require('../models/Report');
const services = require('../models/Service');
const chats = require('../models/Chat');
const comments = require('../models/Comment');
const apartments = require('../models/Apartment');

/* INSERTING AN USER TO DATABASE */
router.route('/insert')
  .post(function (req, res) {
    const { body } = req;
    const { email, flat, isAdmin, id, avatar, cover } = body;
    const { errors, isValid } = validateRegisterInput(body);
    // Check validation
    if (!isValid) {
      return res.send({success: false, errors: errors});
    }
    users.find({$and: [{email: email}, {apartment: id}]}, (err, user) => {
      if (err) console.log("err", err);
      if (!_.isEmpty(user)) {
        errors.email = "Email already exists";
        return res.send({success: false, errors: errors});
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
        user.isValidated = false;
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
      port: 587,
      secure: false,
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

    const email = new Email({
      transport: transporter,
      send: true,
      preview: false
    })

    apartments.findById(req.body.id, function(err, apartment) {
      if (err) console.log("err", err);
      users.find({ email: req.body.email }, (err, user) => {
        if (err) console.log("err", err);
        email.send({ 
          template: 'template',
          message: {
            from: "APSocial <no-reply@blog.com>",
            to: req.body.email
          },
          locals: {
            apartment: apartment.name,
            link: 'http://localhost:3000/@' + req.body.id + '?_id=' + user[0]._id
          }
        }).then((data) => {
          if (data) {
            res.json({
              msg: 'success'
            })
          } else {
            res.json({
              msg: 'fail'
            })
          }
        })
      })
    })
  })

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

router.put('/update_password', function (req, res) {
  const id = req.body.id
  users.findById(id, function (err, user) {
    if (err) console.log(err);
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid)
      return res.send({ success: false, errors: errors });
    const password = user.encryptPassword(req.body.password);
    users.updateOne({ _id: id }, { $set: { password: password, isValidated: true }}, function (err, result) {
      if (err) console.log(err, result);
      res.send({ success: true, message: 'User password successfully updated!' });
    })
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

router.put('/update-name', function(req, res) {
  let name = req.body.name
  users.updateOne({ _id: req.body.id }, { $set: { name: name } }, function (err, result) {
      if (err) console.log(err);
      res.json('User name successfully updated!')
  });
})

router.get('/delete', function (req, res) {
  var id = req.query.id;
  comments.remove({ author: id }, (err) => {
    if (err) console.log(err);
    posts.remove({ author: id }, (err) => {
      if (err) console.log(err);
      reports.remove({ author: id }, (err) => {
        if (err) console.log(err);
        chats.remove({ $or: [{ from: id, to: id}]}, (err) => {
          if (err) console.log(err);
          services.remove({ admin: id}, (err) => {
            if (err) console.log(err);
            users.remove({ _id: id }, (err) => {
              if (err) console.log(err);
              res.send('User successfully deleted!');
            })
          })
        })
      })
    })
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

router.get('/search', (req, res) => {
  users.find({$and: [{$or:[{name:{$regex:".*"+req.query.search+".*",$options: 'i'}},{flat:{$regex:".*"+req.query.search +".*", $options:'i'}}]}, {apartment: req.query.id}]}, (err, users) => {
    if (err)
      console.log(err);
    res.json(users);
  })
})

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