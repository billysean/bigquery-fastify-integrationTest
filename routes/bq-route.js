const fastify = require('fastify')()
const bq = require('../controller/BQControl')

async function routes(fastify, options) {

  fastify.get('/lastDay', async (request, reply) => {

  })

}

module.exports = routes
