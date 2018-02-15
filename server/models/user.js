const mongoose = require('mongoose');

// User
const User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 5,
    trim: true
  }
});

module.exports = {User};

// Example of inserting a new user
// const newUser = new User({
//   email: '    jason@gmail.com    '
// });

// newUser.save()
//   .then(doc => {
//     console.log('Saved user', doc);
//   })
//   .catch((e => {
//     console.log('Unable to save user', e);
//   }));