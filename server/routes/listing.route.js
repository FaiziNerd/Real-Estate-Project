import { verifyToken } from "../utils/verifyUser.js"
import express from "express"
import { createListing, uploadListingImages } from "../controllers/listing.controller.js"
import { deleteuserListings } from "../controllers/listing.controller.js"
import { updateuserListings } from "../controllers/listing.controller.js"
import {getListing, getAllListings} from "../controllers/listing.controller.js"
import upload from "../middlewares/upload.js"
import { errorhandler } from "../utils/error.js"
import multer from "multer"

const router = express.Router()

const uploadListingFiles = (req, res, next) => {
  upload.array("images", 6)(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return next(errorhandler(400, "Each image must be under 5MB"))
      }
      if (err.code === "LIMIT_FILE_COUNT" || err.code === "LIMIT_UNEXPECTED_FILE") {
        return next(errorhandler(400, "You can upload a maximum of 6 images"))
      }
      return next(errorhandler(400, err.message))
    }
    if (err) return next(err)
    next()
  })
}

router.post('/upload', verifyToken, uploadListingFiles, uploadListingImages)
router.post('/create',verifyToken,createListing)
router.delete('/delete/:id',verifyToken,deleteuserListings)
router.post('/update/:id',verifyToken,updateuserListings)
router.get('/get/:id',getListing)
router.get('/get', getAllListings)




export default router
