import { verifyToken } from "../utils/verifyUser.js"
import express from "express"
import { createListing } from "../controllers/listing.controller.js"
import { getUserListings } from "../controllers/listing.controller.js"

const router = express.Router()

router.post('/create',verifyToken,createListing)
router.get('/listings/:id',verifyToken, getUserListings)



export default router