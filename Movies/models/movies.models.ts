import {Sequelize, DataTypes} from "sequelize";

export default (sequelize:Sequelize) => {
    return sequelize.define("movies",{
        image:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                isUrl:true
            }
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
        },
        date:{
            type:DataTypes.DATEONLY
        },
        score:{
            type:DataTypes.ENUM("1","2","3","4","5"),
            defaultValue:"3"
        }
        
    },{
        freezeTableName:true,
        timestamps:false,
        modelName:"Movies"
    })
}