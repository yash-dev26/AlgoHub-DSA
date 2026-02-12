 const dotenv = require('dotenv');
 dotenv.config();

 module.exports = {
    PORT: process.env.PORT,
    FRONTEND_URL: process.env.FRONTEND_URL
 }