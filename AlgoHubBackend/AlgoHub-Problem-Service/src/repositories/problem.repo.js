
const NotFound = require('../errors/notFound.error');
const {Problem} = require('../models');

class ProblemRepository {
    async createProblem(problemData){
        try{
            const problem = await Problem.create({
                title: problemData.title,
                description: problemData.description,
                difficulty: problemData.difficulty
            });
            return problem;
        }
        catch(error){
            console.log(error);
            throw error;     
        }
    }

    async getAllProblems(){
        try{
            const problems = await Problem.find({});
            return problems;

        } catch(error){
            console.log(error);
            throw error;  
        }
    }

    async getProblem(id){
        try{
            const problem = await Problem.findById(id);
            if(!problem){
                throw new NotFound("Problem", id)
            }

            return problem;
            
        } catch(error){
            console.log(error);
            throw error;
        }
    }

    async deleteProblem(id){
        try{

            const problem = await Problem.findByIdAndDelete(id);
            if(!problem){
                throw new NotFound('Problem', id);
            }
            return problem;

        } catch(error){
            console.log(error);
            throw error;
        }
    }

    async updateProblem(id, updateData){
        try{
            const problem = await Problem.findByIdAndUpdate(id, updateData, { new: true });
            if(!problem){
                throw new NotFound('Problem', id);
            }

            return problem;

        } catch(error){
            console.error( error);
            throw error;
        }
    }
}
module.exports = ProblemRepository;