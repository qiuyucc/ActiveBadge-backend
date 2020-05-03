const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VegieRecordSchema = new Schema({
    email:{
        type:String,
        trim:true,
        required:true
    },
    name:{
        type:String,
        trim:true,
        required:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    date:{
        type:String,
        required:true,
        trim:true
    },
    count:{
        type:Number,
        required:true
    }
})


const VegieRecord = mongoose.model('VegieRecord', VegieRecordSchema);
module.exports ={VegieRecord};
