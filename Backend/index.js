const express=require("express");
const cookieParser = require('cookie-parser');
require("dotenv").config();
const cors=require("cors");

const {connection}=require("./config/db");
const {userRoutes}=require("./Routes/User.routes");
const {todoRouter}=require("./Routes/Todo.routes");
const {auth}=require("./Middleware/auth");


const app=express();





app.use(express.json());
app.use(cors());

app.use("/user",userRoutes);
app.use(auth);   
app.use("/todo",todoRouter);




app.listen(process.env.port, async ()=>{
    try {

        await connection;
        console.log("Connected to DB");
        console.log(`server is running on port ${process.env.port}`);
        
    } catch (error) {
        console.log(error.message);
    }
})