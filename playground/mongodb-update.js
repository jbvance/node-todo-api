const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://todouser:Ladder98@ds147902.mlab.com:47902/todoapp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID('5a859b7a02c9ad2630cb21b6')
  }, {
      $set: {
        completed: true
      }
    }, {
      returnOriginal: false
    })
    .then(result => {
      console.log(result)
    })
    .catch(err => {
      console.log('Error Updating Todo :', err)
    });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5a849bca8abdaf1b8c3c1058')
  }, {
        $set: {
          name: 'John'
        },
        $inc: {
          age: 1
        }
  }, {
    returnOriginal: false
  })
    .then(result => {
      console.log(result)
    })
    .catch(err => {
      console.log('Error Updating User :', err)
    });

  //db.close();
});
