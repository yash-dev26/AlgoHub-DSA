const { StatusCodes } = require('http-status-codes');   

function pingProblemController(req, res){
    return res.json({"message": "Pong from Problem Controller"});
}

function addProblem(req, res){
    return res.status(StatusCodes.NOT_IMPLEMENTED).json({
        message: "Add Problem not implemented"
    });
}

function getProblem(req, res){
    return res.status(StatusCodes.NOT_IMPLEMENTED).json({
        message: "Get Problem not implemented"
    });
}

function getProblems(req, res){
    return res.status(StatusCodes.NOT_IMPLEMENTED).json({
        message: "Get Problems not implemented"
    });
}

function deleteProblem(req, res){
    return res.status(StatusCodes.NOT_IMPLEMENTED).json({
        message: "Delete Problem not implemented"
    });
}

function updateProblem(req, res){
    return res.status(StatusCodes.NOT_IMPLEMENTED).json({
        message: "Update Problem not implemented"
    });
}

module.exports = {
    addProblem,
    getProblem,
    getProblems,
    deleteProblem,
    updateProblem,
    pingProblemController
}