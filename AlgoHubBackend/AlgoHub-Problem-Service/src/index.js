const express = require('express');
const bodyparser = require('body-parser');

const { PORT} = require('./config/server.config');
const {errorHandler} = require('./utils');
const apiRouter = require('./routes');
const connectToDatabase = require('./config/db.config');


const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.text());

app.use('/api', apiRouter);

app.get('/ping', (req, res) => {
    return res.json({ message: 'Pong' });
});

app.use(errorHandler);

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await connectToDatabase();
    console.log('Connected to the database');

});