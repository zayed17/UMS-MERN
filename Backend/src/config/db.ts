import mongoose from 'mongoose';

const connectDB = async()=>{
    try {
        const connect = await mongoose.connect('mongodb://localhost:27017/UMS')
        console.log("MongoDb connected",connect.connection.port);
        
    } catch (error) {
        console.log(error);
        
    }
}

export default connectDB;