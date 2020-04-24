var express = require('express');
var router = express.Router();
const {User} = require('../models/user');


router.get("/user",(req,res,next)=>{
    var token = req.header("x-auth");
    User.findUserByToken(token).then((user)=>{
      if(!user){
        return Promise.reject('Not found!');
      }else{
        req.user = user;
        req.token = token;
        next();
      }
    }).catch((error)=>{
        res.status(401).send();
    });
},(req,res)=>{
    res.send(req.user);
})


router.post("/create",(req,res)=>{
  console.log(req.body);
  const userData={
    username:req.body.username,
    email:req.body.email,
    password:req.body.password
  }
  const user = new User(userData);
  user.save().then((user)=>{
    if(user){
      return user.generateAuthToken();
    }else{
      res.sendStatus(400);
    }
  }).then((token)=>{
    res.header({"x-auth":token}).send(user)
  }).catch((error)=>{
    res.status(400).send(error);
  })
})

router.post("/login",(req,res)=>{
  User.findUserByCredentials(req.body.email,req.body.password)
  .then((user)=>{
    user.generateAuthToken().then((token)=>{
      res.header({"x-auth":token}).send(user);
  });
})
.catch(error => {
  res.status(400).json({ message: "Invalid credentials." });
});

});

router.get("/logout",(req,res,next)=>{
  var token = req.header("x-auth");
  User.findUserByToken(token).then((user)=>{
    if(!user){
      return Promise.reject('Not found!');
    }else{
      req.user = user;
      req.token = token;
      next();
    }
  }).catch((error)=>{
      res.status(401).send();
  });
},(req,res)=>{
  req.user.removeToken(req.token).then(()=>{
    res.status(200).send("user logged out");
  }).catch(()=>{
    res.status(401).send();
  });
});



module.exports  = router;
