import express from 'express';
import connectDB from './config/db';
import cors from 'cors';
import cookieParser from 'cookie-parser'; 
import userRoute from './routes/userRoute';

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());    
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));

app.use('/api/users', userRoute);

app.listen(5000, () => console.log("server is running"));
