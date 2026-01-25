import fastify from 'fastify'
import app from './app.js'
import { SERVER_CONFIG } from './config/server.config.js';
import { log } from 'node:console';

const server = fastify({logger: true});

server
  .register(app)
  .listen({port: Number(SERVER_CONFIG.PORT), }, (err) => {
    if(err){
      console.error(err);
      process.exit(1);
    }
    console.info(`Server listening on port : ${SERVER_CONFIG.PORT}`);
    console.log(`bull-board UI available at http://localhost:${SERVER_CONFIG.PORT}/ui`);
    
  });