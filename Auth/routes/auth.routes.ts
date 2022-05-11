import express,{ Router,Request,Response } from "express";
import {logearse,registarse,enviarCorreoBienvenida} from "../services/auth.services"
const router:Router = Router()


/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *          username:
 *              type: string
 *              description: the user name
 *          password:
 *              type: string
 *              description: the user password
 *          email:
 *              type: string
 *              description: the user email
 *      required:
 *          - name
 *          - password
 *          - email
 *      example:
 *          username: IgnacioLestrada1407
 *          password: igna123
 *          email: ignacioL@gmail.com
 *
*/

/**
 * @swagger
 *  /auth/login:
 *    post:
 *      summary: login a user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                              description: the user name
 *                          password:
 *                              type: string
 *                              description: the user password
 *                      required:
 *                          - name
 *                          - password
 *                      example:
 *                          username: IgnacioLestrada1407
 *                          password: igna123
 *      responses:
 *          200:
 *              description: user token
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              token:
 *                                  type: string
 *                                  description: the user token
 *                          example:
 *                              token: a8g9glasgj8aga0...
 *                
 */
router.post("/login", async (req:Request,res:Response) => {
    const {username, password} = req.body
    try {
        const token = await logearse(username,password)
        res.json({token})
    } catch (error){    
        const err = error as Error
        res.status(400).json({error:err.message})
    }
})


/**
 * @swagger
 *  /auth/register:
 *    post:
 *      summary: register a user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                              description: the user name
 *                          password:
 *                              type: string
 *                              description: the user password
 *                          email:
 *                              type: string
 *                              description: the user email
 *                      required:
 *                          - name
 *                          - password
 *                          - email
 *                      example:
 *                          username: IgnacioLestrada1407
 *                          password: igna123
 *                          email: igancio1407@gmail.com
 *      responses:
 *          201:
 *              description: a boolean and the new user
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                                  description: the success status
 *                              newUser:
 *                                  type: object
 *                                  description: the new user
 *                                  properties:
 *                                      username:
 *                                          type: string
 *                                          description: the user name
 *                                      password:
 *                                           type: string
 *                                           description: the user password
 *                                      email:
 *                                           type: string
 *                                           description: the user email
 *                                  example:
 *                                      username: IgnacioLestrada1407
 *                                      password: igna123
 *                                      email: igancio1407@gmail.com
 *                                      
 *                
 */
router.post("/register", async (req:Request,res:Response) => {
    const {username, password, email } = req.body
    try {
        const newUser = await registarse(username,password,email)
        const emailInfo = await enviarCorreoBienvenida(email)
        console.log("info email -->", emailInfo)
        res.status(201).json({success:true,newUser})
    } catch (error) {
        const err = error as Error
        res.status(400).json({error:err.message})
    }
})


export default router


