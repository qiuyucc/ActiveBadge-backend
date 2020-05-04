const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require("lodash");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    minlength: 3
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    minlength: 6
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 8
  },
  image:{
    type:String,
    required:true
  },
  point:{
    type:Number
  },
  age:{
    type:Number
  },
  gender:{
    type:String
  },
  suburb:{
    type:String,
    trim:true
  },
  state:{
    type:String,
    trim:true
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});
//avoid token and password show in the body 
// UserSchema.methods.toJSON = function () {
//   const user = this;
//   const userObject = user.toObject();
//   return _.pick(userObject, ["_id", "email", "username"])
// }
//generatte token
UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const access = "auth";
  const token = jwt.sign({ _id: user._id.toHexString(), access }, 'SDHDSNVUW88270SDYH').toString();
  user.tokens.push({ access, token });
  return user.save().then(() => {
    return token;
  });
}
//hash the password
UserSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(user.password, salt, function (err, hash) {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.statics.findUserByCredentials = function(email,password){
  const User = this;
  return User.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject('User not available');
    } else {
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            resolve(user);
          } else {
            reject();
          }
        })
      })
    }
  });
}

UserSchema.methods.removeToken= function(token){
   const user = this;
   return user.update({
      $pull:{
        tokens: {token}
      }
   });
}

UserSchema.statics.findUserByToken=function(token){
  const User = this;
  let decoded;

  try{
    decoded= jwt.verify(token,"SDHDSNVUW88270SDYH");
  }catch(e){
    return Promise.reject('Unable to find');
  }
  return User.findOne({
    "_id":decoded._id
    // "tokens.token":token,
    // "tokens.access":"auth"
  });
}

UserSchema.statics.updateAvatar = function(image,token){
  const User = this;
  let decoded;
  console.log(image);
  try{
    decoded= jwt.verify(token,"SDHDSNVUW88270SDYH");
  }catch(e){
    return Promise.reject('Unable to find');
  }
  return User.findOneAndUpdate({"_id":decoded._id},{"image":image},function(err,result){
    if(err){
      console.log(err)
    }else{
      console.log(result)
    }
  })
}
UserSchema.statics.updatePoint = function(point,token){
  const User = this;
  let decoded;
  console.log(point);
  try{
    decoded= jwt.verify(token,"SDHDSNVUW88270SDYH");
  }catch(e){
    return Promise.reject('Unable to find');
  }
  return User.findOneAndUpdate({"_id":decoded._id},{"point":point},function(err,result){
    if(err){
      console.log(err)
    }else{
      console.log(result)
    }
  })
}

UserSchema.statics.updateProfile = function(age,gender,state,suburb,token){
  const User = this;
  let decoded;
  try{
    decoded= jwt.verify(token,"SDHDSNVUW88270SDYH");
  }catch(e){
    return Promise.reject('Unable to find');
  }
  return User.findOneAndUpdate({"_id":decoded._id},
    {"age":age,"gender":gender,"state":state,"suburb":suburb},function(err,result){
    if(err){
      console.log(err)
    }else{
      console.log(result)
    }
  })
}

//find by email
UserSchema.statics.findUserByEmail = function (email) {
  const User = this;
  return User.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject('User not exist');
    } else {
      return Promise.resolve(user);
    }
  });
}

//PWD
UserSchema.methods.updateResetPwd = function () {
  const user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    console.log('123: ' + user.password + ' 234 ' + hash);
    return user.updateOne({
      $set: {
        password: hash
      }
    }, function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log(success);
      }
    })
  });
}


const User = mongoose.model('User', UserSchema);

module.exports = { User };
