import mongoose from "mongoose";

const userScheema = new mongoose.Schema({
    name:{
        type:String,
        required:true
      },
      email:{
        type:String,
        required:true,
        unique:true
      },
      password:{
        type:String,
        required:true
      }    
},{timestamps:true});
export const User = mongoose.model("User",userScheema);