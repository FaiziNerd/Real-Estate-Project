import express from "express"
import {test} from "../controllers/user.controller.js"
import { verifyToken } from "../utils/verifyUser.js"
import { updateUserInfo } from "../controllers/user.controller.js"
import upload from '../middlewares/upload.js'


const router = express.Router()

router.get('/test',test)
router.post('/update',verifyToken,upload.single('avatar'),updateUserInfo)

export default router