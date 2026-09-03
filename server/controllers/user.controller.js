 import uploadToCloudinary from '../utils/uploadToCloudinary.js'
 import bcrypt from 'bcrypt'
 import { errorhandler } from '../utils/error.js'
 import User from '../models/user.model.js'
 
 
export const test = (req,res)=>
{
    res.json({
        message: "Api route is working"
    })
}


export const updateUserInfo =  async (req,res,next) =>
{
    try {
        const userId =
          req.userId ||
          req.user?.id ||
          req.user?._id?.$oid ||
          req.user?._id

        const user = await User.findById(userId)

        if(!user)
        {
            return next(errorhandler(404, 'User not Found'))
        }

        if(req.body.username)
        {
            user.username = req.body.username;
        }

        if(req.body.email)
        {
            user.email = req.body.email
        }

        if(req.body.password)
        {
            user.password = bcrypt.hashSync(req.body.password,10)
        }

        if(req.file)
        {
            const hasCloudinaryConfig =
                process.env.CLOUDINARY_CLOUD_NAME &&
                process.env.CLOUDINARY_API_KEY &&
                process.env.CLOUDINARY_API_SECRET

            if (!hasCloudinaryConfig) {
                return next(errorhandler(500, 'Image upload is not configured'))
            }

            const result = await uploadToCloudinary(req.file.buffer)
            user.avatar = result.secure_url
        }


        await user.save()

        const {password:pass, ...rest} = user._doc

        res.status(200).json(rest)


    } catch (error) {
        next(error)
    }
}



export const deleteuser = async (req,res,next) =>
{
    const userId = (req.userId || req.user?.id || "").toString()
    if(userId !== req.params.id)
    {
        return next(errorhandler(401, "You can delete only your account"))
    }

     try {
            await User.findByIdAndDelete(req.params.id)
            res.clearCookie('access_token')
            res.status(200).json("User has been deleted")
        } catch (error) {
            next(error)
        }
}

export const getUser = async (req,res,next) =>
{
 try {
     const user = await User.findById(req.params.id)
       
if(!user)
{
    return next(errorhandler(404, "User not found!!"))
}

const {password: pass , ...rest} = user._doc
res.status(200).json(rest)
 } catch (error) {
    next(error)
 }
 
 

}