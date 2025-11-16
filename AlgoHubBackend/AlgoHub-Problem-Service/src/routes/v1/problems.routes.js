const express = require('express');

const { problemController } = require('../../controllers');

const problemsRouter = express.Router();

problemsRouter.get('/ping', problemController.pingProblemController);
problemsRouter.get('/', problemController.getProblems);
problemsRouter.get('/:id', problemController.getProblem);
problemsRouter.post('/', problemController.addProblem);
problemsRouter.delete('/:id', problemController.deleteProblem);
problemsRouter.put('/:id', problemController.updateProblem);

module.exports = problemsRouter;