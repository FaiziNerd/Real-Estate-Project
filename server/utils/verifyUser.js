import { errorhandler } from "./error.js"
import jwt from 'jsonwebtoken'

export const verifyToken = (req,res, next) =>
{
    const token = req.cookies.access_token
    
    if(!token)
    {
        return next(errorhandler(401, 'Unauthorized'))
    }
       jwt.verify( token , process.env.JWT_SECRET, (error, decoded)=>
    {
        if(error) return next(errorhandler(403, 'Forbidden'))

            const rawId = decoded?.id ?? decoded?._id
            const normalizedId = typeof rawId === 'object' ? rawId?.$oid : rawId
            req.userId = normalizedId?.toString()
            req.user = decoded

            next()
    })
}