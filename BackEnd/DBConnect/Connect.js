import mongoose from "mongoose";
const uri = "mongodb+srv://aifo4738:curd@curdopreation.2seka.mongodb.net/?retryWrites=true&w=majority&appName=curdOpreation";
// curd
const ConnectDatabase = async ()=>{
    try {
     await mongoose.connect(uri);
     console.log("connected sucessfull");
    } catch (error) {
     console.log("not connected");
     throw error;
    }
 }
 export default ConnectDatabase;