import { verifyToken } from "../utils/verifyUser.js"
import express from "express"
import { createListing } from "../controllers/listing.controller.js"
import { deleteuserListings } from "../controllers/listing.controller.js"


const router = express.Router()

router.post('/create',verifyToken,createListing)
router.delete('/delete/:id',verifyToken,deleteuserListings)



export default router