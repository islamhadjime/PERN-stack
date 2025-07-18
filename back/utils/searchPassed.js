import School from '../model/School.js'

export const searchPassed = async (passed, passedUser) => {
    const passedData = await School.findAll({
        attributes:['passed']
    })
    passed = JSON.parse(passedData[0].dataValues.passed)
    return passed.includes(passedUser)
}