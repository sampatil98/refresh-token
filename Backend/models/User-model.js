const mongoose=require("mongoose");

let userSchema= mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    phone:{
        type: Number,
        required:true
    }
});

let UserModel= new mongoose.model("UserData",userSchema);

module.exports={UserModel}