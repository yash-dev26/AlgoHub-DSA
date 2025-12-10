import fastify from 'fastify'
import app from './app.js'

fastify({logger: true})
  .register(app)
  .listen({port: 3000, host: '0.0.0.0'}, (err) => {
    if(err){
      console.error(err);
      process.exit(1);
    }
    console.info('Server listening on http://0.0.0.0:3000')
  });