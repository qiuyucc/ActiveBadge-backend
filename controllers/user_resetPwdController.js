var express = require('express');
var router = express.Router();
const { User_reset } = require('../models/user_resetPwd');
const { User } = require('../models/user');
var res1 = require('../models/constantResponse');
var moment = require('moment');


const mailgun = require('../models/email-util');

//search by email
router.post("/user_rest", (req, res, next) => {
  User.findUserByEmail(req.body.email).then((user) => {
    req.user = user;
    next();
  }).catch((error) => {
    res1.failure(res, { reason: 'Email is not exist.' })
  });
}, (req, res) => {
  //mailgun.sendEmail('tsemingyeungg@gmail.com',req.user.code);
  res1.success(res, { email: req.user });
});

//create code
router.post("/forget_code_create", async (req, res) => {
  const user_reset = new User_reset({
    email: req.body.email,
    code: User_reset.generateCode(),
    expire_timestamp: moment().add(5, 'minutes').unix(),
    created_timestamp: moment().unix(),
    verified: false
  });
  try {
    await user_reset.save();
    //send email to user.
    res.status(200).send(user_reset);
    mailgun.sendEmail('qiuyucc@yahoo.com', user_reset.code);
    console.log(user_reset);
  } catch (err) {
    res.status(500).send(err);
  }
});

//search by user input code
router.post("/verify_code", (req, res, next) => {
  User_reset.findUserByCode(req.body.code).then((user) => {
    req.user = user;
    next();
  }).catch((error) => {
    res1.failure(res, { reason: 'Code is not exist.' })
    // res.status(400).send('something wrong');
  });
}, (req, res) => {
  // if req.body.code === req.user.code  set verified ==true.
  res1.success(res, { code: req.user });
});

//delete code
router.post("/delete_code", (req, res) => {
  User_reset.deleteOne({ email: req.body.email }, function (err, result) {
    if (err) {
      res1.failure(res, { reason: err });
    } else {
      res1.success(res, { code: result });
    }
  });
})
//update pwd
router.post("/updatePwd", (req, res, next) => {
  User.findUserByEmail(req.body.email)
    .then((user) =>{
        //req.password = user.password; 
        user.password=req.body.password;
        req.user = user; 
        next();
    })
    .catch((error) => {
      res1.failure(res, { reason: 'Something wrong.' })
    });
}, (req, res) => {
  req.user.updateResetPwd();
  res1.success(res, { code: req.user });
});

module.exports = router;


