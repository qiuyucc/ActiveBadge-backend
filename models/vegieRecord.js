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
    dateFormat:{
        type:Date,
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

VegieRecordSchema.statics.recordByVegie=function(email,start,end){
    const VegieRecord = this;
    var days = (end -start)/(1000 * 3600 * 24);
     return VegieRecord.aggregate([
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
                totalNum: {$sum:"$count"},
                data:{$push:"$$ROOT"}
            }
        },
        {
            $unwind:"$data"
        },
        {
            $group:{
                _id: '$data.description',
                totalbyVegie:{$sum:'$data.count'},
                totalNum:{$first:"$totalNum"},
                days:{$first:"$data.days"}
            }
        },{
            $project:{
                description:"$_id",
                totalbyVegie:"$totalbyVegie",
                totalNum:"$totalNum",
                percent: { $trunc:[{$multiply:[{$divide:["$totalbyVegie","$totalNum"]},100]},2]},
                averageTime: { $trunc:[{$divide:["$totalNum","$days"]},2]}
            }
        }
    ])
};

VegieRecordSchema.statics.recordByDate= function(email,start,end){
    const VegieRecord = this;
    return VegieRecord.aggregate([
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
               totalnum:{$sum:'$count'},
               times:{$sum:1}
            }
        }
   ])
};

VegieRecordSchema.statics.findRank= function(){
    const VegieRecord = this;
    return VegieRecord.aggregate([
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
                totalNum:{$sum:'$data.count'},
                count:{$sum:1},
                total:{$first:"$count"},
                }
            },
             {
                $project: {
                description:"$_id",
                url:{$concat:["https://activebadge.s3-ap-southeast-2.amazonaws.com/","$name"]},
               // totalNum:"$totalNum",
               // count:"$count",
                //total:"$total",
                percent: { $trunc:[{$multiply:[{$divide:["$count","$total"]},100]},2]}
              }
            },{
                $sort:{"percent":-1 }
            }
     ] )};



const VegieRecord = mongoose.model('VegieRecord', VegieRecordSchema);
module.exports ={VegieRecord};
