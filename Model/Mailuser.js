import mongoose from "mongoose";

const usermailSchema = new  mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})

const UserMail = mongoose.model("Usermail",usermailSchema);
export {UserMail}
