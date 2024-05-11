const exp=require("express")
const userApp=exp.Router()
let bcrypt=require("bcryptjs")
require('dotenv').config()
userApp.use(exp.json())
const multerObj=require('./middleware/cloudinartconfig');
const jwt=require("jsonwebtoken");
const expressAsyncHandler=require("express-async-handler");
const verifyToken = require("./middleware/verifyToken");
userApp.get('/users',expressAsyncHandler( async (request,response)=>{
    // response.send({message:"get all users",payload:users});
    const userCollection=request.app.get("userCollection");
   
        let dbRes=await userCollection.find().toArray()
    response.status(201).send({message:"Users details displayed",payload:dbRes})
     // try{
    // }catch(err){
    //     next(err)
    //     // response.send({err:err.message})
    // }
    // .then((userlist)=>{
    //     response.status(201).send({message:"User list",payload:userlist});
    // })
    // .catch((err)=>{
    //     console.log("err in user creation",err);
    //     response.send({message:"Error",errMessage:err.message});
    // })

}));
userApp.get('/users/:id',expressAsyncHandler(async (request,response,next)=>{
    // let userid=+request.params.id
    // let user=users.find(((userobj)=>userobj.id===userid))
    // response.send({message:"the details of users id",payload:users});
    // console.log(user)
    const userCollection=request.app.get("userCollection");
    let userid=(+request.params.id) 
    // try{
        const getid=await userCollection.findOne({id:userid})
    response.status(201).send({message:"User id details",payload:getid})
    // }
    // catch(err){
    //     next(err)
    //     // response.send({err:err.message});
    // }
    // .then((userObj)=>{
    //     response.status(201).send({message:"User",payload:userObj});
    // })
    // .catch((err)=>{
    //     console.log("err in user creation",err);
    //     response.send({message:"Error",errMessage:err.message});
    // })

}));
userApp.get('/get-users/:username',expressAsyncHandler(async(request,response)=>{
    const userCollection =request.app.get("userCollection");
    let newuser=(request.params.username);
    let userObj =await userCollection.findOne({username:newuser});
    if (userObj===null){
        response.status(201).send({message:" user details not found",payload:userObj});
    }
    else{
        delete userObj.password;
        response.status(201).send({message:"user details are",payload:userObj});
    }
}))
userApp.use(exp.json())
userApp.post('/login',expressAsyncHandler(async(request,response)=>{
    const userCollection =request.app.get("userCollection");
    let userDetails=request.body;
    let userObj =await userCollection.findOne({email:userDetails.email});
    // console.log("userdaetails",userDetails);
    // console.log(userDetails);
    // console.log(userObj);
// response.send({message:userObj});
    if (userObj===null){
        response.status(201).send({message:"Invalid username"});
    }
    else{
        const pass=await bcrypt.compare(userDetails.password,userObj.password);
        // console.log("pass either equal or not",pass);
        if (pass===false){
            response.status(201).send({message:"Invvalid Password"});
        }
        else{
            // response.sta
            const webtoken =jwt.sign({username:userObj.username},process.env.secret_key,{expiresIn:40000});
            console.log(userObj);
            response.status(201).send({message:"success",token:webtoken,user:userObj})
        }
    }
}))
userApp.post('/register',multerObj.single('photo'),expressAsyncHandler(async (request,response,next)=>{
   
    const userCollection=request.app.get("userCollection");
    const newuser=JSON.parse(request.body.user);
        let userObj= await userCollection.findOne({name:newuser.name});
        if (userObj!=null){
            response.status(200).send({message:"user already created"});
        }
        else{
            newuser.image=request.file.path
            let hashed=await bcrypt.hash(newuser.password,5);
            newuser.password=hashed;
        await userCollection.insertOne(newuser)
        response.status(201).send({message:"User id created"});
        }

}));
// const multerObj = multer({ dest: 'uploads/' }); // Assuming 'uploads/' is the directory to store uploaded images

// userApp.post('/register', multerObj.single('photo'), expressAsyncHandler(async (request, response, next) => {
//     try {
//         const userCollection = request.app.get("userCollection");
//         const newuser = JSON.parse(request.body.user);
//         let user = await userCollection.findOne({ name: newuser.name });
//         if (user != null) {
//             response.status(409).send({ message: "User already exists" });
//         } else {
//             if (!request.file) {
//                 response.status(400).send({ message: "Photo is required" });
//                 return;
//             }
//             newuser.image = request.file.path;
//             let hashed = await bcrypt.hash(newuser.password, 5);
//             newuser.password = hashed;
//             await userCollection.insertOne(newuser);
//             response.status(201).send({ message: "User created successfully" });
//         }
//     } catch (error) {
//         console.error(error);
//         response.status(500).send({ message: "Internal Server Error" });
//     }
// }));
userApp.put('/update-users',expressAsyncHandler(async (request,response,next)=>{
    // let modifieduser=request.body;
    // let user=users.find(((userobj)=>userobj.name===modifieduser.name))
    // users.splice(user,1,modifieduser);
    // response.send({message:"the user details are updated"});
    const userCollection=request.app.get("userCollection");
    const modifieduser=request.body;
    // try{
        let modified= await userCollection.updateOne({id:modifieduser.id},{$set:{...modifieduser}})
    response.status(201).send({message:"user details modified"});
    // }
    // catch(err){
    //     next(err)
    //     // response.send({err:err.message});
    // }
    // .then((dbRes)=>{
    //     console.log(dbRes);
    //     response.status(201).send({message:"User updated"});
    // })
    // .catch((err)=>{
    //     console.log("err in user creation",err);
    //     response.send({message:"Error",errMessage:err.message});
    // })
}));
userApp.delete('/delete-users/:name',expressAsyncHandler(async (request,response,next)=>{
    const userCollection=request.app.get("userCollection");
    let newuser="saiteja"
    // try{
        const delt= await userCollection.deleteOne({name:newuser})
    response.status(201).send({message:"User is deleted"})
    // }
    // catch(err){ 
    //     // response.send({err:err.message});
    //     next(err)
    // }
    // .then((userObj)=>{
    //     response.status(201).send({message:"User removed"});
    // })
    // .catch((err)=>{
    //     console.log("err in user creation",err);
    //     response.send({message:"Error",errMessage:err.message});
    // })
}));

userApp.get('/authenticate',verifyToken,expressAsyncHandler(async(request,response)=>{
    // console.log(request.header);
    response.send("the user details found");
}))
module.exports=userApp;