
import {Sequelize} from "sequelize";

export const sequelize = new Sequelize({
    dialect:"sqlite",
    storage:"./database.db"
})

import characterModelContructor from "../Characters/models/characters.models"
import moviesModelContructor from "../Movies/models/movies.models"
import genreModelContructor from "../Movies/models/genre.modes"
import usersModelContructor from "../Auth/models/users.models"

const Characters = characterModelContructor(sequelize);
const Movies = moviesModelContructor(sequelize);
const Genres = genreModelContructor(sequelize)
const Users = usersModelContructor(sequelize)


// RELACION CHARACTERS CON MOVIES N N

Movies.belongsToMany(Characters,{through:"movies_characters"})
Characters.belongsToMany(Movies,{through:"movies_characters"})

//RELACION MOVIES CON GENRES 1 N

Genres.hasMany(Movies)
Movies.belongsTo(Genres)


export default sequelize