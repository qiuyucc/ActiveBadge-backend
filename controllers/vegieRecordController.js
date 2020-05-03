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
        count:req.body.count
    }
    const newRecord = new VegieRecord(record);
    newRecord.save();
    res.send(newRecord);
}
);


module.exports = router;