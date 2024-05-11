const cloudinary=require('cloudinary').v2
const multer=require('multer')
require('dotenv').config()
const { CloudinaryStorage}=require('multer-storage-cloudinary');
cloudinary.config({
    cloud_name:,
api_key:,
api_secret:

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
