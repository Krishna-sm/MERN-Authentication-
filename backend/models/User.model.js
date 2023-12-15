import mongoose  from "mongoose";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_KEY } from "../constant.js";
const Schema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"]
    },
    password:{
        type:String,
        required:[true,"Password is Required"]
    },
    image:{
        type:{
            public_id:{
                type:String,
                required:true
            },
            image_url:{
                type:String,
                required:true
            }
        },
        required:[true,"Image is Required"]
    }
},{
    timestamps:true
})

// middlwares

Schema.pre("save",async function(next){
    const user = this;
    if(user.isModified("password")){
        user.password  =await bcryptjs.hash(user.password,10)
    }
    next();
})

// methods
Schema.methods.ComparePassword = async function(User_password){
    const isMatch = await bcryptjs.compare(User_password,this.password);
    return isMatch;
}

// jwt methods
Schema.methods.generateToken = async function(id){
    const isMatch = await jwt.sign({userId:id},JWT_KEY,{
        expiresIn:'2d'
    })
    return isMatch;
}// jwt forget password methods
Schema.methods.forgetPassword = async function(id,email){
    const token = await jwt.sign({userId:id},JWT_KEY+email,{
        expiresIn:'2h'
    })
    return token;
}


// methods
Schema.methods.UpdatePasssword = async function(User_password){
    const password = await bcryptjs.hash(User_password,10)
    return password
}


export const UserModel = mongoose.model("user",Schema)