import fastify from 'fastify'
import app from './app.js'
import { SERVER_CONFIG } from './config/server.config.js';
import type {ZodTypeProvider} from 'fastify-type-provider-zod';
import connectToDatabase from './config/db.config.js';
import errorHandler from './utils/errorHandler.js';
import evaluationWorker from './consumer/evaluationWorker.js';

const server = fastify({logger: true})

server
  .withTypeProvider<ZodTypeProvider>()
  .register(app)
  .setErrorHandler(errorHandler)
  .listen({port: Number(SERVER_CONFIG.PORT), }, async(err) => {
    if(err){
      console.error(err);
      process.exit(1);
    }
    await connectToDatabase();
    evaluationWorker('EvaluationQueue');
    console.info(`Server listening on port : ${SERVER_CONFIG.PORT}`);
    
  });