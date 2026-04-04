const mongoose = require("mongoose"); //to import mongoose

const connectDB = async () => {
    try {
        //this is to connect mongodb using uri from .env
        const connection = await mongoose.connect(process.env.MONGO_URI);

        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to database:", error.message);
        process.exit(1); // this is to stop server if db fails 
    }
};

module.exports = connectDB;
//to export function to use in server.js