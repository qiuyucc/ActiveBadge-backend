const express = require("express");
const app = express();
const bodyParser = require('body-parser')


const userController = require("./controllers/userController");
const avatarController = require("./controllers/avatarController");
const {mongoose} = require("./db/db");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use("/user", userController);
app.use("/avatar",avatarController);

app.listen(3333,()=>{
  console.log("Server is running on port 3333");
});
