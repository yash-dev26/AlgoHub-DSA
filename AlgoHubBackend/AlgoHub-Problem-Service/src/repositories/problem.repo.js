
const logger = require('../config/logger.config');
const NotFound = require('../errors/notFound.error');
const {Problem} = require('../models');

class ProblemRepository {
    async createProblem(problemData){
        try{
            logger.info('ProblemRepository.createProblem - creating problem');
            const problem = await Problem.create({
                title: problemData.title,
                description: problemData.description,
                difficulty: problemData.difficulty
            });
            return problem;
        }
        catch(error){
            logger.error('ProblemRepository.createProblem error', error);
            throw error;     
        }
    }

    async getAllProblems(){
        try{
            logger.info('ProblemRepository.getAllProblems - querying all problems');
            const problems = await Problem.find({});
            return problems;

        } catch(error){
            logger.error('ProblemRepository.getAllProblems error', error);
            throw error;  
        }
    }

    async getProblem(id){
        try{
            logger.info(`ProblemRepository.getProblem - id: ${id}`);
            const problem = await Problem.findById(id);
            if(!problem){
                throw new NotFound('Problem', id);
            }

            return problem;

        } catch(error){
            logger.error('ProblemRepository.getProblem error', error);
            throw error;
        }
    }

    async deleteProblem(id){
        try{

            const problem = await Problem.findByIdAndDelete(id);
            if(!problem){
                logger.error(`Problem with id: ${id} not found in the db`)
                throw new NotFound('Problem', id);
            }
            return problem;

        } catch(error){
            logger.error('ProblemRepository.deleteProblem error', error);
            throw error;
        }
    }

    async updateProblem(id, updateData){
        try{
            const problem = await Problem.findByIdAndUpdate(id, updateData, { new: true });
            if(!problem){
                logger.error(`Problem with id: ${id} not found in the db`)
                throw new NotFound('Problem', id);
            }

            return problem;

        } catch(error){
            logger.error('ProblemRepository.updateProblem error', error);
            throw error;
        }
    }
}
module.exports = ProblemRepository;