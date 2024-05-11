const cloudinary=require('cloudinary').v2
const multer=require('multer')
require('dotenv').config()
const { CloudinaryStorage}=require('multer-storage-cloudinary');
cloudinary.config({
    cloud_name:"dcgfxuujd",
api_key:"914761573833136",
api_secret:"Gh4H6XqGlYASOFFW0Yv4CcfgRNw"

})
let clsStorage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"webImages",
        public_id:(request,file)=>file.fieldname+"-"+Date.now()

    }
})

let multerObj=multer({storage:clsStorage})
module.exports=multerObj;