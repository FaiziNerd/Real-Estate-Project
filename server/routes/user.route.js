import express from "express"
import {getUser, test} from "../controllers/user.controller.js"
import { verifyToken } from "../utils/verifyUser.js"
import { updateUserInfo } from "../controllers/user.controller.js"
import upload from '../middlewares/upload.js'
import { deleteuser } from "../controllers/user.controller.js"
import { getUserListings } from "../controllers/listing.controller.js"



const router = express.Router()

router.get('/test',test)
router.post('/update',verifyToken,upload.single('avatar'),updateUserInfo)
router.delete('/delete/:id',verifyToken, deleteuser)
router.get('/listings/:id',verifyToken, getUserListings)
router.get('/:id', verifyToken,getUser)

export default router