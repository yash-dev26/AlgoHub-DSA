import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';

import sampleQueue from '../queue/sample.queue';
import logger from './winston.config';
import submissionQueue from '../queue/submission.queue';
import evaluationQueue from '../queue/evaluation.queue';

const bullAdapter = new ExpressAdapter();
bullAdapter.setBasePath('/ui');

createBullBoard({
  queues: [
    new BullMQAdapter(sampleQueue),
    new BullMQAdapter(submissionQueue),
    new BullMQAdapter(evaluationQueue),
  ],
  serverAdapter: bullAdapter,
});

logger.info('Bull Board configured with SampleQueue, SubmissionQueue and EvaluationQueue', {
  source: 'config/bullBoard.config.ts',
});
export default bullAdapter;
