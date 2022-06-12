const fastify = require('fastify')({logger:false});
// const fastify = require('fastify')({logger:true}); // for development
const fastifyStatic = require('fastify-static');
const path = require('path');

const PORT = process.env.PORT || 8080;

const os = require('os');
const networkInterfaces = os.networkInterfaces();

// serve static front-end resources
fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'gui')
});

fastify.register(require('./api/inventory'));
fastify.register(require('./routes/gui'));

const start = async () => {
  try {
    await fastify.listen(PORT,'::');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
start();

if(typeof(networkInterfaces.wlp2s0) !== 'undefined') {
  console.log(`\napp-server-ip: ${networkInterfaces.wlp2s0[0].address}:${PORT}\\gui\\menu\n`);
} else if(typeof(networkInterfaces['Wi-Fi'])!=='undefined') {
  console.log(`\napp-server-ip: ${networkInterfaces['Wi-Fi'][1].address}:${PORT}\\gui\\menu\n`);
} else {
  console.log('\nno IP detected');
}