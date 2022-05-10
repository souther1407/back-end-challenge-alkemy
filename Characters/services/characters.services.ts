import { Model, Op } from "sequelize"
import db from "../../libs/sequelize"
const {characters,movies} = db.models


export async function mostrarTodos(columnas:string[], age?:number, name?:string,movieId?:string,weight?:number){
    if(movieId){
        const movie = await movies.findByPk(movieId)
        return await movie.getCharacters()
    }

    return await characters.findAll({ attributes:columnas,where:{
        name: name ? name : {[Op.like]:"%%"},
        age: age ? age : {[Op.gt]:-1},
        weight: weight ? weight : {[Op.gt]:-1}
    } })
}

export async function detallePersonaje(id:string){
    const detallePersonaje = await characters.findByPk(id,{ include:movies })
    return detallePersonaje
}

interface Personaje{
    image?:string,
    name?:string,
    age?:number,
    weight?:number,
    background?:string
}


export async function crearPersonaje(datos:Personaje){
    return await characters.create({...datos})
}


export async function actualizar(datos:Personaje,id:string){
    const actualizado = await characters.update({...datos},{where: { id } })
    return actualizado
}

export async function borrar(id:string){
    const borrado = await characters.destroy({where: {id}})
    return borrado
}