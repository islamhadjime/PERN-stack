import { body } from 'express-validator'

export const registerValidation = [
    body('name').isLength({min:3}),
    body('schoolName').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({min:6})
]

export const loginValidation = [
    body('email').isEmail(),
    body('password').isLength({min:6})
]

export const uploadValidation = [
    body('pdfs').isArray({min:1, max:200})
]