import {Request,Response,NextFunction} from "express"
import jwt from "jsonwebtoken"

export function logged(req:Request,res:Response,next:NextFunction){
    const autorization = req.headers.authorization
    if(!autorization){
        res.status(401).json({msg:"Unauthorized"})
    }else{
        const token = autorization.split(" ")[1]
        req.headers.authorization = token
        next()
    }
}

export function notLogged(req:Request,res:Response,next:NextFunction){
    const autorization = req.headers.authorization
    if(!autorization){
        next()
    }else{
        res.status(300).json({msg:"redirect"})
    }

}

export function validateToken(req:Request,res:Response,next:NextFunction){
    const token = req.headers.authorization as string
    try {
        const payload = jwt.verify(token,"secret")
        next()
    } catch (error) {
        res.status(401).json({msg:"Invalid Token"})
    }
    
}