// libraries
import ConnectDB from './Database/connection';

import express from "express";

const port = 4000;

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/",async(req,res)=>{
    res.json({message : "Success"});
})

app.listen(port,()=>{
    console.log(`server has been started on port 4000`);
    ConnectDB().then(()=> console.log(`Listening on port ${port}... database has been connected`)).catch((err)=>console.log(`database not connected ${err}`));
})