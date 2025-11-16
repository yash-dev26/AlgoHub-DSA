 const dotenv = require('dotenv');
 dotenv.config();

 module.exports = {
    PORT: process.env.PORT,
    ATLAS_DB_URL: process.env.ATLAS_URI,
    NODE_ENV : process.env.NODE_ENV || 'development'
 }