import {Sequelize, DataTypes} from "sequelize";

export default (sequelize:Sequelize) => {
    return sequelize.define("characters",{
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
        },
        age:{
            type:DataTypes.INTEGER
        },
        weight:{
            type:DataTypes.DECIMAL
        },
        background:{
            type:DataTypes.TEXT
        }
        
    },{
        freezeTableName:true,
        timestamps:false,
        modelName:"Characters"
    })
}