import fastify from 'fastify'
import app from './app.js'
import { SERVER_CONFIG } from './config/server.config.js';

fastify({logger: true})
  .register(app)
  .listen({port: Number(SERVER_CONFIG.PORT), }, (err) => {
    if(err){
      console.error(err);
      process.exit(1);
    }
    console.info(`Server listening on port : ${SERVER_CONFIG.PORT}`)
  });