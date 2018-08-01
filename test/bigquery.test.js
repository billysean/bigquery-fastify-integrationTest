const request = require('supertest')
const fastify = require('../app')
const should = require('chai').should()

const datasetName = "newTest"

before(async function() {
  this.enableTimeouts(false)
  try {
    await fastify.ready()
  } catch (err) {
    console.error(err);
    console.error('you might want to restart your mongoDB')
  }
})

after(async function() {
  await fastify.close()
})

describe('bigquery Datasets', async function() {
  // #1 connect server with bigquery
  it('connects with bigquery', async function() {
    should.exist(bigquery)
  })

  // #2 check bigquery projectid
  it('should refer to the correct project id', async function() {
    bigquery.checker.equal('master-telkomsel-bq')
  })

  // #3 bigquery can create a dataset
  it('should create a dataset', async function() {
    await request(fastify.server).post('/create/'+datasetName).expect(400)
  })

  // #4 bigquery can delete a dataset
  it('should delete a dataset', async function(){
    await request(fastify.server).delete('/remove/'+datasetName).expect(200)
  })
})
