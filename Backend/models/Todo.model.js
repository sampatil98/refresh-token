const mongoose=require("mongoose");
const { boolean } = require("webidl-conversions");

let todoSchema= mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    date:{
        type: Date,
        default: Date.now
    },
    userId:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default: false
    }
});

let TodoModel= new mongoose.model("TodoData",todoSchema);

module.exports={TodoModel}