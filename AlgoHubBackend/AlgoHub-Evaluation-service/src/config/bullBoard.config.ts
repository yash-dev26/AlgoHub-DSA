import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';

import sampleQueue from '../queue/sample.queue';
import logger from './winston.config';

const bullAdapter = new ExpressAdapter();
bullAdapter.setBasePath('/ui');

createBullBoard({
  queues: [new BullMQAdapter(sampleQueue)],
  serverAdapter: bullAdapter,
});

logger.info('Bull Board configured with SampleQueue');

export default bullAdapter;
