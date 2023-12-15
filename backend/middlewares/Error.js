import httpStatus from "http-status"

export const ErrorHandler = (err,req,res,next)=>{
    const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    res.status(statusCode).send({
        code:statusCode,
        message:err.message,
        stack:err.stack
    })
}