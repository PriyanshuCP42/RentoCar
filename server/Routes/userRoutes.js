import express from 'express'
import { getUserData, login, signup } from '../Controllers/Authcontroller.js'
import { protect } from '../Middleware/AuthValidation.js'

const userRouter=express.Router()

userRouter.post('/signup',signup)
userRouter.post('/login',login)

userRouter.get('/data',protect,getUserData)

export default userRouter