import jwt from "jsonwebtoken"
import db from "../../libs/sequelize"
import {hash} from "bcrypt"
import {hashPassword} from "../../utils"
import { Model } from "sequelize/types"
const {users} = db.models


export async function existeUsuario(username:string,password:string){
    const existe = await users.findOne({where:{username,salt:hashPassword(password)}})
    return existe 
}

export async function logearse(username:string,password:string):Promise<string>{

    const existe = await existeUsuario(username,password)
    
    if(!existe) throw new Error("el usuario no existe")
    
    const payload = {
        sub:existe.getDataValue("id")
    }
    const token = jwt.sign(payload,"secret")

    return token
}


export const registarse = async (username:string,password:string,email:string) => {

    const existe = await existeUsuario(username,password)

    if(existe) throw new Error("el usuario ya existe")

    const nuevoUsuario = await users.create({username,salt:password,email})

    return nuevoUsuario
}