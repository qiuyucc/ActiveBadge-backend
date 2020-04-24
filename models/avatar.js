const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AvatarSchema = new Schema({
    id: {
        type: Number
    },
    name:{
        type:String,
        unique:true
    }
})

AvatarSchema.statics.findAvatarById= function(id){
    const Avatar = this;
    return Avatar.findOne({
        "id":id
    });
}

const Avatar = mongoose.model('Avatar', AvatarSchema);
module.exports ={Avatar};
