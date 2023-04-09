import express, { json } from "express";
import dotenv from "dotenv";
import {UserMail} from "../Model/Mailuser.js";
import multer from "multer";
import csv from "csvtojson";

dotenv.config();
const router = express.Router();

const excelStorage = multer.memoryStorage();  
const excelUploads = multer({storage:excelStorage}); 



//route for uploading single data
router.post("/adduser",async (req,res)=>{
    try{
const {name,email}=req.body;
const user = await UserMail.findOne({email:email});
if(user){
    res.status(400).json({message:"User already Exists"});

}else{
const adduser = await new UserMail(req.body).save();
res.status(200).json({message:"User Added successfully"})
}
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
});

//router for editing mailusers
router.put("/edituser/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const {name,email}=req.body;
        const user = await UserMail.findById(id);
        if(!user){
            res.status(400).json({message:"User not found"});                                            
        }else{
            const updated = req.body;
            const edituser= await UserMail.findByIdAndUpdate((id),{$set:updated});
            res.status(200).json({message:"User updated successfully"});
        }

    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
})

//router for geting users
router.get("/users",async(req,res)=>{
    try{
        const users = await UserMail.find();
        if(!users){
            res.status(400).json({message:"No Users"})
          }
          else
          { 
            res.status(200).json(users);
        }      
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server error"})
    }
})


//route for deleting users
router.delete("/delete/:id",async (req,res)=>{
    try{
const {id} = req.params;
const deleted = await UserMail.findByIdAndDelete({_id:id});
if(!deleted){
    return res.status(400).json({message:"Error Deleting your content"}) 
}
res.status(200).json({message:"Deleted Succesfully"}) 
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
})

//router for uploading csv file

// upload excel file and import in mongodb
// router.post('/uploadExcelFile', excelUploads.single("userdata"), async (req, res) =>{  
//     try{
    
    
//        const csvFilePath='./routes/' + req.file.filename;
//         function importFile(csvFilePath){
//             console.log(csvFilePath);
//           //  Read Excel File to Json Data
//             var arrayToInsert = [];
//             csv().fromFile(csvFilePath).then(jsonObj=> {
//                 console.log(jsonObj);
//           // Fetching the all data from each row
//             for (var i = 0; i < jsonObj.length; i++) {
//                 console.log(jsonObj[i]["name"])
//                 var singleRow = {
//                     name: jsonObj[i]["name"],
//                     email: jsonObj[i]["email"],
//                 };
//                 arrayToInsert.push(singleRow);
//             }
//             console.log( arrayToInsert)
//          //inserting into the table student
//        const usermail =  UserMail.insertMany({arrayToInsert})
//                 if (!usermail){ console.log(err);}
//                     else{
//                         console.log("File imported successfully.");
//                         res.status(200).json({message:"File Uploaded successfully"})
//                     }
            
//             });
//        }
//     }
//     catch(error){
//         console.log(error);
//         res.status(500).json({message:"Internal Server Error"})
//     }
    
// })




const Mailrouter = router;
export {Mailrouter}