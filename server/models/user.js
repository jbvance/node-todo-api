const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const UserSchema = new mongoose.Schema({
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

// Don't use an arrow function because arrow functions
// don't bind 'this' and we need to bind 'this'
// because 'this' stores the individual user document

// Override the value that gets sent back when
// you return a user object from a function
UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  
  // Only return _id and email, NOT password or token
  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const access = 'auth';
  const token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens = user.tokens.concat([{access, token}]);
  return user.save()
    .then(() => {
      return token;
    });
};

// User
const User = mongoose.model('User', UserSchema);

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