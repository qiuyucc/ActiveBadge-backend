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
    dateFormat:{
        type:Date,
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

ActivityRecordSchema.statics.recordByActivity=function(email,start,end){
    const ActivityRecord = this;
    var days = (end -start)/(1000 * 3600 * 24);
     return ActivityRecord.aggregate([
         {
             $addFields:{
                 "days":days
             }
         },
         {
             $match:{
                "email":email,
                "dateFormat":{
                    $gte:start,
                    $lte:end
                }
             }
         },
        {
            $group:{
                _id:null,
                totalmins: {$sum:"$mins"},
                data:{$push:"$$ROOT"}
            }
        },
        {
            $unwind:"$data"
        },
        {
            $group:{
                _id: '$data.description',
                totalbyActivity:{$sum:'$data.mins'},
                totalTime:{$first:"$totalmins"},
                days:{$first:"$data.days"}
            }
        },{
            $project:{
                description:"$_id",
                totalbyActivity:"$totalbyActivity",
                totalTime:"$totalTime",
                percent: { $trunc:[{$multiply:[{$divide:["$totalbyActivity","$totalTime"]},100]},2]},
                averageTime: { $trunc:[{$divide:["$totalTime","$days"]},2]}
            }
        }
    ])
};

ActivityRecordSchema.statics.recordByDate= function(email,start,end){
    const ActivityRecord = this;
    return ActivityRecord.aggregate([
        {
            $match:{
               "email":email,
               "dateFormat":{
                   $gte:start,
                   $lte:end
               }
            }
        },
        {
            $group:{
               _id: '$date', 
               mins:{$sum:'$mins'},
               count:{$sum:1}
            }
        }
   ])
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
     ] )
    };

const ActivityRecord = mongoose.model('ActivityRecord', ActivityRecordSchema);
module.exports ={ActivityRecord};
