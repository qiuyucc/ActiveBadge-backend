const express = require("express");
const app = express();
const bodyParser = require('body-parser')


const userController = require("./controllers/userController");
const avatarController = require("./controllers/avatarController");
const activityController = require("./controllers/activityController");
const vegieController = require("./controllers/vegieController");
const activityRecordController = require("./controllers/activityRecordController");
const vegieRecordController = require("./controllers/vegieRecordController");
const user_resetPwdController = require("./controllers/user_resetPwdController");
const {mongoose} = require("./db/db");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use("/user", userController);
app.use("/avatar",avatarController);
app.use("/activity", activityController);
app.use("/vegie",vegieController);
app.use("/activityrecord",activityRecordController);
app.use("/vegierecord",vegieRecordController);
app.use("/reset",user_resetPwdController);

app.listen(3333,()=>{
  console.log("Server is running on port 3333");
});
