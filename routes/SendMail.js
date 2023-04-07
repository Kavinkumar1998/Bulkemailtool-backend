import express from "express";
import {UserMail} from "../Model/Mailuser.js";
import { Emaildetails } from "../Model/Mailcontent.js";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();
const router = express.Router();


router.post("/sendMail",async (req,res)=>{
    try{
const {subject,message}=req.body;
const User = await UserMail.find();
console.log(User);
const sender = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.email,
        pass:process.env.password,
    }
});
for(var i=0;i<User.length;i++){

const composeMail = {
    from:process.env.email,
    to:`${ User[i].email }`,
    subject:`${subject}`,
    text:`hi,${User[i].name},${message}`,

};
const maildetails = await new Emaildetails({
    name: User[i].name,
    email: User[i].email,
    subject: subject,
    message: message,
    Date:new Date().toISOString()
}).save();
sender.sendMail(composeMail,(error,info)=>{
    if(error){
        console.log(error);
        return res.status(400).json({message:"sending error"});
    }
    else{
        res.status(200).json({message:"Email sent"});
    }

});   
}
res.status(200).json({message:"Mail Sent successfully to All"});

    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
})

//router for getting sent mails

router.get("/sentmails",async(req,res)=>{
    try{
        const mails= await Emaildetails.find();
        res.status(200).json(mails)

    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
});

//router for getting count for sentmails with in 24 hours
router.get("/sentmails/count",async(req,res)=>{
    try{
        const mails= await Emaildetails.find().count();
        res.status(200).json(mails)

    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
});


const SendmailRouter= router;
export {SendmailRouter}