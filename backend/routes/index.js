import express from 'express';

const router = express.Router()
import AuthRoute from './auth.routes.js';

const routes = [
    {
        "path":"/auth",
        "route":AuthRoute
    }
]

routes.forEach((c)=>{
    router.use(c.path,c.route)
})


export default router;