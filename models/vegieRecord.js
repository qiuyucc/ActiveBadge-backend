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
