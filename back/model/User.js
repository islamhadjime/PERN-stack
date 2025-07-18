import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js";



class User extends Model {}

User.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    role:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:"user"
    }
}, {
    sequelize,
    modelName:"User"
})

export default User
