require('dotenv').config(); // Load environment variables from .env file
require('./config/database').connect(); // Connect to MongoDB

const express = require('express'); // Import Express framework
const User = require('./model/user'); // Import User model
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for token generation
const auth = require('./middleware/auth'); // Import authentication middleware
const app = express(); // Create an Express application

app.use(express.json()); // Middleware to parse JSON request bodies

// login goes here

// Register route
app.post('/register', async(req, res) => {
    // our register logic goes here
    try {
        const { first_name, last_name, email, password } = req.body; // Destructure request body

        // Validate user input
        if(!(email && password && first_name && last_name)) {
            return res.status(400).send('All input is required'); // Return error if any field is missing
        }

        // Check if user already exists
        // Validate if user exists in our database
        const oldUser = await User.findOne({ email }); // หา user ที่มี email ตรงกันใน database
        if (oldUser) {
            return res.status(409).send('User Already Exist. Please Login'); // Return error if user already exists ซึ่ง 409 คือ status code ของ error ที่เกิดจากการที่ client ส่งข้อมูลที่ไม่ถูกต้อง
        }

        // Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10); // เข้ารหัส password โดยใช้ bcrypt

        // Create user in our database
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // Convert email to lowercase
            password: encryptedPassword, // Store hashed password
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email }, // เข้าถึงข้อมูล user_id และ email เก็บไว้ใน user_id
            process.env.TOKEN_KEY, // Secret key from environment variables
            {
                expiresIn: '2h', // Token expiration time หมดอายุใน 2 ชั่วโมง
            }
        );

        // save user token
        user.token = token; // เก็บ token ลงใน user

        // returen new user
        res.status(201).json(user); // ส่งข้อมูล user กลับไปยัง client โดยใช้ status code 201 ซึ่งหมายถึงการสร้างข้อมูลใหม่สำเร็จ 
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send('Internal Server Error'); // Return error if something goes wrong
    }
});

// Login route
app.post('/login', async(req, res) => {
    // our login logic goes here
    try {
        const { email, password } = req.body; // Destructure request body

        // Validate user input
        if(!(email && password)) {
            res.status(400).send('All input is required'); // Return error if any field is missing
        }

        // Validate if user exists in our database
        const user = await User.findOne({ email }); // หา user ที่มี email ตรงกันใน database
        if (user && (await bcrypt.compare(password, user.password))) { // เช็คว่า password ตรงกันหรือไม่
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email }, // เข้าถึงข้อมูล user_id และ email เก็บไว้ใน user_id
                process.env.TOKEN_KEY, // Secret key from environment variables
                {
                    expiresIn: '2h', // Token expiration time หมดอายุใน 2 ชั่วโมง
                }
            );

            // save user token
            user.token = token; // เก็บ token ลงใน user

            // return user and token
            res.status(200).json(user); // ส่งข้อมูล user กลับไปยัง client โดยใช้ status code 200 ซึ่งหมายถึงการร้องขอสำเร็จ 
        } else {
            res.status(400).send('Invalid Credentials'); // Return error if credentials are invalid
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
});

app.post('/welcome', auth, (req, res) => {
    console.log("Welcome route hit!");
    res.status(200).send('Welcome 🙌 ' + JSON.stringify(req.user));
});

app.get('/dashboard', auth, (req, res) => {
  res.status(200).send('Welcome 🙌 ' + JSON.stringify(req.user));
});

app.get('/', (req, res) => { // Root route
    res.send('Hello World!'); // Return hello world message
});
module.exports = app; // Export the Express application