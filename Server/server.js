import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './controller/clerkWebhoooks.js';
// import {serve} from "inngest/express"
// import {inngest,functions} from "../backend/inngest/index.js"

const app = express();
app.use(cors())

const port = process.env.PORT || 3000;

await connectDB();

app.use(express.json())
app.use(clerkMiddleware())

app.use("api/clerk",clerkWebhooks);

//API Routes
app.get('/',(req,res)=>res.send('Server is Live!'))

app.listen(port,()=>console.log(`server listening at http://localhost:${port}`))