const fastify = require('fastify')()

module.exports = {
  create: function(data) {
    const mongo = fastify.mongo.db.collection('testing')
    console.log(data)
    const dataInsert = {
      "title": data.queryTitle,
      "description": data.queryDescription,
      "queries": data.query,
      "queryType": data.queryType
    }

    return new Promise( (reject,resolve)=>{

      Object.keys(dataInsert).forEach(function(key) {
        if (dataInsert[key] == null) {
          reject()
        }else{
          mongo.insert(dataInsert).then(result => {
            resolve(result)
          })
        }
      })
    })
  },

  lastCreated: function() {
    const mongo = fastify.mongo.db.collection('testing')

    queries.findOne({
      "$query": {},
      "$orderby": {
        "_id": -1
      }
    }, (err, result) => {
      if (err) {
        fastify.log.error(err)
        console.log(err)
        return err
      } else {
        console.log(result)
        return result
      }
    })
  }

}
