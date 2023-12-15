import jwt from 'jsonwebtoken';
import { JWT_KEY } from "../constant.js";
import ApiError from '../utils/ApiError.js';
import httpStatus from 'http-status';
export const VerifyToken = async(req,res,next)=>{
    const auth_token = req.headers['authorization'];
    if(!auth_token || !auth_token.startsWith("Bearer ")){
        next(new ApiError(httpStatus.UNAUTHORIZED,"please Login First") )
        return
    }
    const token  = auth_token.split(" ")[1]
    if(!token){
        next(new ApiError(httpStatus.UNAUTHORIZED,"Provide valid Token") )
        return

    }

    try {
        const {userId} = jwt.verify(token,JWT_KEY);
        req.user = userId;
        next();

    } catch (error) {
                next(error)
    }
}
