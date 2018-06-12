const fastify = require('fastify')()
require('dotenv').config()

// routes
fastify.register(require('./routes/basic-routes'))

// MongoDB
fastify.register(require('fastify-mongodb'), {
  url: 'mongodb://localhost:27017/telkomsel'
})

// Redis
// fastify.register(require('fastify-redis'), { host: '127.0.0.1'})

// server
fastify.listen(process.env.PORT, function(err) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  } else {
    fastify.log.info('server running in port ' + process.env.PORT)
    console.log('server running in port ' + process.env.PORT)
  }
})

module.exports = fastify
