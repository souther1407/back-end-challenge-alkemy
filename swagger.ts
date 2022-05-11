import {Options} from "swagger-jsdoc"
import path from "path"
const swaggerSpects:Options = {
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Disney API",
            version:"1.0.0"
        },
        servers:[
            {
                url:"http://localhost:8080"
            }
        ]
        
    },
    apis:[
        `${path.join(__dirname,"./Auth/routes/auth.routes.js")}`,
        `${path.join(__dirname,"./Characters/routes/characters.routes.js")}`,
        `${path.join(__dirname,"./Movies/routes/movies.routes.js")}`
    ]
}

export default swaggerSpects