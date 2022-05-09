import jwt from "jsonwebtoken"
import db from "../../libs/sequelize"
import {hash} from "bcrypt"
import {hashPassword} from "../../utils"
const {users} = db.models

export async function logearse(username:string,password:string):Promise<string>{

    const existe = await users.findOne({where:{username,salt:hashPassword(password)}})
    
    if(!existe) throw new Error("el usuario no existe")
    
    const payload = {
        sub:existe.getDataValue("id")
    }
    const token = jwt.sign(payload,"secret")

    return token
}
