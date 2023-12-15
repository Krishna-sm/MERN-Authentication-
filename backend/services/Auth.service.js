import httpStatus from "http-status";
import { UserModel } from "../models/User.model.js";
import ApiError from "../utils/ApiError.js";
import path from 'path'
// import fs from 'fs';
import { SendEmailToUser } from "./Mail.service.js";
import { JWT_KEY } from "../constant.js";
import jwt from 'jsonwebtoken'
import cloudinary from "../utils/cloudinary.js";


// uplaod image 

const uploadImage = async(path)=>{
   const result = await cloudinary.uploader.upload(path,{
      folder:"Authentication"
   })
   return result
}



// delete image

const deleteImage = async(public_id)=>{
   const result = await cloudinary.uploader.destroy(public_id)
   return result
}



class AuthService{
    static async RegisterUser(body,file){
                const {name,email,password} = body;
             const existUser  = await   UserModel.findOne({email});
             if(existUser){
                // file delete code

               //  if(fs.existsSync(file.path)){
               //      fs.unlinkSync(file.path)
               //  }

                throw new ApiError(httpStatus.BAD_REQUEST,"User Already Exist");
                return 
             }

            // return {
            //     body,
            //     file
            // }

            const Image_result = await uploadImage(file.path)

             await UserModel.create({
                name,email,password,image:{
                  public_id:Image_result.public_id,
                  image_url:Image_result.secure_url
                }
             })
             return {
                msg:"User Register Successfully"
             }
    }
    static async LoginUser(body,file){
      const {email,password} = body;
   const existUser  = await   UserModel.findOne({email});
   if(!existUser){
      // file delete code

    

      throw new ApiError(httpStatus.BAD_REQUEST,"User Not Exist");
      return 
   }

      const isMatch = await existUser.ComparePassword(password)

      if(!isMatch){
         throw new ApiError(httpStatus.BAD_REQUEST,"Invalid Credentails");
         return 
      }

      
      const token = await existUser.generateToken(existUser._id)
      
      if(!token){
         throw new ApiError(httpStatus.BAD_REQUEST,"Something went wrong");
         return 
      }
   return {
      msg:"User Login Successfully",
      token
   }
}


static async Profile(user){
const existUser  = await   UserModel.findById(user).select("-password");
if(!existUser){
   // file delete code

 

   throw new ApiError(httpStatus.BAD_REQUEST,"User Not Exist");
   return 
}

return {
   user:{
      name:existUser.name,
      image:existUser?.image?.image_url,
      email:existUser.email
   }
}
}


static async UpdateProfile(user,body,file){


   

   const existUser  = await   UserModel.findById(user);
   if(!existUser){
      // file delete code

      throw new ApiError(httpStatus.BAD_REQUEST,"User Not Exist");
      return 
   }


   const updateObj = {}
   if(file){
      // delete old image 
      if(existUser?.image?.public_id)
{
  await deleteImage(existUser?.image?.public_id)
}
             
const result = await uploadImage(file.path)

      updateObj['image'] = {

         public_id:result.public_id,
         image_url:result.secure_url,

      };
   }
   if(body.name){
      
      updateObj['name'] = body.name;
   }
   if(body.email){
      
      updateObj['email'] = body.email;
   }

   await UserModel.findByIdAndUpdate(user,{
      $set:{
         ...updateObj
      }
   })
   
   return {
      msg:"Profile Updated"
   }
   }
   


   
static async ForgetPassword(body){


   

   const existUser  = await   UserModel.findOne({email:body.email});
   if(!existUser){
      


      throw new ApiError(httpStatus.BAD_REQUEST,"User Not Exist");
      return 
   }


   // token
   const token = await existUser.forgetPassword(existUser._id,body.email);
   await SendEmailToUser(body.email,existUser.name,token)


   return {
      msg:"Reset Password link has been sent on your email address"
   }
   }
   
   static async UpdatePassword(body){

      const {email,password,cpassword,token} = body;
   

      const existUser  = await   UserModel.findOne({email:email});
      if(!existUser){
         
   
   
         throw new ApiError(httpStatus.BAD_REQUEST,"User Not Exist");
         return 
      }
   
      if(password !== cpassword){
         throw new ApiError(httpStatus.BAD_REQUEST,"Password and Confirm Does not Match");
         return 

      }

         // code

               try {
                     const {userId} = await jwt.verify(token,JWT_KEY+email);
                     
      const existUser  = await   UserModel.findById(userId);
      if(!existUser){
         throw new ApiError(httpStatus.BAD_REQUEST,"User Not Exist");
         return 
      }

            // password 

         const hashPassword = await existUser.UpdatePasssword(password);
    const data=      await  UserModel.findByIdAndUpdate(userId,{
            $set:{
               password:hashPassword
            }
         });


console.log({hashPassword})

         return {
            msg:"Password has been updated"
         }
               } catch (error) {
                  console.log({error});
                        throw new ApiError(httpStatus.BAD_REQUEST,"Session Expired")
               }
      
               
   
     
      }
      
   
    
}

export default AuthService