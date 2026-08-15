import express from "express"
import dotenv from "dotenv"
import { ConnectDB } from "./config/db.config.js"
import User from "./models/user.model.js"
import UserRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"

dotenv.config()
const app = express()
app.use(express.json())
ConnectDB()


const PORT = process.env.PORT

app.use('/api/user',UserRouter)
app.use('/api/auth', authRouter)




app.listen(PORT,()=>
{
    console.log(`Server is running at http://localhost:${PORT}`)
})