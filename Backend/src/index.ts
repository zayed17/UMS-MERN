import express from 'express';
import connectDB from './config/db';
import cors from 'cors';
import cookieParser from 'cookie-parser'; 
import userRoute from './routes/userRoute';
import adminRoute from './routes/adminRoute'

const app = express();

connectDB();

app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({ extended: true,limit:'50mb' }));
app.use(cookieParser());    
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials:true,
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));

app.use('/api/users', userRoute);
app.use('/api/admin', adminRoute);


app.listen(5000, () => console.log("server is running"));
