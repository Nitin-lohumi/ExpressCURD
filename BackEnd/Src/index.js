import express from 'express'
import { fileURLToPath } from 'url';
import ConnectDatabase from '../DBConnect/Connect.js';
import cors from 'cors';
import path from 'path'
import { dirname } from 'path';
import bodyParser from 'body-parser';
const PORT  = 3000||4000;
const app = express();
app.use(cors());
ConnectDatabase();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.get("/",(req,res)=>{
   res.send("WelCome ")
})
app.get('/create',(req,res)=>{
      
})
app.listen(PORT,()=>{
    console.log("running in port number ",PORT);
})