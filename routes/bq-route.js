'use strict';
const fastify = require('fastify')()
const BigQuery = require('@google-cloud/bigquery');
const bigquery = new BigQuery({
  projectId: 'master-telkomsel-bq'
})

const dataset = require('../controller/bq-datasets')

async function routes(fastify, options) {

  fastify.post('/create/:dataset', async (request, reply) => {
    const result = await dataset.createDataset(request.params.dataset, bigquery)
    reply.send(result)
  })

  fastify.delete('/remove/:dataset', async (request,reply)=>{
    const result = await dataset.deleteDataset(request.params.dataset, bigquery)
    reply.send(result)
  })

  // fastify.get('/')
}

module.exports = routes
