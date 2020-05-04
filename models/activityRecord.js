const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ActivityRecordSchema = new Schema({
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
        trim:true,
    },
    mins:{
        type:Number,
        required:true,
    },
    date:{
        type:String,
        required:true,
        trim:true
    },
    count:{
        type:Number,
        required:true,
    }
})

ActivityRecordSchema.statics.findRecordByEmail= function(email){
    const ActivityRecord = this;
    return ActivityRecord.find({
        "email":email
    });
}

ActivityRecordSchema.statics.findAll= function(){
    const ActivityRecord = this;
    return ActivityRecord.find({}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
            console.log(result);
        }
      });
};
const ActivityRecord = mongoose.model('ActivityRecord', ActivityRecordSchema);
module.exports ={ActivityRecord};
