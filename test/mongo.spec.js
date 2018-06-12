// const server = "http://localhost:3000"
const request = require('supertest')
const fastify = require('../app')
const assert = require('assert')

const newTestQuery = {
  queryTitle: "new Query",
  queryDescription: "new Query description 1.0",
  query: "test",
  queryType: "simpleTest"
}

beforeEach( ()=>{
  fastify.ready()
})

afterEach( ()=>{
  fastify.close()
})

describe('basic routes test', function() {

  it('welcomes the user', async function() {
    await request(fastify.server).get('/')
      .expect(200)
      .expect(/Hello fines user/)
  })

  it('returns a length tables to the user', async function() {
    await request(fastify.server).get('/tables')
      .expect(200, {
        length: 20
      })
  })

})

describe('MongoDB connections', function(){

    it('returns last query', async function() {
      await request(fastify.server).get('/lastquery')
        .expect(500)
    })

})

describe('BigQuery connections', function() {

  it('returns a list of ga table', async function() {
    await request(fastify.server).get('/allTables')
      .expect(200)
  })

})
