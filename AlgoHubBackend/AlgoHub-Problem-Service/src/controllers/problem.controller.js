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
        console.log("incoming req body", req.body);
        
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

function getProblem(req, res, next){
    try{
        throw new NotImplementedError('getProblem');
    } catch(err){
        next(err);
    }
}

function getProblems(req, res, next){
    try{
        throw new NotImplementedError('getProblems');
    } catch(err){
        next(err);
    }
}

function deleteProblem(req, res, next){
    try{
        throw new NotImplementedError('deleteProblem');
    } catch(err){
        next(err);
    }
}

function updateProblem(req, res, next){
    try{
        throw new NotImplementedError('updateProblem');
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

