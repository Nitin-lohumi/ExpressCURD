import mongoose from "mongoose";
const uri = "mongodb+srv://lohuminitin:lohuminitin@curd.nyypq.mongodb.net/?retryWrites=true&w=majority&appName=CURD";
const ConnectDatabase = async ()=>{
    try {
     await mongoose.connect(uri);
     console.log("connected sucessfull");
    } catch (error) {
     console.log(error);
     throw error;
    }
 }
 export default ConnectDatabase;