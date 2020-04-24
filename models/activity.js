const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
    id: {
        type: Number
    },
    name:{
        type:String,
        unique:true
    },
    description:{
        type:String,
        unique:true
    },
    calorie:{
        type:String
    }
})

ActivitySchema.statics.findActivityById= function(id){
    const Activity = this;
    return Activity.findOne({
        "id":id
    });
}

const Activity = mongoose.model('Activity', ActivitySchema);
module.exports ={Activity};
