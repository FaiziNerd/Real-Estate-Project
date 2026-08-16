import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import { errorhandler } from "../utils/error.js"
import jwt from "jsonwebtoken"



export const signup = async (req,res,next)=>
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

export const signin = async (req,res,next)=>
{
    const {email, password} = req.body;
    try {
        const ValidUser = await User.findOne({
            email
        })

        if(!ValidUser)
        {
           return next(errorhandler(404,"User not Found"))
        }
        const validPassword = bcrypt.compareSync(password,ValidUser.password)
        if(!validPassword){
            return next(errorhandler(401,"Invalid Credentials"))
        }

        const token = jwt.sign({
            id: ValidUser._id
        }, process.env.JWT_SECRET)

        const {password:pass, ...rest} = ValidUser._doc

         res.cookie('access_token', token,{httpOnly: true,
         }).status(200).json(ValidUser)

    } catch (error) {
        next(error)
    }
}