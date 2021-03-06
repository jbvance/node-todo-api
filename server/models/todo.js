const mongoose = require('mongoose');

const Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

module.exports = {Todo};

// Example of inserting new todo
// const newTodo = new Todo({
//   text: 'Fix fence',
//   completed: false,
//   //completedAt: new Date().getTime()
// });

// newTodo.save()
//   .then(doc => {
//     console.log('Saved todo', doc);
//   })
//   .catch((e => {
//     console.log('Unable to save todo', e);
//   }));
