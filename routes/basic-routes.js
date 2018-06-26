const fastify = require('fastify')()
// const mongo = require('../controller/queryControl')
const bq = require('../controller/BQControl')

async function routes(fastify, options) {

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
    const query = fastify.mongo.db.collection('testing')

    query.find({}, {
      "_id": 0
    }).sort({
      "$natural": -1
    }).limit(1).toArray(function(err, docs) {
      if (err) {
        reply.code(500)
        reply.send()
      } else {
        // delete docs[0]._id
        reply.code(200)
        reply.send(docs[0])
      }
    })
  })

  fastify.post('/query', async (request, reply) => {
    const query = fastify.mongo.db.collection('testing')
    query.insert(request.body, function(err, docs) {
      if (err) {
        reply.code(500)
        reply.send()
      } else {
        reply.code(200)
        reply.send()
      }
    })
  })

  fastify.put('/update/:id', async (request, reply) => {
    const query = fastify.mongo.db.collection('testing')

    query.update({
      "_id": request.params.id
    }, {
        "query": request.body.newQuery
    },function(err,docs){
        if(err){
          reply.code(500)
          reply.send()
        }else{
          reply.code(200)
          reply.send()
        }
    })
  })

}

module.exports = routes
