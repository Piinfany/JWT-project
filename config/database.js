// เป็นการตั้งค่าการเชื่อมต่อ database

//✅ dotenv
//dotenv คือไลบรารีที่ช่วยให้สามารถจัดเก็บข้อมูลลับหรือค่าตั้งค่าต่างๆ ไว้ในไฟล์ .env ได้ เช่น:

//รหัสผ่านฐานข้อมูล

//คีย์ลับ API

//ชื่อฐานข้อมูล

//พอร์ต

//✅ require('dotenv')
//เรียกใช้งานไลบรารี dotenv

//✅ .config()
//คือเมธอดของ dotenv ที่จะโหลดค่าจากไฟล์ .env แล้วเพิ่มเข้าไปใน process.env

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
    }).then(() => { // If connection is successful
        console.log('MongoDB connected successfully');
    })
    .catch((error) => { // If connection fails
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit the process with failure
    }
    )};