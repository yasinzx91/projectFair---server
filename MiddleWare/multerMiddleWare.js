//import multer

const multer = require("multer");

const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./Uploads")//the file will be stored in uploads folder
    },
    filename:(req,file,callback)=>{
        const filename = `image-${Date.now()}-${file.originalname}`
        callback(null,filename)
    }

})

const fileFilter = (req,file,callback)=>{
    if(file.mimetype === 'image/png' || file.mimetype ==='image/jpeg' || file.mimetype ==='image/jpg'){
        callback(null,true)
    }
    else{
        callback(null,false)
        return callback(new Error("only png,jpg,jpeg files are allowed"))
    }
}

const multerConfig = multer({
    storage,/* WHERE THE FILE IS STORED */
    fileFilter/* WHICH  FILES CAN BE STORED */
})

module.exports = multerConfig;