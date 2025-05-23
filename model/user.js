const mongoose = require('mongoose'); // Import mongoose for MongoDB connection

const userSchema = new mongoose.Schema({ // สร้าง schema ของ user โดย shema จะเป็น object ที่เก็บข้อมูลของ user
    first_name: {
        type: String,
        default: null
    },
    last_name: {
        type: String,
        default: null
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    token: {
        type: String,
    }
});

module.exports = mongoose.model('User', userSchema); // ทำเพื่อ export model ของ userSchema