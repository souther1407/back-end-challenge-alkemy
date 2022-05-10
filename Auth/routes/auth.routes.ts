import express,{ Router,Request,Response } from "express";
import {logearse,registarse,enviarCorreoBienvenida} from "../services/auth.services"
const router:Router = Router()

router.post("/login", async (req:Request,res:Response) => {
    const {username, password} = req.body
    try {
        const token = await logearse(username,password)
        res.json({token})
    } catch (error){    
        const err = error as Error
        res.status(400).json({error:err.message})
    }
})

router.post("/register", async (req:Request,res:Response) => {
    const {username, password, email } = req.body
    try {
        const newUser = await registarse(username,password,email)
        const emailInfo = await enviarCorreoBienvenida(email)
        console.log("info email -->", emailInfo)
        res.status(201).json({success:true,newUser})
    } catch (error) {
        const err = error as Error
        res.status(400).json({error:err.message})
    }
})


export default router


