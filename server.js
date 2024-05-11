const exp=require("express")
const app=exp();

app.listen(3500,()=>{
    console.log(" server is listening to requests");
});
const path =require('path')
app.use(exp.static(path.join(__dirname,'/build')))
const mclient=require("mongodb").MongoClient;

mclient.connect("mongodb://0.0.0.0:27017")
.then((dbref)=>{
    const dbObj=dbref.db("users");
    const userCollection=dbObj.collection("usercollection");
    app.set('userCollection',userCollection);
    console.log("DB Connection  success");
}

)
.catch((err)=>{
    console.log("Database connect err",err);
})
const userApp=require("./Api/userApp");
app.use('/userApp',userApp)
app.use('/*',(req,res,next)=> {
    res.sendFile(path.join(__dirname,'./build/index.html'),err=>{
        if (err){
            next(err)
        }
    })
})
const Pagerefresh=(request,response,next)=>{
    response.sendFile(path.join(__dirname,'/build/index.html'));
}
app.use('/*',Pagerefresh);
const invalidpathmiddleware1=(request,response,next)=>{
    response.send({message:"Invalid"})
}
app.use(invalidpathmiddleware1)
const errmiddleware=(err,request,response,next)=>{
    response.send({message:err.message})
}
app.use(errmiddleware); 