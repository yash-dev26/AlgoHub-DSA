const mongoose = require('mongoose');
const { ATLAS_DB_URL, NODE_ENV } = require('./server.config');
const logger = require('./logger.config');
 
async function connectToDatabase() {
    try{
        // we use different database connection strings for different environments
        if(NODE_ENV === 'development'){ 
            await mongoose.connect(ATLAS_DB_URL);
        }
    } catch (error) {
        logger.error('unable to connect to the DB server', error);
        throw error;
    }
}

module.exports = connectToDatabase;