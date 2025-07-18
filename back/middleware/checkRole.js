import User from '../model/User.js'

export const checkRole = async (req, res, next) => {
    const user = await User.findByPk(req.userId)

    if(user.role !== 'admin'){
        return res.status(403).json({message:"Forbidden"})
    }
    next()
}