import mongoose from 'mongoose';
import { SERVER_CONFIG } from './server.config.js';
 
async function connectToDatabase() {
    try{
        // we use different database connection strings for different environments
        if(SERVER_CONFIG.NODE_ENV === 'development'){ 
            await mongoose.connect(SERVER_CONFIG.ATLAS_DB_URL as string);
        }
    } catch (error) {
        throw error;
    }
}

export default connectToDatabase;