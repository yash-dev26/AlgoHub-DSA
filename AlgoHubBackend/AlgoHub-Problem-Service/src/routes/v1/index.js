const express = require('express');

const ProblemRouter = require('./problems.routes');

const v1router = express.Router();

v1router.use('/problems', ProblemRouter);

module.exports = v1router;
