import Listing from "../models/listing.model.js"
import { errorhandler } from "../utils/error.js"

const getAuthUserId = (req) =>
  (req.userId || req.user?.id || "").toString()

export const createListing = async (req,res,next)=>
{
    try {
        const listing = await Listing.create(req.body)
        return res.status(200).json(listing)
    } catch (error) {
        next(error)
    }
}


export const getUserListings = async (req,res,next)=>
{
   if(getAuthUserId(req) === req.params.id)
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
    return next(errorhandler(401, "You can only view your own listings"))
   }
}


export const deleteuserListings = async (req,res,next) =>
{
   try {
    const listing = await Listing.findById(req.params.id)

    if(!listing)
    {
     return next(errorhandler(404, "Listing not Found"))
    }

    if(getAuthUserId(req) !== listing.userRef.toString())
    {
     return next(errorhandler(401,"You can delete your own listings"))
    }

    await Listing.findByIdAndDelete(req.params.id)
    return res.status(200).json("Listing has been deleted")
   } catch (error) {
      next(error)
   }
}

export const updateuserListings = async (req,res,next)=>
{
    try {
        const listing = await Listing.findById(req.params.id)

        if(!listing)
        {
            return next(errorhandler(404, "Listing doesnt exist"))
        }

        if(getAuthUserId(req) !== listing.userRef.toString())
        {
            return next(errorhandler(401,"You can edit your own listings"))
        }

        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )
        res.status(200).json(updatedListing)
    } catch (error) {
        next(error)
    }
}


export const getListing = async (req,res,next) =>
{
    try {
        const listing = await Listing.findById(req.params.id)

        if(!listing)
        {
            return next(errorhandler(404,"Listing is not found"))
        }

        res.status(200).json(listing)

    } catch (error) {
        next(error)
    }
}
