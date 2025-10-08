import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/coffeefDB', {
            useNewUrlParser:true
        });
        console.log(`MongoDB connected: {conn.connection.host}`);
    } catch(error){
        console.error(error.message);
        process.exit(1);
    }
}
export default connectDB;