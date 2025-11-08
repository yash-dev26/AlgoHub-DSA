const { StatusCodes } = require('http-status-codes');   
const NotImplementedError = require('../errors/notImplemented.error');

function pingProblemController(req, res){
    return res.json({"message": "Pong from Problem Controller"});
}

function addProblem(req, res){
    try{
        throw new NotImplementedError('addProblem');
    } catch(err){
        next(err);
    }
}

function getProblem(req, res){
    try{
        throw new NotImplementedError('getProblem');
    } catch(err){
        next(err);
    }
}

function getProblems(req, res){
    try{
        throw new NotImplementedError('getProblems');
    } catch(err){
        next(err);
    }
}

function deleteProblem(req, res){
    try{
        throw new NotImplementedError('deleteProblem');
    } catch(err){
        next(err);
    }
}

function updateProblem(req, res){
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

