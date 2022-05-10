import { Op } from 'sequelize'
import db from '../../libs/sequelize'

const {movies,characters} = db.models

type Orden = "ASC" | "DESC"
//ASD
export async function mostrarPeliculas(title?:string,genreId?:string,orden?:Orden) {

    return await movies.findAll({attributes:["image","title","date"],where:{
        title: title ? title : {[Op.like]:"%%"},
        "genreId":genreId ? genreId : {[Op.gt]:-1}
    },order: orden ? [["date",orden]]: undefined})
    
}

export async function detallePelicula(id:string){
    return await movies.findByPk(id,{include:characters})
}

type Score = "1" | "2" | "3" | "4" | "5"

interface Pelicula{
    image?:string,
    title?:string,
    date?:Date,
    score?:Score
}


export async function crearPelicula(body:Pelicula){
    return await movies.create({...body})
}

export async function actualizarPelicula(body:Pelicula,id:string){
    return await movies.update({...body},{where: { id }})
}

export async function borrarPelicula(id:string) {
    return await movies.destroy({where: {id}})
}