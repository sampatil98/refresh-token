const mongoose=require("mongoose");
require("dotenv").config();
let connection= mongoose.connect(process.env.Mongo_Uri);

module.exports={connection}