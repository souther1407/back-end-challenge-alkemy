import {Sequelize, DataTypes,NOW} from "sequelize";
import bcrypt from "bcrypt"
import {hashPassword} from "../../utils"
export default (sequelize:Sequelize) => {
    return sequelize.define("users",{
        username:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        salt:{
            type:DataTypes.STRING,
            allowNull:false,
            set(val:string){
                this.setDataValue("salt",hashPassword(val))
            }
        },
        created:{
            type:DataTypes.DATEONLY,
            defaultValue:NOW
        },
    },{
        freezeTableName:true,
        timestamps:false,
        modelName:"Users"
    })
}