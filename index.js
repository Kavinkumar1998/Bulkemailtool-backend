import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { DatabaseConnection } from "./databaseConnection.js";
import { signupRouter } from "./routes/Register.js";
import { loginRouter} from"./routes/Login.js";
import { isSignedIn } from "./routes/Autherization.js";
import {Mailrouter} from "./routes/Users.js"
import { SendmailRouter } from "./routes/SendMail.js";
dotenv.config();
DatabaseConnection();
const app = express();
app.use(express.json());
app.use(cors());
// app.use(express.static('routes'))
 const PORT = process.env.PORT;
 app.get("/",(req,res)=>{
    try{
        res.send("Welcome to Bulk email server")
    }
    catch(error){
        res.status(500).send({message:"Internal Server Error"})
    }
 });

 app.use("/",signupRouter);
 app.use("/",loginRouter);
app.use("/",isSignedIn,Mailrouter);
app.use("/",isSignedIn,SendmailRouter);

 app.listen(PORT,()=>console.log(`server stated at ${PORT}`));
