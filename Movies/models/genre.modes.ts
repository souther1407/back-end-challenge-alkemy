import {Sequelize, DataTypes} from "sequelize";

export default (sequelize:Sequelize) => {
    return sequelize.define("genres",{
        image:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                isUrl:true
            }
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
        }    
    },{
        freezeTableName:true,
        timestamps:false,
        modelName:"Genres"
    })
}