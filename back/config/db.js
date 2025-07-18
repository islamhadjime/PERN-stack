import { Sequelize } from "sequelize";

const sequelize  = new Sequelize('db', "user","pass", {
    dialect:'sqlite',
    host:"./dev.sqlite",
    define:{
        timestamps:false
    }


})

export default sequelize 