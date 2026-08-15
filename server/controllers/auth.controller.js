import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import { errorhandler } from "../utils/error.js"


export const signup = async (req,res)=>
{
    const {username, email, password} = req.body
    const hashedPassword = bcrypt.hashSync(password,10)
    const newUser = new User({username, email, password: hashedPassword})
    try {
        await newUser.save()
        res.status(201).json('User created Successfully!!')
        } catch (error) {
        next(error)
     }
      
}