// const jwt = require('jsonwebtoken'); // Import jsonwebtoken library

// const config = process.env; // Get environment variables

// const verifyToken = (req, res, next) => { // Middleware function to verify JWT token
//     const token = req.body.token || req.query.token || req.headers['x-access-token']; // Get token from request body, query, or headers

//     if (!token) { // If no token is provided
//         return res.status(403).send("A token is required for authentication"); // Return error response
//     }
//     try {
//         const decoded = jwt.verify(token, config.TOKEN_KEY); // Verify the token using the secret key
//         req.user = decoded; // Attach decoded user information to the request object
//     } catch (err) {
//         return res.status(401).send("Invalid Token"); // Return error response if token is invalid
//     }
//     return next(); // Call the next middleware function
// }

// module.exports = verifyToken; // Export the middleware function

// ตรวจสอบ JWT Token (JSON Web Token) ใน Node.js API เพื่อป้องกันไม่ให้ผู้ที่ไม่มีสิทธิ์เข้าถึงเส้นทาง (route) ที่ต้องการการยืนยันตัวตน

const jwt = require('jsonwebtoken'); // Import jsonwebtoken ใช้สำหรับ สร้าง และ ตรวจสอบ JWT Token

const TOKEN_KEY = process.env.TOKEN_KEY; // โหลดค่า TOKEN_KEY จากไฟล์ .env มาใช้เป็นคีย์ลับในการตรวจสอบ Token
if (!TOKEN_KEY) {
    throw new Error("TOKEN_KEY is not defined in environment variables"); // ถ้าไม่มีค่านี้ จะ throw error ทันที เพราะ JWT ตรวจสอบไม่ได้
}

const verifyToken = (req, res, next) => {
    // Get token from "Authorization" header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(403).send("A token is required for authentication"); // ถ้าไม่มี token เลย จะส่งกลับว่า “ต้องมี token เพื่อเข้าสู่ระบบ”
    }

    try { // ตรวจสอบความถูกต้องของ Token
        const decoded = jwt.verify(token, TOKEN_KEY); // ใช้ jwt.verify() เพื่อตรวจสอบว่ารหัสลับถูกต้องไหม และ Token หมดอายุหรือยัง
        req.user = decoded; // Attach user info
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

    return next(); // ถ้าทุกอย่างถูกต้อง ให้ไปยัง route ต่อไป
};

module.exports = verifyToken;
