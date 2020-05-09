var express = require('express');
var router = express.Router();
const {VegieRecord} =require('../models/vegieRecord');

router.post("/post",(req,res)=>{
    console.log(req.body);
    const record={
        email:req.body.email,
        name:req.body.name,
        description:req.body.description,
        date:req.body.date,
        dateFormat:req.body.date,
        color:"#"+((1<<24)*Math.random()|0).toString(16),
        count:req.body.count
    }
    const newRecord = new VegieRecord(record);
    newRecord.save();
    res.send(newRecord);
}
);

router.get("/record", (req, res) => {
    VegieRecord.findAll().then((result) => {
        if (!result) {
            return Promise.reject('Not found!');
        } else {
            res.json(result);
        }
})});

router.get("/rank", (req, res) => {
    VegieRecord.findRank().then((result) => {
        if (!result) {
            return Promise.reject('Not found!');
        } else {
            res.json(result);
        }
})});

router.get("/reportbyvegie/:email/:start/:end",(req,res)=>{
    var email = req.params.email;
    var start = new Date(req.params.start);
    var end = new Date(req.params.end);
    VegieRecord.recordByVegie(email,start,end).then((result)=>{
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
    VegieRecord.recordByDate(email,start,end).then((result)=>{
        if(!result){
            return Promise.reject('Not found!');
        }else{
            res.json(result);
        }
    })
})

module.exports = router;