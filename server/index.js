import express from "express"
import dotenv from "dotenv"
import { ConnectDB } from "./config/db.config.js"
dotenv.config()
const app = express()
ConnectDB()


const PORT = process.env.PORT






app.listen(PORT,()=>
{
    console.log(`Server is running at http://localhost:${PORT}`)
})