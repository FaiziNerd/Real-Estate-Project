import express from "express"
import dotenv from "dotenv"
import { ConnectDB } from "./config/db.config.js"
import User from "./models/user.model.js"
import UserRouter from "./routes/user.route.js"

dotenv.config()
const app = express()
ConnectDB()


const PORT = process.env.PORT

app.get('/api/user',UserRouter)



app.listen(PORT,()=>
{
    console.log(`Server is running at http://localhost:${PORT}`)
})