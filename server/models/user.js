const mongoose = require('mongoose');
const validator = require('validator');

// User
const User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 5,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
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