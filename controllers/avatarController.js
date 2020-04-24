var express = require('express');
var router = express.Router();
const {Avatar} = require('../models/avatar');
const fs = require('fs');



router.get("/upload",(req,res)=>{
    console.log(req.body);
    const avatarInfo={
        id:req.body.id,
        name:req.body.name,
    }
    const avatar = new Avatar(avatarInfo);
    avatar.save();
    res.send(avatar);
});

router.get("/avatar/:id",(req,res,next)=>{
    var id = req.params.id;
    Avatar.findAvatarById(id).then((avatar)=>{
        if(!avatar){
            return Promise.reject('Not found!');
        }else{
            req.avatar = avatar;
            req.id = id;
            next();
        }
    }).catch((error)=>{
        res.status(401).send();
    });
},(req,res)=>{
    res.send(req.avatar);
})

router.get("/check",(req,res)=>{
    if(!req.body==null){
        res.status(200).send("connected!");
    }
  });


module.exports  = router;