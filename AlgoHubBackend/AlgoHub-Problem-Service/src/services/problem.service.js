const { sanitizeMarkdown } = require("../utils");
const logger = require('../config/logger.config');

class ProblemService {
    constructor(problemRepository){
        this.problemRepository = problemRepository;
    }

    async createProblem(problemData){
        logger.info('ProblemService.createProblem - sanitizing description');
        problemData.description = sanitizeMarkdown(problemData.description);

        const problem = await this.problemRepository.createProblem(problemData);
        logger.info('ProblemService.createProblem - created problem', { id: problem && problem._id });
        return problem;
    
    }

    async getAllProblems(){
        logger.info('ProblemService.getAllProblems - fetching all problems');
        const problems = await this.problemRepository.getAllProblems();
        logger.info(`ProblemService.getAllProblems - found ${problems.length} problems`);
        return problems;
        
    }

    async getProblem(id){
        logger.info(`ProblemService.getProblem - id: ${id}`);
        const problem = await this.problemRepository.getProblem(id);
        logger.info(`ProblemService.getProblem - found: ${!!problem}`);
        return problem;

    }

    async deleteProblem(id){
        logger.info(`ProblemService.deleteProblem - id: ${id}`);
        const deleted = await this.problemRepository.deleteProblem(id);
        logger.info(`ProblemService.deleteProblem - deleted: ${!!deleted}`);
        return deleted;
    }

    async updateProblem(id, updateData){
        logger.info(`ProblemService.updateProblem - id: ${id}`);
        const problem = await this.problemRepository.updateProblem(id, updateData);
        logger.info('ProblemService.updateProblem - updated', { id: problem && problem._id });
        return problem;

    }
}

module.exports = ProblemService;