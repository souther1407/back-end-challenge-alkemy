import express, {Express,Request,Response} from "express"
import morgan from "morgan"
import db from "./libs/sequelize"
import {mockearCharacters,mockearPeliculas,mockearGeneros,relacionarGeneros, relacionarPersonajes} from "./utils"
const app:Express = express()
const port = 8080

app.use(morgan("dev"))
app.use(express.urlencoded())
app.use(express.json())


import authRouter from "./Auth/routes/auth.routes"
app.use("/auth",authRouter)

import charactersRouter from "./Characters/routes/characters.routes"
app.use("/characters",charactersRouter)

import moviesRouter from "./Movies/routes/movies.routes"
app.use("/movies",moviesRouter)


const {characters,users,movies,genres} = db.models



app.listen(port, async () => {
    console.log(`server running at port ${port}`)
    await db.sync({force:true})
    console.log("db created")

    /* characters.create({
        name:"miki maus",
        image:"https://www.lavanguardia.com/files/og_thumbnail/uploads/2018/11/17/5fa4451f367b6.jpeg",
        age:90,
        weight:34.53,
        background:"Un pequeño ratoncito homosexual"}) */

    mockearCharacters(characters)
    mockearPeliculas(movies)
    mockearGeneros(genres)
    relacionarGeneros(genres,movies)
    relacionarPersonajes(movies,characters)

    users.create({username:"admin",salt:"admin123",email:"admin@admin.com"})
   
})