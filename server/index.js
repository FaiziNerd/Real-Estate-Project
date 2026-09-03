import express from "express"
import dotenv from "dotenv"
import { ConnectDB } from "./config/db.config.js"
import UserRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import listingRouter from "./routes/listing.route.js"


dotenv.config()
const app = express()
app.use(express.json())
app.use(cookieParser())
ConnectDB()

const PORT = process.env.PORT || 8000

app.get('/', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'API is running' })
})

app.use('/api/user',UserRouter)
app.use('/api/auth', authRouter)
app.use('/api/listing', listingRouter)


app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`)
})