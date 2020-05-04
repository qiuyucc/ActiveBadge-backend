const mongoose = require("mongoose");
var seedrandom = require('seedrandom');
var moment = require('moment')
const _ = require("lodash");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;


const User_resteSchema = new Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    //required: true,
    minlength: 6
  },
  code: {
    type: String
  },
  expire_timestamp: {
    type: Date,
  },
  created_timestamp: {
    type: Date,
    default: Date.now
  },
  verified: {
    type: Boolean,
    required: true
  },

}, { collection: 'user_resetPwd' });

User_resteSchema.methods.toJSON = function () {
  const user_rest = this;
  const user_resetObject = user_rest.toObject();
  return _.pick(user_resetObject, ["_id", "email", "code", "expire_timestamp", "created_timestamp", "verified"])
}

//generatte random code
User_resteSchema.statics.generateCode = function () {
  var prng = new seedrandom();
  const code = prng().toString().substring(3, 9);
  return code;
}

User_resteSchema.statics.findUserByCode = function (code) {
  const user_rest = this;
  return user_rest.findOne({ code }).then((user) => {
    if (!user) {
      return Promise.reject('User not exist');
    } else {
      return Promise.resolve(user);
    }
  });
}


//Test
User_resteSchema.methods.updateResetPwd = function () {
  const user = this;
  bcrypt.hash(user.code, 10, function (err, hash) {
    console.log('123: ' + user.code + ' 234 ' + hash);
    return user.updateOne({
      $set: {
        code: hash
      }
    }, function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log(success);
      }
    }
    )
  });
}

const User_reset = mongoose.model('User_reset', User_resteSchema);
module.exports = { User_reset };