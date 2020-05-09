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
        dateFormat:req.body.date,
        color:"#"+((1<<24)*Math.random()|0).toString(16),
        count:1
    }
    const newRecord = new ActivityRecord(record);
    newRecord.save();
    res.send(newRecord);
}
);

router.get("/record", (req, res) => {
    ActivityRecord.findAll().then((result) => {
        if (!result) {
            return Promise.reject('Not found!');
        } else {
            res.json(result);
        }
})});

router.get("/rank", (req, res) => {
    ActivityRecord.findRank().then((result) => {
        if (!result) {
            return Promise.reject('Not found!');
        } else {
            res.json(result);
        }
})});

router.get("/reportbyactivity/:email/:start/:end",(req,res)=>{
    var email = req.params.email;
    var start = new Date(req.params.start);
    var end = new Date(req.params.end);
    ActivityRecord.recordByActivity(email,start,end).then((result)=>{
        if(!result){
            return Promise.reject('Not found!');
        }else{
            res.json(result);
        }
    })
})

router.get("/reportbydate/:email/:start/:end",(req,res)=>{
    var email = req.params.email;
    var start = new Date(req.params.start);
    var end = new Date(req.params.end);
    ActivityRecord.recordByDate(email,start,end).then((result)=>{
        if(!result){
            return Promise.reject('Not found!');
        }else{
            res.json(result);
        }
    })
})

module.exports = router;