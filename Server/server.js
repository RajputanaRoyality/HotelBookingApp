import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './controller/clerkWebhoooks.js';
import userRouter from './routes/userRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import hotelRouter from './routes/hotelRoutes.js';
import roomRouter from './routes/roomRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';


connectDB();
connectCloudinary();

const app = express()
app.use(cors())

app.use(clerkMiddleware())

app.use(express.json())

app.use("/api/clerk",clerkWebhooks)

//API Routes
app.get('/',(req,res)=>res.send('API is Working!'))
app.use('/api/user',userRouter)
app.use('/api/hotels',hotelRouter)
app.use('/api/rooms',roomRouter)
app.use('/api/bookings',bookingRouter)


const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>console.log(`server running on http://localhost:${PORT}`))