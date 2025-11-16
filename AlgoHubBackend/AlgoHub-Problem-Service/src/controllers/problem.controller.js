const NotImplementedError = require('../errors/notImplemented.error');
const {ProblemService} = require('../services');
const {ProblemRepository} = require('../repositories');
const {StatusCodes} =  require('http-status-codes')


const problemService = new ProblemService(new ProblemRepository());

function pingProblemController(req, res){
    return res.json({"message": "Pong from Problem Controller"});
}

async function addProblem(req, res, next){
    try{
        
        const newproblem = await problemService.createProblem(req.body);
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'successfully created a new problem',
            error: {},
            data: newproblem
        })
    } catch(err){
        next(err);
    }
}

async function getProblems(req, res, next){
    try{
        const response = await problemService.getAllProblems();
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'successfully fetched all problems',
            error: {},
            data: response
        })
    } catch(err){
        next(err);
    }
}

async function getProblem(req, res, next){
    try{
        
        const problem = await problemService.getProblem(req.params.id);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'successfully fetched the problem',
            error: {},
            data: problem
        })
    } catch(err){
        next(err);
    }
}

async function deleteProblem(req, res, next){
    try{
        await problemService.deleteProblem(req.params.id);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'successfully deleted the problem',
            error: {},
            data: req.params.id
        })
    } catch(err){
        next(err);
    }
}
async function updateProblem(req, res, next){
    try{
        const updated = await problemService.updateProblem(req.params.id, req.body);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'successfully updated the problem',
            error: {},
            data: updated
        });
    } catch(err){
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

