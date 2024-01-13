const jwt=require("jsonwebtoken");
require("dotenv").config();

function auth(req,res,next){

    try {

        let token=req.headers.authorization;
        if(token){
            token=token.split(" ")[1];
            jwt.verify(token,process.env.Secret_key,(err,decoded)=>{
                if(decoded){
                    req.user=decoded;
                    next();
                }else{
                    // only for expired tokens 
                    if(err.name=="TokenExpiredError"){

                        let reftoken=req.headers.refreshtoken||null;
                        
                        if(!reftoken){
                            console.log("token");
                            return res.status(400).send({
                                isError:true,
                                message:"refresh token required.........."
                            });
                        }

                        jwt.verify(reftoken,process.env.Refresh_Secret_key,(err,decode)=>{
                            // let verify={generate:false};
                            if(decode){
                                let Accesstoken= jwt.sign({name:decode.name,userId:decode._id},process.env.Secret_key,{ expiresIn: 60});
                                let Refreshtoken=jwt.sign({name:decode.name,userId:decode._id},process.env.Refresh_Secret_key,{ expiresIn: 80 });
                                
                                
                                verify={Accesstoken,Refreshtoken,generate:true};
                                
                                // res.cookie('accesstoken', Accesstoken, { httpOnly: true });
                                // res.cookie('refreshToken', Refreshtoken, { httpOnly: true });

                                return res.status(201).send({
                                    isError:false,
                                    Accesstoken,
                                    Refreshtoken
                                })

                            }else{
                                return res.status(400).send({
                                    isError:true,
                                    message:"refresh token expired",
    
                                });
                            }

                        })
                        
                    }else{
                        return res.status(203).send({
                            isError:true,
                            message:"Invalid access token"
                        })
                    }
                }
            });

        }else{
            return res.status(400).send({
                isError:true,
                message:"Unauthorised request. token required"
            });
        }
        
        
    } catch (error) {

        res.status(400).send({
            isError:true,
            message:error
        });
        
    }



};


function generateaccesstoken(req,res){

    

}

module.exports={auth};