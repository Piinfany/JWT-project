require('dotenv').config();
const mongoose = require('mongoose'); // Import mongoose for MongoDB connection

const { MONGO_URI } = process.env; // MongoDB connection string

exports.connect = () => { // Function to connect to MongoDB
    // connecting to database
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true, // ใช้ URL parser ใหม่
        useUnifiedTopology: true, // ใช้ topology ใหม่
        // useCreateIndex: true, // ใช้ index ใหม่
        // useFindAndModify: false, // ใช้ findAndModify
    })
    .then(() => { // If connection is successful
        console.log('MongoDB connected successfully');
    })
    .catch((error) => { // If connection fails
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit the process with failure
    }
    )};