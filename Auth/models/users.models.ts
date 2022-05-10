import {Sequelize, DataTypes,NOW} from "sequelize";
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
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate:{
                isEmail:true
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