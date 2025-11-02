const express = require('express');
const bodyparser = require('body-parser');

const { PORT} = require('./config/server.config');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.text());

app.get('/ping', (req, res) => {
    return res.json({ message: 'Pong' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);   
});