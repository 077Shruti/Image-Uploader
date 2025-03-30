import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { Imagefile } from './Controllers/image.js'
//cloudinary configuration
cloudinary.config({ 
    cloud_name: 'dqzptwgsr', 
    api_key: '286244441788345', 
    api_secret: 'TbRWgi2D-9eOPmgrZRCoRIlDT7c' 
});


const app=express();
app.use(express.static(path.join(path.resolve(), 'public')));
app.use(express.urlencoded({extended:true}));
mongoose.connect('mongodb+srv://sc9411963207:UmtKUR1mawImPw3S@cluster0.mskoz.mongodb.net/',{
    dbName:'test',
}).then(()=>{
    console.log("Database connected");
}).catch((err)=>{
    console.log(`error ${err}`);
});

app.get('/',(req,res)=>{
    res.render('index.ejs',{url:null});
})

const storage = multer.diskStorage({
    destination: "./public/uploads",
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + path.extname(file.originalname);
      cb(null, file.fieldname +"-"+ uniqueSuffix)
    }
  })
  const upload = multer({ storage: storage })

app.post('/upload', upload.single('file'),Imagefile);

const port=3000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)

})