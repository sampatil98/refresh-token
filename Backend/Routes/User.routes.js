const {Router}=require("express");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
require("dotenv").config();

const {UserModel} = require("../models/User-model");

let userRoutes=Router();

// user registration route
userRoutes.post("/register", async (req,res)=>{
    try {
        
        let {name,email,password,phone}=req.body;

        let ispresent= await UserModel.findOne({email});

        if(ispresent){
           return res.status(400).send({
                isError:true,
                message: "User Already Present please login"
            })
        };

        bcrypt.hash(password,10, async (err,hash)=>{
            try {

                if(hash){
                    let newuser= new UserModel({name,email,phone,password:hash});
                    await newuser.save();
    
                    res.status(201).send({
                        isError:false,
                        message: "New User Created Successfully",
                        newuser
    
                    })
                }else{
                    res.status(500).send({
                        isError:false,
                        message: "Internal server error",
    
                    })
                }
                
            } catch (error) {
                res.status(500).send({
                    isError:false,
                    message: error.message,

                })
            }
            
        })
  
    } catch (error) {

        res.status(400).send({
            isError:true,
            message:error.message
        });
        
    }
});

// user Login route

userRoutes.post("/login",async (req,res)=>{
    try {
        const {email,password}=req.body;

        let user= await UserModel.findOne({email});

        if(!user){
            return res.status(404).send({
                isError:true,
                message:"User not found please enter correct e-mail id"
            });
        }

        bcrypt.compare(password,user.password,(err,result)=>{
            
            if(result){

                let Accesstoken= jwt.sign({name:user.name,userId:user._id},process.env.Secret_key,{expiresIn: "1M"});
                let Refreshtoken=jwt.sign({name:user.name,userId:user._id},process.env.Refresh_Secret_key,{expiresIn:"5M"});

                // res.cookie('accesstoken', Accesstoken, { httpOnly: true });
                // res.cookie('refreshToken', Refreshtoken, { httpOnly: true });
                    
                res.status(200).send({
                    isError:false,
                    message:"User Logged in sucessfully",
                    Accesstoken,
                    Refreshtoken
                })
                    
                
            }else{
                res.status(400).send({
                    isError:true,
                    message:"Wrong Password ! please enter correct password.."
                })
            }
        })
        
    } catch (error) {
        res.status(500).send({
            isError:true,
            message:error.message
        });
    }
});



module.exports={userRoutes}