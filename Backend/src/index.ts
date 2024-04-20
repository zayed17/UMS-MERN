import express from 'express'
const app = express()
import connectDB from './config/db';
import cors from 'cors'

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors()); 

import userRoute from './routes/userRoute' 
app.use('/api/users', userRoute);

app.listen(4000,()=>console.log("server is running"))