const fastify = require('fastify')()

async function routes(fastify, options) {
  const mongo = await require('../controller/queryControl')
  const bq = await require('../controller/BQControl')

  fastify.get('/', async (request, reply) => {
    reply.code(200)
    reply.send('Hello fines user')
  })

  fastify.get('/tables', async (request, reply) => {
    reply.code(200)
    reply.send({
      length: 20
    })
  })

  fastify.get('/lastquery', async (request, reply) => {
    try {
      const data = mongo.lastCreated()
      if(data){
        reply.code(200)
        reply.send({success:"success"})
      }else{
        reply.code(204)
        reply.send({success:"nodata"})
      }
    } catch (e) {
      console.log(e)
      reply.code(500)
      reply.send({fail:"fail"})
    }
  })

  fastify.post('/query', async (request, reply) => {
    console.log(request.body)
    mongo.create(request.body).then(result => {
      reply.code(201)
      reply.redirect('/lastquery')
    }).catch(err => {
      reply.code(300)
    })

  })

  fastify.get('/allTables', async (request, reply) => {
    try {
      const result = await bq.getTables()
      reply.code(200)
      reply.send()
    } catch (e) {
      reply.code(500)
      reply.send()
    }
  })
}

module.exports = routes
