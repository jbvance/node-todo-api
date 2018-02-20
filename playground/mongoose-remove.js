const { ObjectID } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

// removes ALL documents
// Todo.remove({}).then(result => {
//   console.log(result);
// });

// remove one document and returns the deleted doc
// Todo.findOneAndRemove();
// Todo.findByIdAndRemove();

Todo.findOneAndRemove({_id: '5a8c609b02c9ad2630f27291'}).then(todo => {
  console.log(todo);
});

Todo.findByIdAndRemove('5a8c609b02c9ad2630f27291').then(todo => {
  console.log(todo)
});
