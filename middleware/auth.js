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

const jwt = require('jsonwebtoken'); // Import jsonwebtoken

const TOKEN_KEY = process.env.TOKEN_KEY;
if (!TOKEN_KEY) {
    throw new Error("TOKEN_KEY is not defined in environment variables");
}

const verifyToken = (req, res, next) => {
    // Get token from "Authorization" header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const decoded = jwt.verify(token, TOKEN_KEY);
        req.user = decoded; // Attach user info
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

    return next();
};

module.exports = verifyToken;
