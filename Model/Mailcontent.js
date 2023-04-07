import mongoose from "mongoose";

const mailSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    subject:{
      type:String,
      required:true
    },
  message:{
    type:String,
    required:true
  },
  Date:{type:Date,
    required:true}

})
const Emaildetails= mongoose.model("Emaildetails",mailSchema);
export {Emaildetails}