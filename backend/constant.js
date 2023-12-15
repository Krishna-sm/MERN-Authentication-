import dotenv from 'dotenv'
dotenv.config({})
export const JWT_KEY = process.env.JWT_KEY
export const FRONTEND_DOMIN=process.env.FRONTEND_DOMIN

export const MAIL_OBJ = {
    host:process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  }


  export const Cloudnary_data= { 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret:process.env.CLOUD_API_SCREATE
  }