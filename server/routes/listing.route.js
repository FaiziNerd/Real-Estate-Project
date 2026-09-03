import { verifyToken } from "../utils/verifyUser.js"
import express from "express"
import { createListing, getUser } from "../controllers/listing.controller.js"
import { deleteuserListings } from "../controllers/listing.controller.js"
import { updateuserListings } from "../controllers/listing.controller.js"
import {getListing, getAllListings} from "../controllers/listing.controller.js"



const router = express.Router()

router.post('/create',verifyToken,createListing)
router.delete('/delete/:id',verifyToken,deleteuserListings)
router.post('/update/:id',verifyToken,updateuserListings)
router.get('/get/:id',getListing)
router.get('get', getAllListings)




export default router