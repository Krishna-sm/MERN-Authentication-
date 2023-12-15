import dotenv from 'dotenv'
dotenv.config({})


import app from "./app.js"
import { ConnectDB } from './config/db.config.js'

// mongodb connection
ConnectDB()

const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`the application run on http://localhost:${port}`);
})