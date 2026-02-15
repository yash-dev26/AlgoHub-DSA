const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const { FRONTEND_URL } = require('./config/server.config');

const { PORT} = require('./config/server.config');
const {errorHandler} = require('./utils');
const apiRouter = require('./routes');
const connectToDatabase = require('./config/db.config');
const logger = require('./config/logger.config');


const app = express();

app.use(cors({
  origin: [FRONTEND_URL],
  credentials: true
}));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.text());

app.use('/api', apiRouter);

app.get('/ping', (req, res) => {
    return res.json({ message: 'Pong' });
});

app.use(errorHandler);

app.listen(PORT, async () => {
    logger.info(`Server is starting on port ${PORT}`);
    try{
        await connectToDatabase();
        logger.info('Connected to the database');
    } catch(err){
        logger.error('Database connection failed', err);
        // rethrow so the process can crash if DB is critical
        throw err;
    }
});