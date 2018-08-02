'use strict';
const fastify = require('fastify')()
const BigQuery = require('@google-cloud/bigquery');
const bigquery = new BigQuery({
  projectId: 'git-tutorial-40d48'
})

const dataset = require('../controller/bq-datasets')

async function routes(fastify, options) {

  fastify.post('/create/:dataset', async (request, reply) => {
    const result = await dataset.createDataset(request.params.dataset, bigquery)
    console.log(result)
    reply.send(result)
  })

  // fastify.post('/insert/:table', async (request,reply)=>{
  //   const result = await dataset.insertData(request.params.dataset, bigquery)
  //   reply.send(result)
  // })

  fastify.get('/datasets/list', async (request, reply)=>{
      const result = await dataset.listDatasets(bigquery)
  })

  // fastify.get('/')
}

module.exports = routes
