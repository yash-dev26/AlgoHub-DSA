import submissionQueue from '../queue/submission.queue.js';

export default async function (payload: Record<string, unknown>) {
  try {
    await submissionQueue.add('SubmissionJob', payload);
    console.log('Submission job added to the queue');
  } catch (err) {
    throw err;
  }
}
