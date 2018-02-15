const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://todouser:Ladder98@ds147902.mlab.com:47902/todoapp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

 // deleteMany
// db.collection('Todos').deleteMany({text: 'Eat lunch'})
//   .then(result => {
//     console.log(result);
//   })
//   .catch(err => {
//     console.log('Error deleting', err);
//   });


 // deleteOne
//  db.collection('Todos').deleteOne({text: 'Eat lunch'})
//   .then(result => {
//     console.log(result);
//   })
//   .catch(err => {
//     console.log('Error deleting', err);
//   });

//  // findOneAndDelete
//  db.collection('Todos').findOneAndDelete({completed: false})
//  .then(result => {
//    console.log(result);
//  })
//  .catch(err => {
//    console.log('Error deleting', err);
//  });

db.collection('Users').deleteMany({name: 'Jason'})
  .then(result => {
    console.log(result);
  })
  .catch(err => {
     console.log('Error deleting many: ', err)
  });

db.collection('Users').findOneAndDelete({_id: new ObjectID('5a84b84547d7cd095c9b6c93')})
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.log('Error in findOneAndDelete: ', err)
  });



  //db.close();
});