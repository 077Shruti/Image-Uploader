import {File} from '../Models/Image.js'
import { v2 as cloudinary } from 'cloudinary';

export const Imagefile=async(req,res)=>{
    const file=req.file.path;
    const cloudinaryRes=await cloudinary.uploader.upload(file,{
        folder:"Image_Uploads"
    });
    const db=await File.create({
        filename:file.originalname,
        public_id:cloudinaryRes.public_id,
        imgUrl:cloudinaryRes.secure_url
    });
    await db.save();
    res.render('index.ejs',{url:cloudinaryRes.secure_url});

}