const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VegieSchema = new Schema({
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

VegieSchema.statics.findVegieById= function(id){
    const Vegie = this;
    return Vegie.findOne({
        "id":id
    });
}

VegieSchema.statics.findAll= function(){
    const Vegie = this;
    return Vegie.find({}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
            console.log(result);
        }
      });
};


const Vegie = mongoose.model('Vegie', VegieSchema);
module.exports ={Vegie};
