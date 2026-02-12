const mongoose = require('mongoose');
const problemSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: [ true, "problem title is required" ]
    },
    description: {
        type: String,
        required: [ true, "problem description is required" ]
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: [ true, "problem difficulty is required" ],
        default: 'easy'
    },
    testCases: [
        {
            input: { type: String, required: true },
            output: { type: String, required: true }
        }
    ],
    codeStub: [
      {
        language: { type: String, enum: ['cpp', 'python', 'java'] },
        startStub: { type: String },
        endStub: { type: String },
        userStub: { type: String }
      }
    ],
    tags: {
        type: [String],
        default: []
    },
    editorial: {
        type: String
    }
})

const Problem = mongoose.model('Problem', problemSchema);
module.exports = Problem;