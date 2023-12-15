import dotenv from 'dotenv'
dotenv.config({
    path:'./.env'
})
import morgan from 'morgan'

// const express = require('express')
import express from 'express'
import Routes from './routes/index.js'
 const app = express()
//  const cors = require("cors")
import cors from 'cors'
import ApiError from './utils/ApiError.js'
import httpStatus from 'http-status'
import { ErrorHandler } from './middlewares/Error.js'
import path  from 'path'

 // middlewares
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// static path 
app.use("/static/",express.static(path.join(path.resolve(),"uploads")))

//routes
app.use("/api/v1",Routes)

//testing
app.use((req,res)=>{
    throw new ApiError(httpStatus.NOT_FOUND,"page not found")
})

app.use(ErrorHandler)

// export app
export default app;