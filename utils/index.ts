import {createHash} from "crypto"
import {ModelCtor} from "sequelize"
import {characters,movies,genres} from "./data"

export function hashPassword(password:string){
    const hash = createHash("sha256").update(password+"secret").digest("hex").toString()
    return hash
}



export function mockearCharacters(charModel:ModelCtor<any>){

    Promise.all(characters.map(c => charModel.create(c)))
    .then(()=>console.log("personajes mockeados cargados"))

}

export function mockearPeliculas(movModel:ModelCtor<any>){
    Promise.all(movies.map(c => movModel.create(c)))
    .then(()=>console.log("peliculas mockeadas cargadas"))
}

export function mockearGeneros(genModel:ModelCtor<any>){
    Promise.all(genres.map(c => genModel.create(c)))
    .then(()=>console.log("generos mockeados cargados"))
}

export async function relacionarGeneros(genModel:ModelCtor<any>,movies:ModelCtor<any>){
    const peliculas = await movies.findAll()
    let contador = 1
    for(let p of peliculas){
        p.setGenre(contador)
        contador++
    }
}

export async function relacionarPersonajes(movies:ModelCtor<any>,characters:ModelCtor<any>){
    const peliculas = await movies.findAll()
    const personajes = await characters.findAll()
    for(let p of peliculas){
        p.setCharacters(personajes)
        
    }
}
