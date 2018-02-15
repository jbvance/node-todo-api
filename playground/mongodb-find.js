const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://todouser:Ladder98@ds147902.mlab.com:47902/todoapp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').find({
  //   _id: new ObjectID('5a8591b702c9ad2630cadeee')
  // }).toArray()
  //   .then(docs => {
  //     console.log('Todos');
  //     console.log(JSON.stringify(docs, undefined, 2));
  //   })
  //   .catch(err => {
  //     console.log('Unable to fetch todos', err)
  //   });

  // db.collection('Todos').find().count()
  //   .then(count => {
  //     console.log(`Todos count: ${count}`);
  //   })
  //   .catch(err => {
  //     console.log('Unable to fetch todos', err)
  //   });

  db.collection('Users').find({name: 'Jason'}).toArray()
    .then(users => {
      console.log(JSON.stringify(users, undefined, 2))
    })
    .catch(err => {
      console.log('Unable to fetch users', err)
    });

  //db.close();
});