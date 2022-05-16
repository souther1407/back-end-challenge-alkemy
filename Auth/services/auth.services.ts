import jwt from "jsonwebtoken"
import db from "../../libs/sequelize"
import {hash} from "bcrypt"
import {hashPassword} from "../../utils"
import { Model } from "sequelize/types"
import nodemailer from "nodemailer"

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

export async function enviarCorreoBienvenida(email:string){

    

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "ignacioletrada1407@gmail.com",
          pass: "igna1407", // generated ethereal password
        },
      });

      let info = await transporter.sendMail({
        from: 'Yo papa', // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<h1>Gracias por registrarse 👻 👻 👻 </h1>", // html body
      });
      return info
    
}