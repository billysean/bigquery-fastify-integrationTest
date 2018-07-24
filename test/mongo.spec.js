// const server = "http://localhost:3000"
const request = require('supertest')
const fastify = require('../app')
const should = require('chai').should()

let newTestQuery = {
  queryTitle: "new Query",
  queryDescription: "new Query description 1.0",
  query: "afterlebaran.51",
  queryType: "simpleTest"
}

before(async function() {
  // this.enableTimeouts(false)
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

// MongoDB Integrattion Test
describe('MongoDB connections', async function() {
  it('connects to MongoDB', async function() {
    should.exist(fastify.mongo.db)
  })

  it('connects to Telkomsel Database', async function() {
    fastify.mongo.db.s.databaseName.should.equal('telkomsel')
  })

  it('should add data to telkomsel', async function() {
    await request(fastify.server).post('/query')
      .send(newTestQuery)
      .set('Accept', 'application/json')
      .expect(200)
  })

  it('should return the last inserted data', async function() {
    await request(fastify.server).get('/lastquery')
      .expect(200)
      .then(response => {
        newTestQuery = response.body
      })
  })

  it('should update the data in the database', async function() {
    await request(fastify.server).put('/update/' + newTestQuery._id)
      .send({
        "newQuery": "newQuery"
      })
      .set('Accept', 'application/json')
      .expect(200)
  })
})
