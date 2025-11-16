const { sanitizeMarkdown } = require("../utils");


class ProblemService {
    constructor(problemRepository){
        this.problemRepository = problemRepository;
    }

    async createProblem(problemData){

        problemData.description = sanitizeMarkdown(problemData.description);

        const problem = await this.problemRepository.createProblem(problemData);
        
        return problem;
    
    }

    async getAllProblems(){

        const problems = await this.problemRepository.getAllProblems();
        return problems;
        
    }

    async getProblem(id){

        const problem = await this.problemRepository.getProblem(id);
        return problem;

    }

    async deleteProblem(id){
        await this.problemRepository.deleteProblem(id);
        return;
    }

    async updateProblem(id, updateData){
        const problem = await this.problemRepository.updateProblem(id, updateData);
        return problem;

    }
}

module.exports = ProblemService;