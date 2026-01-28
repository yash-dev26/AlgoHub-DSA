import mongoose from "mongoose";
import { randomUUID } from "crypto";

const submissionSchema = new mongoose.Schema({
    submissionId: { type: String, required: true, unique: true, default: () => randomUUID() },
    userId: { type: String, required: true },
    problemId: { type: String, required: true },
    code: { type: String, required: true },
    language: { type: String, required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed', 'TLE', 'MLE'], required: true, default: 'pending' },
}, { timestamps: true });

const Submission = mongoose.model('Submission', submissionSchema);

export default Submission;