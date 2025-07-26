import express from 'express'
import User from '../model/User.js'
const router = express.Router()
import { registerValidation, loginValidation } from '../validation.js'
import { checkAuth } from '../middleware/checkAuth.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


/*
    Register ROOT:
        Method : POST
        Body : {name, email, password}
        URL : /api/auth/register_root
        Response : {message:"Register Success"}
        description : Регистрация пользователя а именно ROOT
*/

// router.post('/register_root',registerValidation, async (req,res)=>{
//     try {
//         const { name, email,password} = req.body
//         let role = 'admin'
//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(password, salt)
//         await User.create({name, email, password:hashedPassword, role})
//         res.status(200).json({
//             message:"Success"
//         })        
//     } catch (error) {
//         res.status(500).json({message:error.message})
//     }
// })




/*
    Register:
        Method : POST
        Body : {name, email, password}
        URL : /api/auth/register
        Response : {message:"Register Success"}
        description : Регистрация пользователя
*/


router.post('/register', registerValidation, checkRole,async (req, res) => {
    try {
        const {name, email, password} = req.body
        const user = await User.findOne({where:{email}})
        let role = ''
        if(user){
            return res.status(400).json({message:"User already exists"})
        }
        const listUser = await User.findAll()
        if(listUser.length === 0){
            role = 'admin'
        }else{
            role = 'user'
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = await User.create({name, email, password:hashedPassword, role})
        res.status(200).json({message:"Register Success"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})


/*
    Login:
        Method : POST
        Body : {email, password}
        URL : /api/auth/login
        Response : {message:token}
        description : Вход в систему
*/

router.post('/login', loginValidation, async (req, res) => {
    try {
        const { email, password} = req.body

        const user = await User.findOne({where:{email}})
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword){
            return res.status(400).json({message:"Invalid password"})
        }
        const token = jwt.sign({id:user.id}, process.env.JWT_SECRET)
        res.status(200).json({message:token})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})



/*
    Me:
        Method : GET
        URL : /api/auth/me
        Response : {message:user}
        description : Получение информации о пользователе
*/

router.get('/me', checkAuth, async (req, res) => {
    try {
        const id = req.userId
        const user = await User.findByPk(id)
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        res.status(200).json({message:user})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

export default router
