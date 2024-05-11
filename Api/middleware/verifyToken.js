const jwttoken=require("jsonwebtoken");
require('dotenv').config()
const verifyToken =(request,response,next)=>{
    const bearertoken=request.headers.authorization;
    // console.log(bearertoken);
    if (bearertoken===undefined){
        response.send("Unauthorized access ... So please try to login ");
    }
    else{
        const token =bearertoken.split(" ")[1];
        try{
            jwttoken.verify(token,process.env.secret_key);
            // console.    log(token);
            next();
        }
        catch(err){
            // response.send({message:err.message});
            next( new Error({message:err.message}))
        }
    }
}
module.exports=verifyToken;