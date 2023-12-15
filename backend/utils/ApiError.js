class ApiError extends Error{
    constructor(statusCode,message,stack=""){
        super(message);
        this.message = message;
        this.statusCode =statusCode;
        if(stack){
            this.stack =stack;
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export default ApiError