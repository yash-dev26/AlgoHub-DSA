import submissionQueue from '../queue/submission.queue.js';

export default async function (payload: Record<string, unknown>) {
  try {
    console.log('Adding submission job to the queue with payload:', payload);
    const job = await submissionQueue.add('SubmissionJob', payload);
    console.log('Submission job added to the queue');
    return { jobId: job.id, jobName: job.name };
  } catch (err) {
    throw err;
  }
}
