// const { query,body,param } = require('express-validator');
import {query,body,param } from 'express-validator'
// const { query,body,param } = require('express-validator');

export class AuthValidation{
    static RegisterUser =[
                body("name").notEmpty().withMessage("Name is Required").escape(),
                body("email").notEmpty().withMessage("Email is Required").isEmail().withMessage("Email must be valid EMail"),
                body("password").notEmpty().withMessage("Name is Required").isLength({min:6}).withMessage("password should be greater than 6 characters"),
    ] 
    static loginUser =[
        body("email").notEmpty().withMessage("Email is Required").isEmail().withMessage("Email must be valid EMail"),
        body("password").notEmpty().withMessage("password is Required").isLength({min:6}).withMessage("password should be greater than 6 characters"),
] 
static UpdateProfile =[
    body("name").optional(),
    body("email").isEmail().withMessage("Provide valid email").optional()
]
static ForgetPassword =[
    body("email").notEmpty().withMessage("Email is Required").isEmail().withMessage("Email must be valid EMail"),
] 
static UpdatePassword =[
    body("email").notEmpty().withMessage("Email is Required").isEmail().withMessage("Email must be valid EMail"),
    body("password").notEmpty().withMessage("password is Required").isLength({min:6}).withMessage("password should be greater than 6 characters"),
    body("cpassword").notEmpty().withMessage("Confirm password is Required").isLength({min:6}).withMessage("Confirm password should be greater than 6 characters"),
    body("token").notEmpty().withMessage("Token is Required").escape()
] 
}
