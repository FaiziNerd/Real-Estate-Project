import Listing from "../models/listing.model.js"
import { errorhandler } from "../utils/error.js"
import uploadToCloudinary from "../utils/uploadToCloudinary.js"

const getAuthUserId = (req) =>
  (req.userId || req.user?.id || "").toString()

export const uploadListingImages = async (req, res, next) =>
{
    try {
        if (!req.files || req.files.length === 0) {
            return next(errorhandler(400, "No images provided"))
        }

        const hasCloudinaryConfig =
            process.env.CLOUDINARY_CLOUD_NAME &&
            process.env.CLOUDINARY_API_KEY &&
            process.env.CLOUDINARY_API_SECRET

        if (!hasCloudinaryConfig) {
            return next(errorhandler(500, "Image upload is not configured"))
        }

        const uploads = await Promise.all(
            req.files.map((file) => uploadToCloudinary(file.buffer, "listings"))
        )

        const imageUrls = uploads.map((result) => result.secure_url)
        return res.status(200).json(imageUrls)
    } catch (error) {
        next(error)
    }
}

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


export const getAllListings = async (req,res,next) =>
{
    try {
        
        const limit = parseInt(req.query.limit) || 9 
        const startIndex = parseInt(req.query.startIndex) || 0;
        
        let offer = req.query.offer
        

        if(offer === undefined || offer === 'false')
        {
            offer = {$in : [false,true]}
        } else if (offer === 'true') {
            offer = true
        }

        let furnished = req.query.furnished

        if(furnished === undefined || furnished === 'false')
        {
            furnished = { $in : [false,true]}
        } else if (furnished === 'true') {
            furnished = true
        }

        let parking = req.query.parking

        if(parking === undefined || parking === 'false')
        {
            parking = { $in : [false,true]}
        } else if (parking === 'true') {
            parking = true
        }

        let type = req.query.type
        
        if(type === undefined || type === 'all')
        {
            type = { $in : ['sell','rent']}
        } else if (type === 'sale') {
            type = 'sell'
        }


        const searchTerm = req.query.searchTerm || ''
        const sort = req.query.sort === 'created_at' ? 'createdAt' : (req.query.sort || 'createdAt')
        const order = req.query.order || 'desc'

        const listings = await Listing.find({
            name: {$regex : searchTerm, $options: 'i'},
            offer,
            furnished,
            parking,
            type,
        }).sort({[sort]: order}).limit(limit).skip(startIndex)

        return res.status(200).json(listings)


    } catch (error) {
        next(error)
    }
}
