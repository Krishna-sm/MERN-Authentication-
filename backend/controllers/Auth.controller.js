import httpStatus from "http-status"
import AuthService from "../services/Auth.service.js"
import { CatchAsync } from "../utils/CatchAsync.js"

class AuthController{

    static RegisterUser =CatchAsync(async(req,res)=>{
        const res_obj = await AuthService.RegisterUser(req?.body,req?.file)
        return res.status(httpStatus.CREATED).send(res_obj);
    })
    static LoginUser =CatchAsync(async(req,res)=>{
        const res_obj = await AuthService.LoginUser(req?.body)
        return res.status(httpStatus.OK).send(res_obj);
    })
    static Profile =CatchAsync(async(req,res)=>{
        const res_obj = await AuthService.Profile(req?.user)
        return res.status(httpStatus.OK).send(res_obj);
    })
    static UpdateProfile =CatchAsync(async(req,res)=>{
        const res_obj = await AuthService.UpdateProfile(req?.user,req?.body,req?.file)
        return res.status(httpStatus.OK).send(res_obj);
    })  
     static ForgetPassword =CatchAsync(async(req,res)=>{
        const res_obj = await AuthService.ForgetPassword(req?.body)
        return res.status(httpStatus.OK).send(res_obj);
    })
    static UpdatePassword =CatchAsync(async(req,res)=>{
        const res_obj = await AuthService.UpdatePassword(req?.body)
        return res.status(httpStatus.OK).send(res_obj);
    })
    
    
    
    

}

export default AuthController