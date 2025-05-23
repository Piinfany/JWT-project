const http = require('http');
const app = require('./app'); // Import the Express application
const server = http.createServer(app); // สร้าง server โดยการส่งตัวแปร app เข้าไป

const {API_PORT} = process.env; // ดึงค่าตัวแปร API_PORT จากไฟล์ .env
const PORT = process.env.PORT || API_PORT; // ถ้าไม่มีค่าตัวแปร API_PORT ให้ใช้ค่า 3000 แทน

// server listen
server.listen(PORT, () => { // เริ่มต้น server ที่ port ที่กำหนด
    console.log(`Server is running on port ${PORT}`); // แสดงข้อความเมื่อ server เริ่มทำงาน
});