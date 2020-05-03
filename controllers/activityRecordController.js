var express = require('express');
var router = express.Router();
const {ActivityRecord} =require('../models/activityRecord');

router.post("/post",(req,res)=>{
    console.log(req.body);
    const record={
        email:req.body.email,
        name:req.body.name,
        description:req.body.description,
        mins: req.body.mins,
        date:req.body.date,
        count:1
    }
    const newRecord = new ActivityRecord(record);
    newRecord.save();
    res.send(newRecord);
}
);


module.exports = router;