import { verifyToken } from "../utils/verifyUser.js"
import express from "express"
import { createListing } from "../controllers/listing.controller.js"
import { deleteuserListings } from "../controllers/listing.controller.js"
import { updateuserListings } from "../controllers/listing.controller.js"
import {getListing} from '"../controllers/listing.controller.js"'


const router = express.Router()

router.post('/create',verifyToken,createListing)
router.delete('/delete/:id',verifyToken,deleteuserListings)
router.post('/update/:id',verifyToken,updateuserListings)
router.get('/get/:id',getListing)



export default router