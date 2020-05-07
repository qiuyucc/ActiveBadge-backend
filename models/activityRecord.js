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


ActivityRecordSchema.statics.findRank= function(){
    const ActivityRecord = this;
    return ActivityRecord.aggregate([
            {
            $group:{
                _id: null,
                count:{$sum:1},
                data:{$push:"$$ROOT"}
                //percent:{$multiply:[{$divide:["$count",{nums}]},100]}
                }
            },
            {
                $unwind:"$data"
            },
            {
            $group:{
                _id: '$data.description',
                name:{$first: '$data.name'},
                totalmin:{$sum:'$data.mins'},
                count:{$sum:1},
                total:{$first:"$count"}
                }
            },
             {
                $project: {
                description:"$_id",
                url:{$concat:["https://activebadge.s3-ap-southeast-2.amazonaws.com/","$name"]},
                percent: { $trunc:[{$multiply:[{$divide:["$count","$total"]},100]},2]}
              }
            },{
                $sort:{"percent":-1 }
            }
     ] )};

const ActivityRecord = mongoose.model('ActivityRecord', ActivityRecordSchema);
module.exports ={ActivityRecord};
