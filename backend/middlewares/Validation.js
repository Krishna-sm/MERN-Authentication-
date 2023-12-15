
import {validationResult } from 'express-validator'
import ApiError from '../utils/ApiError.js';
import httpStatus from 'http-status';

export const Vaidation= async(req,res,next)=>{
    const result = validationResult(req);
    if(!result.isEmpty()){

        const errors  = result.array().map((c=>c.msg))[0]
        // res.send(errors)
         next(new  ApiError(httpStatus.BAD_REQUEST,errors))

        return 
    }
    next()
}