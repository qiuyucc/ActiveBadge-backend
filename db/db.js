var mongoose = require('mongoose');

const mogodb_url ="mongodb+srv://abUser:2BJ5QuHHhrCffRC9@activebadge-ldypg.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(mogodb_url, {useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify:false});

module.exports = {mongoose};
