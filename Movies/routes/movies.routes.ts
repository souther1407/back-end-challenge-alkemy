import express,{ Router,Request,Response } from "express";
import {mostrarPeliculas,detallePelicula,crearPelicula,actualizarPelicula,borrarPelicula} from "../services/movies.services"
const router:Router = Router()
//ADASD

router.get("/", async (req:Request,res:Response) => {
    const {name,genreId,order} = req.query
    try {
        const movies = await mostrarPeliculas(
            name as string | undefined,
            genreId as string | undefined,
            order as "ASC" | "DESC" | undefined)
        res.json(movies)
    } catch (error) {
        const err = error as Error
        res.status(400).json({error:err})
    }
})

router.get("/:id",(req:Request,res:Response) => {
    const {id} = req.params
    try {
        detallePelicula(id)
        .then(detallePeli => {
            res.json(detallePeli)
        })
        .catch(error =>{
            res.status(400).json(error)
        })
    } catch (error) {
        const err = error as Error
        res.status(400).json({error:err})
    }
})

router.post("/",async (req:Request,res:Response) => {
    try {
        const nuevaPeli = await crearPelicula(req.body)
        res.json({success:true,nuevaPeli})
    } catch (error) {
        const err = error as Error
        res.status(400).json({error:err.message})
    }
})

router.put("/:id",async (req:Request,res:Response) => {
    const { id } = req.params
    try {
        const actualizada = await actualizarPelicula(req.body,id)
        res.status(201).json({success:true,actualizada})
    } catch (error) {
        const err = error as Error
        res.status(400).json({error:err.message})
    }

})

router.delete("/:id",async (req:Request,res:Response) => {
    const {id} = req.params
    try {
        const borrada = await borrarPelicula(id)
        res.json({success:borrada > 0,msg:borrada === 0 ? "no hay nada para borrar" : "se borro con exito",borrada})
    } catch (error) {
        const err = error as Error
        res.status(400).json({error:err.message})
    }
})
export default router