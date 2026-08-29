import Listing from "../models/listing.model.js"
import { errorhandler } from "../utils/error.js"




export const createListing = async (req,res,next)=>
{
    try {
        const listing = Listing.create(req.body)
        return res.status(200).json(listing)
    } catch (error) {
        next(error)
    }
}


export const getUserListings = async (req,res,next)=>
{
   if(req.user.id === req.params.id)
   {
    try {
        const listing = await Listing.find({userRef: req.params.id})
        res.status(200).json(listing)
    } catch (error) {
        next(error)
    }
   }

   else 
   {
    return next(errorhandler(401, "You can create your listings!!"))
   }
}


export const deleteuserListings = async (req,res,next) =>
{
   const listing = await Listing.findById(req.params.id)

   if(!listing)
   {
    return next(errorhandler(404, "Listing not Found"))
   }

   if(req.user.id !== listing.userRef)
   {
    return next(errorhandler(401,"You can delete your own listings"))
   }

   try {
    await listing.findByIdAndDelete(req.params.id)
    
   } catch (error) {
      next(error)
   }
}