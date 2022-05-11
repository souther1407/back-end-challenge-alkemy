import express,{ Router,Request,Response } from "express";


import {mostrarTodos,crearPersonaje,actualizar,detallePersonaje,borrar} from "../services/characters.services"
const router:Router = Router()

/**
 * @swagger
 *  /characters:
 *    get:
 *      summary: get all the characters
 *      parameters:
 *        - name: age
 *          in: query
 *          description: the character age
 *          schema:
 *              type: integer
 *          required: false
 *        - name: name
 *          in: query
 *          description: the character name
 *          schema:
 *              type: string
 *          required: false
 *        - name: movieId
 *          in: query
 *          description: the id from the movie whose character participed
 *          schema:
 *              type: integer
 *          required: false
 *        - name: weight
 *          in: query
 *          description: the weight of the character
 *          schema:
 *              type: number
 *          required: false
 *      responses:
 *          200:
 *              description: the array of characters
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
 *                                  name:
 *                                      type: string
 *                                      description: the name of the character
 *                              example:
 *                                  image: https://www.lavanguardia.com/files/og_thumbnail/uploads/2018/11/17/5fa4451f367b6.jpeg
 *                                  name:  Mickey Mouse
 *                
 */
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




/**
 * @swagger
 *  /characters/{id}:
 *    get:
 *      summary: get the details of an especific character
 *      parameters:
 *        - name: id
 *          in: path
 *          description: the character id
 *          schema:
 *              type: integer
 *          required: true
 *      responses:
 *          200:
 *              description: the character 
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              image:
 *                                 type: string
 *                                 description: the url from the image
 *                              name:
 *                                 type: string
 *                                 description: the name of the character
 *                              age:
 *                                 type: integer
 *                                 description: the age of the character
 *                              weight:
 *                                 type: string
 *                                 description: the weight of the character
 *                              background:
 *                                 type: string
 *                                 description: the background of the character
 *                              movies:
 *                                 type: array
 *                                 descriptions: the movies whose character participed
 *                                 items:
 *                                      type: object
 *                                      properties:
 *                                          id:
 *                                              type: integer
 *                                              description: the id of the movie
 *                                          image:
 *                                              type: string
 *                                              description: the image of the movie
 *                                          title:
 *                                              type: string
 *                                              description: the title of the movie
 *                                          date:
 *                                              type: string
 *                                              description: the date of the movie
 *                                          score:
 *                                              type: enum
 *                                              description: the score of the movie from 1 to 5
 *                                              enum: ["1","2","3","4","5"]
 *                                          genreId:
 *                                              type: integer
 *                                              description: the genre id of the movie
 *                                          
 *                          example:
 *                                  image: https://www.lavanguardia.com/files/og_thumbnail/uploads/2018/11/17/5fa4451f367b6.jpeg
 *                                  name:  Mickey Mouse
 *                                  age: 90
 *                                  weight: 55.55
 *                                  background: un ratoncito :p
 *                                  movies: [
 *                                      {   
 *                                          id: 1,
 *                                          image: https://www.enter.co/wp-content/uploads/2022/01/Blancanieves.jpg,
 *                                          title: Blancanieves,                                    
 *                                          date: 1950-05-12,
 *                                          score: 4,
 *                                          genreId: 1
 *                                      }
 *                                  ]
 * 
 *                
 */
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

/**
 * @swagger
 *  /characters:
 *    post:
 *      summary: add a new character
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
 *                      required:
 *                          - image
 *                          - name
 *                          - age
 *                          - weight
 *                          - background
 *                      example:
 *                          image: https://i0.wp.com/hipertextual.com/wp-content/uploads/2018/08/Mulan.jpg?fit=1200%2C800&ssl=1
 *                          name: mulan
 *                          age: 20
 *                          weight: 50
 *                          background: una joven asiatica dispuesta a combatir a los mongoles
 *                      
 *      responses:
 *          201:
 *              description: a success bolean and de character created
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
 *                              newCharacter: {
 *                                  image: https://i0.wp.com/hipertextual.com/wp-content/uploads/2018/08/Mulan.jpg?fit=1200%2C800&ssl=1,
 *                                  name: mulan,
 *                                  age: 20,
 *                                  weight: 50,
 *                                  background: una joven asiatica dispuesta a combatir a los mongoles
 *                              }
 *                                 
 *                
 */
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


/**
 * @swagger
 *  /characters/{id}:
 *    put:
 *      summary: modify a character by id
 *      parameters:
 *          - in: path
 *            name: id
 *            description: the id of the character
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
 *                      required:
 *                          - image
 *                          - name
 *                          - age
 *                          - weight
 *                          - background
 *                      example:
 *                          image: https://i0.wp.com/hipertextual.com/wp-content/uploads/2018/08/Mulan.jpg?fit=1200%2C800&ssl=1
 *                          name: mulan
 *                          age: 20
 *                          weight: 50
 *                          background: una joven asiatica dispuesta a combatir a los mongoles
 *                      
 *      responses:
 *          200:
 *              description: a success bolean and de character modified
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
 *                              newCharacter: {
 *                                  image: https://i0.wp.com/hipertextual.com/wp-content/uploads/2018/08/Mulan.jpg?fit=1200%2C800&ssl=1,
 *                                  name: mulan,
 *                                  age: 20,
 *                                  weight: 50,
 *                                  background: una joven asiatica dispuesta a combatir a los mongoles
 *                              }
 *                                 
 *                
 */
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


/**
 * @swagger
 *  /characters/{id}:
 *    delete:
 *      summary: delete a character by id
 *      parameters:
 *          - in: path
 *            name: id
 *            description: the id of the character
 *            required: true
 *            schema:
 *              type: integer             
 *      responses:
 *          200:
 *              description: a success bolean and a message
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
 *                                  description: the message
 *                              deleted:
 *                                  type: integer
 *                                  description: the id of the deleted character
 *                          example:
 *                              success: true
 *                              msg: "se borro con éxito"
 *                
 */
router.delete("/:id", async (req:Request,res:Response) => {
    const { id } = req.params
    try {
        const deleted = await borrar(id)
        res.json({success:deleted > 0,msg:deleted === 0 ? "no hay nada para borrar": "se borro con exito",deleted})
    } catch (error) {
        const err = error as Error
        res.status(400).json({error:err.message})
    }

})

export default router