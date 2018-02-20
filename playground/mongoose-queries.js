const { ObjectID } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

// var id = '5a8c28d9b60b3ac8254ff217';
const userId = '5a85d14bc8fa7d942c9d976a';
const notFoundUserId = '7a85d14bc8fa7d942c9d976a';
const invalidUserId = 'XXX_5a85d14bc8fa7d942c9d976a'

// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }

// returns empty array if no records found
// Todo.find({
//   _id: id
// }).then(todos => {
//   console.log('Todos', todos);
// });

// Returns one document at most - returns null if none found
// Todo.findOne({
//   _id: id
// }).then(todo => {
//   console.log('Todo', todo);
// });

// Use if only need to find by id - returns null if not found
// Todo.findById(id).then(todo => {
//   if (!todo) {
//     return console.log('Id not found')
//   }
//   console.log('Todo', todo);
// }).catch(e => {
//   console.log(e)
// });

User.findById(userId)
  .then(user => {
    if (!user) {
      return console.log(`Unable to find user with _id = ${userId}`)
    }
    console.log(JSON.stringify(user, undefined, 2));
  })
  .catch(e => {
    console.log(e);
  });

