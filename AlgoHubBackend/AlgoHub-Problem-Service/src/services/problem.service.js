const { sanitizeMarkdown } = require("../utils");


class ProblemService {
    constructor(problemRepository){
        this.problemRepository = problemRepository;
    }

    async createProblem(problemData){
        try{
            console.log("problem data is", problemData);
            problemData.description = sanitizeMarkdown(problemData.description);

            const problem = await this.problemRepository.createProblem(problemData);


            console.log("problem created is", problem);
            
            return problem;
        } catch(err){
            console.log(err);
            throw(err);
        }
    }
}

module.exports = ProblemService;