module.exports = {
  // creates the dataset
  createDataset: async (datasetName, bigquery) => {

    await bigquery.createDataset(datasetName)
      .then(results => {
        const dataset = results[0]
        console.log('Dataset ${dataset.id} created.')
        return 200
      })
      .catch(err => {
        console.error(err);
        return 500
      })
  },

  // Deletes the dataset
  deleteDataset: async (datasetName, biquery) => {
    const dataset = bigquery.dataset(datasetId);

    await dataset
      .delete()
      .then(() => {
        console.log(`Dataset ${dataset.id} deleted.`);
        return 200
      })
      .catch(err => {
        console.error('ERROR:', err);
        return 300
      });
  },

  // streaming data into bigquery
  insertData: async (bigquery, storage, datasetId, tableId) => {
    const bucketName = 'cloud-samples-data';
    const filename = 'bigquery/us-states/us-states.csv';

    const metadata = {
      sourceFormat: 'CSV',
      skipLeadingRows: 1,
      autodetect: true,
    };

    // Loads data from a Google Cloud Storage file into the table
    bigquery
      .dataset(datasetId)
      .table(tableId)
      .load(storage.bucket(bucketName).file(filename), metadata)
      .then(results => {
        const job = results[0];

        // load() waits for the job to finish
        // assert.equal(job.status.state, 'DONE');
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
