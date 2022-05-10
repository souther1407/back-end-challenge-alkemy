import express,{ Router,Request,Response } from "express";


import {mostrarTodos,crearPersonaje,actualizar,detallePersonaje,borrar} from "../services/characters.services"
const router:Router = Router()


router.get("/",async (req:Request,res:Response) => {
    const {age,name,movieId,weight} = req.query
    try {
        const characters = await mostrarTodos(
            ["image","name"],
            Number(age),
            name as string | undefined,
            movieId as string | undefined,
            Number(weight),
        )
        res.json(characters)
    } catch (error) {
        const err = error as Error
        res.status(400).json({error:err.message})
    }
})

router.get("/:id", async (req:Request,res:Response) => {
    const {id} = req.params
    try {
        const personaje = await detallePersonaje(id)
        res.json(personaje)
    } catch (error) {
        const err = error as Error
        res.status(400).json({error:err.message})
    }

})

interface Personaje{
    image:string,
    name:string,
    age:number,
    weight:number,
    background:string
}

router.post("/",async (req:Request,res:Response) => {
    const body:Personaje = req.body
    try {
        const newCharacter = await crearPersonaje(body)
        res.status(201).json({success:true,newCharacter})
    } catch (error) {
        const err = error as Error
        res.status(400).json({error:err.message})
    }
})

router.put("/:id", async (req:Request,res:Response) => {
    const { id } = req.params
    try {
        const actualizado = await actualizar(req.body,id)
        res.json({success:true,actualizado})
    } catch (error) {
        const err = error as Error
        res.status(400).json({error:err.message})
    }
})

router.delete("/:id", async (req:Request,res:Response) => {
    const { id } = req.params
    try {
        const borrado = await borrar(id)
        res.json({success:borrado > 0,msg:borrado === 0 ? "no hay nada para borrar": "se borro con exito",borrado})
    } catch (error) {
        const err = error as Error
        res.status(400).json({error:err.message})
    }

})

export default router