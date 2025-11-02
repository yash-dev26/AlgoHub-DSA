const express = require('express');

const v1router = require('./v1');

const apiRouter = express.Router();

apiRouter.use('/v1', v1router);

module.exports = apiRouter;
