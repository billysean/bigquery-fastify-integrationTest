module.exports = {
  //load data from local file
  importLocalData: async (bigquery) => {
    const filename = "./sample_v5_installs.csv"

    bigquery
      .dataset(datasetId)
      .table(tableId)
      .load(filename)
      .then(results => {
        const job = results[0];

        // load() waits for the job to finish
        assert.equal(job.status.state, 'DONE');
        console.log(`Job ${job.id} completed.`);

        // Check the job's status for errors
        const errors = job.status.errors;
        if (errors && errors.length > 0) {
          throw errors;
        }
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
  },

  //list tables
  listTables: async (bigquery, dataset) => {
    bigquery
      .dataset(datasetId)
      .getTables()
      .then(results => {
        const tables = results[0];
        console.log('Tables:');
        tables.forEach(table => console.log(table.id));
        return tables
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
  },

  //exports to GCStorage
  exportTableToGCS: async (bigquery, dataset, table, )=>{
    bigquery
    .dataset(datasetId)
    .table(tableId)
    .extract(storage.bucket(bucketName).file(filename))
    .then(results => {
      const job = results[0];

      // load() waits for the job to finish
      assert.equal(job.status.state, 'DONE');
      console.log(`Job ${job.id} completed.`);

      // Check the job's status for errors
      const errors = job.status.errors;
      if (errors && errors.length > 0) {
        throw errors;
      }
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  }
}
