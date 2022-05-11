import express,{ Router,Request,Response } from "express";
import {mostrarPeliculas,detallePelicula,crearPelicula,actualizarPelicula,borrarPelicula} from "../services/movies.services"
const router:Router = Router()
//ADASD


/**
 * @swagger
 *  /movies:
 *    get:
 *      summary: get all the movies
 *      parameters:
 *        - name: name
 *          in: query
 *          description: the movie name
 *          schema:
 *              type: string
 *          required: false
 *        - name: genreId
 *          in: query
 *          description: the id from the genre of the movie
 *          schema:
 *              type: integer
 *          required: false
 *        - name: order
 *          in: query
 *          description: the type of order based on date
 *          schema:
 *              type: string
 *          required: false
 *      responses:
 *          200:
 *              description: the array of movies
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  image:
 *                                      type: string
 *                                      description: the url from the image
 *                                  title:
 *                                      type: string
 *                                      description: the title of the movie
 *                                  date:
 *                                      type: string
 *                                      description: the date of the movie
 *                              example:
 *                                  image: https://www.enter.co/wp-content/uploads/2022/01/Blancanieves.jpg
 *                                  title: Blancanieves
 *                                  date: 1950-05-12
 *                
 */
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


/**
 * @swagger
 *  /movies/{id}:
 *    get:
 *      summary: get the details of an especific movie
 *      parameters:
 *        - name: id
 *          in: path
 *          description: the movie id
 *          schema:
 *              type: integer
 *          required: true
 *      responses:
 *          200:
 *              description: the movie 
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              image:
 *                                 type: string
 *                                 description: the url from the image
 *                              title:
 *                                 type: string
 *                                 description: the title of the movie
 *                              date:
 *                                 type: string
 *                                 description: the date of the movie
 *                              score:
 *                                 type: enum
 *                                 description: the score of the movie
 *                                 enum: [1,2,3,4,5]
 *                              characters:
 *                                 type: array
 *                                 descriptions: the characters that participated in the movie
 *                                 items:
 *                                      type: object
 *                                      properties:
 *                                          id:
 *                                              type: integer
 *                                              description: the id of the character
 *                                          image:
 *                                              type: string
 *                                              description: the image url of the character
 *                                          name:
 *                                              type: string
 *                                              description: the name of the character
 *                                          age:
 *                                              type: integer
 *                                              description: the age of the character
 *                                          weight:
 *                                              type: integer
 *                                              description: the weight of the character
 *                                              enum: ["1","2","3","4","5"]
 *                                          background:
 *                                              type: string
 *                                              description: the background of the character
 *                                          
 *                          example:
 *                                  image: https://www.enter.co/wp-content/uploads/2022/01/Blancanieves.jpg
 *                                  title:  Blancanieves
 *                                  date: 2022-1-1
 *                                  score: 3
 *                                  genreId: 1
 *                                  characters: [
 *
 *                                      {   
 *                                          id: 1,
 *                                          image: https://www.lavanguardia.com/files/og_thumbnail/uploads/2018/11/17/5fa4451f367b6.jpeg,
 *                                          name: Miki Maus,                                    
 *                                          age: 90,
 *                                          weight: 55.55,
 *                                          background: Un ratoncito :p
 *                                      }
 *                                  ]
 * 
 *                
 */
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


/**
 * @swagger
 *  /movies:
 *    post:
 *      summary: add a new movie
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          image:
 *                              type: string
 *                              description: the url from the image
 *                          title:
 *                              type: string
 *                              description: the title of the movie
 *                          date:
 *                              type: string
 *                              description: the age of the movie
 *                          score:
 *                              type: enum
 *                              description: the score of the movie
 *                              enum: [1,2,3,4,5]
 *                          genreId:
 *                              type: integer
 *                              description: the id of the gender from the movie
 *                      required:
 *                          - image
 *                          - name
 *                          - age
 *                          - weight
 *                          - background
 *                          - genreId
 *                      example:
 *                          image: https://i0.wp.com/hipertextual.com/wp-content/uploads/2018/08/Mulan.jpg?fit=1200%2C800&ssl=1
 *                          title: mulan 2
 *                          date: 2022-1-1
 *                          score: 3
 *                          genreId: 1
 *                      
 *      responses:
 *          201:
 *              description: a success bolean and the movie created
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                                  description: the success status
 *                              newCharacter:
 *                                  type: object
 *                                  description: the new character
 *                                  properties:
            *                          image:
            *                              type: string
            *                              description: the url from the image
            *                          name:
            *                              type: string
            *                              description: the name of the character
            *                          age:
            *                              type: integer
            *                              description: the age of the character
            *                          weight:
            *                              type: string
            *                              description: the weight of the character
            *                          background:
            *                              type: string
            *                              description: the background of the character
 *                          example:
 *                              success: true
 *                              newMovie: {
 *                                  image: https://i0.wp.com/hipertextual.com/wp-content/uploads/2018/08/Mulan.jpg?fit=1200%2C800&ssl=1,
 *                                  title: mulan 2,
 *                                  date: 2022-1-1,
 *                                  score: 3,
 *                                  genreId: 1,
 *                              }
 *                                 
 *                
 */
router.post("/",async (req:Request,res:Response) => {
    try {
        const newMovie = await crearPelicula(req.body)
        res.json({success:true,newMovie})
    } catch (error) {
        const err = error as Error
        res.status(400).json({error:err.message})
    }
})


/**
 * @swagger
 *  /movies/{id}:
 *    put:
 *      summary: modify a movie by id
 *      parameters:
 *          - in: path
 *            name: id
 *            description: the id of the movie
 *            required: true
 *            schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          image:
 *                              type: string
 *                              description: the url from the image
 *                          title:
 *                              type: string
 *                              description: the name of the movie
 *                          date:
 *                              type: string
 *                              description: the age of the movie
 *                          score:
 *                              type: enum
 *                              description: the score of the movie
 *                              enum: [1,2,3,4,5]
 *                      example:
 *                          image: https://i0.wp.com/hipertextual.com/wp-content/uploads/2018/08/Mulan.jpg?fit=1200%2C800&ssl=1
 *                          title: mulan 2
 *                          date: 20
 *                          score: 3
 *                      
 *      responses:
 *          200:
 *              description: a success bolean and de movie modified
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                                  description: the success status
 *                              updated:
 *                                  type: array
 *                                  description: the movie modified
 *                                  properties:
 *                                      type: integer
 *                          example:
 *                              success: true
 *                              updated: [1]
 *                                 
 *                
 */
router.put("/:id",async (req:Request,res:Response) => {
    const { id } = req.params
    try {
        const updated = await actualizarPelicula(req.body,id)
        res.status(201).json({success:true,updated})
    } catch (error) {
        const err = error as Error
        res.status(400).json({error:err.message})
    }

})



/**
 * @swagger
 *  /movies/{id}:
 *    delete:
 *      summary: deletes a movie by id
 *      parameters:
 *          - in: path
 *            name: id
 *            description: the id of the movie
 *            required: true
 *            schema:
 *              type: integer               
 *      responses:
 *          200:
 *              description: a success boolean with a message and the deleted movie id
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                                  description: the success status
 *                              msg:
 *                                  type: string
 *                                  description: the messsage 
 *                              deletedId:
 *                                  type: integer
 *                                  description: the id of the deleted movie
 *                          example:
 *                              success: true
 *                              msg: se borro con éxito
 *                              deletedId: 1  
 */
router.delete("/:id",async (req:Request,res:Response) => {
    const {id} = req.params
    try {
        const deletedId = await borrarPelicula(id)
        res.json({success:deletedId > 0,msg:deletedId === 0 ? "no hay nada para borrar" : "se borro con exito",deletedId})
    } catch (error) {
        const err = error as Error
        res.status(400).json({error:err.message})
    }
})
export default router