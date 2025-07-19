import express from 'express'

const router = express.Router()
import School from '../model/School.js'
import User from '../model/User.js'
import fs from 'fs'
import { checkAuth } from '../middleware/checkAuth.js'
import { checkRole } from '../middleware/checkRole.js'
import multer from 'multer'
import { uploadValidation } from '../validation.js'
const upload = multer({ dest: 'uploads/' });
import { checkFile } from '../utils/checkFile.js'


/*
    users:
        Method : GET
        URL : /api/school/users
        Response : {message:users}
        description : Получение информации о пользователе
*/
router.get('/users', checkAuth, async (req, res) => {
    try {
        const users = await User.findAll({
            where:{role:'user'},
            attributes: ['id', 'name', 'email']
        })
        res.status(200).json({users})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

/*
    /:
        Method : GET
        URL : /api/school/
        Response : {message:schools}
        description : Получение информации о школах
*/

router.get('/', async (req, res) => {
    try {
        const schools = await School.findAll({
            attributes: ['id', 'schoolName', 'students','passedCount'],
        })
        res.status(200).json({schools})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

/*
    endpoint:
        Method : GET
        URL : /api/school/endpoint
        Response : {message:schools}
        description : Получение информации о id
*/
router.get('/endpoint', checkAuth, async (req, res) => {
    try {
        const id = req.userId
        let schoolName = ''
        const user = await User.findByPk(id,{
            attributes: ['name', 'email','role']
        })
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        if(id ==1){
            schoolName = await School.findAll({
                attributes: ['schoolName','id']
            })
        }else{
            schoolName = await School.findOne({
                where:{idUser:id},
                attributes: ['id','schoolName']
            })
        }
        if(!schoolName){
            return res.status(404).json({message:"School not found"})
        }
        res.status(200).json({message:{
            schoolName,
            user
        }})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

/*
    id:
        Method : GET
        URL : /api/school/:id
        Response : {message:school}
        description : Получение информации о школе
*/

router.get('/:id', checkAuth, async (req, res) => {
    try {
        const id = req.params.id
        const school = await School.findByPk(id)
        if(school.idUser !== req.userId && req.userId !== 1){
            return res.status(404).json({message:"School not found"})
        }

        res.status(200).json({message:school})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})


/*
    static-file:
        Method : POST
        URL : /api/school/static-file
        Response : {message:school}
        description : Загрузка статических файлов
*/

router.post('/static-file', checkAuth, upload.array('pdfs', 200), uploadValidation, async (req, res) => {
    try {


        const files = req.files;
        const userId = req.userId;

        const school = await School.findOne({
            where:{idUser:userId}
        });
        const user = await User.findByPk(userId);

        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!school) {
            return res.status(404).json({ message: "School not found" });
        }
        if(user.role == 'admin'){
            return res.status(404).json({ message: "User you are trying to connect" });
        }

        // Get all passed data from all schools
        const allPassedData = await School.findAll({
            attributes: ['passed']
        });

        let allPassed = [];
        allPassedData.forEach(school => {
            if (school.dataValues.passed) {
                allPassed = allPassed.concat(JSON.parse(school.dataValues.passed));
            }
        });

        let passedUser = [];
        const passedData = await School.findOne({
            where: { idUser: userId },
            attributes: ['passed']
        });

        if (passedData && passedData.dataValues.passed) {
            passedUser = JSON.parse(passedData.dataValues.passed);
        }

        

        // Process files in parallel
        const a = await Promise.all(files.map(async (file) => {
            try {
                const data = await checkFile(file.path);
                if(!data) {
                    return false
                }
                
                if (!allPassed.includes(data)) {
                    
                    passedUser.push(data);
                    allPassed.push(data); // Add to global list to prevent duplicates
                    return true
                }

                fs.unlinkSync(file.path);
                return false
            } catch (error) {
                return false
            }
        }));

        if(a[0] == false){
            return res.status(400).json({ message: "File not found" });
        }

        await Promise.all(files.map(file => {
            fs.unlinkSync(file.path);
        }))
        
        await School.update({ passed: JSON.stringify(passedUser), passedCount: passedUser.length }, { where: { idUser: userId } });
        res.status(200).json({ message: "Success" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/*
    create-school:
        Method : POST
        URL : /api/school/create-school
        Response : {message:school}
        description : создание школы
*/
router.post('/create-school', checkAuth,checkRole, async (req, res) => {
    try {
        const {schoolName, students,idUser} = req.body
        const user = await User.findByPk(idUser)
        if(!user){
            res.status(404).json({message:"User not found"})
        }
        const school = await School.create({schoolName, students,idUser})
        res.status(200).json({message:school})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

/*
    delete-school:
        Method : DELETE
        URL : /api/school/:id
        Response : {message:school}
        description : удаление школы
*/

router.delete('/:id', checkAuth,checkRole, async (req, res) => {
    try{
        const id = req.params.id
        const school = await School.findByPk(id)
        const idUser = school.idUser
        if(idUser){
            const user = await User.findByPk(idUser)
            if(!user){
                return res.status(404).json({message:"User not found"})
            }
            await user.destroy()
        }

        if(!school){
            return res.status(404).json({message:"School not found",success:false})
        }
        await school.destroy()
        res.status(200).json({message:"School deleted",success:true})
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

export default router