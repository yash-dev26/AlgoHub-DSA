const NotImplementedError = require('../errors/notImplemented.error');
const {ProblemService} = require('../services');
const {ProblemRepository} = require('../repositories');
const {StatusCodes} =  require('http-status-codes');
const logger = require('../config/logger.config');


const problemService = new ProblemService(new ProblemRepository());

function pingProblemController(req, res){
    return res.json({"message": "Pong from Problem Controller"});
}

async function addProblem(req, res, next){
    try{
        logger.info('addProblem - incoming request', { body: req.body });

        const newproblem = await problemService.createProblem(req.body);
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'successfully created a new problem',
            error: {},
            data: newproblem
        })
    } catch(err){
        logger.error('addProblem - error', err);
        next(err);
    }
}

async function getProblems(req, res, next){
    try{
        logger.info('getProblems - request');
        const response = await problemService.getAllProblems();
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'successfully fetched all problems',
            error: {},
            data: response
        })
    } catch(err){
        logger.error('getProblems - error', err);
        next(err);
    }
}

async function getProblem(req, res, next){
    try{
        logger.info(`getProblem - id: ${req.params.id}`);

        const problem = await problemService.getProblem(req.params.id);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'successfully fetched the problem',
            error: {},
            data: problem
        })
    } catch(err){
        logger.error('getProblem - error', err);
        next(err);
    }
}

async function deleteProblem(req, res, next){
    try{
        logger.info(`deleteProblem - id: ${req.params.id}`);
        const deleted = await problemService.deleteProblem(req.params.id);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'successfully deleted the problem',
            error: {},
            data: deleted || req.params.id
        });
    } catch(err){
        logger.error('deleteProblem - error', err);
        next(err);
    }
}
async function updateProblem(req, res, next){
    try{
        logger.info(`updateProblem - id: ${req.params.id}`, { body: req.body });
        const updated = await problemService.updateProblem(req.params.id, req.body);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'successfully updated the problem',
            error: {},
            data: updated
        });
    } catch(err){
        logger.error('updateProblem - error', err);
        next(err);
    }
}

module.exports = {
    addProblem,
    getProblem,
    getProblems,
    deleteProblem,
    updateProblem,
    pingProblemController
};

