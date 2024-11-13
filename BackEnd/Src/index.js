import express from 'express'
import { fileURLToPath } from 'url';
import ConnectDatabase from '../DBConnect/Connect.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import { User } from '../Model/userModel.js';
const PORT  = 3000||4000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
ConnectDatabase();
app.get("/",(req,res)=>{
   res.send("WelCome ")
})

app.post("/user", async(req,res)=>{
    try {
        const { name, email, password } = req.body;
        const usermodel = new User({ name, email, password });
        await usermodel.save();
        res.status(200).json({ message: "suceess ", sucess: true });
    } catch (error) {
        res.status(404).json({ message: "Error ", sucess: false });
    }
});
app.get("/read",async(req,res)=>{
    try {
        const user = await User.find();
        res.send(user);
    } catch (error) {
        console.log(error);
    }
})
app.post("/update/:name",async (req,res)=>{
  try {
     const {name,email,password} =  req.body;
     const update=  await User.findOneAndUpdate({name:req.params.name},{name,email,password},{new:true});
     res.json(update);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/delete/:name",async (req,res)=>{
    try {
         const DeleteUser = await User.findOneAndDelete({name:req.params.name});
         if (!DeleteUser) return res.status(404).json({ error: 'User not found' });
         res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
})
app.listen(PORT,()=>{
    console.log("running in port number ",PORT);
})