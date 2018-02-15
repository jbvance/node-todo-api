const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://todouser:Ladder98@ds147902.mlab.com:47902/todoapp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // })

  // db.collection('Users').insertOne({
  //   name: 'Jason',
  //   age: 42,
  //   location: 'Houston'
  // }, (err, result)=> {
  //   if (err) {
  //     return console.log('Unable to add user');
  //   }
  //   console.log(result.ops[0]._id.getTimestamp());
  // })

  db.close();
});