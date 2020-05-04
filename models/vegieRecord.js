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


VegieRecordSchema.statics.findRecordByEmail= function(email){
    const VegieRecord = this;
    return VegieRecord.find({
        "email":email
    });
}

VegieRecordSchema.statics.findAll= function(){
    const VegieRecord = this;
    return VegieRecord.find({}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
            console.log(result);
        }
      });
};
const VegieRecord = mongoose.model('VegieRecord', VegieRecordSchema);
module.exports ={VegieRecord};
