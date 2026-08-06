import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import dns from "dns"
dns.setServers(['1.1.1.1', '8.8.8.8'])
import morgan from 'morgan'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import connectDB from './config/connectDB.js'
import userRouter from './route/users.route.js'
import categoryRouter from './route/category.route.js'
import subCategoryRouter from './route/subcategory.route.js'
import productRouter from './route/product.route.js'

const app = express()
const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
    'http://127.0.0.1:3000'
].filter(Boolean)

app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error(`Origin not allowed by CORS: ${origin}`))
        }
    }
}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(helmet({
    crossOriginResourcePolicy : false
}))
const PORT = process.env.PORT || 8080

app.get("/",(request,response)=>{
    response.json({
        message : "Server is Running"
    })
})
app.use("/api/users", userRouter)
app.use("/api/user", userRouter)
app.use('/api/category', categoryRouter)
app.use('/api/subcategory', subCategoryRouter)
app.use('/api/product', productRouter)


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server is running ",PORT)
    })
})

