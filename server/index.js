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


app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})




app.listen(PORT,()=>
{
    console.log(`Server is running at http://localhost:${PORT}`)
})